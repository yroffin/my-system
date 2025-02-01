import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { SysGraph } from '../../models/graph';
import { GraphService } from '../../services/graph.service';
import { retrievedGraph } from '../../stats/graph.actions';
import { selectGraph } from '../../stats/graph.selectors';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { FontLoader } from './FontLoader';
import { TextGeometry } from './TextGeometry'

@Component({
  selector: 'app-threejs',
  templateUrl: './threejs.component.html',
  styleUrls: ['./threejs.component.css']
})
export class ThreejsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('canvas')
  private canvasRef?: ElementRef;

  // Cube Properties

  @Input() public rotationSpeedX: number = 0.05;

  @Input() public rotationSpeedY: number = 0.01;

  @Input() public size: number = 200;

  @Input() public frustumSize = 600;

  @Input() public texture: string = "/assets/texture.jpg";


  //* Stage Properties

  @Input() public cameraZ: number = 1;

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 150;

  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;

  private scene: THREE.Scene = new THREE.Scene();
  private group = new THREE.Group();

  id?: string
  graph$;
  subscriptions: any = [];

  constructor(
    private graphsService: GraphService,
    private logger: NGXLogger,
    private store: Store,
    private route: ActivatedRoute
  ) {
    this.graph$ = this.store.select(selectGraph);
    this.subscriptions.push(this.graph$.subscribe(graph => {
      if (!graph) {
        return
      }
      this.group.clear()
      this.loadGraph(graph, this.scene)
    }));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.id = params['label'];

      this.clearScene()
      this.startRenderingLoop();

      let _graph = this.graphsService.findOne(this.id + "")
      if (_graph) {
        this.store.dispatch(retrievedGraph({ graph: _graph }))
      }
    });
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      _.each(this.subscriptions, (subscription) => {
        subscription.unsubscribe();
      })
    }
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private clearScene() {
    // Add a global group
    this.scene.add(this.group)

    // camera
    this.camera = new THREE.PerspectiveCamera(45, this.getAspectRatio(), 1, 1000);
    this.camera.position.set(0, 15, 35);

    // Object
    let material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 150,
      specular: 0x222222
    });

    let geometry = new THREE.BoxGeometry(1000, 0.15, 1000);
    material = new THREE.MeshPhongMaterial({
      color: 0xa0adaf,
      shininess: 150,
      specular: 0x111111
    });

    const ground = new THREE.Mesh(geometry, material);
    ground.scale.multiplyScalar(3);
    ground.castShadow = false;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Lights

    this.scene.add(new THREE.AmbientLight(0x404040));

    let spotLight = new THREE.SpotLight(0x404040);
    spotLight.name = 'Spot Light';
    spotLight.angle = Math.PI / 5;
    spotLight.penumbra = 0.3;
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 8;
    spotLight.shadow.camera.far = 30;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    this.scene.add(spotLight);

    this.scene.add(spotLight.shadow.camera);

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.name = 'Dir. Light';
    dirLight.position.set(0, 10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 10;
    dirLight.shadow.camera.right = 15;
    dirLight.shadow.camera.left = - 15;
    dirLight.shadow.camera.top = 15;
    dirLight.shadow.camera.bottom = - 15;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    this.scene.add(dirLight);

    this.scene.add(dirLight.shadow.camera);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private loadGraph(graph: SysGraph, scene: THREE.Scene) {
    // Compute some index
    let index: any = {
    }
    if (graph) {
      this.logger.info("Load", graph)
      let rotateAxis = new THREE.Vector3(1, 0, 0)
      _.each(graph.nodes, (node) => {
        let geometry = new THREE.BoxGeometry(1, 0.1, 1);
        let material = new THREE.MeshPhongMaterial({
          color: 0xff0000,
          shininess: 150,
          specular: 0x222222
        });
        let cube = new THREE.Mesh(geometry, material);
        cube.name = node.id
        // Compute some index
        index[node.id] = {
          x: node.x,
          y: node.y
        }
        cube.position.set(node.x / 50, 2, node.y / 50);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
        this.group.add(cube)

        const loader = new FontLoader();

        loader.load('assets/fonts/helvetiker_regular.typeface.json', (font: any) => {
          const text = new TextGeometry(node.label, {
            font: font,
            size: 0.3,
            height: 0.1,
            curveSegments: 5,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
          });

          text.computeBoundingBox();
          let boundingBox = text.boundingBox ? text.boundingBox : new THREE.Box3()
          const centerOffset = - 0.5 * (boundingBox.max.x - boundingBox.min.x);
          let textMesh = new THREE.Mesh(text, material);
          textMesh.position.set(node.x / 50, 2, node.y / 50);
          textMesh.rotateOnAxis(rotateAxis, -Math.PI / 2)
          scene.add(textMesh);
          this.group.add(textMesh)
        });
      })

      _.each(graph.edges, (edge) => {
        let source = index[edge.source]
        let target = index[edge.target]

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

        const points = [];
        points.push(new THREE.Vector3(source.x / 50, 2, source.y / 50));
        points.push(new THREE.Vector3(target.x / 50, 2, target.y / 50));

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        this.group.add(line)
      });

      // Center on loaded group
      let bb = new THREE.Box3().setFromObject(this.group);
      let size = bb.getSize(new THREE.Vector3());
      this.group.translateX(-size.x / 2)
      this.group.translateZ(-size.z / 2)

      this.logger.info("Loaded", this.group.children.length, size)
    }
  }

  /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.BasicShadowMap;

    let component: ThreejsComponent = this;
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.autoRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.minDistance = 20;
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;
    controls.enableKeys = true;
    controls.update();

    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    }());
  }
}
