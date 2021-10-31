<template>
  <div class="buttons showButtons">
    <button v-on:click="download_png()" class="btn submitBtn">
      <img src="download.svg" alt="Download" />
    </button>
    <button v-on:click="clean()" class="btn clearBtn">
      <img src="clear.svg" alt="Clear Canvas" />
    </button>
    <button v-on:click="undoLine()" class="btn undoBtn">
      <img src="undo.svg" alt="Undo" />
    </button>
    <messageHelp />
  </div>
</template>

<script>
export default {
  components: {
    messageHelp: () => import("@/components/writingMessage/messageHelpDialog"),
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
    undoLine: function () {
      document.getElementById("log").innerText = "";
      try {
        let paths = document.getElementById("freehands").childNodes;
        this.eventLog("undoLine:" + paths.length);
        if (paths.length > 0) {
          document
            .getElementById("freehands")
            .removeChild(paths[paths.length - 1]);
        }
      } catch (e) {
        this.eventLog(e);
        this.eventLog("error:undoLine");
      }
    },

    clean: function () {
      this.line = "";
      this.undo = false;
      try {
        this.freehands = document.getElementById("freehands");

        while (this.freehands.firstChild) {
          this.freehands.removeChild(this.freehands.firstChild);
        }
      } catch (e) {
        this.eventLog(e);
      }

      // this.board.innerHTML = ''; more effective, but removes bg also
    },

    download: function () {
      if (process.browser) {
        var dl = document.createElement("a");

        let drawing = this.svgDataURL(document.getElementById("canvas"));

        //console.log (drawing)

        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", drawing);
        dl.setAttribute("download", "freehand-svg-drawing.svg");
        dl.click();
      }
    },

    svgDataURL: function () {
      // let drawSvg = new XMLSerializer().serializeToString(this.board)
      this.board = document.getElementsByClassName("drawSvg")[0];
      let serialSvg = new XMLSerializer().serializeToString(this.board);
      return "data:image/svg+xml," + encodeURIComponent(serialSvg);
    },

    /** svg to png convert */
    async download_png() {
      console.log("start download png");
      let drawing = this.svgDataURL(document.getElementById("canvas"));
      var canvas = document.createElement("canvas");
      canvas.width = this.board.width.baseVal.value;
      canvas.height = this.board.height.baseVal.value;
      console.log("create canvas:" + canvas.width + ":" + canvas.height);

      var ctx = canvas.getContext("2d");

      //背景画像を初期値に戻す
      //#22 ダウンロードした画像に背景が入らない
      document.querySelector(".drawSvg").style.transformOrigin = "0px 0px";
      //document.querySelector(".drawSvg").style.transform = "scale(1)";

      var image = await this.svgToImage(drawing);
      ctx.drawImage(image, 0, 0);

      var dl = document.createElement("a");
      dl.setAttribute("href", canvas.toDataURL("image/png"));
      dl.setAttribute("download", "OTEGAKI.png");
      dl.click();
    },
    /** svgをcanvasに描画させる*/
    async svgToImage(drawing) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        };

        console.log("set image.src");
        console.log(drawing);
        img.src = drawing;
      });
    },
  },
};
</script>


<style>
/** -------------------------------*/
/* toolbar */
/** -------------------------------*/
.buttons {
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-start;
  opacity: 0;
}

.showButtons {
  opacity: 1;
}

.btn {
  color: #fff;
  background: none;
  position: relative;
  border: none;
  margin-left: 0;
  font-size: 16px;
  width: 32px;
  margin-bottom: 12px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity 0.2s;
  margin-right: 8px;
}

.btn:hover {
  opacity: 1;
}

.btn:focus {
  border: none;
  outline: none;
}

.undoBtn {
  justify-self: flex-end;
  margin-left: auto;
}
</style>