import * as THREE from 'three';
import { WebGLBase } from './WebGLBase';


export class WebGLUnionBack extends WebGLBase {
  constructor($container, width, height) {
    super($container, width, height);
    this.init();
  }

  init() {
    super.init();
    this.renderer.setClearColor('#000000', 1.0);

    this.addBackPoints(); // 添加背景星际
    this.animate();
  }

  animate() {
    let run = () => {
      this.backPointGroup.rotation.y += 0.0003;
      this.render();
      requestAnimationFrame(run);
    }
    run();
  }

  addBackPoints() { // 添加背景星际
    let geometry = new THREE.TorusKnotGeometry(
      180, //radius
      30, //tube 管子半径
      150, //radialSegments 
      12, //tubularSegments
      4,
      3,
    );
    let material = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 3,
      map: this.createTexture(),
    });
    material.alphaTest = 0.9;

    this.backPointGroup = new THREE.Object3D();
    this.backPointGroup.position.x = 0;
    this.backPointGroup.position.y = -30;
    this.backPointGroup.position.z = 70;
    this.scene.add(this.backPointGroup);

    let points = new THREE.Points(geometry, material);
    points.rotation.x = this.toRadian(90);
    this.backPointGroup.add(points);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.resizeDebounced();
  }
}



