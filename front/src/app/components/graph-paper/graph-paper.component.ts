import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NGXLogger } from 'ngx-logger';
import { MessageService } from 'primeng/api';
import { Base16Service } from 'src/app/services/base16.service';
import { GraphService } from 'src/app/services/graph.service';
import { selectGraph } from 'src/app/stats/graph.selectors';

import * as paper from 'paper';
import * as _ from 'lodash';

import { Color, Matrix, Path, Point, Rectangle } from 'paper/dist/paper-core';
import { retrievedGraph } from 'src/app/stats/graph.actions';
import { selectParameter } from 'src/app/stats/menu.selectors';

@Component({
  selector: 'app-graph-paper',
  templateUrl: './graph-paper.component.html',
  styleUrls: ['./graph-paper.component.css']
})
export class GraphPaperComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef?: ElementRef;

  private scope: paper.PaperScope;
  private project!: paper.Project;

  oldZoom = 1;
  zoom = 1;

  subscriptions: any = [];
  graph$ = this.store.select(selectGraph);
  parameter$ = this.store.select(selectParameter);

  id: any;

  constructor(
    private graphsService: GraphService,
    private router: Router,
    private logger: NGXLogger,
    private messageService: MessageService,
    private base16: Base16Service,
    private store: Store, private route: ActivatedRoute
  ) {
    // For using paper libs
    this.scope = new paper.PaperScope();

    this.subscriptions.push(this.parameter$.subscribe(message => {
      {
        if (message.zoom) {
          console.log(message.zoom)
          this.setZoom(message.zoom)
          //this.scope.view.scaling = this.scope.view.scaling.add(new Point(1 / message.zoom, 1 / message.zoom));
        }
      }
    })
    )

    this.subscriptions.push(this.graph$.subscribe(graph => {
      if (!graph || !this.project) {
        return
      }

      // clear all drawing items on active layer
      this.project.activeLayer.removeChildren();

      let indexedNodes: any = {}

      let nodes = _.map(graph.nodes, (node) => {
        let _node: any = {
          data: {
            id: node.id,
            label: node.label,
            tag: node.tag
          },
          position: {
            x: node.x,
            y: node.y
          }
        }
        indexedNodes[node.id] = _node
        return _node
      })

      let dict: any = {}
      let edges = _.map(graph.edges, (edge) => {
        let _edge = {
          data: {
            id: this.base16.encode(this.graphsService.buildId(dict, {
              source: this.base16.decode(edge.source),
              target: this.base16.decode(edge.target)
            })),
            label: edge.label,
            source: edge.source,
            target: edge.target,
            _source: base16.decode(edge.source || ""),
            _target: base16.decode(edge.target || ""),
            tag: edge.tag
          }
        }
        return _edge
      })

      this.drawAxis()
      this.drawGrid(100, 100, 2, 1)

      _.each(nodes, (node) => {
        let myCircle = new this.scope.Path.Circle(
          {
            center: [node.position.x / 2, node.position.y / 2],
            radius: 10,
            fillColor: 'red',
            strokeColor: 'black'
          }
        )
        let myText = new this.scope.PointText(
          {
            content: `${node.position.x} x ${node.position.y}`,
            point: new Point(node.position.x / 2 + 15, node.position.y / 2 - 15),
            strokeWidth: 0.01,
            fillColor: 'red',
            strokeColor: 'black'
          }
        )
      })

      _.each(edges, (edge) => {
        let source = indexedNodes[edge.data.source]
        let target = indexedNodes[edge.data.target]
        let myLine = new this.scope.Path.Line(
          new Point(source.position.x / 2, source.position.y / 2),
          new Point(target.position.x / 2, target.position.y / 2))
        myLine.strokeColor = new Color('black');
      })

      // fit to view
      this.scope.project.activeLayer.fitBounds(this.scope.view.bounds);
    }))

    let tool = new paper.Tool();
    let topLeftPoint: any = undefined;

    tool.onMouseDown = (event: any) => {
      if (event.event.shiftKey === true) {
        topLeftPoint = event.point
      }
    }

    tool.onMouseUp = (event: any) => {
      console.log(event)
      if (topLeftPoint) {
        // fit to view
        let rectangle = new paper.Rectangle(
          [
            topLeftPoint.x, topLeftPoint.y
          ],
          [
            500, 500
          ]
        )
        console.log(rectangle)
        this.scope.project.activeLayer.fitBounds(rectangle);
      }
      topLeftPoint = undefined
    }

    tool.onMouseDrag = (event: any) => {
      if (event.event.shiftKey === false) {
        let pan_offset = event.point.subtract(event.downPoint);
        this.scope.view.center = this.scope.view.center.subtract(pan_offset);
      }
    };
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {

      const height = this.canvasRef?.nativeElement.offsetHeight;
      const width = this.canvasRef?.nativeElement.offsetWidth;

      this.project = new paper.Project(this.canvasRef?.nativeElement);
      this.project.activate();
      this.scope.setup(this.canvasRef?.nativeElement);

      this.project.view.scale(this.zoom, this.zoom);

      this.id = params['label'];

      let _graph = this.graphsService.findOne(this.id + "")
      if (_graph) {
        this.store.dispatch(retrievedGraph({ graph: _graph }))
      }
    })
  }

  zoomTo(rect: paper.Rectangle) {
    const view = this.project.view;
    view.center = rect.center;
    view.zoom = Math.min(
      view.viewSize.height / rect.height,
      view.viewSize.width / rect.width);
  }

  private setZoom(zoom: number) {
    this.scope.view.scale(1 / this.oldZoom, 1 / this.oldZoom);
    this.scope.view.scale(zoom * 2, zoom * 2);
    this.oldZoom = zoom;
    this.zoom = zoom;
    const height = this.canvasRef?.nativeElement.offsetHeight;
    const width = this.canvasRef?.nativeElement.offsetWidth;
    this.scope.view.center = new paper.Point(width / 2, height / 2);
  }

  private drawAxis() {
    let abscisse = new this.scope.Path();
    abscisse.closed = true;
    abscisse.add([0, 0], [100, 0], [100, -5], [120, 0], [100, 5], [100, 0]);
    (<any>abscisse).strokeColor = 'red';
    let ordonee = new this.scope.Path();
    ordonee.closed = true;
    ordonee.add([0, 0], [0, 100], [-5, 100], [0, 120], [5, 100], [0, 100]);
    (<any>ordonee).strokeColor = 'blue';
  }

  private drawGrid(width: number, height: number, heavy: number, light: number) {
    const canvas = new paper.Path.Rectangle(
      new paper.Point(0, 0),
      new paper.Point(width, height)
    );

    const ordonnee = new paper.Path.Line({
      from: new paper.Point(0, -height),
      to: new paper.Point(0, height),
      strokeColor: 'red',
      strokeWidth: 1
    });

    const abscisse = new paper.Path.Line({
      from: new paper.Point(-width, 0),
      to: new paper.Point(width, 0),
      strokeColor: 'blue',
      strokeWidth: 1
    });

    for (let x = -width; x < width; x += light) {
      const line = new paper.Path.Line({
        from: new paper.Point(x, 0),
        to: new paper.Point(x, height),
        strokeColor: 'lightblue',
        strokeWidth: (x % heavy === 0) ? 0.2 : 0.1
      });
    }

    for (let y = -height; y < height; y += light) {
      const line = new paper.Path.Line({
        from: new paper.Point(0, y),
        to: new paper.Point(height, y),
        strokeColor: 'lightblue',
        strokeWidth: (y % heavy === 0) ? 0.2 : 0.1
      });
    }
  }

}
