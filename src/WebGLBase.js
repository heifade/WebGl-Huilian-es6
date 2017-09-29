import * as THREE from 'three';
import debounce from 'lodash/debounce';

// 判断浏览器是否支持WebGL
export function isSupportWebGL() {
  try {
    let canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  }
  catch (e) {
    return false;
  }
}

export class WebGLBase {
  constructor($container, width, height) {
    this.$container = $container;
    this.resizeDebounced = debounce((size) => {
      if (this.renderer) {
        this.renderer.setSize(this.width, this.height);
      }
    }, 100);
    this.resize(width, height);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //抗据齿
    this.renderer.setSize(this.width, this.height);
    // this.renderer.setClearColor('#000000', 1.0);

    // 渲染器放入容器
    this.$container.append(this.renderer.domElement);

    this.scene = new THREE.Scene();
    // 透视
    this.camera = new THREE.PerspectiveCamera(
      30, //视角(度)
      this.width / this.height, //纵横比,即平面长高比
      1, //物体近平面离摄像头的距离
      150000 //物体远平面离摄像头的距离
    );
    // 摄像头位置
    this.camera.position.x = 0;
    this.camera.position.y = -30;
    this.camera.position.z = 100;
    // 摄像头上方向
    this.camera.up.x = 0;
    this.camera.up.y = 1;
    this.camera.up.z = 0;
    // 摄像头观察点
    this.camera.lookAt({ x: 0, y: 0, z: 0 });
    this.scene.add(this.camera);

    // 直射光
    this.light = new THREE.DirectionalLight('#ffffff', 1);
    this.light.position.set(50, 50, 50);
    this.scene.add(this.light);

    //聚光灯光源
    this.spotLight = new THREE.SpotLight('#ffffff', 6.5, 0, 270 / 180 * Math.PI); //ffffff
    this.spotLight.position.set(50, 50, -40);
    this.scene.add(this.spotLight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  toRadian(deg) {
    return deg * Math.PI / 180;
  }

  createTexture() {
    let canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    let context = canvas.getContext('2d');
    let gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2,
      0,
      canvas.width / 2, canvas.height / 2,
      canvas.width / 2
    );

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

}