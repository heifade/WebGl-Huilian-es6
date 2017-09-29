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
    </div>`);
    this.$webglContainer = $html.find('.webglContainer');
    this.$webglBall = $html.find('.webglBall');
    this.$webglBack = $html.find('.webglBack');

    $(document.body).append($html);

    let getSize = () => {
      return {
        width: $(window).width(),
        height: $(window).height(),
      }
    }

    $(document).ready(() => {
      if(isSupportWebGL()) {
        let size = getSize();
        var webGLBall = new WebGLUnion(this.$webglBall, 800, 500);
        var webGLBack = new WebGLUnionBack(this.$webglBack, size.width, size.height);
  
        $(window).resize((e) => {
          let size = getSize();
          // webGLBall.resize(width, height);
          webGLBack.resize(size.width, size.height);
  
          // $divWegGlBall.css('width', width).css('height', height);
          this.$webglBack.css('width', size.width).css('height', size.height);
        });
      }
      else {
        alert('浏览器不支持WebGL!');
      }
    });
  }
}

let index = new Index();
index.init();