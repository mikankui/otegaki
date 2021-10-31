<template>

  <v-container>
    <v-row>
      <v-col>
        <div class="draw">
          <div id="paper" class="canvas">

              <svg xmlns=http://www.w3.org/2000/svg
              id="canvas"
              version="1.1" 
              class="drawSvg" 
              :width="cardWidth"
              :height="cardHeight"
              :viewBox="cardViewBox"
              :transform="baseImageTransform"
              :transform-origin="baseImageTransformOrigin"
                @mousedown="linestart"
                @touchstart="pointerdown_handler"
                @mousemove="lineMove"
                @touchmove="pointermove_handler"
                @mouseup="lineEnd"
                @touchend="pointerup_handler"
                @onmouseleave="pointerup_handler"
                @touchcancel="pointerup_handler"
                >
                  <g 
                  id="baseImage"
                  >
                    <image
                    :xlink:href="previewBase64"
                    :x="baseImageX"
                    :y="baseImageY"
                    :width="baseImageW"
                    :height="baseImageH"
                    preserveAspectRatio="none"
                    />
                  </g>

                  <g id="freehands"
                  preserveAspectRatio="none"
                  >
                  </g>

              </svg>
            
            <div id="cursor" :style='{ "background-color": lineColor }'></div>
          </div>
        </div>
        <div id="log"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  name: "Draw",
  props: [],
  data() {
    console.log(this.$store.state.cardInfo);
    return {
      board: "",
      cursor: "",
      colorNum: 0,
      gesture: false,
      line: "",
      radius: 1.5,
      width: 3,
      lineColor: "#CCCCCC",
      undo: false,
      onCanvas: false, // mouseout event is not firing, dunno why
      previewBase64: this.$store.state.cardInfo.base64,
      cardBaseWidth: this.$store.state.cardInfo.width,
      cardBaseHeight: this.$store.state.cardInfo.height,
      cardWidth: this.$store.state.cardInfo.width,
      cardHeight: this.$store.state.cardInfo.height,
      cardViewBox: this.$store.state.cardInfo.viewBox,
      //デバイス画面サイズ
      deviceWidth: 600,
      deviceHeight: 900,
      //画面モード
      mode: "",
      centerX: 0,
      pinchCenterY: 0,
      //ピンチイン・アウト用
      baseDistance: 0,
      timeoutId: 0,
      startX1: 0,
      startY1: 0,
      startX2: 0,
      startY2: 0,
      //ベース画像
      baseImageX: 0,
      baseImageY: 0,
      baseImageScale: 1,
      baseImageW: this.$store.state.cardInfo.width,
      baseImageH: this.$store.state.cardInfo.height,
      baseImageTransform: " translate(0 0) scale(1)",
      baseImageTransformOrigin: " 0px 0px",
    };
  },

  computed: {
    toolBarRight: {
      get: function () {
        return -this.colors.length * 51.5 + "px";
      },

      set: function (newVal) {
        // this.toolBarRight = newVal // This is more right way to do that, but it won't work( Did the same with css hover
      },
    },
  },

  methods: {
    eventLog: function (log, mode = false) {
      let logstr = "";
      if (true) return;
      if (log != "") {
        logstr = document.getElementById("log").innerText + "\r\n";
      }
      logstr = logstr + log;
      document.getElementById("log").innerText = logstr;
    },
    initBoard: function () {
      console.log("call initBoard");
      this.board = document.getElementById("canvas");
      this.freehands = document.getElementById("freehands");
      this.cursor = document.getElementById("cursor");
      this.gesture = false;
      this.lineColor = "#CCCCCC";
      this.updateDeviceWH();
      //iOSでは、拡大時(scale>1)に線画の描画位置がずれる
      this.isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
      this.eventLog("device is ios ?:" + this.isIOS, true);
    },
    updateDeviceWH: function () {
      // デバイス長と画像幅の比率
      let rect = this.board.getBoundingClientRect();
      this.deviceWidth = rect.width;
      this.deviceHeight = rect.height;
    },
    pointerdown_handler: function (ev) {
      // pointerdown イベントは、タッチ操作の開始を知らせます。
      // このイベントは2本指ジェスチャーをサポートするためにキャッシュされます
      ev.preventDefault();
      let touches = ev.touches;
      this.eventLog("touch count:" + touches.length);

      //画面モードをリセット
      this.changeModeReset();
      this.setStartpoint(ev);

      // タップ数
      if (touches.length == 1) {
        this.linestart(ev);
      } else if (touches.length > 1) {
        this.baseDistance = this.getDistance(ev);
      }
    },
    pointermove_handler: function (ev) {
      //タッチの位置
      let touches = ev.changedTouches;
      this.eventLog("---------------------------");
      this.eventLog("mode:" + this.mode);

      //ポインター１つ
      if (touches.length == 1) {
        this.lineMove(ev);
      }
      // ポインターが2つダウンしている場合は、ピンチジェスチャーを確認します
      else if (touches.length == 2) {
        //フリーハンドはキャンセル
        this.stopDrawing();
        //描画エリア
        let rect = this.board.getBoundingClientRect();

        // 座標1 (1本目の指)
        let x1 = touches[0].clientX;
        let y1 = touches[0].clientY;
        // 座標2 (2本目の指)
        let x2 = touches[1].clientX;
        let y2 = touches[1].clientY;

        //2点の真ん中
        let xc = x2 + (x1 - x2) / 2;
        let yc = y2 + (y1 - y2) / 2;

        if (this.baseDistance) {
          //ピンチ開始時からの差分を計算
          let distance = this.getDistance(ev);
          //zoomが効きすぎる場合の調整係数
          let KANDO = 1;
          let scale = distance / this.baseDistance;
          let scaleRate = (distance - this.baseDistance) / this.baseDistance;
          let zoomRate = scaleRate * KANDO;
          this.eventLog(
            "scale scaleRate: " +
              Math.round(scale) +
              " " +
              Math.round(scaleRate)
          );

          if (scale && scale != Infinity && scale != 0) {
            //ピンチアウト／ピンチイン
            if (
              (this.mode == "" || this.mode == "zoom") &&
              this.getMoveDirection(ev) < 0 &&
              Math.abs(scaleRate) > 0.1
            ) {
              this.updateTransfrom_zoom(zoomRate, xc, yc);
              //画面モードを拡大に設定
              //初回だけ原点移動させるため、zoom後にモード変更
              this.changeModeZoom();
              this.baseDistance = distance;
            }
            //移動
            else if (
              (this.mode == "" || this.mode == "move") &&
              this.getMoveDirection(ev) > 0
            ) {
              //画面モードを移動に設定
              this.changeModeMove();
              //最初のタップ位置
              let x0 = this.startX1;
              let y0 = this.startY1;

              //最初のタップ位置からの移動量
              // １デバイス上の移動量：x2 - x0
              // ２移動比率：(x2 - x0) * this.deviceWidht
              // ３画像の移動量：２＊this.baseImageW
              // ４画像の移動量（拡大比率込）：３/ scale

              let dx =
                (this.baseImageW * ((x1 - x0) / this.deviceWidth)) /
                this.baseImageScale;
              let dy =
                (this.baseImageH * ((y1 - y0) / this.deviceHeight)) /
                this.baseImageScale;
              //this.eventLog("dx dy : " + Math.round(dx) + "/" + Math.round(dy));
              if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
                this.updateTransfrom_move(dx, dy);
                this.startX1 = x1;
                this.startY1 = y1;
              }
            }
          }
        } else {
          this.baseDistance = this.getDistance(ev);
        }
      } else {
        //this.eventLog("over 3 point");
        this.stopDrawing();
      }
    },
    pointerup_handler: function (ev) {
      let touches = ev.changedTouches;
      //画面モードを解除
      this.changeModeReset();
      // ポインター数が2未満の場合は、以前の距離をリセットします
      if (touches.length == 1) {
        this.lineEnd(ev);
        this.baseDistance = 0;
      } else if (touches.length == 2) {
        this.baseDistance = 0;
        this.stopDrawing();
      }
    },
    //タッチ2点の移動方向
    getMoveDirection: function (ev) {
      let touches = ev.touches;
      // 2本以上の指の場合だけ処理
      if (touches.length > 1) {
        // 座標1 (1本目の指)
        let dx1 = touches[0].pageX - this.startX1;
        let dy1 = touches[0].pageY - this.startY1;
        let dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        // 座標2 (2本目の指)
        let dx2 = touches[1].pageX - this.startX2;
        let dy2 = touches[1].pageY - this.startY2;
        let dd2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        let direction = 0;

        //変化量が多い方を採用（小さいとちょっとの変化が効きすぎる）
        if (dx1 * dx2 > dy1 * dy2) {
          //移動方向が同じで、変化量も同じくらい(10%以内)なら「移動」
          if (dx1 * dx2 > 0) {
            direction = 1;
            //そうでない場合は拡大
          } else {
            direction = -1;
          }
        } else {
          //移動方向が同じで、変化量も同じくらい(10%以内)なら「移動」
          if (dy1 * dy2 > 0) {
            direction = 1;
            //そうでない場合は拡大
          } else {
            direction = -1;
          }
        }

        this.eventLog(
          "start sx1 sx2 sy1 sy2: " +
            " " +
            Math.round(this.startX1) +
            " " +
            Math.round(this.startX2) +
            " " +
            Math.round(this.startY1) +
            " " +
            Math.round(this.startY2)
        );
        this.eventLog(
          "direc1 direct2 dx1 dx2 dy1 dy2: " +
            Math.round(dx1) +
            " " +
            Math.round(dx2) +
            " " +
            Math.round(dy1) +
            " " +
            Math.round(dy2)
        );

        // 1は移動、-1は拡大
        return direction;
      } else {
        return 1;
      }
    },
    //タッチ2点の距離
    getDistance: function (ev) {
      let touches = ev.changedTouches;

      // 2本以上の指の場合だけ処理
      if (touches.length > 1) {
        // 座標1 (1本目の指)
        let x1 = touches[0].pageX;
        let y1 = touches[0].pageY;

        // 座標2 (2本目の指)
        let x2 = touches[1].pageX;
        let y2 = touches[1].pageY;

        // 2点間の距離
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      }

      return 0;
    },
    //拡大・縮小
    setPinchCenter(ev) {
      let touches = ev.changedTouches;
      // 座標1 (1本目の指)
      this.pinchCenterX = (touches[0].pageX + touches[1].pageX) / 2;
      this.pinchCenterY = (touches[0].pageY + touches[1].pageY) / 2;
    },
    //移動
    setStartpoint(ev) {
      let touches = ev.touches;

      // 2本以上の指の場合だけ処理
      if (touches.length == 1) {
        // 座標1 (1本目の指)
        this.startX1 = touches[0].pageX;
        this.startY1 = touches[0].pageY;
      } else if (touches.length > 1) {
        // 座標1 (1本目の指)
        this.startX1 = touches[0].pageX;
        this.startY1 = touches[0].pageY;
        // 座標2 (2本目の指)
        this.startX2 = touches[1].pageX;
        this.startY2 = touches[1].pageY;
      }

      this.eventLog(
        "set sx1 sx2 sy1 sy2: " +
          Math.round(this.startX1) +
          " " +
          Math.round(this.startX2) +
          " " +
          Math.round(this.startY1) +
          " " +
          Math.round(this.startY2)
      );
      //this.eventLog("setStartpoint x y :" + this.startX1 + " " + this.startY1);
    },
    getDeltaX: function (ev) {
      let touches = ev.changedTouches;
      let x = touches[0].pageX;
      this.eventLog(
        "deltaX: " + Math.round(x) + " " + Math.round(this.startX1)
      );
      return x - this.startX1;
    },
    getDeltaY: function (ev) {
      let touches = ev.changedTouches;
      let y = touches[0].pageY;
      this.eventLog(
        "deltaY: " + Math.round(y) + " " + Math.round(this.startY1)
      );
      return y - this.startY1;
    },

    /*----------------------------------------------------
      ベース画像
    ------------------------------------------------------*/
    //モード設定
    changeModeReset: function () {
      this.mode = "";
    },
    changeModeMove: function () {
      if (this.mode == "") this.mode = "move";
    },
    changeModeZoom: function () {
      if (this.mode == "") this.mode = "zoom";
    },
    //拡大・縮小
    updateTransfrom_zoom: function (scale, xc, yc) {
      let tmpScale = this.baseImageScale + scale;
      let maxRate = 4;
      let minRate = 1;

      if (tmpScale > maxRate) {
        this.baseImageScale = maxRate;
      } else if (tmpScale < minRate) {
        this.baseImageScale = minRate;
        this.baseImageX = 0;
        this.baseImageY = 0;
        this.resteTransfromOrigin();
      } else {
        this.baseImageScale = tmpScale;
      }

      //#27 iosでピンチイン／アウトが効かない問題
      document.querySelector(".drawSvg").style.transform =
        "scale(" + this.baseImageScale + ")";
      //描画の中心移動
      //初回だけ
      if (this.mode == "") this.moveTransfromOrigin(xc, yc);
      //this.updateTransfromOrigin(dx, dy);

      this.eventLog(
        "scal xc yc : " +
          Math.round(this.baseImageScale) +
          "/" +
          Math.round(xc) +
          "/" +
          Math.round(yc)
      );
    },
    //移動
    //メッセージ画面　画像移動（パン）をしたい #28
    updateTransfrom_move: function (dx, dy) {
      //画像が拡大されてない場合は、移動の必要なし
      //画像全体が描画されるよう位置を初期値に設定
      if (this.baseImageScale <= 1) {
        this.resteTransfromOrigin();
      } else {
        //画像移動（パン）
        this.eventLog("dx dy : " + Math.round(dx) + "/" + Math.round(dy));
        this.updateTransfromOrigin(dx, dy);
      }
    },
    //原点x,yを移動
    moveTransfromOrigin: function (xc, yc) {
      //現在の原点
      let [oldx, oldy] = document
        .querySelector(".drawSvg")
        .style.transformOrigin.split(" ")
        .map((v) => parseFloat(v.replace("px", "")));

      if (!oldx) oldx = 0;
      if (!oldy) oldy = 0;

      let newx = oldx + (xc - oldx) / this.baseImageScale;
      let newy = oldy + (yc - oldy) / this.baseImageScale;

      //x方向
      if (newx < 0) {
        //移動後にマイナスになる場合は0とする
        newx = 0;
      } else if (newx > this.baseImageW) {
        //移動後が大きく利過ぎないようにする
        newx = this.baseImageW;
      } else {
        //上記以外のときはそのまま
      }

      //y方向
      if (newy < 0) {
        //移動後  にマイナスになる場合は0とする
        newy = 0;
      } else if (newy > this.baseImageH) {
        //移動後が大きく利過ぎないようにする
        newy = this.baseImageH;
      } else {
        //上記以外のときはそのまま
      }
      this.eventLog("oldx oldy :" + oldx + " " + oldy);
      this.eventLog("xc yc :" + xc + " " + yc);
      this.eventLog("newx newy :" + newx + " " + newy);

      document.querySelector(".drawSvg").style.transformOrigin =
        newx + "px " + newy + "px";
    },
    //x,yの移動量を追加
    updateTransfromOrigin: function (dx, dy) {
      let [oldx, oldy] = document
        .querySelector(".drawSvg")
        .style.transformOrigin.split(" ")
        .map((v) => parseFloat(v.replace("px", "")));

      //移動後の位置
      let newx = oldx - dx;
      let newy = oldy - dy;

      //x方向
      if (newx < 0) {
        //移動後にマイナスになる場合は0とする
        newx = 0;
      } else if (newx > this.baseImageW * 0.6) {
        //移動後が大きく利過ぎないようにする
        newx = this.baseImageW * 0.6;
      } else {
        //上記以外のときはそのまま
      }

      //y方向
      if (newy < 0) {
        //移動後  にマイナスになる場合は0とする
        newy = 0;
      } else if (newy > this.baseImageH * 0.6) {
        //移動後が大きく利過ぎないようにする
        newy = this.baseImageH * 0.6;
      } else {
        //上記以外のときはそのまま
      }

      this.eventLog("mewx newy : " + Math.round(newx) + "/" + Math.round(newy));

      //transformorigin
      document.querySelector(".drawSvg").style.transformOrigin =
        newx + "px " + newy + "px";
    },
    //xを原点に戻す
    resteTransfromOriginX: function () {
      let [oldx, oldy] = document
        .querySelector(".drawSvg")
        .style.transformOrigin.split(" ")
        .map((v) => parseFloat(v.replace("px", "")));
      document.querySelector(".drawSvg").style.transformOrigin =
        "0px " + oldy + "px";
    },
    //yを原点に戻す
    resteTransfromOriginY: function () {
      let [oldx, oldy] = document
        .querySelector(".drawSvg")
        .style.transformOrigin.split(" ")
        .map((v) => parseFloat(v.replace("px", "")));
      document.querySelector(".drawSvg").style.transformOrigin =
        oldx + "px 0px";
    },
    //yを原点に戻す
    resteTransfromOrigin: function () {
      document.querySelector(".drawSvg").style.transformOrigin = "0px 0px";
    },
    //原点を取得
    getTransfromOrigin: function () {
      return document
        .querySelector(".drawSvg")
        .style.transformOrigin.split(" ")
        .map((v) => parseFloat(v.replace("px", "")));
    },
    /*----------------------------------------------------
      線描画
    ------------------------------------------------------*/
    linestart: function (ev) {
      this.undo = true;

      let e = ev;
      let rect = this.board.getBoundingClientRect();

      let cursorX =
        //Math.round(e.clientX - rect.left) ||
        //Math.round(e.changedTouches[0].clientX - rect.left);
        Math.round(e.changedTouches[0].clientX);
      let cursorY =
        //Math.round(e.clientY - rect.top) ||
        //Math.round(e.changedTouches[0].clientY - rect.top);
        Math.round(e.changedTouches[0].clientY);

      //拡大後の原点（画面に表示されている左上）
      let [x, y] = [0, 0];
      if (this.isIOS) {
        [x, y] = this.transfarForIOS(cursorX, cursorY);
      } else {
        [x, y] = this.transfar(cursorX, cursorY);
      }
      this.eventLog(
        "cX cY x y : " +
          cursorX +
          " " +
          cursorY +
          " " +
          Math.round(x) +
          " " +
          Math.round(y),
        true
      );
      this.line += "M" + x + "," + y;

      this.cursor.style.opacity = 1;
      this.gesture = true;
      e.preventDefault();
    },

    lineMove: function (ev) {
      try {
        let e = ev;
        let rect = this.board.getBoundingClientRect();
        let cursorX =
          //Math.round(e.clientX - rect.left) ||
          //Math.round(e.changedTouches[0].clientX - rect.left);
          Math.round(e.changedTouches[0].clientX);
        let cursorY =
          //Math.round(e.clientY - rect.top) ||
          //Math.round(e.changedTouches[0].clientY - rect.top);
          Math.round(e.changedTouches[0].clientY);

        //拡大後の原点（画面に表示されている左上）
        if (this.gesture == true) {
          //拡大後の原点（画面に表示されている左上）
          let [x, y] = [0, 0];
          if (this.isIOS) {
            [x, y] = this.transfarForIOS(cursorX, cursorY);
          } else {
            [x, y] = this.transfar(cursorX, cursorY);
          }

          this.line += "L" + x + "," + y;
          // this.line += 'L'+(e.clientX||e.touches[0].clientX)+','+(e.clientY||e.touches[0].clientY)+' '
          this.trace(
            e.clientX || e.touches[0].clientX,
            e.clientY || e.touches[0].clientY
          );
        }

        this.cursor.style.top = e.clientY - rect.top - this.radius + "px";
        this.cursor.style.left = e.clientX - rect.left - this.radius + "px";

        this.cursorX = e.clientX - rect.left;
        this.cursorY = e.clientY - rect.top;

        this.onCanvas = true;
      } catch {
        console.log("error:lineMove");
        this.stopDrawing();
      }
    },

    trace: function (x, y) {
      if (process.browser) {
        let dot = document.createElement("div");
        dot.classList.add("dot");
        dot.style.top = y - this.radius + "px";
        dot.style.left = x - this.radius + "px";
        dot.style.background = this.lineColor;
        dot.style.width = dot.style.height = this.radius * 2 + "px";
        document.body.appendChild(dot);
        setTimeout(function () {
          dot.style.opacity = 0;
        }, 500);
        setTimeout(function () {
          document.body.removeChild(dot);
        }, 1000);
      }
    },

    lineEnd: function (ev) {
      if (process.browser) {
        if (this.gesture == true) {
          let e = ev;

          let cursorX =
            //Math.round(e.clientX - rect.left) ||
            //Math.round(e.changedTouches[0].clientX - rect.left);
            Math.round(e.changedTouches[0].clientX);
          let cursorY =
            //Math.round(e.clientY - rect.top) ||
            //Math.round(e.changedTouches[0].clientY - rect.top);
            Math.round(e.changedTouches[0].clientY);

          //拡大後の原点（画面に表示されている左上）
          let [x, y] = [0, 0];
          if (this.isIOS) {
            [x, y] = this.transfarForIOS(cursorX, cursorY);
          } else {
            [x, y] = this.transfar(cursorX, cursorY);
          }

          console.log(cursorX + ":" + cursorY);

          this.line += "L" + x + "," + y;
          // this.line += 'L'+(e.clientX||e.changedTouches[0].clientX)+','+(e.clientY||e.changedTouches[0].clientY)
          this.cursor.style.opacity = 0.5;
          let path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          path.setAttributeNS(null, "d", this.line);
          path.setAttributeNS(null, "fill", "none");
          path.setAttributeNS(null, "stroke-linecap", "round");
          path.setAttributeNS(null, "stroke-linejoin", "round");
          path.setAttributeNS(null, "stroke", this.lineColor);
          path.setAttributeNS(null, "stroke-width", this.width);
          path.setAttributeNS(null, "class", "freehand");
          this.freehands.appendChild(path);
          // this.board.innerHTML = this.board.innerHTML // force SVG repaint after DOM change
          this.stopDrawing();
        } else {
          this.stopDrawing();
        }
      }
    },

    //手書きを停止
    //メッセージ画面 ピンチ操作をした時も線が書かれる #26
    stopDrawing: function () {
      this.gesture = false;
      this.line = "";
    },

    //拡大・縮小に合わせて座標を変換
    transfar: function (x, y) {
      let svg = document.getElementById("canvas");
      let pt = svg.createSVGPoint(),
        svgP;

      pt.x = x;
      pt.y = y;
      svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      return [svgP.x, svgP.y];
    },
    //拡大・縮小に合わせて座標を変換
    transfarForIOS: function (x, y) {
      let svg = document.getElementById("canvas");
      let pt = svg.createSVGPoint(),
        svgP;
      let [oldx, oldy] = this.getTransfromOrigin();

      pt.x = x;
      pt.y = y;
      svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      let nx = svgP.x / this.baseImageScale;
      let ny = svgP.y / this.baseImageScale;

      //return [svgP.x, svgP.y];
      return [nx, ny];
    },
    outOfCanvas: function () {
      console.log("out of canvas");
    },
  },
  mounted: function () {
    this.initBoard();
  },
  watch: {},
};
</script>

<style>
.canvas {
  position: relative;
  cursor: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.canvas .drawSvg,
.canvas image,
.canvas g {
  width: 100%;
  height: auto;
  transform: scale(1);
  transform-origin: 100 100;
}

#cursor {
  top: 50%;
  left: 50%;
}

#cursor,
.dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  position: absolute;
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.1s ease-in-out;
}

.drawSvg rect {
  transition: fill 0.2s;
}
</style>
