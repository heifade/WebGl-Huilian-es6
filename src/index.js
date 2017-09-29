import { isSupportWebGL } from './WebGLBase';
import { WebGLUnion } from './WebGLUnion';
import { WebGLUnionBack } from './WebGLUnionBack';
import * as $ from 'jquery';
import '../css/webgl.less';

class Index {

  constructor() {

  }

  init() {
    let $html = $(`
    <div class="webglContainer">
      <div class="webglBall"></div>
      <div class="webglBack"></div>
      <div class="mouseArea"></div>
    </div>`);
    this.$webglContainer = $html.find('.webglContainer');
    this.$webglBall = $html.find('.webglBall');
    this.$webglBack = $html.find('.webglBack');
    this.$mouseArea = $html.find('.mouseArea');

    $(document.body).append($html);

    this.$mouseArea.mousemove((e) => {
      this.mouseMove(e);
    });

    let getSize = () => {
      return {
        width: $(window).width(),
        height: $(window).height(),
      }
    }

    $(document).ready(() => {
      if(isSupportWebGL()) {
        let size = getSize();
        this.webGLBall = new WebGLUnion(this.$webglBall, 800, 500);
        var webGLBack = new WebGLUnionBack(this.$webglBack, size.width, size.height);

        this.setCenterPoint(size);
  
        $(window).resize((e) => {
          let size = getSize();
          // webGLBall.resize(width, height);
          webGLBack.resize(size.width, size.height);
  
          // $divWegGlBall.css('width', width).css('height', height);
          this.$webglBack.css('width', size.width).css('height', size.height);

          this.setCenterPoint(size);
        });
      }
      else {
        alert('浏览器不支持WebGL!');
      }
    });
  }

  setCenterPoint(size) {
    this.centerPoint = { //中心点
      x: size.width / 2,
      y: size.height / 2,
    };
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  mouseMove(e) {
    
    let distance = this.distance(e.offsetX, e.offsetY, this.centerPoint.x, this.centerPoint.y);
    let zoom = (this.centerPoint.x * 2 - distance * 2) / this.centerPoint.x / 2 * 15;

    this.webGLBall.zoom(zoom);
    
  }
}

let index = new Index();
index.init();