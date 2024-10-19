import {Component, ElementRef, OnInit} from '@angular/core';
import {RoadmapModel} from "../data/models/roadmap.model";
import * as go from 'gojs';
import {RoadmapService} from "../data/services/roadmap.service";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.page.html',
  styleUrls: ['./roadmap.page.scss'],
})
export class RoadmapPage implements OnInit {
  simpleRoadmaps: { id: number, name: string, imageUrl: string }[] = []
  private diagram: go.Diagram;
  roadMapSelected: RoadmapModel

  constructor(
    private roadmapService: RoadmapService,
    private el: ElementRef,
  ) { }

  ngOnInit() {
    this.loadSimpleRoadmaps()
  }

  loadSimpleRoadmaps(){
    this.roadmapService.listRoadmapOptions().subscribe((roadmaps) => {
      this.simpleRoadmaps = roadmaps.reverse();
      this.selectRoadMap(roadmaps[0].id)
    })
  }

  selectRoadMap(id: number){
    this.roadmapService.findRoadmap(id).subscribe((roadmap) => {
      this.roadMapSelected = roadmap
      this.initDiagram(roadmap.nodeDataArray, roadmap.linkDataArray)
    })
  }

  private initDiagram(nodeDataArray: any[], linkDataArray: any[]) {
    const $ = go.GraphObject.make;

    if (this.diagram) {
      this.diagram.div = null;
    }

    this.diagram = $(go.Diagram, this.el.nativeElement.querySelector('#diagramDiv'), {
      initialContentAlignment: go.Spot.Center,
      'undoManager.isEnabled': true,
      layout: $(go.TreeLayout, {
        angle: 90,
        layerSpacing: 35
      })
    });

    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'RoundedRectangle', new go.Binding('fill', 'color')),
        $(go.TextBlock, { margin: 5 }, new go.Binding('text'))
      );

    const model = $(go.GraphLinksModel);
    model.nodeDataArray = nodeDataArray;
    model.linkDataArray = linkDataArray;

    this.diagram.model = model;
  }

}
