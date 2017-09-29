import * as THREE from 'three';
import { WebGLBase } from './WebGLBase';

export class WebGLUnion extends WebGLBase {
  constructor($container, width, height) {
    super($container, width, height);

    this.sphereRadius = 18; //球体半径
    this.init();
  }
  init() {
    super.init();

    this.addSphere(); // 球
    this.addMovingPoints(); // 球外转动的点

    this.animate();
  }
  addSphere() {
    this.turnGroup = new THREE.Object3D();
    this.turnGroup.position.set(0, 0, 0);
    this.scene.add(this.turnGroup);

    let widthSegments = 28;
    let heightSegments = 14;

    let geometry = new THREE.SphereGeometry(
      this.sphereRadius, //球体半径
      widthSegments, // 球体横截面上的面个数，最小3，默认8
      heightSegments, // 球体纵截面上的上半部份面个数，最小2，默认6
    );

    let material = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 3,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,/*该属性决定了这个对象是否影响WebGL的深度缓存，将其设置为false，则各个粒子系统之间互不干涉*/
      map: this.createTexture()
    });
    material.alphaTest = 0.9;

    let points = new THREE.Points(geometry, material);
    points.sortParticles = true;
    this.turnGroup.add(points);

    // 球的表面
    let geometry2 = new THREE.SphereGeometry(
      this.sphereRadius, //球体半径
      widthSegments, // 球体横截面上的面个数，最小3，默认8
      heightSegments, // 球体纵截面上的上半部份面个数，最小2，默认6
    );
    let material2 = new THREE.MeshLambertMaterial({ color: '#004C3F' });//材质
    material2.transparent = true;
    material2.opacity = 0.4;
    let meshSphere2 = new THREE.Mesh(geometry2, material2);
    this.turnGroup.add(meshSphere2);

    // 球的粒子连线
    let geometry3 = new THREE.SphereGeometry(
      this.sphereRadius, //球体半径
      widthSegments, // 球体横截面上的面个数，最小3，默认8
      heightSegments, // 球体纵截面上的上半部份面个数，最小2，默认6
    );
    let material3 = new THREE.MeshLambertMaterial({ color: '#004C3F' });//材质
    material3.wireframe = true;
    material3.transparent = true;
    material3.opacity = 0.3;
    let meshSphere3 = new THREE.Mesh(geometry3, material3);
    this.turnGroup.add(meshSphere3);
  }

  animate() {
    let run = () => {
      this.turnGroup.rotation.y += 0.006;
      this.MeshPoint1.position.y = 10 * Math.cos(this.turnGroup.rotation.y);
      this.MeshPoint2.position.y = -10 * Math.sin(this.turnGroup.rotation.y);
      this.MeshPoint3.position.y = 10 * Math.sin(this.turnGroup.rotation.y);
      this.MeshPoint4.position.y = -20 * Math.cos(this.turnGroup.rotation.y);

      this.MeshPoint5.position.y = 10 * Math.cos(this.turnGroup.rotation.y);
      this.MeshPoint6.position.y = -15 * Math.sin(this.turnGroup.rotation.y);
      this.MeshPoint7.position.y = 10 * Math.cos(this.turnGroup.rotation.y);
      this.MeshPoint8.position.y = -20 * Math.sin(this.turnGroup.rotation.y);

      this.MeshPoint9.position.y = 10 * Math.sin(this.turnGroup.rotation.y);
      this.MeshPoint10.position.y = -10 * Math.cos(this.turnGroup.rotation.y);
      this.MeshPoint11.position.y = 10 * Math.sin(this.turnGroup.rotation.y);
      this.MeshPoint12.position.y = -10 * Math.cos(this.turnGroup.rotation.y);
      this.MeshPoint13.position.y = -10 * Math.sin(this.turnGroup.rotation.y);

      this.addLines(); // 球外转动的点连线
      this.addLuminousPoints(); // 球上的点
      this.addLuminousLines(); // 球上点与外面的点连线

      this.render();
      requestAnimationFrame(run);
    }
    run();
  }

  addMovingPoints() {
    this.MeshPoint1 = this.addMovingPoint(29, -10, 10, '#158f82');
    this.MeshPoint2 = this.addMovingPoint(20, 15, 0, '#158f82');
    this.MeshPoint3 = this.addMovingPoint(25, 10, 0, '#158f82');
    this.MeshPoint4 = this.addMovingPoint(23, 15, 10, '#158f82');

    this.MeshPoint5 = this.addMovingPoint(-29, -5, 10, '#158f82');
    this.MeshPoint6 = this.addMovingPoint(-30, -10, 0, '#158f82');
    this.MeshPoint7 = this.addMovingPoint(-30, 10, 0, '#158f82');
    this.MeshPoint8 = this.addMovingPoint(-20, 10, -10, '#158f82');

    this.MeshPoint9 = this.addMovingPoint(-10, 20, -20, '#158f82');
    this.MeshPoint10 = this.addMovingPoint(10, 20, -20, '#158f82');
    this.MeshPoint11 = this.addMovingPoint(10, -20, -20, '#158f82');
    this.MeshPoint12 = this.addMovingPoint(-10, -20, -20, '#158f82');

    this.MeshPoint13 = this.addMovingPoint(18, 15, 20, '#158f82');
  }

  addMovingPoint(x, y, z, color) { // 添加球外转动的点
    let geometry = new THREE.SphereGeometry(
      0.7, //球体半径
      30, // 球体横截面上的面个数，最小3，默认8
      30, // 球体纵截面上的上半部份面个数，最小2，默认6
    );
    let material = new THREE.MeshBasicMaterial({ color: color });//材质
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    this.turnGroup.add(mesh);
    return mesh;
  }

  addLines() {
    this.line1to2 = this.addLine(this.line1to2, this.MeshPoint1, this.MeshPoint2);
    this.line1to3 = this.addLine(this.line1to3, this.MeshPoint1, this.MeshPoint3);
    this.line1to4 = this.addLine(this.line1to4, this.MeshPoint1, this.MeshPoint4);
    this.line3to4 = this.addLine(this.line3to4, this.MeshPoint3, this.MeshPoint4);

    this.line2to13 = this.addLine(this.line2to13, this.MeshPoint2, this.MeshPoint13);
    this.line6to13 = this.addLine(this.line6to13, this.MeshPoint6, this.MeshPoint13);
    this.line8to9 = this.addLine(this.line8to9, this.MeshPoint8, this.MeshPoint9);
    this.line8to12 = this.addLine(this.line8to12, this.MeshPoint8, this.MeshPoint12);

    this.line3to10 = this.addLine(this.line3to10, this.MeshPoint3, this.MeshPoint10);
    this.line10to11 = this.addLine(this.line10to11, this.MeshPoint10, this.MeshPoint11);
    this.line10to12 = this.addLine(this.line10to12, this.MeshPoint10, this.MeshPoint12);
    this.line7to11 = this.addLine(this.line7to11, this.MeshPoint7, this.MeshPoint11);

    this.line9to10 = this.addLine(this.line9to10, this.MeshPoint9, this.MeshPoint10);
    this.line7to8 = this.addLine(this.line7to8, this.MeshPoint7, this.MeshPoint8);
    this.line5to6 = this.addLine(this.line5to6, this.MeshPoint5, this.MeshPoint6);
    this.line5to7 = this.addLine(this.line5to7, this.MeshPoint5, this.MeshPoint7);
  }

  addLine(line, point1, point2) {
    if (line) { //如果线已存在，则修改线的位置
      let p1 = line.geometry.vertices[0];
      let p2 = line.geometry.vertices[1];

      p1.x = point1.position.x;
      p1.y = point1.position.y;
      p1.z = point1.position.z;

      p2.x = point2.position.x;
      p2.y = point2.position.y;
      p2.z = point2.position.z;

      line.geometry.verticesNeedUpdate = true;
      return line;
    }
    else { //如果线不存在，创建
      let geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(point1.position.x, point1.position.y, point1.position.z),
        new THREE.Vector3(point2.position.x, point2.position.y, point2.position.z),
      );

      // 线的材质
      let material = new THREE.LineBasicMaterial({
        color: '#004C3F',
        linewidth: 1,
      });
      line = new THREE.Line(geometry, //顶点
        material, //材质
        THREE.LineStrip, //折线
      );
      this.turnGroup.add(line);
      return line;
    }
  }

  colorChange() {
    if (!this.luminousPointsColor) {
      this.luminousPointsColor = {
        r1: 0, g1: 75 / 255, b1: 65 / 255, //暗色
        r2: 10 / 255, g2: 255 / 255, b2: 245 / 255, //亮色
        add: 0, // 0
        value: 0,
      };
    }

    let cc = this.luminousPointsColor;

    if (!cc.r) {
      cc.r = cc.r1;
      cc.g = cc.g1;
      cc.b = cc.b1;
    }

    let step = 200;
    cc.rc = (cc.r2 - cc.r1) / step;
    cc.gc = (cc.g2 - cc.b1) / step;
    cc.bc = (cc.g2 - cc.b1) / step;

    if (cc.add == 0) {
      cc.add = 1;
      cc.value = 0;
    }

    if (cc.add == 1) {
      cc.r += cc.rc;
      cc.g += cc.gc;
      cc.b += cc.bc;
      cc.value++;

      if (cc.r + cc.rc > cc.r2) {
        cc.add = -1;
      }
    }

    if (cc.add == -1) {
      cc.r -= cc.rc;
      cc.g -= cc.gc;
      cc.b -= cc.bc;
      cc.value--;

      if (cc.r + cc.rc < cc.r1) {
        cc.add = 1;
      }
    }
  }

  addLuminousPoints() {
    this.colorChange();
    this.luminousPoint1 = this.addLuminousPoint(this.luminousPoint1, -this.sphereRadius, 0, 0, 90);
    this.luminousPoint2 = this.addLuminousPoint(this.luminousPoint2, this.sphereRadius, 0, 0, 90);
    this.luminousPoint3 = this.addLuminousPoint(this.luminousPoint3, 0, 0, this.sphereRadius, 0);
    this.luminousPoint4 = this.addLuminousPoint(this.luminousPoint4, 0, 0, -this.sphereRadius, 0);
  }

  addLuminousPoint(point, x, y, z, deg) { // 在球上创建发光点
    if (point) {
      point.material.color.r = this.luminousPointsColor.r;
      point.material.color.g = this.luminousPointsColor.g;
      point.material.color.b = this.luminousPointsColor.b;
      return point;
    }
    else {
      // let geometry = new THREE.SphereGeometry(
      //   0.7, //球体半径
      //   30, // 球体横截面上的面个数，最小3，默认8
      //   30, // 球体纵截面上的上半部份面个数，最小2，默认6
      // );
      // //MeshLambertMaterial
      // //MeshBasicMaterial
      // let material = new THREE.MeshBasicMaterial({ color: '#000000' });//材质
      // let mesh = new THREE.Mesh(geometry, material);
      // mesh.position.set(x, y, z);
      // this.turnGroup.add(mesh);
      // return mesh;

      let geometry = new THREE.CircleGeometry(
        0.7,    // radius
        30,   // segments(分段)
      );
      let material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.rotation.y = this.toRadian(deg);
      this.turnGroup.add(mesh);
      return mesh;
    }
  }

  addLuminousLines() {
    this.luminousLine1 = this.addLine(this.luminousLine1, this.MeshPoint7, this.luminousPoint1);
    this.luminousLine2 = this.addLine(this.luminousLine2, this.MeshPoint2, this.luminousPoint2);
    this.luminousLine3 = this.addLine(this.luminousLine3, this.MeshPoint13, this.luminousPoint3);
    this.luminousLine4 = this.addLine(this.luminousLine4, this.MeshPoint10, this.luminousPoint4);

    this.setColor(this.luminousLine1.material.color, this.luminousPointsColor);
    this.setColor(this.luminousLine2.material.color, this.luminousPointsColor);
    this.setColor(this.luminousLine3.material.color, this.luminousPointsColor);
    this.setColor(this.luminousLine4.material.color, this.luminousPointsColor);

    if (this.luminousPointsColor.add > 0) {
      this.luminousLine1.visible = true;
      this.luminousLine2.visible = true;
      this.luminousLine3.visible = true;
      this.luminousLine4.visible = true;
    }
    else {
      if (this.luminousPointsColor.value < 30) {
        this.luminousLine1.visible = false;
        this.luminousLine2.visible = false;
        this.luminousLine3.visible = false;
        this.luminousLine4.visible = false;
      }
    }
  }

  setColor(targetColor, color) {
    targetColor.r = color.r;
    targetColor.g = color.g;
    targetColor.b = color.b;
  }

  

  zoom(value) {
    this.turnGroup.position.z = value;
    this.turnGroup.position.y = -value / 3;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.resizeDebounced();
  }

}
