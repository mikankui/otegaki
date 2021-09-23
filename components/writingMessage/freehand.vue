<template>
  <div class="draw">

    <div class="toolbar" :style="{ right: toolBarRight }">


      <div class="allColors">

        <div class="panelUp mobile">
          
        </div>

        <transition-group class="lineColor" name="color-list" tag="ul" >
          <li v-for="(color, $index) in colors" v-bind:style='{ "background-color": color }' v-on:click="changeLineColor(color, $index)" v-bind:key="color"></li>
        </transition-group>


        <transition-group class="bgColor" name="color-list" tag="ul" >
          <li v-for="(color, $index) in bgColors" v-bind:key="color" v-bind:style='{ "background-color": color }' @click="changeBg(color, $index)"></li>
        </transition-group>

      </div>

    </div>

<!--     <ul class="toolbar" v-bind:style='{ "background-color": bgColor }'>
      <li v-for="color in colors" v-bind:style='{ "background-color": color }' v-on:click="changeLineColor(color)" v-bind:key="color"></li>
      <li class="bgColor" v-bind:style='{ "background-color": bgColor }' @click="changeBg()" ></li>
    </ul> -->

    <div class="buttons"  v-bind:class="{ showButtons: undo }" >
      <button v-on:click="download()" class="btn submitBtn"> <img src="download.svg" alt="Download"> </button>
      <button v-on:click="clean()" class="btn clearBtn"> <img src="clear.svg" alt="Clear Canvas"> </button>
      <button v-on:click="undoLine()" class="btn undoBtn" > <img src="undo.svg" alt="Undo"> </button>
    </div>
    
    <div class="canvas">
      
      <h2 v-bind:style='{ "color": lineColor }' class="noselect" v-if="!undo"> {{ title }} </h2>

      <!-- Canvas size is defined in CSS, search for ".canvas" -->

      <svg xmlns=http://www.w3.org/2000/svg version="1.1" class="drawSvg" :width="canvasWidth" :height="canvasHeight"
        @mousedown="linestart()"
        @touchstart="linestart()"
        @mousemove="lineMove()"
        @touchmove="lineMove()"
        @mouseup="lineEnd()"
        @touchend="lineEnd()"
        @onmouseleave="outOfCanvas()"
        @touchcancel="outOfCanvas()"
        >
        
        <rect id="bg" width="100%" height="100%" v-bind:fill="bgColor"></rect>
      
      </svg>

      <div id="cursor" v-bind:style='{ "background-color": lineColor }'></div>

    </div>

    

  </div>
</template>

<script>
// hello jquery
//const $ = document.querySelector.bind(document);
//const $$ = document.querySelectorAll.bind(document);

  export default {
    name: 'Draw',
    props: [
      'title',
      'colors',
      'bgColors',
      'lineColor',
      'bgColor',
    ],
    data () {
      return {
          board: '',
          cursor: '',
          colorNum: 0,
          gesture: false,
          line: '',
          radius: 2.5,
          width: 8,
          undo: false,
          onCanvas: false // mouseout event is not firing, dunno why
        }
      },

    computed: {

      canvasWidth: function(){
        return this.board.clientWidth
      },

      canvasHeight: function(){
        return this.board.clientHeight
      },

      toolBarRight:{
        get:  function(){
          return -this.colors.length * 51.5 + 'px'  
        },

        set: function(newVal){
          // this.toolBarRight = newVal // This is more right way to do that, but it won't work( Did the same with css hover
        }
        
      }

      // requuires some setters, I don't understand it.

      // rect: function(){
      //   return this.board.getBoundingClientRect();
      // },

      // cursorX: function(){
      //   let rect = this.board.getBoundingClientRect();
      //   return Math.round( event.clientX - this.rect.x ) || Math.round(event.changedTouches[0].clientX - this.rect.x)
      // },

      // cursorY: function(){
      //   return Math.round( event.clientY - this.rect.y )  || Math.round(event.changedTouches[0].clientY - this.rect.y)
      // }

    },

    methods:{
      
      initBoard: function(){
        console.log("call initBoard");
        this.board = document.getElementsByClassName('drawSvg')[0];
        this.cursor = document.getElementById('cursor');
        this.gesture = false
        console.log(this.board);

      },

      linestart: function(){

        this.undo = true;

        let e = event

        // this.line += 'M' + this.cursorX + ',' + this.cursorY 
        // I prefer to use code above with computed valuse, but it drops some errors about setter, and I didn't succeed to solve it in 15 minutes.

        let rect = this.board.getBoundingClientRect();
        let cursorX = Math.round( e.clientX - rect.x ) || Math.round(e.changedTouches[0].clientX - rect.x)
        let cursorY = Math.round( e.clientY - rect.y )  || Math.round(e.changedTouches[0].clientY - rect.y)

        this.line += 'M' + cursorX + ',' + cursorY 

        this.cursor.style.opacity = 1
        this.gesture = true
        e.preventDefault()
      },

      lineMove: function(){

        let e = event
        let rect = this.board.getBoundingClientRect();

        let cursorX = Math.round( e.clientX - rect.x ) || Math.round(e.changedTouches[0].clientX - rect.x)
        let cursorY = Math.round( e.clientY - rect.y )  || Math.round(e.changedTouches[0].clientY - rect.y)


        if ( this.gesture == true ){
          this.line += 'L' + cursorX + ',' + cursorY
          // this.line += 'L'+(e.clientX||e.touches[0].clientX)+','+(e.clientY||e.touches[0].clientY)+' '
          this.trace((e.clientX||e.touches[0].clientX), (e.clientY||e.touches[0].clientY))
        }

        this.cursor.style.top =  e.clientY - rect.y - this.radius+'px'
        this.cursor.style.left = e.clientX - rect.x - this.radius+'px'

        this.cursorX = e.clientX - rect.x
        this.cursorY = e.clientY - rect.y

        this.onCanvas = true
      },

      trace: function(x,y){
        if (process.browser){
          let dot = document.createElement('div');
          dot.classList.add('dot')
          dot.style.top = y-this.radius+'px';
          dot.style.left = x-this.radius+'px';
          dot.style.background = this.lineColor;
          dot.style.width = dot.style.height = this.radius*2+'px';
          document.body.appendChild(dot);
          setTimeout(function(){dot.style.opacity=0},500);
          setTimeout(function(){document.body.removeChild(dot)},1000);
        }
      },

      lineEnd: function(){
        if (process.browser){
        let e = event;
        let rect = this.board.getBoundingClientRect();

        let cursorX = Math.round( e.clientX - rect.x ) || Math.round(e.changedTouches[0].clientX - rect.x);
        let cursorY = Math.round( e.clientY - rect.y ) || Math.round(e.changedTouches[0].clientY - rect.y);


        this.line += 'L' + cursorX + ',' + cursorY;
        // this.line += 'L'+(e.clientX||e.changedTouches[0].clientX)+','+(e.clientY||e.changedTouches[0].clientY)
        this.cursor.style.opacity = .5
        let path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttributeNS(null,'d',this.line);
        path.setAttributeNS(null,'fill','none');
        path.setAttributeNS(null,'stroke-linecap','round');
        path.setAttributeNS(null,'stroke-linejoin','round');
        path.setAttributeNS(null,'stroke', this.lineColor);

        path.setAttributeNS(null,'stroke-width', this.width);
        this.board.appendChild(path);
        // this.board.innerHTML = this.board.innerHTML // force SVG repaint after DOM change
        this.gesture = false;
        this.line = '';
        }

        // saving to local storage
        // localStorage.svg = new XMLSerializer().serializeToString(this.board)

        
      },

      // For changing color positions inside toolbar
      arrayMove: function (arr, fromIndex, toIndex) {
          var element = arr[fromIndex];
          arr.splice(fromIndex, 1);
          arr.splice(toIndex, 0, element);
      },


      rgb2hex: function(rgb) { 
           if (  rgb.search("rgb") == -1 ) {
                return rgb;
           } else {
                rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
                function hex(x) {
                     return ("0" + parseInt(x).toString(16)).slice(-2);
                }
                return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
           }
      },

      setActiveColor: function(Li){
        let allColors = document.querySelectorAll(Li)
        let target = event.target // for set time out

        for (let color of allColors) {
          color.classList.remove('activeColor') 
        }

        setTimeout (function(){
          target.classList.add('activeColor')
        }, 10)
      },

      setActiveColorMounted: function(li, arr, color){

        let allLi = document.querySelectorAll(li)
        let colorIndex = arr.indexOf(color)

        for (let li of allLi) {
          let liColor = this.rgb2hex(li.style.backgroundColor).toUpperCase()

            if( liColor === color){
              li.classList.add('activeColor')

              this.arrayMove( arr, colorIndex, 0 )
            }
        }
      },

      changeLineColor(color, index){
        window.scrollTo({top: 0, behavior: 'smooth'});

        this.$emit( 'changeLineColor', color )

        this.setActiveColor('.lineColor li')

        // changing circle position
        this.arrayMove( this.colors, index, 0 )
      },

      changeBg(color, index){ // just change backgrounds colors one after another
        window.scrollTo({top: 0, behavior: 'smooth'});

        this.$emit( 'changeBgColor', color )

        this.setActiveColor('.bgColor li')

        document.querySelectorAll('.drawSvg #bg').setAttribute('fill', this.bgColor )

        this.arrayMove( this.bgColors, index, 0 )

        // this.board.innerHTML = this.board.innerHTML // force SVG repaint after DOM change

      },

      undoLine: function(){
        let paths = document.querySelectorAll('.drawSvg path');
        document.getElementsByClassName('.drawSvg').removeChild(paths[paths.length-1])
      },

      clean: function (){
        this.line = '';
        this.undo = false;

        let paths = document.querySelectorAll('.drawSvg path').length
        
        let i = 0

        for (i=0;i<paths;i++){
          this.board.removeChild(this.board.querySelectorAll('path')[0])
        }

        // this.board.innerHTML = ''; more effective, but removes bg also

      },

      download: function(){
        if (process.browser){
        var dl = document.createElement("a");

        let drawing = this.svgDataURL( document.getElementsByClassName('.drawSvg') )

        console.log (drawing)

        document.body.appendChild(dl); // This line makes it work in Firefox.
        dl.setAttribute("href", drawing)
        dl.setAttribute("download", "freehand-svg-drawing.svg");
        dl.click();
        }
      },

      svgDataURL: function(){
        // let drawSvg = new XMLSerializer().serializeToString(this.board)
        let serialSvg = (new XMLSerializer).serializeToString(this.board);
        return "data:image/svg+xml," + encodeURIComponent(serialSvg);

        

        // this.$emit('drawSubmit', drawSvg);
      },


    },

    mounted: function () {
      this.initBoard()

      this.colors

      this.setActiveColorMounted('.lineColor li', this.colors, this.lineColor) 
      this.setActiveColorMounted('.bgColor li', this.bgColors, this.bgColor)


    },

  }
</script>

<style>
 .canvas{
    width: 720px;
    height: 480px;
    position: relative;
    cursor: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
  }

  .canvas h2{
    position: absolute;
    font-weight: 400;
    width: 100%;
    text-align: center;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }    

.canvas .drawSvg{
  width: 100%;
  height: 100%;
}

.draw .buttons{
  width: 100%;
  left: 0;
  top: 0;
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
  opacity: 0;
  transition: all .2s;
}

.draw .showButtons{
  opacity: 1;
}

.draw .btn{
  color: #fff;
  background: none;
  position: relative;
  border: none;
  margin-left: 0;
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  opacity: 0.75;
  transition: opacity .2s;
  margin-right: 8px;
}

.draw .btn:hover{
  opacity: 1; 
}

.draw .btn:focus{
  border: none;
  outline: none;
}

.draw .undoBtn{
  justify-self: flex-end;
  margin-left: auto;
}

.draw .toolbar{
  position: fixed;
/*  right: 0;*/
  display: flex;
  background: #2E2F30;
  border-radius: 6px 0 0 6px;
  padding: 12px;
  top: 52%;
  transform: translateY(-52%);
  transition: 0.3s ease;
}

.draw .toolbar:hover{
  right: 0!important;
}

.draw .toolbar .allColors ul{
  display: flex;
  flex-direction: row;
  padding-left: 24px;
}


.draw .toolbar li{
  width: 40px;
  height: 40px;
  list-style: none;
  margin-top: 18px;
  margin-right: 12px;
  border-radius: 50%;
  border: 1px solid rgba( 255, 255, 255, .2);
  cursor: pointer;
  transition: all .3s ease-out;
}

.draw .toolbar .bgColor li{
  border-radius: 8px;
}

.draw .toolbar .activeColor{
  border: 1px solid rgba( 255, 255, 255, .5);
  transform: scale(1.15);
  margin-right: 60px;
}

.draw  .toolbar li::after{
  content: '';
  position: absolute;
  right: 0;
  display: block;
  height: 40px;
  width: 0;
  background: #434345;
  transition: all .3s ease-out;
}

.draw .toolbar .activeColor::after{ 
  content: '';
  position: absolute;
  right: -30px;
  display: block;
  height: 40px;
  width: 1px;
  background: #434345;
}


#cursor{
  top: 50%;
  left: 50%;
}

#cursor, .dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  position: absolute;
  opacity: .5;
  pointer-events: none;
  transition: opacity .1s ease-in-out;

}

.drawSvg rect{
  transition: fill .2s;
}

.draw ul li.bgColor{
  border-radius: 4px;
}

.mobile{
  display: none;
}

@media only screen and (max-width: 720px) {

  body, html{
    background: #2E2F30 !important;
    align-items: flex-start !important;
  }

  .draw{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  }

  .canvas{
    top: 70px;
  }

  .drawSvg{
    top: 0;
  }  

  .mobile{
    display: flex;
  }

  .draw .buttons{
    position: fixed;
    top: 0;
    height: 56px;
    width: 100%;
    padding: 0;
    padding-top: 12px;
    margin: 0;
    justify-content: flex-start;
    background: #2E2F30;
    z-index: 2;
  }

  .draw .buttons .btn{
    margin-left: 12px;
  }

  .draw .toolbar{
    position: relative;
    top: auto;
    transform: translateY(0);
    right: 0 !important;
    width: 100%;
    margin-top: 60px;
    padding: 0;
  }

  .draw .toolbar ul{
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #434345;
  }

  .draw .toolbar li{
    margin: auto;
  }

  .allColors{
    width: 100%;
    margin-top: 100px;
  }

  .draw .toolbar .allColors ul{
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding-left: 0;
  }

  .draw .toolbar .activeColor{
    position: absolute;
    top: 40px;
    margin-right: 12px;
  }

  .lineColor .activeColor{
    right: 35%;
  }

  .bgColor .activeColor{
    left: 35%;
  }

  .draw .toolbar .activeColor::after{
    display: none;
  }

  .wrap .draw .buttons .btn{
    margin-top: 0;
    border: none;
    font-size: 18px;
    margin: auto;
    margin-left: 12px;
  }

  .draw .buttons .undoBtn{
    top: -4px;
    margin: auto;
    margin-right: 24px;
  }

  #cursor{
    display: none;
  }
  .drawSvg, .canvas{
    width: 100%;
    height: 360px;
    box-sizing: border-box;
  }

   .action .canvas .drawSvg{
    width: 100%;
    height: 360px;
    max-height: 100%;
  }

  .drawUi{
    width: 100%;
    flex-direction: column-reverse;
  }

  .drawUi ul{
    display: flex;
    margin: 0;
    margin-top: 24px;
    flex-wrap: wrap;
  }

  .drawUi ul li{
    margin: 6px;
  }


}
</style>
