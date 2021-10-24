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
      //ピンチイン・アウト用
      pinchCenterX: 0,
      pinchCenterY: 0,
      baseDistance: 0,
      timeoutId: 0,
      startX: 0,
      startY: 0,
      //ベース画像
      baseImageX: 0,
      baseImageY: 0,
      baseImageScale: 1,
      baseImageW: this.$store.state.cardInfo.width,
      baseImageH: this.$store.state.cardInfo.height,
      baseImageTransform: " translate(0 0) scale(1)",
      baseImageTransformOrigin: "0 0",
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
    eventLog: function (log) {
      let logstr = "";
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
    },
    pointerdown_handler: function (ev) {
      // pointerdown イベントは、タッチ操作の開始を知らせます。
      // このイベントは2本指ジェスチャーをサポートするためにキャッシュされます
      ev.preventDefault();
      let touches = ev.changedTouches;

      // タップ数
      if (touches.length == 1) {
        this.linestart(ev);
        this.setStartpoint(ev);
      } else if (touches.length == 2) {
        this.baseDistance = this.getDistance(ev);
        this.setPinchCenter(ev);
        this.setStartpoint(ev);
      }
    },
    updateDeviceWH: function () {
      // デバイス長と画像幅の比率
      let rect = this.board.getBoundingClientRect();
      this.deviceWidth = rect.width;
      this.deviceHeight = rect.height;
      /*
      this.eventLog(
        "rect: " +
          this.deviceWidth +
          " " +
          this.deviceHeight +
          " " +
          this.cardWidth +
          " " +
          this.cardBaseHeight
      );
      */
    },
    pointermove_handler: function (ev) {
      let touches = ev.changedTouches;
      this.eventLog("---------------------------");

      //ポインター１つ
      if (touches.length == 1) {
        this.lineMove(ev);
      }
      // ポインターが2つダウンしている場合は、ピンチジェスチャーを確認します
      else if (touches.length == 2) {
        // デバイス長と画像幅の比率

        //画面サイズと描画サイズの比率
        let rateX = this.deviceWidth / this.cardWidth;
        let rateY = this.deviceHeight / this.cardHeight;

        //タッチの位置
        let touches = ev.changedTouches;

        // 座標1 (1本目の指)
        let x1 = touches[0].pageX;
        let y1 = touches[0].pageY;
        // 座標2 (2本目の指)
        let x2 = touches[1].pageX;
        let y2 = touches[1].pageY;

        //2点の真ん中
        let xc = x2 + (x1 - x2) / 2;
        let yc = y2 + (y1 - y2) / 2;

        if (this.baseDistance) {
          //ViewBoxの設定値
          /*
          let [x, y, w, h] = this.cardViewBox
            .split(" ")
            .map((v) => parseFloat(v));
          */

          //ピンチ開始時からの差分を計算
          let distance = this.getDistance(ev);
          let scale = distance / this.baseDistance;
          let scaleRate = (distance - this.baseDistance) / this.baseDistance;
          this.eventLog("scaleRate: " + scaleRate);

          if (scale && scale != Infinity && scale != 0) {
            let dx = this.deviceWidth * scaleRate;
            let dy = this.deviceHeight * scaleRate;
            //this.eventLog("dx dy : " + Math.round(dx) + "/" + Math.round(dy));
            //ピンチアウト／ピンチイン
            if (Math.abs(scaleRate) > 0.1) {
              /*
                let dw = w * scaleRate ;
                let dh = h * scaleRate ;

                w = w - dw ;
                h = h - dh ;
                x = x - dx;
                y = y - dy ;
                this.eventLog("[Pinch]: " + Math.round(dx) + " " + Math.round(dy) + " " + Math.round(dw) + " " + Math.round(dh));
                //変化率の基準を更新
                //this.baseDistance = distance;
                this.startX = x;
                this.startY = y;
                this.updateViewBox(x,y,w,h);
                */
              //BaseImageの変化
              this.updateTransfrom_zoom(scale, xc, yc, -dx / 2, -dy / 2);
            }
            //移動
            else if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
              //let dx = this.getDeltaX(ev);
              //let dy = this.getDeltaY(ev);
              //x = x - dx;
              //y = y - dy;
              //変化率の基準を更新
              /*
              this.eventLog(
                "[Move]: start " +
                  Math.round(this.startX) +
                  " " +
                  Math.round(this.startY)
              );
              this.eventLog(
                "[Move]: delta " + Math.round(dx) + " " + Math.round(dy)
              );
              */
              /*
              this.eventLog(
                "[Move]: after " + Math.round(x) + " " + Math.round(y)
              );
              */
              //this.updateViewBox(x, y, w, h);
              //画像移動 (画像の移動ではなくviewboxで対応する。コメントアウト)
              //this.updateTransfrom_move(dx, dy);
            }
          }
        } else {
          this.baseDistance = this.getDistance(ev);
        }
      } else {
        //this.eventLog("over 3 point");
      }
    },
    pointerup_handler: function (ev) {
      let touches = ev.changedTouches;

      // ポインター数が2未満の場合は、以前の距離をリセットします
      if (touches.length == 1) {
        this.lineEnd(ev);
        this.baseDistance = 0;
      } else if (touches.length == 2) {
        this.baseDistance = 0;
      }
    },
    //-------------------------------------
    // viewboxを更新
    //-------------------------------------
    updateViewBox(x, y, w, h) {
      //viewbox
      x = this.returnInt(x);
      y = this.returnInt(y);
      w = this.returnMaxOrInt(w, this.cardBaseWidth);
      h = this.returnMaxOrInt(h, this.cardBaseHeight);
      /*
      if (w == this.cardBaseWidth) {
        x = 0;
      }
      if (h == this.cardBaseHeight) {
        y = 0;
      }
      */
      this.cardViewBox = [x, y, w, h].join(" ");
    },

    //viewboxの値設定用関数
    returnInt: function (x) {
      return Math.round(x);
    },
    return0orInt: function (x) {
      return x >= 0 ? Math.round(x) : 0;
    },
    //最大と最小の間になるようにする(viewboxは拡大の場合widthが小さくなるので混乱しないよう注意)
    returnMaxOrInt: function (x, min) {
      if (x > min) {
        x = min;
      } else if (x < min / 5) {
        //拡大は3倍までとする
        x = min / 5;
      }
      return Math.round(x);
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
      let touches = ev.changedTouches;
      // 座標1 (1本目の指)
      this.startX = touches[0].pageX;
      this.startY = touches[0].pageY;

      //this.eventLog("setStartpoint x y :" + this.startX + " " + this.startY);
    },
    getDeltaX: function (ev) {
      let touches = ev.changedTouches;
      let x = touches[0].pageX;
      this.eventLog("deltaX: " + Math.round(x) + " " + Math.round(this.startX));
      return x - this.startX;
    },
    getDeltaY: function (ev) {
      let touches = ev.changedTouches;
      let y = touches[0].pageY;
      this.eventLog("deltaY: " + Math.round(y) + " " + Math.round(this.startY));
      return y - this.startY;
    },

    /*----------------------------------------------------
      ベース画像
    ------------------------------------------------------*/
    //拡大・縮小
    updateTransfrom_zoom: function (scale, xc, yc, dx, dy) {
      let tmpScale = this.baseImageScale * scale;
      let maxRate = 4;
      let minRate = 1;

      if (tmpScale > maxRate) {
        this.baseImageScale = maxRate;
      } else if (tmpScale < minRate) {
        this.baseImageScale = minRate;
        this.baseImageX = 0;
        this.baseImageY = 0;
      } else {
        this.baseImageScale = tmpScale;
      }

      //#27 iosでピンチイン／アウトが効かない問題
      document.querySelector(".drawSvg").style.transform =
        "scale(" + this.baseImageScale + ")";
      document.querySelector(".drawSvg").style.transformOrigin =
        this.baseImageX + xc + "px " + (this.baseImageY + yc) + "px ";
      /*
      let translateStr =
        "translate(" + this.baseImageX + " " + this.baseImageX + ")";
      let scaleStr = " scale(" + this.baseImageScale + ")";

      this.baseImageTransform = translateStr + scaleStr;
      this.baseImageTransformOrigin =
        this.baseImageX + xc + " " + (this.baseImageY + yc);

      //this.eventLog("xc yc dx dy : " + " " + xc + " " + yc + " " + dx + " " + dy);
      this.eventLog("updateTransfrom: " + this.baseImageTransform);
      this.eventLog(
        "baseImageTransformOrigin: " + this.baseImageTransformOrigin
      );
      */
    },
    //移動
    updateTransfrom_move: function (dx, dy) {
      //画像が拡大されてない場合は、移動の必要なし
      //画像全体が描画されるよう位置を初期値に設定
      if (this.baseImageScale <= 1) {
        this.eventLog("updateTransfrom_move: scale is 1");
        this.baseImageX = 0;
        this.baseImageY = 0;
      } else {
        let nextX = this.baseImageX - dx;
        let nextY = this.baseImageY - dy;
        let maxW = this.deviceWidth * this.baseImageScale;
        let maxH = this.deviceHeight * this.baseImageScale;

        //移動後に描画領域からはみ出した場合の考慮
        // x + dx < 0 なら x=0
        // (w * scale) - x + dx < w なら x = w*scale - w

        //x方向
        if (nextX < 0) {
          this.baseImageX = 0;
        } else if (maxW - nextX < this.deviceWidth) {
          this.baseImageX = this.deviceWidth * (this.baseImageScale - 1);
        } else {
          this.baseImageX = nextX;
        }

        //y方向
        if (nextY < 0) {
          this.baseImageY = 0;
        } else if (maxH - nextY < this.deviceHeight) {
          this.baseImageY = this.deviceHeight * (this.baseImageScale - 1);
        } else {
          this.baseImageY = nextY;
        }

        let translateStr =
          "translate(" + this.baseImageX + " " + this.baseImageY + ")";
        let scaleStr = " scale(" + this.baseImageScale + ")";

        this.baseImageTransform = translateStr + scaleStr;

        this.eventLog("updateTransfrom_move: " + this.baseImageTransform);
      }
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
      let [x, y] = this.transfar(cursorX, cursorY);
      this.eventLog(
        "cX cY x y : " + cursorX + " " + cursorY + " " + x + " " + y
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
          let [x, y] = this.transfar(cursorX, cursorY);
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
        let [x, y] = this.transfar(cursorX, cursorY);

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
        this.gesture = false;
        this.line = "";
      }
      // saving to local storage
      // localStorage.svg = new XMLSerializer().serializeToString(this.board)
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
  z-index: 1;
}

.canvas .drawSvg,
.canvas image {
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
