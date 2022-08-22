import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

import { EdgeDefinition, LayoutOptions, NodeDefinition, Stylesheet } from 'cytoscape';
import { CoseLayoutOptionsImpl, CytoscapeGraphComponent } from 'cytoscape-angular'
// @ts-ignore
import dagre from 'cytoscape-dagre'
import { combineLatest, of, Observable, Subscription } from 'rxjs';
import { StylesheetImpl } from './StylesheetImpl';

declare var cytoscape: any

@Component({
  selector: 'app-cytoscape',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css']
})
export class CytoscapeComponent implements OnInit {

  @ViewChild('biggraph')
  bigGraph: CytoscapeGraphComponent | null = null

  bigGraphLayoutOptions: LayoutOptions = new CoseLayoutOptionsImpl()
  bigGraphNodes: NodeDefinition[] = []
  bigGraphEdges: EdgeDefinition[] = []
  bigGraphStylesheet: Stylesheet[] = [new StylesheetImpl()]

  subscription: Subscription | undefined

  constructor() {
    this.bigGraph = null
  }

  ngOnInit(): void {
    // @ts-ignore
    //cytoscape.use(dagre)
    const bigChart = 'Signaling-by-Activin TO Signaling-by-TGF-beta-Receptor-Complex k=3'
    const data = this.getData(bigChart)
    const stylesheet = this.getStylesheet(bigChart)
    this.stampNodeAndElementGroupsAndDeleteFields(data, ['curve-style'])
    this.bigGraphStylesheet = stylesheet.style
    this.bigGraphNodes = data.elements.nodes
    this.bigGraphEdges = data.elements.edges
  }
  getStylesheet(bigChart: string): any {
    return {
      "format_version": "1.0",
      "generated_by": "graphspace-2.0.0",
      "target_cytoscapejs_version": "~2.7",
      "style": [
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5']",
          "style": {
            "label": "PEX5_HUMAN",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7084']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763']",
          "style": {
            "label": "IL37(?-218)\np-S423,S425-SMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde']",
          "style": {
            "label": "SMAD7",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1']",
          "style": {
            "label": "WWTR1\np-2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c']",
          "style": {
            "label": "SMURF1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03']",
          "style": {
            "label": "Activin A,AB,B\nFSTL3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da']",
          "style": {
            "label": "Activin Response Element",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886']",
          "style": {
            "label": "p-2S-SMAD1/5/8\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55']",
          "style": {
            "label": "p-T-2S-SMAD2/3\nSMAD4\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209']",
          "style": {
            "label": "SMAD2,3\nSMAD4\nFOXH1\nActivin Response Element",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5945']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR\nRNF111/SMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1194']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7645']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3867']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386']",
          "style": {
            "label": "STAG1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0']",
          "style": {
            "label": "FOXH1\nDRAP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nPARP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a']",
          "style": {
            "label": "Ub-SMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611']",
          "style": {
            "label": "MTS2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172']",
          "style": {
            "label": "USP9X\nUb-SNCA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063']",
          "style": {
            "label": "Ub-p-T-2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4274']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e6718']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463']",
          "style": {
            "label": "SMAD7\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1393']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff']",
          "style": {
            "label": "TGFB1\nTGFBR2\np-TGFBR1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5548']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc']",
          "style": {
            "label": "Synaptonemal Complex",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc']",
          "style": {
            "label": "p-T,2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5713']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4474']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935']",
          "style": {
            "label": "NODAL\np-NODAL Receptor",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7404']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7096']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf']",
          "style": {
            "label": "Activin\nACVR2A,B\np-ACVR1B,C",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c']",
          "style": {
            "label": "Ub-SMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af']",
          "style": {
            "label": "USPX9\nSNCA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6']",
          "style": {
            "label": "CDKN2B gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a']",
          "style": {
            "label": "SUMO1\nC93-UBE2I",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb']",
          "style": {
            "label": "TGIF",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72']",
          "style": {
            "label": "MTMR4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418']",
          "style": {
            "label": "PAR-SMAD2/3\nPAR-SMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba']",
          "style": {
            "label": "PTPNs2,4,5,6,7,9,11,12,13,14,18,20,23",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103']",
          "style": {
            "label": "SUMO E1 enzyme",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507']",
          "style": {
            "label": "SMAD2/3\nPMEPA1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4221']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1']",
          "style": {
            "label": "p-2S-SMAD2/3\nMTMR4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5']",
          "style": {
            "label": "SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5702']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131']",
          "style": {
            "label": "RNF111",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2882']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4457']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976']",
          "style": {
            "label": "26S proteasome",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7']",
          "style": {
            "label": "SERPINE1 Gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2886']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7299']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e85']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3178']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd']",
          "style": {
            "label": "SMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1386']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b']",
          "style": {
            "label": "SMAD7\nSMURF1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f']",
          "style": {
            "label": "MYC gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3']",
          "style": {
            "label": "Ub-SMAD4\nUSP9X",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119']",
          "style": {
            "label": "SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1807']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6']",
          "style": {
            "label": "Ub\nPEX5S",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106']",
          "style": {
            "label": "PAI",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nPPM1A",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41']",
          "style": {
            "label": "p-2S-SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6']",
          "style": {
            "label": "SYCE3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21']",
          "style": {
            "label": "STUB1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e6944']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667']",
          "style": {
            "label": "SYCE2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4']",
          "style": {
            "label": "Activin A,AB,B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9']",
          "style": {
            "label": "p-2S-SMAD1/5/8\nSMAD4\nSKI",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147']",
          "style": {
            "label": "CT31",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nTGIF\nHDAC1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571']",
          "style": {
            "label": "UBA2\nSAE1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25']",
          "style": {
            "label": "Ub-SMAD7",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d']",
          "style": {
            "label": "PEX5_HUMAN",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4218']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99']",
          "style": {
            "label": "TEX12",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4456']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec']",
          "style": {
            "label": "SMAD7\nNEDD4L",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7310']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c']",
          "style": {
            "label": "STAG1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3999']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a']",
          "style": {
            "label": "Ub-SMAD2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b']",
          "style": {
            "label": "PolyUb-RUNX2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95']",
          "style": {
            "label": "FOXH1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56']",
          "style": {
            "label": "SMAD7 gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd']",
          "style": {
            "label": "FAM",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0']",
          "style": {
            "label": "UBC9_HUMAN",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3215']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f']",
          "style": {
            "label": "SMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b']",
          "style": {
            "label": "UBE2I\nSUMO2,UBE2I\nSUMO3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8']",
          "style": {
            "label": "TFAP2C homodimer",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1']",
          "style": {
            "label": "MAPKAPK5 gene\nMYC",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd']",
          "style": {
            "label": "HDAC1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e6950']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137']",
          "style": {
            "label": "RBL1\nE2F4/5\nDP1/2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537']",
          "style": {
            "label": "SMAD7\nRNF111",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1802']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb']",
          "style": {
            "label": "IL37(?-218)\np-S423,S425-SMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7225']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3865']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7227']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7226']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a']",
          "style": {
            "label": "JUNB gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc']",
          "style": {
            "label": "TAZ",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875']",
          "style": {
            "label": "RNF111/SMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3858']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c']",
          "style": {
            "label": "SP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961']",
          "style": {
            "label": "MEN1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e8046']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3498']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df']",
          "style": {
            "label": "ALK4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4875']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84']",
          "style": {
            "label": "ACVR1C",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3156']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5820']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf']",
          "style": {
            "label": "Ub-SNCA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f']",
          "style": {
            "label": "p-SMAD2/3\nSMAD4\nTRIM33",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6']",
          "style": {
            "label": "AXIN\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76']",
          "style": {
            "label": "p-2S-SMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82']",
          "style": {
            "label": "CDK8\nCCNC/ CDK9\nCCNT",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4943']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1']",
          "style": {
            "label": "TFAP2C homodimer\nMYC\nKDM5B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9']",
          "style": {
            "label": "SMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nMEN1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518']",
          "style": {
            "label": "HSPA2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249']",
          "style": {
            "label": "PARP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d']",
          "style": {
            "label": "Activin AB,B\nACVR2A,B\nACVR1C",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3862']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3']",
          "style": {
            "label": "SMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3863']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3070']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3861']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3860']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82']",
          "style": {
            "label": "Activin A,AB,B\nACVR2A,B\np-ACVR1B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3866']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5452']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3864']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2995']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e']",
          "style": {
            "label": "Activin A,AB,B\nACVR2A,B\nACVR1B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2']",
          "style": {
            "label": "p-2S-SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a']",
          "style": {
            "label": "Activin AB,B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4\nSP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f']",
          "style": {
            "label": "Ub-ERBB2\nERBB2IP\nUb-HSP90\nCDC37",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8']",
          "style": {
            "label": "NCOR1, NCOR2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7449']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a']",
          "style": {
            "label": "Ub\nPEX5L",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb']",
          "style": {
            "label": "Activin A,AB,B\nFST",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e']",
          "style": {
            "label": "MYC",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b']",
          "style": {
            "label": "SKI/SKIL",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3']",
          "style": {
            "label": "p-2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b']",
          "style": {
            "label": "TGFB1\np-TGFBR\nSARA\nSMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8']",
          "style": {
            "label": "SMAD2\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2220']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55']",
          "style": {
            "label": "Ub-SMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2518']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c']",
          "style": {
            "label": "SMAD2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51']",
          "style": {
            "label": "p-T-2S-SMAD2/3\nSMAD4\nNEDDL4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0']",
          "style": {
            "label": "MAPKAPK5 gene",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6']",
          "style": {
            "label": "FKBP6",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680']",
          "style": {
            "label": "TGFB1\np-TGFBR\nSARA\np-2S-SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e']",
          "style": {
            "label": "TRIM33",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d']",
          "style": {
            "label": "p-SMAD2/3\nSMAD4\nRBL1\nE2F4/5\nDP1/2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e2034']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e']",
          "style": {
            "label": "FoxO3a-binding Element",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76']",
          "style": {
            "label": "SARA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9']",
          "style": {
            "label": "Ub-SKI/Ub-SKIL",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6']",
          "style": {
            "label": "USP9X\nUb\nPEX5L",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b']",
          "style": {
            "label": "SMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd']",
          "style": {
            "label": "PTPN genes2,4,5,6,7,9,11,12,13,14,18,20,23",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146']",
          "style": {
            "label": "SNCA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a']",
          "style": {
            "label": "UBC9_HUMAN",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4']",
          "style": {
            "label": "SUMO2,3\nK203,K486-PARP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7124']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85']",
          "style": {
            "label": "SMAD7\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4365']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7']",
          "style": {
            "label": "FSTL3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309']",
          "style": {
            "label": "SKI",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3']",
          "style": {
            "label": "p-2S-SMAD2/3\nPMEPA1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0']",
          "style": {
            "label": "DIDO3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219']",
          "style": {
            "label": "p\n2S-SMAD1/5/8",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44']",
          "style": {
            "label": "PPM1A",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276']",
          "style": {
            "label": "Activin AB,B\nACVR2A,B\np-ACVR1C",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a']",
          "style": {
            "label": "PIAS4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7914']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690']",
          "style": {
            "label": "RUNX2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7582']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3859']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375']",
          "style": {
            "label": "ACVR2A,B",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7']",
          "style": {
            "label": "p-2S-SMAD1/5/8\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c']",
          "style": {
            "label": "SUMO E1 enzyme",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5636']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51']",
          "style": {
            "label": "FST",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#6464ff",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8']",
          "style": {
            "label": "SMAD2,3\nSMAD4\nFOXO3\nFoxO3a-binding Element",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3686']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30']",
          "style": {
            "label": "UBE2I",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e6102']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441']",
          "style": {
            "label": "Axial-Lateral Element of Synaptonemal Complex",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3']",
          "style": {
            "label": "NEDD4L",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3']",
          "style": {
            "label": "AXIN",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4491']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e1909']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b']",
          "style": {
            "label": "RWDD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948']",
          "style": {
            "label": "Ub-p-T-2S-SMAD2/3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5793']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e463']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e']",
          "style": {
            "label": "SMAD3\nSTUB1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a']",
          "style": {
            "label": "ERBB2\nERBB2IP\nHSP90\nCDC37",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e7450']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4955']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a']",
          "style": {
            "label": "SYCE1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27']",
          "style": {
            "label": "SYCP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4877']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4876']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb']",
          "style": {
            "label": "RUNX2\nSTUB1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd']",
          "style": {
            "label": "JUNB",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a']",
          "style": {
            "label": "ATP1B4\nSNW1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590']",
          "style": {
            "label": "USP9X\nUb\nPEX5S",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e3117']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e4776']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='e5435']",
          "style": {
            "label": "",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "10px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "10px",
            "text-valign": "center",
            "background-color": "white",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef']",
          "style": {
            "label": "TGFB1\np-TGFBR\nSARA",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7']",
          "style": {
            "label": "2SUMO1\nPARP1",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89']",
          "style": {
            "label": "FOXO3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61']",
          "style": {
            "label": "ub-AXIN\nSMURF2",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#21cb55",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05']",
          "style": {
            "label": "IL37(?-218)\nSMAD3",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7']",
          "style": {
            "label": "IL37(?-218)",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa']",
          "style": {
            "label": "SMAD7\nNEDD4L",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#00ff00",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90']",
          "style": {
            "label": "SUMO E1 enzyme",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "40px",
            "shape": "ellipse",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "40px",
            "text-valign": "center",
            "background-color": "#aab3c1",
            "text-opacity": "1"
          }
        },
        {
          "selector": "node[name='http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681']",
          "style": {
            "label": "WWTR1\np-2S-SMAD2/3\nSMAD4",
            "border-color": "#000000",
            "border-style": "solid",
            "border-width": "1px",
            "width": "80px",
            "shape": "star",
            "text-wrap": "wrap",
            "text-halign": "center",
            "height": "80px",
            "text-valign": "center",
            "background-color": "#4297aa",
            "text-opacity": "1"
          }
        },
        {
          "selector": "edge[name='e7084-http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763-http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7582']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e6944']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7404']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e5702']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7914']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1-http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c-e7914']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da-e3859']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886-e3498']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55-e2518']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5945-http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60-e1194']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e1194-http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1194-http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1194-http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1194-http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7645-http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3867-http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386-e7225']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0-e3859']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce-e4474']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172-http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4274-http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e6718-http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463-http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1393-http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff-e4274']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5548-http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e5548-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc-e4457']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc-e4456']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5713-http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4474-http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4474-http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935-e7227']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7404-http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7096-http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf-e7226']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c-e2995']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af-e2886']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6-e5820']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a-e463']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb-e3863']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72-e7124']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103-e2034']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4221-http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4221-http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4221-http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1-e3070']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e4274']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7225']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7227']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7226']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5702-http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131-e6944']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e2882-http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2882-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4457-http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976-e1807']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7-e5702']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e2886-http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2886-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7299-http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e85-http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e85-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3178-http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3178-http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd-e7096']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd-e7310']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e1386-http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f-e5713']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3-e4943']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119-http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1807-http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6-e3156']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec-e4365']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7124']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7449']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7450']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e7096']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e6718']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e4776']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e6944-http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1-http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1-e4218']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4875']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4877']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4876']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147-e1386']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce-e5702']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e2882']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e2034']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e1802']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06-e1909']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4218-http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4456-http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec-http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7310-http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c-e7450']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3999-http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3999-http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95-e3859']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56-e5793']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e1393']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e2995']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e7645']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e3156']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3215-http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f-e7404']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f-e4456']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b-e5452']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8-e1386']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd-e3863']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e6950-http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137-e3215']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537-e2220']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e1802-http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1802-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb-e5945']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7225-http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3865-http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7227-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e7226-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a-e6102']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc-e4218']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875-e1909']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3858-http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c-e3861']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961-e3864']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e8046-http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3498-http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df-e4876']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4875-http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84-e4955']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3156-http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e5820-http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf-e7645']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f-e4221']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6-http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76-e8046']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82-e3867']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4943-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4943-http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9-e7084']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9-e6950']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e463']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e3865']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e5452']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d-http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3862-http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3-e7299']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3-e7449']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3863-http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3070-http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3070-http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3861-http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3860-http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3866-http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e5452-http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e5452-http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3864-http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2995-http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e-http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a-e4955']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20-e5820']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8-e3862']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7449-http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a-e1393']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e-e1386']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e-e5636']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b-e3862']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3863']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3862']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3861']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3860']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3867']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3866']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3865']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3864']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e6102']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3858']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3859']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3215']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b-http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8-e3686']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e2220-http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2220-http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55-http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2518-http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2518-http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2518-http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c-e6950']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51-e3999']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0-e5636']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680-e4491']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e-e3860']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d-e5713']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e2034-http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e2034-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e-e3858']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76-e4274']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6-e5548']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd-e5945']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7124-http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4365-http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4365-http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4365-http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7-e4877']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309-e3498']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219-e7299']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44-e3866']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a-e463']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a-e5452']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7914-http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690-e6718']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7582-http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3859-http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375-e4955']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375-e4876']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7-http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c-e2882']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5636-http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51-e4875']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3686-http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3686-http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e2882']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e2034']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e1802']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e6102-http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3-e7582']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3-e4457']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3-e7084']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4491-http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4491-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e1909-http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b-e1802']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e5793-http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e463-http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e463-http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e-e3178']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a-e4776']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e7450-http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4955-http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27-e5435']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e4877-http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4876-http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb-e3117']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a-e5793']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590-e85']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='e3117-http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e3117-http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e4776-http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='e5435-http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc']",
          "style": {
            "curve-style": "bezier",
            "line-color": "#000000",
            "target-arrow-shape": "triangle",
            "target-arrow-fill": "filled",
            "width": "1px",
            "line-style": "solid",
            "target-arrow-color": "#000000"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89-e3858']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61-e1807']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7-e8046']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7-e7310']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90-e1802']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681-e5793']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        },
        {
          "selector": "edge[name='http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681-e5702']",
          "style": {
            "width": "3px",
            "curve-style": "bezier",
            "line-style": "solid",
            "line-color": "black",
            "target-arrow-shape": "none"
          }
        }
      ],
      "legend": {
        "nodes": {},
        "edges": {}
      }
    }
  }
  getData(bigChart: string): any {
    return {
      "format_version": "1.0",
      "generated_by": "graphspace-2.0.0",
      "target_cytoscapejs_version": "~2.7",
      "elements": {
        "nodes": [
          {
            "data": {
              "label": "PEX5_HUMAN",
              "popup": "PEX5_HUMAN<br>http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5",
              "id": "http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5"
            },
            "position": {
              "x": -233.98531249584838,
              "y": 662.8114628300272
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7084 http://identifiers.org/reactome/R-HSA-4641134",
              "name": "e7084",
              "id": "e7084"
            },
            "position": {
              "x": 3557.985629904208,
              "y": -1130.972701225601
            }
          },
          {
            "data": {
              "label": "IL37(?-218)\np-S423,S425-SMAD3",
              "popup": "IL37(?-218)\np-S423,S425-SMAD3<br>http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763",
              "id": "http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763"
            },
            "position": {
              "x": -320.2175463848115,
              "y": 2067.8001298985305
            }
          },
          {
            "data": {
              "label": "SMAD7",
              "popup": "SMAD7<br>http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "id": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde"
            },
            "position": {
              "x": 909.0849327994509,
              "y": -675.8905010657712
            }
          },
          {
            "data": {
              "label": "WWTR1\np-2S-SMAD2/3\nSMAD4",
              "popup": "WWTR1\np-2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1",
              "id": "http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1"
            },
            "position": {
              "x": 260.85792231003353,
              "y": -184.57403065274775
            }
          },
          {
            "data": {
              "label": "SMURF1",
              "popup": "SMURF1<br>http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c",
              "id": "http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c"
            },
            "position": {
              "x": 1806.3325667187994,
              "y": -942.9915788674106
            }
          },
          {
            "data": {
              "label": "Activin A,AB,B\nFSTL3",
              "popup": "Activin A,AB,B\nFSTL3<br>http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03",
              "id": "http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03"
            },
            "position": {
              "x": 586.2975178994171,
              "y": 1807.4571638416846
            }
          },
          {
            "data": {
              "label": "Activin Response Element",
              "popup": "Activin Response Element<br>http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da",
              "id": "http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da"
            },
            "position": {
              "x": 1164.9051315335234,
              "y": -672.3686922333314
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD1/5/8\nSMAD4",
              "popup": "p-2S-SMAD1/5/8\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886",
              "id": "http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886"
            },
            "position": {
              "x": -1079.7764356934406,
              "y": 604.5922773191775
            }
          },
          {
            "data": {
              "label": "p-T-2S-SMAD2/3\nSMAD4\nSMURF2",
              "popup": "p-T-2S-SMAD2/3\nSMAD4\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55",
              "id": "http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55"
            },
            "position": {
              "x": 960.5754954698141,
              "y": -5.0644932654835415
            }
          },
          {
            "data": {
              "label": "SMAD2,3\nSMAD4\nFOXH1\nActivin Response Element",
              "popup": "SMAD2,3\nSMAD4\nFOXH1\nActivin Response Element<br>http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209",
              "id": "http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209"
            },
            "position": {
              "x": 1120.8612721898023,
              "y": -455.60974156179503
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5945 http://identifiers.org/reactome/R-HSA-9008894",
              "name": "e5945",
              "id": "e5945"
            },
            "position": {
              "x": -22.37642771130051,
              "y": 2643.4145539863107
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR\nRNF111/SMURF2",
              "popup": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR\nRNF111/SMURF2<br>http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60",
              "id": "http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60"
            },
            "position": {
              "x": 452.6389527212778,
              "y": -470.32484350456735
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1194 http://identifiers.org/reactome/R-HSA-2186747",
              "name": "e1194",
              "id": "e1194"
            },
            "position": {
              "x": 634.0683633281152,
              "y": -598.9269802856028
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7645 http://identifiers.org/reactome/R-HSA-5661157",
              "name": "e7645",
              "id": "e7645"
            },
            "position": {
              "x": -200.9708620720917,
              "y": 1033.876889967151
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3867 http://identifiers.org/reactome/R-HSA-2176475",
              "name": "e3867",
              "id": "e3867"
            },
            "position": {
              "x": 378.46663873387683,
              "y": -827.408811844714
            }
          },
          {
            "data": {
              "label": "STAG1",
              "popup": "STAG1<br>http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386",
              "id": "http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386"
            },
            "position": {
              "x": 2011.0124616620951,
              "y": 188.15727258606435
            }
          },
          {
            "data": {
              "label": "FOXH1\nDRAP1",
              "popup": "FOXH1\nDRAP1<br>http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0",
              "id": "http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0"
            },
            "position": {
              "x": 938.8383033989794,
              "y": -837.3204190466425
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nPARP1",
              "popup": "p-2S-SMAD2/3\nSMAD4\nPARP1<br>http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce",
              "id": "http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce"
            },
            "position": {
              "x": 578.0683623281151,
              "y": -614.8440404432041
            }
          },
          {
            "data": {
              "label": "Ub-SMAD3",
              "popup": "Ub-SMAD3<br>http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a",
              "id": "http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a"
            },
            "position": {
              "x": -1175.5281531400701,
              "y": 2351.7047208989366
            }
          },
          {
            "data": {
              "label": "MTS2",
              "popup": "MTS2<br>http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611",
              "id": "http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611"
            },
            "position": {
              "x": -770.9070284374047,
              "y": -769.9374988720389
            }
          },
          {
            "data": {
              "label": "USP9X\nUb-SNCA",
              "popup": "USP9X\nUb-SNCA<br>http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172",
              "id": "http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172"
            },
            "position": {
              "x": -135.29076465979077,
              "y": 1192.0001122483525
            }
          },
          {
            "data": {
              "label": "Ub-p-T-2S-SMAD2/3\nSMAD4",
              "popup": "Ub-p-T-2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063",
              "id": "http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063"
            },
            "position": {
              "x": -302.2649690261139,
              "y": -1608.3372015733073
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4274 http://identifiers.org/reactome/R-HSA-170835",
              "name": "e4274",
              "id": "e4274"
            },
            "position": {
              "x": 1929.4716022884024,
              "y": 562.643389357618
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e6718 http://identifiers.org/reactome/R-HSA-9009309",
              "name": "e6718",
              "id": "e6718"
            },
            "position": {
              "x": -658.7309383997698,
              "y": 1872.7636023055538
            }
          },
          {
            "data": {
              "label": "SMAD7\nSMURF2",
              "popup": "SMAD7\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463",
              "id": "http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463"
            },
            "position": {
              "x": 1299.8591117567485,
              "y": -68.74511649493478
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1393 http://identifiers.org/reactome/R-HSA-9033509",
              "name": "e1393",
              "id": "e1393"
            },
            "position": {
              "x": -427.478821937286,
              "y": 796.1192871097469
            }
          },
          {
            "data": {
              "label": "TGFB1\nTGFBR2\np-TGFBR1",
              "popup": "TGFB1\nTGFBR2\np-TGFBR1<br>http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff",
              "id": "http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff"
            },
            "position": {
              "x": 2096.8330902745147,
              "y": 516.9980253539325
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5548 http://identifiers.org/reactome/R-HSA-9033491",
              "name": "e5548",
              "id": "e5548"
            },
            "position": {
              "x": -393.6529675397794,
              "y": 589.1691704912881
            }
          },
          {
            "data": {
              "label": "Synaptonemal Complex",
              "popup": "Synaptonemal Complex<br>http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc",
              "id": "http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc"
            },
            "position": {
              "x": 1222.8417306056824,
              "y": -1873.6406097910797
            }
          },
          {
            "data": {
              "label": "p-T,2S-SMAD2/3\nSMAD4",
              "popup": "p-T,2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc",
              "id": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc"
            },
            "position": {
              "x": 348.2557432885496,
              "y": -701.1509423151874
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5713 http://identifiers.org/reactome/R-HSA-1484099",
              "name": "e5713",
              "id": "e5713"
            },
            "position": {
              "x": 2324.021919363579,
              "y": -313.0926951969769
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4474 http://identifiers.org/reactome/R-HSA-2187325",
              "name": "e4474",
              "id": "e4474"
            },
            "position": {
              "x": 624.5920583325717,
              "y": -1062.6610234953475
            }
          },
          {
            "data": {
              "label": "NODAL\np-NODAL Receptor",
              "popup": "NODAL\np-NODAL Receptor<br>http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935",
              "id": "http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935"
            },
            "position": {
              "x": 1474.178563062749,
              "y": 550.248531588923
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7404 http://identifiers.org/reactome/R-HSA-178208",
              "name": "e7404",
              "id": "e7404"
            },
            "position": {
              "x": 1105.3096262637468,
              "y": -260.8073671425513
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7096 http://identifiers.org/reactome/R-HSA-2187375",
              "name": "e7096",
              "id": "e7096"
            },
            "position": {
              "x": -963.2052412341076,
              "y": 2010.0681389984754
            }
          },
          {
            "data": {
              "label": "Activin\nACVR2A,B\np-ACVR1B,C",
              "popup": "Activin\nACVR2A,B\np-ACVR1B,C<br>http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf",
              "id": "http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf"
            },
            "position": {
              "x": 1772.5162052074857,
              "y": -291.0682253882489
            }
          },
          {
            "data": {
              "label": "Ub-SMAD4",
              "popup": "Ub-SMAD4<br>http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c",
              "id": "http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c"
            },
            "position": {
              "x": -277.34654189817763,
              "y": 198.84243664241617
            }
          },
          {
            "data": {
              "label": "USPX9\nSNCA",
              "popup": "USPX9\nSNCA<br>http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af",
              "id": "http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af"
            },
            "position": {
              "x": -297.2827957212825,
              "y": 1158.7985045167732
            }
          },
          {
            "data": {
              "label": "CDKN2B gene",
              "popup": "CDKN2B gene<br>http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6",
              "id": "http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6"
            },
            "position": {
              "x": -732.4648144887657,
              "y": -936.034906398881
            }
          },
          {
            "data": {
              "label": "SUMO1\nC93-UBE2I",
              "popup": "SUMO1\nC93-UBE2I<br>http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a",
              "id": "http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a"
            },
            "position": {
              "x": 971.237321094893,
              "y": -584.8905000657712
            }
          },
          {
            "data": {
              "label": "TGIF",
              "popup": "TGIF<br>http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb",
              "id": "http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb"
            },
            "position": {
              "x": 895.0111009294143,
              "y": -259.62317563977825
            }
          },
          {
            "data": {
              "label": "MTMR4",
              "popup": "MTMR4<br>http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72",
              "id": "http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72"
            },
            "position": {
              "x": 1507.983915550736,
              "y": 797.4219319881464
            }
          },
          {
            "data": {
              "label": "PAR-SMAD2/3\nPAR-SMAD4",
              "popup": "PAR-SMAD2/3\nPAR-SMAD4<br>http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418",
              "id": "http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418"
            },
            "position": {
              "x": 523.7651097177976,
              "y": -1293.0003793052813
            }
          },
          {
            "data": {
              "label": "PTPNs2,4,5,6,7,9,11,12,13,14,18,20,23",
              "popup": "PTPNs2,4,5,6,7,9,11,12,13,14,18,20,23<br>http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba",
              "id": "http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba"
            },
            "position": {
              "x": -40.48983132375574,
              "y": 2851.2559409626806
            }
          },
          {
            "data": {
              "label": "SUMO E1 enzyme",
              "popup": "SUMO E1 enzyme<br>http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103",
              "id": "http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103"
            },
            "position": {
              "x": 857.9432640227589,
              "y": -2161.2823421931503
            }
          },
          {
            "data": {
              "label": "SMAD2/3\nPMEPA1",
              "popup": "SMAD2/3\nPMEPA1<br>http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507",
              "id": "http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507"
            },
            "position": {
              "x": 2025.3844021525765,
              "y": 337.08613157172084
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4221 http://identifiers.org/reactome/R-HSA-870449",
              "name": "e4221",
              "id": "e4221"
            },
            "position": {
              "x": -283.80496145635624,
              "y": -299.88179740680505
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nMTMR4",
              "popup": "p-2S-SMAD2/3\nMTMR4<br>http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1",
              "id": "http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1"
            },
            "position": {
              "x": 1598.9839165507362,
              "y": 821.0986633543981
            }
          },
          {
            "data": {
              "label": "SMAD2/3",
              "popup": "SMAD2/3<br>http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "id": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5"
            },
            "position": {
              "x": 1720.1194484069156,
              "y": 399.05794455790846
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5702 http://identifiers.org/reactome/R-HSA-2106586",
              "name": "e5702",
              "id": "e5702"
            },
            "position": {
              "x": 647.7661846009727,
              "y": -308.4449288866531
            }
          },
          {
            "data": {
              "label": "RNF111",
              "popup": "RNF111<br>http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131",
              "id": "http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131"
            },
            "position": {
              "x": 559.9073700732155,
              "y": 402.0246745957749
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2882 http://identifiers.org/reactome/R-HSA-2993790",
              "name": "e2882",
              "id": "e2882"
            },
            "position": {
              "x": 697.6732147593875,
              "y": -1846.6760989334268
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4457 http://identifiers.org/reactome/R-HSA-2176491",
              "name": "e4457",
              "id": "e4457"
            },
            "position": {
              "x": 101.47352900719142,
              "y": -1112.87858118473
            }
          },
          {
            "data": {
              "label": "26S proteasome",
              "popup": "26S proteasome<br>http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976",
              "id": "http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976"
            },
            "position": {
              "x": 3381.1356286084315,
              "y": -1540.002183507867
            }
          },
          {
            "data": {
              "label": "SERPINE1 Gene",
              "popup": "SERPINE1 Gene<br>http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7",
              "id": "http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7"
            },
            "position": {
              "x": 542.5873112469877,
              "y": -372.15149169566325
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2886 http://identifiers.org/reactome/R-HSA-5661161",
              "name": "e2886",
              "id": "e2886"
            },
            "position": {
              "x": -337.32808778215195,
              "y": 977.5751233966201
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7299 http://identifiers.org/reactome/R-HSA-201422",
              "name": "e7299",
              "id": "e7299"
            },
            "position": {
              "x": -465.52854745560575,
              "y": 356.44750721373384
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e85 http://identifiers.org/reactome/R-HSA-9033478",
              "name": "e85",
              "id": "e85"
            },
            "position": {
              "x": -128.5985248511369,
              "y": 775.4600631781199
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3178 http://identifiers.org/reactome/R-HSA-2187368",
              "name": "e3178",
              "id": "e3178"
            },
            "position": {
              "x": -1012.2830268992108,
              "y": 2224.617355712944
            }
          },
          {
            "data": {
              "label": "SMAD3",
              "popup": "SMAD3<br>http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd",
              "id": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd"
            },
            "position": {
              "x": -1049.435250665905,
              "y": 1850.2057748970274
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1386 http://identifiers.org/reactome/R-HSA-8865265",
              "name": "e1386",
              "id": "e1386"
            },
            "position": {
              "x": 2916.8054579621908,
              "y": -475.2337537076675
            }
          },
          {
            "data": {
              "label": "SMAD7\nSMURF1",
              "popup": "SMAD7\nSMURF1<br>http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b",
              "id": "http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b"
            },
            "position": {
              "x": 1812.647555534899,
              "y": -818.5966186519612
            }
          },
          {
            "data": {
              "label": "MYC gene",
              "popup": "MYC gene<br>http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f",
              "id": "http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f"
            },
            "position": {
              "x": 2470.4147611678277,
              "y": -442.32888164138313
            }
          },
          {
            "data": {
              "label": "Ub-SMAD4\nUSP9X",
              "popup": "Ub-SMAD4\nUSP9X<br>http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3",
              "id": "http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3"
            },
            "position": {
              "x": 26.656263892334355,
              "y": 554.6876986385886
            }
          },
          {
            "data": {
              "label": "SMAD2/3",
              "popup": "SMAD2/3<br>http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119",
              "id": "http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119"
            },
            "position": {
              "x": 1630.529442437526,
              "y": 141.0474078125749
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1807 http://identifiers.org/reactome/R-HSA-4641256",
              "name": "e1807",
              "id": "e1807"
            },
            "position": {
              "x": 3412.536394995876,
              "y": -1366.635594960732
            }
          },
          {
            "data": {
              "label": "Ub\nPEX5S",
              "popup": "Ub\nPEX5S<br>http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6",
              "id": "http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6"
            },
            "position": {
              "x": 131.54050230497512,
              "y": 1070.750120470429
            }
          },
          {
            "data": {
              "label": "PAI",
              "popup": "PAI<br>http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106",
              "id": "http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106"
            },
            "position": {
              "x": 629.1509191801587,
              "y": -82.36822656613782
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nPPM1A",
              "popup": "p-2S-SMAD2/3\nSMAD4\nPPM1A<br>http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec",
              "id": "http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec"
            },
            "position": {
              "x": 1303.2858511859902,
              "y": -251.42601003309687
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3",
              "popup": "p-2S-SMAD2/3<br>http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "id": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41"
            },
            "position": {
              "x": 1289.3460335129757,
              "y": 537.5951336387451
            }
          },
          {
            "data": {
              "label": "SYCE3",
              "popup": "SYCE3<br>http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6",
              "id": "http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6"
            },
            "position": {
              "x": 1259.0978597622334,
              "y": -2129.7652047878596
            }
          },
          {
            "data": {
              "label": "STUB1",
              "popup": "STUB1<br>http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "id": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21"
            },
            "position": {
              "x": -788.9945145900655,
              "y": 2090.0278750398957
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e6944 http://identifiers.org/reactome/R-HSA-2186771",
              "name": "e6944",
              "id": "e6944"
            },
            "position": {
              "x": 722.5793387551594,
              "y": 52.417412908728124
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4",
              "popup": "p-2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1",
              "id": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1"
            },
            "position": {
              "x": 514.4309736913506,
              "y": -195.30546670462536
            }
          },
          {
            "data": {
              "label": "SYCE2",
              "popup": "SYCE2<br>http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667",
              "id": "http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667"
            },
            "position": {
              "x": 1424.9922738224625,
              "y": -2168.3297571496564
            }
          },
          {
            "data": {
              "label": "Activin A,AB,B",
              "popup": "Activin A,AB,B<br>http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4",
              "id": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4"
            },
            "position": {
              "x": 534.5737130334959,
              "y": 1972.458210045081
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD1/5/8\nSMAD4\nSKI",
              "popup": "p-2S-SMAD1/5/8\nSMAD4\nSKI<br>http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9",
              "id": "http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9"
            },
            "position": {
              "x": -1324.4296248307576,
              "y": 931.6765062442728
            }
          },
          {
            "data": {
              "label": "CT31",
              "popup": "CT31<br>http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147",
              "id": "http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147"
            },
            "position": {
              "x": 3101.325284969999,
              "y": -454.63437491517203
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nTGIF\nHDAC1",
              "popup": "p-2S-SMAD2/3\nSMAD4\nTGIF\nHDAC1<br>http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce",
              "id": "http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce"
            },
            "position": {
              "x": 761.8561172605945,
              "y": -246.5049783485297
            }
          },
          {
            "data": {
              "label": "UBA2\nSAE1",
              "popup": "UBA2\nSAE1<br>http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "id": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571"
            },
            "position": {
              "x": 850.0893821915625,
              "y": -1761.3771018883847
            }
          },
          {
            "data": {
              "label": "Ub-SMAD7",
              "popup": "Ub-SMAD7<br>http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25",
              "id": "http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25"
            },
            "position": {
              "x": 477.29619247756614,
              "y": 999.3136834058623
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR",
              "popup": "p-2S-SMAD2/3\nSMAD4\nSKI/SKIL\nNCOR<br>http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06",
              "id": "http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06"
            },
            "position": {
              "x": 439.2557442885495,
              "y": -674.2865921912712
            }
          },
          {
            "data": {
              "label": "PEX5_HUMAN",
              "popup": "PEX5_HUMAN<br>http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d",
              "id": "http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d"
            },
            "position": {
              "x": -543.9202042744831,
              "y": 447.3796957408831
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4218 http://identifiers.org/reactome/R-HSA-2031355",
              "name": "e4218",
              "id": "e4218"
            },
            "position": {
              "x": 238.26374867469875,
              "y": -96.47094670590252
            }
          },
          {
            "data": {
              "label": "TEX12",
              "popup": "TEX12<br>http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99",
              "id": "http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99"
            },
            "position": {
              "x": 1363.6867786811006,
              "y": -1855.2231533756142
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4456 http://identifiers.org/reactome/R-HSA-2179274",
              "name": "e4456",
              "id": "e4456"
            },
            "position": {
              "x": 779.8046858897783,
              "y": -302.50497934852973
            }
          },
          {
            "data": {
              "label": "SMAD7\nNEDD4L",
              "popup": "SMAD7\nNEDD4L<br>http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec",
              "id": "http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec"
            },
            "position": {
              "x": 1340.0801900496228,
              "y": -1146.7534585989872
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7310 http://identifiers.org/reactome/R-HSA-9008692",
              "name": "e7310",
              "id": "e7310"
            },
            "position": {
              "x": -1068.0260920969743,
              "y": 1678.5894705233004
            }
          },
          {
            "data": {
              "label": "STAG1",
              "popup": "STAG1<br>http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c",
              "id": "http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c"
            },
            "position": {
              "x": 1092.7001093125712,
              "y": 1013.3984436182583
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3999 http://identifiers.org/reactome/R-HSA-2176502",
              "name": "e3999",
              "id": "e3999"
            },
            "position": {
              "x": -84.10469646913991,
              "y": -1467.7327725378755
            }
          },
          {
            "data": {
              "label": "Ub-SMAD2",
              "popup": "Ub-SMAD2<br>http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a",
              "id": "http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a"
            },
            "position": {
              "x": 3012.2927530279417,
              "y": -1266.7458120468004
            }
          },
          {
            "data": {
              "label": "PolyUb-RUNX2",
              "popup": "PolyUb-RUNX2<br>http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b",
              "id": "http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b"
            },
            "position": {
              "x": -322.7288293020035,
              "y": 1976.8001288985306
            }
          },
          {
            "data": {
              "label": "FOXH1",
              "popup": "FOXH1<br>http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95",
              "id": "http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95"
            },
            "position": {
              "x": 1099.5950115043358,
              "y": -763.3686932333313
            }
          },
          {
            "data": {
              "label": "SMAD7 gene",
              "popup": "SMAD7 gene<br>http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56",
              "id": "http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56"
            },
            "position": {
              "x": 466.4227768705294,
              "y": 84.1338619180164
            }
          },
          {
            "data": {
              "label": "FAM",
              "popup": "FAM<br>http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "id": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd"
            },
            "position": {
              "x": -236.42825149982627,
              "y": 772.7086637240495
            }
          },
          {
            "data": {
              "label": "UBC9_HUMAN",
              "popup": "UBC9_HUMAN<br>http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0",
              "id": "http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0"
            },
            "position": {
              "x": 497.23457496081454,
              "y": -1917.0295846438096
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3215 http://identifiers.org/reactome/R-HSA-2127257",
              "name": "e3215",
              "id": "e3215"
            },
            "position": {
              "x": 1337.4285476715145,
              "y": -507.4910700499247
            }
          },
          {
            "data": {
              "label": "SMURF2",
              "popup": "SMURF2<br>http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f",
              "id": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f"
            },
            "position": {
              "x": 1019.5368750889861,
              "y": -96.06449426548353
            }
          },
          {
            "data": {
              "label": "UBE2I\nSUMO2,UBE2I\nSUMO3",
              "popup": "UBE2I\nSUMO2,UBE2I\nSUMO3<br>http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b",
              "id": "http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b"
            },
            "position": {
              "x": 1015.445324341497,
              "y": -1530.032882000166
            }
          },
          {
            "data": {
              "label": "TFAP2C homodimer",
              "popup": "TFAP2C homodimer<br>http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8",
              "id": "http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8"
            },
            "position": {
              "x": 2901.8960399961575,
              "y": -648.1901991386593
            }
          },
          {
            "data": {
              "label": "MAPKAPK5 gene\nMYC",
              "popup": "MAPKAPK5 gene\nMYC<br>http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1",
              "id": "http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1"
            },
            "position": {
              "x": 2986.156155326269,
              "y": 1.9860880025754384
            }
          },
          {
            "data": {
              "label": "HDAC1",
              "popup": "HDAC1<br>http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd",
              "id": "http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd"
            },
            "position": {
              "x": 962.869371461682,
              "y": -391.62364770624845
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e6950 http://identifiers.org/reactome/R-HSA-2176445",
              "name": "e6950",
              "id": "e6950"
            },
            "position": {
              "x": 3303.5391817272043,
              "y": -998.2800558538974
            }
          },
          {
            "data": {
              "label": "RBL1\nE2F4/5\nDP1/2",
              "popup": "RBL1\nE2F4/5\nDP1/2<br>http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137",
              "id": "http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137"
            },
            "position": {
              "x": 1545.2162668540552,
              "y": -601.6260812154601
            }
          },
          {
            "data": {
              "label": "SMAD7\nRNF111",
              "popup": "SMAD7\nRNF111<br>http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537",
              "id": "http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537"
            },
            "position": {
              "x": 650.9073710732155,
              "y": 429.67586235873404
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1802 http://identifiers.org/reactome/R-HSA-2993780",
              "name": "e1802",
              "id": "e1802"
            },
            "position": {
              "x": 1011.7049736187015,
              "y": -1403.7961735506076
            }
          },
          {
            "data": {
              "label": "IL37(?-218)\np-S423,S425-SMAD3",
              "popup": "IL37(?-218)\np-S423,S425-SMAD3<br>http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb",
              "id": "http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb"
            },
            "position": {
              "x": -140.4854262201798,
              "y": 2376.5045938694175
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7225 http://identifiers.org/reactome/R-HSA-2187358",
              "name": "e7225",
              "id": "e7225"
            },
            "position": {
              "x": 1873.9741517178002,
              "y": 306.10934883436084
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3865 http://identifiers.org/reactome/R-HSA-2187330",
              "name": "e3865",
              "id": "e3865"
            },
            "position": {
              "x": 696.2345809921902,
              "y": -893.2546823814182
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7227 http://identifiers.org/reactome/R-HSA-1181355",
              "name": "e7227",
              "id": "e7227"
            },
            "position": {
              "x": 1536.1999542318852,
              "y": 462.1739429017607
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7226 http://identifiers.org/reactome/R-HSA-1549526",
              "name": "e7226",
              "id": "e7226"
            },
            "position": {
              "x": 1613.0441058396273,
              "y": 218.2205334167655
            }
          },
          {
            "data": {
              "label": "JUNB gene",
              "popup": "JUNB gene<br>http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a",
              "id": "http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a"
            },
            "position": {
              "x": 133.9172119475737,
              "y": -1033.3676958256256
            }
          },
          {
            "data": {
              "label": "TAZ",
              "popup": "TAZ<br>http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc",
              "id": "http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc"
            },
            "position": {
              "x": 55.23976443744857,
              "y": -94.15780268360466
            }
          },
          {
            "data": {
              "label": "RNF111/SMURF2",
              "popup": "RNF111/SMURF2<br>http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875",
              "id": "http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875"
            },
            "position": {
              "x": 450.98842080092817,
              "y": -563.5784524315662
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3858 http://identifiers.org/reactome/R-HSA-1535903",
              "name": "e3858",
              "id": "e3858"
            },
            "position": {
              "x": 1073.4096170054218,
              "y": -833.3827915491212
            }
          },
          {
            "data": {
              "label": "SP1",
              "popup": "SP1<br>http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c",
              "id": "http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c"
            },
            "position": {
              "x": -97.88137638094281,
              "y": -669.595324195
            }
          },
          {
            "data": {
              "label": "MEN1",
              "popup": "MEN1<br>http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961",
              "id": "http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961"
            },
            "position": {
              "x": -6.66257167895549,
              "y": -896.5052857908919
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e8046 http://identifiers.org/reactome/R-HSA-9009910",
              "name": "e8046",
              "id": "e8046"
            },
            "position": {
              "x": -590.4862264989448,
              "y": 1726.7746621180095
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3498 http://identifiers.org/reactome/R-HSA-201423",
              "name": "e3498",
              "id": "e3498"
            },
            "position": {
              "x": -1263.0661699656093,
              "y": 750.9817754600922
            }
          },
          {
            "data": {
              "label": "ALK4",
              "popup": "ALK4<br>http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df",
              "id": "http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df"
            },
            "position": {
              "x": 606.645285007376,
              "y": 1685.0927448826333
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4875 http://identifiers.org/reactome/R-HSA-2473184",
              "name": "e4875",
              "id": "e4875"
            },
            "position": {
              "x": 355.4616610227533,
              "y": 2052.430712192731
            }
          },
          {
            "data": {
              "label": "ACVR1C",
              "popup": "ACVR1C<br>http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84",
              "id": "http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84"
            },
            "position": {
              "x": 1190.7289580421425,
              "y": 1722.758940990554
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3156 http://identifiers.org/reactome/R-HSA-9033526",
              "name": "e3156",
              "id": "e3156"
            },
            "position": {
              "x": -34.9251313496707,
              "y": 939.9289672906316
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5820 http://identifiers.org/reactome/R-HSA-2187303",
              "name": "e5820",
              "id": "e5820"
            },
            "position": {
              "x": -568.882686433849,
              "y": -817.0988123711714
            }
          },
          {
            "data": {
              "label": "Ub-SNCA",
              "popup": "Ub-SNCA<br>http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf",
              "id": "http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf"
            },
            "position": {
              "x": -246.0727294826853,
              "y": 1265.5177974371527
            }
          },
          {
            "data": {
              "label": "p-SMAD2/3\nSMAD4\nTRIM33",
              "popup": "p-SMAD2/3\nSMAD4\nTRIM33<br>http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f",
              "id": "http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f"
            },
            "position": {
              "x": -120.52108786371663,
              "y": -458.1197837111276
            }
          },
          {
            "data": {
              "label": "AXIN\nSMURF2",
              "popup": "AXIN\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6",
              "id": "http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6"
            },
            "position": {
              "x": 3659.947896900648,
              "y": -1263.5045088977586
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD3",
              "popup": "p-2S-SMAD3<br>http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76",
              "id": "http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76"
            },
            "position": {
              "x": -651.6325104191964,
              "y": 1487.9600410162138
            }
          },
          {
            "data": {
              "label": "CDK8\nCCNC/ CDK9\nCCNT",
              "popup": "CDK8\nCCNC/ CDK9\nCCNT<br>http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82",
              "id": "http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82"
            },
            "position": {
              "x": 183.11862569572455,
              "y": -916.6599653288185
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4943 http://identifiers.org/reactome/R-HSA-870437",
              "name": "e4943",
              "id": "e4943"
            },
            "position": {
              "x": -75.4802818002005,
              "y": 572.8444588778102
            }
          },
          {
            "data": {
              "label": "TFAP2C homodimer\nMYC\nKDM5B",
              "popup": "TFAP2C homodimer\nMYC\nKDM5B<br>http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1",
              "id": "http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1"
            },
            "position": {
              "x": 3068.569194489794,
              "y": -610.5033008335973
            }
          },
          {
            "data": {
              "label": "SMURF2",
              "popup": "SMURF2<br>http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "id": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9"
            },
            "position": {
              "x": 3369.557023671727,
              "y": -1179.020774009053
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nMEN1",
              "popup": "p-2S-SMAD2/3\nSMAD4\nMEN1<br>http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f",
              "id": "http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f"
            },
            "position": {
              "x": -13.84766520002898,
              "y": -778.1498182692579
            }
          },
          {
            "data": {
              "label": "HSPA2",
              "popup": "HSPA2<br>http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518",
              "id": "http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518"
            },
            "position": {
              "x": 1296.5597489465124,
              "y": -2236.086176835201
            }
          },
          {
            "data": {
              "label": "PARP1",
              "popup": "PARP1<br>http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "id": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249"
            },
            "position": {
              "x": 742.2244054974167,
              "y": -1181.6413127404496
            }
          },
          {
            "data": {
              "label": "Activin AB,B\nACVR2A,B\nACVR1C",
              "popup": "Activin AB,B\nACVR2A,B\nACVR1C<br>http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d",
              "id": "http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d"
            },
            "position": {
              "x": 1298.5492622845197,
              "y": 1532.108134062212
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3862 http://identifiers.org/reactome/R-HSA-173481",
              "name": "e3862",
              "id": "e3862"
            },
            "position": {
              "x": 516.7684510491428,
              "y": -811.1372485990488
            }
          },
          {
            "data": {
              "label": "SMAD4",
              "popup": "SMAD4<br>http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3",
              "id": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3"
            },
            "position": {
              "x": 49.882738063367746,
              "y": 365.3779505284849
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3863 http://identifiers.org/reactome/R-HSA-2186607",
              "name": "e3863",
              "id": "e3863"
            },
            "position": {
              "x": 817.0048638085442,
              "y": -461.7918763212314
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3070 http://identifiers.org/reactome/R-HSA-2187401",
              "name": "e3070",
              "id": "e3070"
            },
            "position": {
              "x": 1665.7657601130843,
              "y": 632.3366135965335
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3861 http://identifiers.org/reactome/R-HSA-2187309",
              "name": "e3861",
              "id": "e3861"
            },
            "position": {
              "x": 117.97469406861484,
              "y": -695.9175293617387
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3860 http://identifiers.org/reactome/R-HSA-870538",
              "name": "e3860",
              "id": "e3860"
            },
            "position": {
              "x": 160.36186054583607,
              "y": -523.4104822998271
            }
          },
          {
            "data": {
              "label": "Activin A,AB,B\nACVR2A,B\np-ACVR1B",
              "popup": "Activin A,AB,B\nACVR2A,B\np-ACVR1B<br>http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82",
              "id": "http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82"
            },
            "position": {
              "x": 833.4975309601954,
              "y": 2301.2886930049604
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3866 http://identifiers.org/reactome/R-HSA-2187388",
              "name": "e3866",
              "id": "e3866"
            },
            "position": {
              "x": 1109.8332841657777,
              "y": -511.609742561795
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5452 http://identifiers.org/reactome/R-HSA-4551768",
              "name": "e5452",
              "id": "e5452"
            },
            "position": {
              "x": 826.2964724760042,
              "y": -1468.7791883175023
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3864 http://identifiers.org/reactome/R-HSA-2186643",
              "name": "e3864",
              "id": "e3864"
            },
            "position": {
              "x": 222.22479872038093,
              "y": -770.8183519184691
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2995 http://identifiers.org/reactome/R-HSA-870479",
              "name": "e2995",
              "id": "e2995"
            },
            "position": {
              "x": -190.39835315162918,
              "y": 487.68826752139597
            }
          },
          {
            "data": {
              "label": "Activin A,AB,B\nACVR2A,B\nACVR1B",
              "popup": "Activin A,AB,B\nACVR2A,B\nACVR1B<br>http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e",
              "id": "http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e"
            },
            "position": {
              "x": 761.8974445283288,
              "y": 2108.739567112145
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3",
              "popup": "p-2S-SMAD2/3<br>http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2",
              "id": "http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2"
            },
            "position": {
              "x": -475.3971274389948,
              "y": -336.41385355203744
            }
          },
          {
            "data": {
              "label": "Activin AB,B",
              "popup": "Activin AB,B<br>http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a",
              "id": "http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a"
            },
            "position": {
              "x": 1075.2823760012711,
              "y": 1416.200517147777
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4\nSP1",
              "popup": "p-2S-SMAD2/3\nSMAD4\nSP1<br>http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20",
              "id": "http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20"
            },
            "position": {
              "x": -272.2229929960287,
              "y": -764.4224142733192
            }
          },
          {
            "data": {
              "label": "Ub-ERBB2\nERBB2IP\nUb-HSP90\nCDC37",
              "popup": "Ub-ERBB2\nERBB2IP\nUb-HSP90\nCDC37<br>http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f",
              "id": "http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f"
            },
            "position": {
              "x": -854.0162099074664,
              "y": 2482.7173027310114
            }
          },
          {
            "data": {
              "label": "NCOR1, NCOR2",
              "popup": "NCOR1, NCOR2<br>http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8",
              "id": "http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8"
            },
            "position": {
              "x": 643.6010641810773,
              "y": -796.8440424432042
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7449 http://identifiers.org/reactome/R-HSA-170847",
              "name": "e7449",
              "id": "e7449"
            },
            "position": {
              "x": 620.4989010409976,
              "y": 287.5504472931622
            }
          },
          {
            "data": {
              "label": "Ub\nPEX5L",
              "popup": "Ub\nPEX5L<br>http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a",
              "id": "http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a"
            },
            "position": {
              "x": -597.2390331265296,
              "y": 866.6610900178972
            }
          },
          {
            "data": {
              "label": "Activin A,AB,B\nFST",
              "popup": "Activin A,AB,B\nFST<br>http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb",
              "id": "http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb"
            },
            "position": {
              "x": 280.36160391248393,
              "y": 2206.8245826775124
            }
          },
          {
            "data": {
              "label": "MYC",
              "popup": "MYC<br>http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e",
              "id": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e"
            },
            "position": {
              "x": 2701.229631347207,
              "y": -325.5007062966309
            }
          },
          {
            "data": {
              "label": "SKI/SKIL",
              "popup": "SKI/SKIL<br>http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b",
              "id": "http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b"
            },
            "position": {
              "x": 483.7242067730588,
              "y": -956.9634819787349
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nSMAD4",
              "popup": "p-2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "id": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3"
            },
            "position": {
              "x": 650.0003678120044,
              "y": -705.8440414432042
            }
          },
          {
            "data": {
              "label": "TGFB1\np-TGFBR\nSARA\nSMAD2/3",
              "popup": "TGFB1\np-TGFBR\nSARA\nSMAD2/3<br>http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b",
              "id": "http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b"
            },
            "position": {
              "x": 1963.0454208630108,
              "y": 736.9735570172825
            }
          },
          {
            "data": {
              "label": "SMAD2\nSMURF2",
              "popup": "SMAD2\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8",
              "id": "http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8"
            },
            "position": {
              "x": 3141.652418335651,
              "y": -1038.0768886020824
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2220 http://identifiers.org/reactome/R-HSA-2186785",
              "name": "e2220",
              "id": "e2220"
            },
            "position": {
              "x": 540.0294094183813,
              "y": 690.1619694844248
            }
          },
          {
            "data": {
              "label": "Ub-SMAD4",
              "popup": "Ub-SMAD4<br>http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55",
              "id": "http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55"
            },
            "position": {
              "x": -334.4089325479881,
              "y": -63.94313822769965
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2518 http://identifiers.org/reactome/R-HSA-2179276",
              "name": "e2518",
              "id": "e2518"
            },
            "position": {
              "x": 1116.8832358143547,
              "y": 91.97793229907934
            }
          },
          {
            "data": {
              "label": "SMAD2",
              "popup": "SMAD2<br>http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c",
              "id": "http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c"
            },
            "position": {
              "x": 3295.955648426842,
              "y": -823.0887015727794
            }
          },
          {
            "data": {
              "label": "p-T-2S-SMAD2/3\nSMAD4\nNEDDL4",
              "popup": "p-T-2S-SMAD2/3\nSMAD4\nNEDDL4<br>http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51",
              "id": "http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51"
            },
            "position": {
              "x": -103.83924140380653,
              "y": -1307.7271487364537
            }
          },
          {
            "data": {
              "label": "MAPKAPK5 gene",
              "popup": "MAPKAPK5 gene<br>http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0",
              "id": "http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0"
            },
            "position": {
              "x": 3109.499867169158,
              "y": -115.66260662511098
            }
          },
          {
            "data": {
              "label": "FKBP6",
              "popup": "FKBP6<br>http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6",
              "id": "http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6"
            },
            "position": {
              "x": 1468.9781717118606,
              "y": -1900.9506687044552
            }
          },
          {
            "data": {
              "label": "TGFB1\np-TGFBR\nSARA\np-2S-SMAD2/3",
              "popup": "TGFB1\np-TGFBR\nSARA\np-2S-SMAD2/3<br>http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680",
              "id": "http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680"
            },
            "position": {
              "x": 1831.9029487203118,
              "y": 823.7522629934548
            }
          },
          {
            "data": {
              "label": "TRIM33",
              "popup": "TRIM33<br>http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e",
              "id": "http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e"
            },
            "position": {
              "x": -81.39470494644061,
              "y": -367.1197827111276
            }
          },
          {
            "data": {
              "label": "p-SMAD2/3\nSMAD4\nRBL1\nE2F4/5\nDP1/2",
              "popup": "p-SMAD2/3\nSMAD4\nRBL1\nE2F4/5\nDP1/2<br>http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d",
              "id": "http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d"
            },
            "position": {
              "x": 1862.797898535485,
              "y": -200.06822438824892
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e2034 http://identifiers.org/reactome/R-HSA-2993769",
              "name": "e2034",
              "id": "e2034"
            },
            "position": {
              "x": 857.6182188548029,
              "y": -1942.5425770501213
            }
          },
          {
            "data": {
              "label": "FoxO3a-binding Element",
              "popup": "FoxO3a-binding Element<br>http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e",
              "id": "http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e"
            },
            "position": {
              "x": 1323.848488841467,
              "y": -895.6002391702531
            }
          },
          {
            "data": {
              "label": "SARA",
              "popup": "SARA<br>http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76",
              "id": "http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76"
            },
            "position": {
              "x": 2117.448571544503,
              "y": 664.8430319327947
            }
          },
          {
            "data": {
              "label": "Ub-SKI/Ub-SKIL",
              "popup": "Ub-SKI/Ub-SKIL<br>http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9",
              "id": "http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9"
            },
            "position": {
              "x": 717.2789348543588,
              "y": -484.2622604592995
            }
          },
          {
            "data": {
              "label": "USP9X\nUb\nPEX5L",
              "popup": "USP9X\nUb\nPEX5L<br>http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6",
              "id": "http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6"
            },
            "position": {
              "x": -521.5494130574264,
              "y": 669.5539397066024
            }
          },
          {
            "data": {
              "label": "SMAD4",
              "popup": "SMAD4<br>http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b<br>InSource? True<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b",
              "id": "http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b"
            },
            "position": {
              "x": 1294.0365403486146,
              "y": 56.232041394666
            }
          },
          {
            "data": {
              "label": "PTPN genes2,4,5,6,7,9,11,12,13,14,18,20,23",
              "popup": "PTPN genes2,4,5,6,7,9,11,12,13,14,18,20,23<br>http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd",
              "id": "http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd"
            },
            "position": {
              "x": 139.53299259140405,
              "y": 2751.953898460953
            }
          },
          {
            "data": {
              "label": "SNCA",
              "popup": "SNCA<br>http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146",
              "id": "http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146"
            },
            "position": {
              "x": -484.7781874827809,
              "y": 1103.667846088373
            }
          },
          {
            "data": {
              "label": "UBC9_HUMAN",
              "popup": "UBC9_HUMAN<br>http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a",
              "id": "http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a"
            },
            "position": {
              "x": 738.8672332811112,
              "y": -2131.45952550852
            }
          },
          {
            "data": {
              "label": "SUMO2,3\nK203,K486-PARP1",
              "popup": "SUMO2,3\nK203,K486-PARP1<br>http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4",
              "id": "http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4"
            },
            "position": {
              "x": 676.5369529109054,
              "y": -1575.9963266327552
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7124 http://identifiers.org/reactome/R-HSA-2187405",
              "name": "e7124",
              "id": "e7124"
            },
            "position": {
              "x": 1405.6214031337215,
              "y": 729.9799321659075
            }
          },
          {
            "data": {
              "label": "SMAD7\nSMURF2",
              "popup": "SMAD7\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85",
              "id": "http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85"
            },
            "position": {
              "x": 1412.4582614670437,
              "y": 123.6416011622952
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4365 http://identifiers.org/reactome/R-HSA-209055",
              "name": "e4365",
              "id": "e4365"
            },
            "position": {
              "x": 1453.7985012844435,
              "y": -62.4820113606327
            }
          },
          {
            "data": {
              "label": "FSTL3",
              "popup": "FSTL3<br>http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7",
              "id": "http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7"
            },
            "position": {
              "x": 852.8974455283287,
              "y": 2088.7575539797645
            }
          },
          {
            "data": {
              "label": "SKI",
              "popup": "SKI<br>http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309",
              "id": "http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309"
            },
            "position": {
              "x": -1437.9824863429433,
              "y": 745.0121976674383
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD2/3\nPMEPA1",
              "popup": "p-2S-SMAD2/3\nPMEPA1<br>http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3",
              "id": "http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3"
            },
            "position": {
              "x": 1244.7070682332374,
              "y": 1075.4426262911118
            }
          },
          {
            "data": {
              "label": "DIDO3",
              "popup": "DIDO3<br>http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0",
              "id": "http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0"
            },
            "position": {
              "x": 1119.9161605276206,
              "y": -2033.4028978056165
            }
          },
          {
            "data": {
              "label": "p\n2S-SMAD1/5/8",
              "popup": "p\n2S-SMAD1/5/8<br>http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219",
              "id": "http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219"
            },
            "position": {
              "x": -697.2419737094289,
              "y": 281.05470196978087
            }
          },
          {
            "data": {
              "label": "PPM1A",
              "popup": "PPM1A<br>http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44",
              "id": "http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44"
            },
            "position": {
              "x": 1394.2858521859898,
              "y": -292.06547945502325
            }
          },
          {
            "data": {
              "label": "Activin AB,B\nACVR2A,B\np-ACVR1C",
              "popup": "Activin AB,B\nACVR2A,B\np-ACVR1C<br>http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276",
              "id": "http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276"
            },
            "position": {
              "x": 1468.4450169064821,
              "y": 1541.1486374494832
            }
          },
          {
            "data": {
              "label": "PIAS4",
              "popup": "PIAS4<br>http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a",
              "id": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a"
            },
            "position": {
              "x": 924.6931312093008,
              "y": -1362.8760906737987
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7914 http://identifiers.org/reactome/R-HSA-2167917",
              "name": "e7914",
              "id": "e7914"
            },
            "position": {
              "x": 1525.5055143292493,
              "y": -803.9327290955636
            }
          },
          {
            "data": {
              "label": "RUNX2",
              "popup": "RUNX2<br>http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690",
              "id": "http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690"
            },
            "position": {
              "x": -546.5463545809802,
              "y": 1657.703689386631
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7582 http://identifiers.org/reactome/R-HSA-2176416",
              "name": "e7582",
              "id": "e7582"
            },
            "position": {
              "x": 838.2976893161364,
              "y": -1059.3140740548258
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3859 http://identifiers.org/reactome/R-HSA-1225919",
              "name": "e3859",
              "id": "e3859"
            },
            "position": {
              "x": 965.0849337994509,
              "y": -675.2300812240228
            }
          },
          {
            "data": {
              "label": "ACVR2A,B",
              "popup": "ACVR2A,B<br>http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375",
              "id": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375"
            },
            "position": {
              "x": 919.4910049306892,
              "y": 1695.0909187164507
            }
          },
          {
            "data": {
              "label": "p-2S-SMAD1/5/8\nSMAD4",
              "popup": "p-2S-SMAD1/5/8\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7",
              "id": "http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7"
            },
            "position": {
              "x": -826.609204534518,
              "y": 475.0056326963481
            }
          },
          {
            "data": {
              "label": "SUMO E1 enzyme",
              "popup": "SUMO E1 enzyme<br>http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c",
              "id": "http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c"
            },
            "position": {
              "x": 578.1833716311114,
              "y": -2035.615030897003
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5636 http://identifiers.org/reactome/R-HSA-5687083",
              "name": "e5636",
              "id": "e5636"
            },
            "position": {
              "x": 2914.3565976739033,
              "y": -174.0788541103702
            }
          },
          {
            "data": {
              "label": "FST",
              "popup": "FST<br>http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51<br>InSource? True<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51",
              "id": "http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51"
            },
            "position": {
              "x": 198.24973180532308,
              "y": 1986.0194276387272
            }
          },
          {
            "data": {
              "label": "SMAD2,3\nSMAD4\nFOXO3\nFoxO3a-binding Element",
              "popup": "SMAD2,3\nSMAD4\nFOXO3\nFoxO3a-binding Element<br>http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8",
              "id": "http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8"
            },
            "position": {
              "x": 1319.161942916531,
              "y": -782.820028351367
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3686 http://identifiers.org/reactome/R-HSA-173542",
              "name": "e3686",
              "id": "e3686"
            },
            "position": {
              "x": 3176.12538396425,
              "y": -1201.22582668794
            }
          },
          {
            "data": {
              "label": "UBE2I",
              "popup": "UBE2I<br>http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "id": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30"
            },
            "position": {
              "x": 929.1782074370011,
              "y": -1661.0783599903277
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e6102 http://identifiers.org/reactome/R-HSA-2187293",
              "name": "e6102",
              "id": "e6102"
            },
            "position": {
              "x": 361.41646389063317,
              "y": -954.202444219511
            }
          },
          {
            "data": {
              "label": "Axial-Lateral Element of Synaptonemal Complex",
              "popup": "Axial-Lateral Element of Synaptonemal Complex<br>http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441",
              "id": "http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441"
            },
            "position": {
              "x": 1147.1742811875365,
              "y": -2181.56261033242
            }
          },
          {
            "data": {
              "label": "NEDD4L",
              "popup": "NEDD4L<br>http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3",
              "id": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3"
            },
            "position": {
              "x": 265.1518279565481,
              "y": -1276.3454352885724
            }
          },
          {
            "data": {
              "label": "AXIN",
              "popup": "AXIN<br>http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3",
              "id": "http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3"
            },
            "position": {
              "x": 3698.367168503493,
              "y": -1023.2379838297716
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4491 http://identifiers.org/reactome/R-HSA-170850",
              "name": "e4491",
              "id": "e4491"
            },
            "position": {
              "x": 1608.2968881033196,
              "y": 765.0986623543982
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e1909 http://identifiers.org/reactome/R-HSA-2186741",
              "name": "e1909",
              "id": "e1909"
            },
            "position": {
              "x": 322.7662020300192,
              "y": -521.5330411046474
            }
          },
          {
            "data": {
              "label": "RWDD3",
              "popup": "RWDD3<br>http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b",
              "id": "http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b"
            },
            "position": {
              "x": 1164.7297922719013,
              "y": -1586.54314332043
            }
          },
          {
            "data": {
              "label": "Ub-p-T-2S-SMAD2/3",
              "popup": "Ub-p-T-2S-SMAD2/3<br>http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948",
              "id": "http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948"
            },
            "position": {
              "x": 1133.8708910993873,
              "y": 261.85760196282916
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5793 http://identifiers.org/reactome/R-HSA-2106591",
              "name": "e5793",
              "id": "e5793"
            },
            "position": {
              "x": 623.9466821767293,
              "y": -138.36822756613782
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e463 http://identifiers.org/reactome/R-HSA-4551604",
              "name": "e463",
              "id": "e463"
            },
            "position": {
              "x": 892.143268291998,
              "y": -1202.1797786530994
            }
          },
          {
            "data": {
              "label": "SMAD3\nSTUB1",
              "popup": "SMAD3\nSTUB1<br>http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e",
              "id": "http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e"
            },
            "position": {
              "x": -1108.6583596668377,
              "y": 2104.709819085519
            }
          },
          {
            "data": {
              "label": "ERBB2\nERBB2IP\nHSP90\nCDC37",
              "popup": "ERBB2\nERBB2IP\nHSP90\nCDC37<br>http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a",
              "id": "http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a"
            },
            "position": {
              "x": -666.9310872054052,
              "y": 2407.0854811258246
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e7450 http://identifiers.org/reactome/R-HSA-2187355",
              "name": "e7450",
              "id": "e7450"
            },
            "position": {
              "x": 1211.196385048546,
              "y": 855.756856919616
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4955 http://identifiers.org/reactome/R-HSA-2470483",
              "name": "e4955",
              "id": "e4955"
            },
            "position": {
              "x": 1106.7113581277838,
              "y": 1584.5267971180722
            }
          },
          {
            "data": {
              "label": "SYCE1",
              "popup": "SYCE1<br>http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a",
              "id": "http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a"
            },
            "position": {
              "x": 1503.274204695111,
              "y": -2025.2662349789769
            }
          },
          {
            "data": {
              "label": "SYCP1",
              "popup": "SYCP1<br>http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27",
              "id": "http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27"
            },
            "position": {
              "x": 1397.1540018004773,
              "y": -2058.396986646544
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4877 http://identifiers.org/reactome/R-HSA-2473186",
              "name": "e4877",
              "id": "e4877"
            },
            "position": {
              "x": 670.2570947245326,
              "y": 1987.5131579939098
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4876 http://identifiers.org/reactome/R-HSA-1181153",
              "name": "e4876",
              "id": "e4876"
            },
            "position": {
              "x": 736.2755049036135,
              "y": 1851.9836860605335
            }
          },
          {
            "data": {
              "label": "RUNX2\nSTUB1",
              "popup": "RUNX2\nSTUB1<br>http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb",
              "id": "http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb"
            },
            "position": {
              "x": -491.73816570981677,
              "y": 1874.3118771012096
            }
          },
          {
            "data": {
              "label": "JUNB",
              "popup": "JUNB<br>http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd",
              "id": "http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd"
            },
            "position": {
              "x": 249.46725502512643,
              "y": -1126.1007242007443
            }
          },
          {
            "data": {
              "label": "ATP1B4\nSNW1",
              "popup": "ATP1B4\nSNW1<br>http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a<br>InSource? False<br>InTarget? True<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a",
              "id": "http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a"
            },
            "position": {
              "x": 573.2659437060779,
              "y": 119.61432886207744
            }
          },
          {
            "data": {
              "label": "USP9X\nUb\nPEX5S",
              "popup": "USP9X\nUb\nPEX5S<br>http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590",
              "id": "http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590"
            },
            "position": {
              "x": 26.52180786381686,
              "y": 841.4696379573464
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e3117 http://identifiers.org/reactome/R-HSA-9009308",
              "name": "e3117",
              "id": "e3117"
            },
            "position": {
              "x": -545.3838127552285,
              "y": 2034.045683494629
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e4776 http://identifiers.org/reactome/R-HSA-1918092",
              "name": "e4776",
              "id": "e4776"
            },
            "position": {
              "x": -789.4697019796004,
              "y": 2300.663320550188
            }
          },
          {
            "data": {
              "label": "",
              "popup": "e5435 http://identifiers.org/reactome/R-HSA-912505",
              "name": "e5435",
              "id": "e5435"
            },
            "position": {
              "x": 1261.1982789699885,
              "y": -1990.1885695721267
            }
          },
          {
            "data": {
              "label": "TGFB1\np-TGFBR\nSARA",
              "popup": "TGFB1\np-TGFBR\nSARA<br>http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef",
              "id": "http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef"
            },
            "position": {
              "x": 1705.9559920072918,
              "y": 1001.4624393142095
            }
          },
          {
            "data": {
              "label": "2SUMO1\nPARP1",
              "popup": "2SUMO1\nPARP1<br>http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7",
              "id": "http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7"
            },
            "position": {
              "x": 743.841328138113,
              "y": -1385.5597027859396
            }
          },
          {
            "data": {
              "label": "FOXO3",
              "popup": "FOXO3<br>http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89",
              "id": "http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89"
            },
            "position": {
              "x": 1217.4965794079983,
              "y": -954.0496986137267
            }
          },
          {
            "data": {
              "label": "ub-AXIN\nSMURF2",
              "popup": "ub-AXIN\nSMURF2<br>http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61",
              "id": "http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61"
            },
            "position": {
              "x": 3576.9833467013273,
              "y": -1395.4681132227317
            }
          },
          {
            "data": {
              "label": "IL37(?-218)\nSMAD3",
              "popup": "IL37(?-218)\nSMAD3<br>http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05<br>InSource? False<br>InTarget? False<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05",
              "id": "http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05"
            },
            "position": {
              "x": -1241.3917098037589,
              "y": 1634.1500814354615
            }
          },
          {
            "data": {
              "label": "IL37(?-218)",
              "popup": "IL37(?-218)<br>http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7",
              "id": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7"
            },
            "position": {
              "x": -862.671715321247,
              "y": 1634.1224293230232
            }
          },
          {
            "data": {
              "label": "SMAD7\nNEDD4L",
              "popup": "SMAD7\nNEDD4L<br>http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa",
              "id": "http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa"
            },
            "position": {
              "x": 1657.483003769188,
              "y": -1221.5052210186816
            }
          },
          {
            "data": {
              "label": "SUMO E1 enzyme",
              "popup": "SUMO E1 enzyme<br>http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90<br>InSource? False<br>InTarget? False<br>InConnectedSet? False",
              "name": "http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90",
              "id": "http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90"
            },
            "position": {
              "x": 1050.1052564717472,
              "y": -1669.5165510346806
            }
          },
          {
            "data": {
              "label": "WWTR1\np-2S-SMAD2/3\nSMAD4",
              "popup": "WWTR1\np-2S-SMAD2/3\nSMAD4<br>http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681<br>InSource? False<br>InTarget? True<br>InConnectedSet? True",
              "name": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681",
              "id": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681"
            },
            "position": {
              "x": 423.43097269135046,
              "y": -143.27610130697764
            }
          }
        ],
        "edges": [
          {
            "data": {
              "source": "e7084",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6",
              "name": "e7084-http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6",
              "id": "4cfe6849-0c4e-471b-8e22-b2a9dabba8ae"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763",
              "popup": "e3026 http://identifiers.org/reactome/R-HSA-9008928",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb",
              "name": "http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763-http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb",
              "id": "86b422bf-f46e-4ba8-b201-f168ef68d78c"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "is_directed": false,
              "target": "e7582",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7582",
              "id": "4aba17d8-e773-4da5-8078-c05f9c44def5"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "is_directed": false,
              "target": "e6944",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e6944",
              "id": "60fcdf0e-faf9-418b-a605-e36221187fea"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "is_directed": false,
              "target": "e7404",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7404",
              "id": "d2707c44-8313-4f78-98ea-484025956a41"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "is_directed": false,
              "target": "e5702",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e5702",
              "id": "3c5d0499-4c94-4275-b928-4dae5f1f4d78"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "is_directed": false,
              "target": "e7914",
              "name": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde-e7914",
              "id": "0cc3eb1c-cc49-4966-888b-c7195566d352"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1",
              "popup": "e4242 http://identifiers.org/reactome/R-HSA-2106579",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681",
              "name": "http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1-http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681",
              "id": "ea16f2c7-7d53-4c3b-bef7-22a2e338267d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c",
              "is_directed": false,
              "target": "e7914",
              "name": "http://pathwaycommons.org/pc2/Protein_cdcbb09fa91d55e1189b03c955be846c-e7914",
              "id": "ac310beb-1f00-41ec-88c2-a4386b21c219"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da",
              "is_directed": false,
              "target": "e3859",
              "name": "http://pathwaycommons.org/pc2/PhysicalEntity_b8d9717fc68785d4db918887e0a942da-e3859",
              "id": "0cf3b0ba-f4cc-4e9e-9213-143e3a2af208"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886",
              "is_directed": false,
              "target": "e3498",
              "name": "http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886-e3498",
              "id": "1a6204d3-7605-4d13-b6e0-e910c7a5f597"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55",
              "is_directed": false,
              "target": "e2518",
              "name": "http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55-e2518",
              "id": "1682d778-20d4-4b40-8847-ad16a52e47cf"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5945",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba",
              "name": "e5945-http://pathwaycommons.org/pc2/Protein_778678df4160d686e725af96faea69ba",
              "id": "243d15e4-2d35-4a68-9f0c-5d2b3e05a672"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60",
              "is_directed": false,
              "target": "e1194",
              "name": "http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60-e1194",
              "id": "c25bfb7f-4f1e-4596-8978-a2263e29671b"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e1194",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8",
              "name": "e1194-http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8",
              "id": "967e843e-9784-4525-9f89-6415aba3c839"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1194",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "name": "e1194-http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "id": "e33d54ab-b5c0-49b5-969d-d4b30c850fd7"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1194",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875",
              "name": "e1194-http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875",
              "id": "16227194-376a-46c1-acc8-65ab697d9efc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1194",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9",
              "name": "e1194-http://pathwaycommons.org/pc2/Complex_09bdf4776bdd0417548613e1a05f56d9",
              "id": "e1b56865-6a88-4a7c-956f-94aa6c7b2151"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7645",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172",
              "name": "e7645-http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172",
              "id": "8cba9675-b04e-432f-8ffc-e3940dbbe2ad"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3867",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc",
              "name": "e3867-http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc",
              "id": "3754d943-3210-4267-b25a-ca1d65c6d6a9"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386",
              "is_directed": false,
              "target": "e7225",
              "name": "http://pathwaycommons.org/pc2/Protein_79c7ae49af99e271fbadbf20da741386-e7225",
              "id": "de814b28-7155-4e98-83e2-1f5503226642"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0",
              "is_directed": false,
              "target": "e3859",
              "name": "http://pathwaycommons.org/pc2/Complex_3216cfc40c28201ca37b3eb2e28f87c0-e3859",
              "id": "223d438c-b986-4596-a3ce-8e4e9a438283"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce",
              "is_directed": false,
              "target": "e4474",
              "name": "http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce-e4474",
              "id": "d6112c17-374d-45de-9043-223d42f7f381"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172",
              "popup": "e3102 http://identifiers.org/reactome/R-HSA-5660752",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af",
              "name": "http://pathwaycommons.org/pc2/Complex_829a2514343ff690c90a327964153172-http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af",
              "id": "f1b0710e-a6ef-42ca-b6e0-af8d67da616f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4274",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b",
              "name": "e4274-http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b",
              "id": "f3989d29-cba7-49d0-9b19-d33d347c661a"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e6718",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb",
              "name": "e6718-http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb",
              "id": "f3e858ff-ea8a-4a8d-a916-8252cc7e3acc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463",
              "popup": "e3757 http://identifiers.org/reactome/R-HSA-2167876",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85",
              "name": "http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463-http://pathwaycommons.org/pc2/Complex_6489d522a3122964979610000dc80c85",
              "id": "14cd6119-27b2-48f2-8dac-8b9b191f9441"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1393",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6",
              "name": "e1393-http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6",
              "id": "13b5a10c-afb4-4772-b501-9642b36a51c0"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff",
              "is_directed": false,
              "target": "e4274",
              "name": "http://pathwaycommons.org/pc2/Complex_c026ca6ae18365be83587414828f4aff-e4274",
              "id": "4fd92629-f773-4145-b4ae-a206555bcd19"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5548",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d",
              "name": "e5548-http://pathwaycommons.org/pc2/Protein_4e163a740debb0b5c3bf9a5f8498ca7d",
              "id": "5070da3d-1510-4844-8a6d-f67bd9de6fbb"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e5548",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "name": "e5548-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "id": "30adce49-b465-46fa-ba2c-e109b2eab633"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc",
              "is_directed": false,
              "target": "e4457",
              "name": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc-e4457",
              "id": "f4568edc-95e7-4155-95df-fd5cf6f61bdd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc",
              "is_directed": false,
              "target": "e4456",
              "name": "http://pathwaycommons.org/pc2/Complex_c9f0c0030373b737aee2a3492ecb9ecc-e4456",
              "id": "cfd9619c-717d-4060-851a-1cd5c06fc12e"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5713",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e",
              "name": "e5713-http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e",
              "id": "38f693f9-156b-41d5-9f75-9ddeda507e7e"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4474",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "name": "e4474-http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "id": "850d3cea-873e-4b67-958a-3979e2c50d3d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4474",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418",
              "name": "e4474-http://pathwaycommons.org/pc2/Complex_d3b94362eb538920827ae4dd9b2b5418",
              "id": "549379b0-0d55-4c77-bcc8-f90b444ca6b8"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935",
              "is_directed": false,
              "target": "e7227",
              "name": "http://pathwaycommons.org/pc2/Complex_f7fc5a1b991b6d9b1e3b43f78d001935-e7227",
              "id": "131aa676-9a2a-4ce6-a63c-a0b8000ab13b"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7404",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463",
              "name": "e7404-http://pathwaycommons.org/pc2/Complex_a56e207d3ad22a79151f5ebce4ff1463",
              "id": "9abf53e0-944c-437f-b141-909cfa6ec116"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7096",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e",
              "name": "e7096-http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e",
              "id": "52ba23ae-6a2e-4b0f-9490-261609739b58"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf",
              "is_directed": false,
              "target": "e7226",
              "name": "http://pathwaycommons.org/pc2/Complex_e9b64e4b2a073f8747084c98d2e8e1cf-e7226",
              "id": "7258f9ba-9c4f-49b9-9fab-a77ae4a3b41a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c",
              "is_directed": false,
              "target": "e2995",
              "name": "http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c-e2995",
              "id": "f0de07b3-b9f7-460e-b028-37f50a9206fc"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af",
              "is_directed": false,
              "target": "e2886",
              "name": "http://pathwaycommons.org/pc2/Complex_78764201f3c3088a87e22736826d88af-e2886",
              "id": "8a57c24e-c12f-4e1e-98ad-bcd2b19559e0"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6",
              "is_directed": false,
              "target": "e5820",
              "name": "http://pathwaycommons.org/pc2/Dna_717d1feff2f56b14cd5c209ef379dcf6-e5820",
              "id": "66a0179f-190f-4e09-95a5-c2e1143453a9"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a",
              "is_directed": false,
              "target": "e463",
              "name": "http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a-e463",
              "id": "58d8de16-b356-4e71-abc6-7171b2dd4f88"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb",
              "is_directed": false,
              "target": "e3863",
              "name": "http://pathwaycommons.org/pc2/Protein_53120e6d2c41b8cec14286f5d379d1eb-e3863",
              "id": "dbb081f9-97d9-4f25-8e9d-dcd54b887182"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72",
              "is_directed": false,
              "target": "e7124",
              "name": "http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72-e7124",
              "id": "64c46129-3ac0-46bc-b5be-df521b07fba9"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103",
              "is_directed": false,
              "target": "e2034",
              "name": "http://pathwaycommons.org/pc2/Complex_54f8b5b1879be6aa25058b70e9cbc103-e2034",
              "id": "9ef542bc-ef24-4d8b-9a45-ef5842ea80bd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4221",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55",
              "name": "e4221-http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55",
              "id": "d4f994c1-eac3-49a6-8717-d0cde5a82d5d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4221",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2",
              "name": "e4221-http://pathwaycommons.org/pc2/Protein_cb95d4a0f3c482b433c4ba66b470a4f2",
              "id": "968523a5-d0fd-4ac9-a938-8375b765f6bc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4221",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e",
              "name": "e4221-http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e",
              "id": "fed12d31-3fcb-463b-aab7-2b16dc89264b"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1",
              "is_directed": false,
              "target": "e3070",
              "name": "http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1-e3070",
              "id": "3865dddc-6232-441d-bd2b-403bf9be83c4"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "is_directed": false,
              "target": "e4274",
              "name": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e4274",
              "id": "3251e584-e2e3-448a-9420-6c938109e987"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "is_directed": false,
              "target": "e7225",
              "name": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7225",
              "id": "2f324ec2-c75e-4a36-98f9-6bc6d26ea470"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "is_directed": false,
              "target": "e7227",
              "name": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7227",
              "id": "18c8572b-f1e3-493e-aad4-894b0f845898"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "is_directed": false,
              "target": "e7226",
              "name": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5-e7226",
              "id": "536de8f7-f0fe-4b87-9668-751e5081c354"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5702",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106",
              "name": "e5702-http://pathwaycommons.org/pc2/Protein_f5f02d401daabc9736ee5390c62ba106",
              "id": "96eacd7d-1290-4d94-84e0-e0b89f9ba5cb"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131",
              "is_directed": false,
              "target": "e6944",
              "name": "http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131-e6944",
              "id": "89e0b748-1415-4070-b824-46ce796232bd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e2882",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0",
              "name": "e2882-http://pathwaycommons.org/pc2/Complex_cc60546b8a5821d2bbaf5feb9a5807e0",
              "id": "b187c720-c788-4193-a1ff-0cf3017e1b0a"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2882",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "name": "e2882-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "id": "c4fbb332-a822-4dc3-b3f3-44d547853573"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4457",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51",
              "name": "e4457-http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51",
              "id": "b000841b-5767-40b8-aefc-29f25316740f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976",
              "is_directed": false,
              "target": "e1807",
              "name": "http://pathwaycommons.org/pc2/Complex_9a6bf093db3aba380906e1264d8aa976-e1807",
              "id": "e70e2915-0ccb-4286-81f9-c3dc1a80b236"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7",
              "is_directed": false,
              "target": "e5702",
              "name": "http://pathwaycommons.org/pc2/Dna_37399d8b8aadac3375d290195ed7fdb7-e5702",
              "id": "b99655e1-59f7-475b-a3e4-ff8dcc642c4d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e2886",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146",
              "name": "e2886-http://pathwaycommons.org/pc2/Protein_4f217b7d964d7f22fbaf6a9ec702d146",
              "id": "d69ac64d-e406-4024-8a7f-4b3fb2e89eec"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2886",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "name": "e2886-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "id": "922a0624-9878-42af-ba9a-62af1764519d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7299",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7",
              "name": "e7299-http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7",
              "id": "f2e7a012-011e-43f5-b0ca-9eff1fd47069"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e85",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5",
              "name": "e85-http://pathwaycommons.org/pc2/Protein_9208aae10f61abf8727e43436d21e6b5",
              "id": "b563f9b8-6021-43db-984d-a7ab5d3af191"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e85",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "name": "e85-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "id": "d26e8d5c-fa0e-4358-94c8-97a4269c2d0e"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3178",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "name": "e3178-http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "id": "f41b7fca-98be-4711-99e7-4ebfcf2cb719"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3178",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a",
              "name": "e3178-http://pathwaycommons.org/pc2/Complex_3ad89487afa487fbf29720d2da765f6a",
              "id": "aaa30abe-1cf5-4501-9482-921fdb88be30"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd",
              "is_directed": false,
              "target": "e7096",
              "name": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd-e7096",
              "id": "615525b1-72f9-40d1-b8cc-ab921430ac5f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd",
              "is_directed": false,
              "target": "e7310",
              "name": "http://pathwaycommons.org/pc2/Protein_410245e74341e4807e0153d7fbfa99cd-e7310",
              "id": "78b36e64-5ee3-48bb-9ead-1dffd4c1f3e2"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e1386",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1",
              "name": "e1386-http://pathwaycommons.org/pc2/Complex_fd59728be7ea09b2317641869c85a0b1",
              "id": "0d49a86f-3e99-4385-853b-f68976b954fc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f",
              "is_directed": false,
              "target": "e5713",
              "name": "http://pathwaycommons.org/pc2/Dna_3be44d4aa9c718f05714f83c6670eb9f-e5713",
              "id": "d36e7894-7ca1-4163-ac0b-e329b2a5bef6"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3",
              "is_directed": false,
              "target": "e4943",
              "name": "http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3-e4943",
              "id": "73dab0d1-6ff8-4100-8dbd-f061d913b33f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119",
              "popup": "e6921 http://identifiers.org/reactome/R-HSA-2187395",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "name": "http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119-http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "id": "e6b8343b-0d96-4e3f-a91b-a50b68dbf8d9"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1807",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "name": "e1807-http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "id": "287753d8-c35a-4fd5-9f37-80a1c3cbfacb"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6",
              "is_directed": false,
              "target": "e3156",
              "name": "http://pathwaycommons.org/pc2/Complex_85dc19bae097cd5b3f04260a0385eda6-e3156",
              "id": "1f251f88-a68f-4477-a640-51c03331c592"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec",
              "is_directed": false,
              "target": "e4365",
              "name": "http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec-e4365",
              "id": "6d80f21b-f6dc-4d9e-a621-ee7f3243a68c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "is_directed": false,
              "target": "e7124",
              "name": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7124",
              "id": "67b968d9-95ff-42ea-8349-4c49d6ecad7f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "is_directed": false,
              "target": "e7449",
              "name": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7449",
              "id": "41739c11-693e-4ca6-ad76-203d4dab07a1"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "is_directed": false,
              "target": "e7450",
              "name": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41-e7450",
              "id": "50ae3968-3bf1-4b5f-8580-1e2cd9546361"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_26fa540019d16ba8831c135e6612f1f6-e5435",
              "id": "5c65860d-5efa-46d7-bafd-7beb9af76797"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "is_directed": false,
              "target": "e7096",
              "name": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e7096",
              "id": "5b3890bb-255b-4331-ade5-1003e3c7e770"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "is_directed": false,
              "target": "e6718",
              "name": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e6718",
              "id": "a70f061b-5cfe-4f9a-abbf-702576a104ea"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "is_directed": false,
              "target": "e4776",
              "name": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21-e4776",
              "id": "d52246bc-82d8-4412-8009-b04009dfd947"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e6944",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537",
              "name": "e6944-http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537",
              "id": "d45fd832-946c-410f-aca7-f3a096abe025"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1",
              "popup": "e4217 http://identifiers.org/reactome/R-HSA-173488",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "name": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1-http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "id": "3989dd6f-19a5-49b7-945c-9090f391afa3"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1",
              "is_directed": false,
              "target": "e4218",
              "name": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1-e4218",
              "id": "8b656c5f-ab12-475f-b413-fb1547a57011"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_55803b3d5794be439f97e116323e4667-e5435",
              "id": "52fce63c-b7d9-47af-ae64-61d4d86f4b39"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4",
              "is_directed": false,
              "target": "e4875",
              "name": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4875",
              "id": "085824b9-0509-4355-b091-447c6dcfc3b7"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4",
              "is_directed": false,
              "target": "e4877",
              "name": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4877",
              "id": "8a72b939-7f38-4a32-8beb-3c71339a5794"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4",
              "is_directed": false,
              "target": "e4876",
              "name": "http://pathwaycommons.org/pc2/Complex_de5b1a52d56b9d21cac69c68bfe10ff4-e4876",
              "id": "d94fc545-b3a8-4df2-9803-4724c335bab6"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147",
              "is_directed": false,
              "target": "e1386",
              "name": "http://pathwaycommons.org/pc2/Protein_1874cac3a2199e3c25cef5caff7e3147-e1386",
              "id": "6d2aa538-fe09-45c8-8a34-62a7ad371d05"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce",
              "is_directed": false,
              "target": "e5702",
              "name": "http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce-e5702",
              "id": "481ac54f-3fc3-495a-b168-8b80f903e11d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "is_directed": false,
              "target": "e2882",
              "name": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e2882",
              "id": "5f5c1bf1-678b-480e-aa4a-43b7672c939d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "is_directed": false,
              "target": "e2034",
              "name": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e2034",
              "id": "b073b978-4b9a-4a18-a1e9-47458d1e9c20"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "is_directed": false,
              "target": "e1802",
              "name": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571-e1802",
              "id": "c2c561f8-20ec-438d-8c6c-2d9566923449"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06",
              "is_directed": false,
              "target": "e1909",
              "name": "http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06-e1909",
              "id": "836df0ef-805d-459e-bbbc-e19fc7cee4c1"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4218",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1",
              "name": "e4218-http://pathwaycommons.org/pc2/Complex_bea1b0c4ae07e8cdfd70d5afd12f6ca1",
              "id": "7952977e-8e09-4d3f-bb25-c14628abd275"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_72fe3147795370f059df585f89535e99-e5435",
              "id": "51e82ce2-01be-4391-aaa0-6a38a46914a4"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4456",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55",
              "name": "e4456-http://pathwaycommons.org/pc2/Complex_692971dc8867aea9b60b41353fddbc55",
              "id": "3027aab4-70d1-415c-af5b-bdca755d51d3"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec",
              "popup": "e3256 http://identifiers.org/reactome/R-HSA-2176417",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa",
              "name": "http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec-http://pathwaycommons.org/pc2/Complex_b337beff28079565d75d6aa11235c6aa",
              "id": "c9771597-8bf9-4aad-b558-c3c7d35a8378"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7310",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05",
              "name": "e7310-http://pathwaycommons.org/pc2/Complex_14f6bd0857f740ea7a90326f79abdc05",
              "id": "bf6ffcee-f87b-49c6-859e-d590e5a35a10"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c",
              "is_directed": false,
              "target": "e7450",
              "name": "http://pathwaycommons.org/pc2/Protein_ca77eb08e624dae7d03987f1725ff66c-e7450",
              "id": "00988d89-02bf-42cc-8526-d3010ccf5937"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3999",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3",
              "name": "e3999-http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3",
              "id": "d269a779-ae3a-4502-8f57-9673923f7674"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3999",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063",
              "name": "e3999-http://pathwaycommons.org/pc2/Complex_1494f160420cd090dfb6aa9becd76063",
              "id": "3d366400-50b2-45f6-9976-ce1d154f0fb7"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95",
              "is_directed": false,
              "target": "e3859",
              "name": "http://pathwaycommons.org/pc2/Protein_5433c2d3bee1a9349022abac7fdfcd95-e3859",
              "id": "ce46ce65-cc8c-478a-bedc-601615ca27bc"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56",
              "is_directed": false,
              "target": "e5793",
              "name": "http://pathwaycommons.org/pc2/Dna_627a6b26a38ae17cadad0cbbb84bbf56-e5793",
              "id": "337a9271-f1cf-4622-9eac-7555af4c9b64"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "is_directed": false,
              "target": "e1393",
              "name": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e1393",
              "id": "5dcbf513-e444-42da-8076-8bf2393dce4d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "is_directed": false,
              "target": "e2995",
              "name": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e2995",
              "id": "010f845a-9535-452c-8fff-b8998f45eb5e"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "is_directed": false,
              "target": "e7645",
              "name": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e7645",
              "id": "7b282721-cbbf-4d5d-88e0-1184bd4ae2f8"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "is_directed": false,
              "target": "e3156",
              "name": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd-e3156",
              "id": "d2df31ac-d3df-4c74-94ee-e786840518c2"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3215",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d",
              "name": "e3215-http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d",
              "id": "0cef71cb-8498-4fde-8a8c-9117cf84e333"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f",
              "is_directed": false,
              "target": "e7404",
              "name": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f-e7404",
              "id": "d2f23894-d677-4e0e-b759-d955220a147d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f",
              "is_directed": false,
              "target": "e4456",
              "name": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f-e4456",
              "id": "6ca619fc-93a0-4cbd-a8eb-6ba033e61659"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b",
              "is_directed": false,
              "target": "e5452",
              "name": "http://pathwaycommons.org/pc2/Complex_f8528c7d3127b18cac6b0e6492ecbd2b-e5452",
              "id": "a3dabae4-0b24-44d2-94dc-f074cda2c921"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8",
              "is_directed": false,
              "target": "e1386",
              "name": "http://pathwaycommons.org/pc2/Complex_3a34d13cb4d06807c98801e5902318c8-e1386",
              "id": "61c9d9ee-a29b-402f-a8e3-46e66c83a96f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd",
              "is_directed": false,
              "target": "e3863",
              "name": "http://pathwaycommons.org/pc2/Protein_6a6025b76de59a2d26788d76e8ccb6bd-e3863",
              "id": "2b687bca-307e-45ce-8af8-197ead566b5c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e6950",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8",
              "name": "e6950-http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8",
              "id": "204cffa6-298d-48b5-8c95-8eb232dae044"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137",
              "is_directed": false,
              "target": "e3215",
              "name": "http://pathwaycommons.org/pc2/Complex_888c440e198a97eb4b3d8cfc3c248137-e3215",
              "id": "82109dff-9bed-4335-b99b-6a76bdf7a27f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537",
              "is_directed": false,
              "target": "e2220",
              "name": "http://pathwaycommons.org/pc2/Complex_5df3130a203e905b969b9a7c8cc98537-e2220",
              "id": "5e16da6e-c3a7-4976-8e0b-0cdd9a98a7e3"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e1802",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a",
              "name": "e1802-http://pathwaycommons.org/pc2/Complex_123a63ed96e1e7264328c82991c0b60a",
              "id": "00a15edf-2a69-4954-a552-4df7905c6fee"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1802",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "name": "e1802-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "id": "5a61ee52-9453-442e-8791-6ae748545749"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb",
              "is_directed": false,
              "target": "e5945",
              "name": "http://pathwaycommons.org/pc2/Complex_1e7cdaf7032241333057cba78526c8eb-e5945",
              "id": "c584895b-c572-4a7d-b4bd-1aede6a21ff7"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7225",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507",
              "name": "e7225-http://pathwaycommons.org/pc2/Complex_cd51a6f74aea53257125f2e0063b0507",
              "id": "a626f8f5-6081-4262-b338-a5566da8b8cc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3865",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce",
              "name": "e3865-http://pathwaycommons.org/pc2/Complex_cb431df6733f458bc3cea058c876b1ce",
              "id": "65db8423-d2f1-4f87-8fc0-32feed8370a3"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7227",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "name": "e7227-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "id": "14756231-a41b-4914-8125-b9e5b9ab3dac"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e7226",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "name": "e7226-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "id": "4e4ded00-45d5-4e0e-9f4f-ff5b05e3cddc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a",
              "is_directed": false,
              "target": "e6102",
              "name": "http://pathwaycommons.org/pc2/Dna_e4e33f259cba4e818e2b242bb3f9025a-e6102",
              "id": "6de5c9ed-4bab-418b-898d-4288cf1ad53d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc",
              "is_directed": false,
              "target": "e4218",
              "name": "http://pathwaycommons.org/pc2/Protein_afc35276d664d32d56eb46e380ce23dc-e4218",
              "id": "6500ff0f-c6a3-4cab-9f6c-c880cba33fab"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875",
              "is_directed": false,
              "target": "e1909",
              "name": "http://pathwaycommons.org/pc2/Protein_063554577b6e10adab02ce5e280ba875-e1909",
              "id": "591a93d3-6148-482f-aa86-5003dbcc129d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3858",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8",
              "name": "e3858-http://pathwaycommons.org/pc2/Complex_d96717440c5a2941c3218d31296db1d8",
              "id": "1011def9-b829-4d44-81d6-fd36884ee4b2"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c",
              "is_directed": false,
              "target": "e3861",
              "name": "http://pathwaycommons.org/pc2/Protein_0f44a9248a723f8e39b3e7f71eb5bf8c-e3861",
              "id": "523c9d4d-6ef9-43fb-9657-91b02795e87a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961",
              "is_directed": false,
              "target": "e3864",
              "name": "http://pathwaycommons.org/pc2/Protein_63cc5132677009f0eee33af5a550c961-e3864",
              "id": "96229552-8bf8-4b67-8e3d-6177513ae8ea"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e8046",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763",
              "name": "e8046-http://pathwaycommons.org/pc2/Complex_7e54c2c47f8fedefd8d90c418d520763",
              "id": "45bb3605-6627-4439-b583-37260e8513df"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3498",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9",
              "name": "e3498-http://pathwaycommons.org/pc2/Complex_b285b6491ad91456ecaed3f9bf6f13a9",
              "id": "ba577e1e-b5bd-4e2e-96bf-ec3cc31413bf"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df",
              "is_directed": false,
              "target": "e4876",
              "name": "http://pathwaycommons.org/pc2/Protein_6f45c6ebb5723a4bc03b38983d71a9df-e4876",
              "id": "2ce665f8-4958-4518-9e01-6125ab7763cf"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4875",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb",
              "name": "e4875-http://pathwaycommons.org/pc2/Complex_78681f14c8da1c21b59bf3f9c91014fb",
              "id": "fc7ac4cf-2edd-43cd-8a8c-0ad9aca4330a"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84",
              "is_directed": false,
              "target": "e4955",
              "name": "http://pathwaycommons.org/pc2/Protein_ca53104c0d8f5a48a77dafb403ddbc84-e4955",
              "id": "7b641cb0-d665-4bc6-acc8-156f100b850a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3156",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590",
              "name": "e3156-http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590",
              "id": "baa0acb0-0250-404a-a2c8-f221eb1bd55d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e5820",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611",
              "name": "e5820-http://pathwaycommons.org/pc2/Protein_7e075ad3e4c93ad58eb0512775d8e611",
              "id": "f9eac2d5-c96b-42f6-9114-5b4eeb18c6c3"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf",
              "is_directed": false,
              "target": "e7645",
              "name": "http://pathwaycommons.org/pc2/Protein_829f0f315bb58934962a46cf6feb1ecf-e7645",
              "id": "9978f73b-63c5-4c1d-a8e8-9582de8444aa"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f",
              "is_directed": false,
              "target": "e4221",
              "name": "http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f-e4221",
              "id": "786d59bf-9b60-47c2-bff9-dbc2d15a786d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6",
              "popup": "e3301 http://identifiers.org/reactome/R-HSA-4641129",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61",
              "name": "http://pathwaycommons.org/pc2/Complex_8db1627993c3900022e534061a20e3e6-http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61",
              "id": "3a332620-ed6c-4fd6-b16a-51c0e518f2ab"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76",
              "is_directed": false,
              "target": "e8046",
              "name": "http://pathwaycommons.org/pc2/Protein_f67f9db952cfb73e23f5f2b6cbf51f76-e8046",
              "id": "86cf190b-e638-49b6-a791-b70153af8a95"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82",
              "is_directed": false,
              "target": "e3867",
              "name": "http://pathwaycommons.org/pc2/Complex_fb9bc7ea9b436cb296747a2a846a3a82-e3867",
              "id": "826d838b-324d-4872-aa3f-7dd5613d57d6"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4943",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "name": "e4943-http://pathwaycommons.org/pc2/Protein_66ddcc3ce1de2d7fb8e262f71d7bbfdd",
              "id": "66c491e8-f7c1-4b22-9280-c6fdc9d1da31"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4943",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3",
              "name": "e4943-http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3",
              "id": "dbf83391-367a-4830-9d6b-9766eb94b71a"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "is_directed": false,
              "target": "e7084",
              "name": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9-e7084",
              "id": "b651aae9-7d60-4853-9129-17e4b83b99de"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "is_directed": false,
              "target": "e6950",
              "name": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9-e6950",
              "id": "dc058963-5319-4664-af8c-b9d5d352a759"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_d55781dc60a0e1ac0ce9a1f07b3c0518-e5435",
              "id": "0b77d8f8-8b6c-4cac-ab81-d5165487faf3"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "is_directed": false,
              "target": "e463",
              "name": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e463",
              "id": "2cb8242f-a8d7-4c90-9017-541e0fbf4618"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "is_directed": false,
              "target": "e3865",
              "name": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e3865",
              "id": "1cd6ef0e-bcb1-49d0-af58-96309368c9cb"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249",
              "is_directed": false,
              "target": "e5452",
              "name": "http://pathwaycommons.org/pc2/Protein_dcbdee3a09bcaa819ad233df0f225249-e5452",
              "id": "a3090add-16ef-402e-ae1d-25c8a93462a2"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d",
              "popup": "e5469 http://identifiers.org/reactome/R-HSA-2470508",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276",
              "name": "http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d-http://pathwaycommons.org/pc2/Complex_9c3ec5ae53e1424bcc6e4fb724ed4276",
              "id": "7834d32d-c556-427f-b802-30143c191398"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3862",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06",
              "name": "e3862-http://pathwaycommons.org/pc2/Complex_4eaf281c2d6c62c8d331bbec8c789f06",
              "id": "4eb1b5e0-3d4b-4b9d-8ab7-826de1043ddb"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3",
              "is_directed": false,
              "target": "e7299",
              "name": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3-e7299",
              "id": "5349d755-e188-40b4-b2e5-60670696577c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3",
              "is_directed": false,
              "target": "e7449",
              "name": "http://pathwaycommons.org/pc2/Protein_5907cc4600e1e571e8e556a7ea8dd0d3-e7449",
              "id": "d891daee-a060-4efd-87b8-1b081a3dbfbe"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3863",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce",
              "name": "e3863-http://pathwaycommons.org/pc2/Complex_c0e71d57dc8b3545cf818ee91a02a3ce",
              "id": "3626946e-33b2-4196-a76d-380337a925d5"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3070",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "name": "e3070-http://pathwaycommons.org/pc2/Protein_381da6fb8f5a0ccd71f7e54cde3f87a5",
              "id": "ca2bd694-fa20-4f36-b5b8-040b31684a62"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3070",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72",
              "name": "e3070-http://pathwaycommons.org/pc2/Protein_2cdef0162bb74cd592ba3c7a4a1dba72",
              "id": "e473608c-ff60-4c73-8224-0ced0ee0cd23"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3861",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20",
              "name": "e3861-http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20",
              "id": "a4772145-38cf-4b51-9192-cc4c2a505954"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3860",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f",
              "name": "e3860-http://pathwaycommons.org/pc2/Complex_bd93cb5f6a7f48772a3ba73d9d0c542f",
              "id": "0150c851-ef21-414c-947b-bea4631b5d51"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3866",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec",
              "name": "e3866-http://pathwaycommons.org/pc2/Complex_c557f68395053c0b1f503645dea310ec",
              "id": "72ff208b-e19f-4936-8393-e4375ccde027"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e5452",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "name": "e5452-http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "id": "5293e9a1-e782-4720-b82b-1906035e21a7"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e5452",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4",
              "name": "e5452-http://pathwaycommons.org/pc2/Protein_7b735c1a92ff12d4582e528c54acb9c4",
              "id": "8b476207-ed30-4d14-b353-26da8ff8a040"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3864",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f",
              "name": "e3864-http://pathwaycommons.org/pc2/Complex_65930b6421ef5428f1a8d814511b670f",
              "id": "b1b2788b-f9f1-48c2-b3b9-2c7fbd6e109d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2995",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3",
              "name": "e2995-http://pathwaycommons.org/pc2/Complex_e24f05e76bbf6fbc7d342317dbcd07a3",
              "id": "9bce31ad-4123-4d72-b537-ba484b24f727"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e",
              "popup": "e849 http://identifiers.org/reactome/R-HSA-1181149",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82",
              "name": "http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e-http://pathwaycommons.org/pc2/Complex_35572a2fbb32e5aad9f0f283f9491c82",
              "id": "7b47120f-802b-4278-a765-f1761637607d"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a",
              "is_directed": false,
              "target": "e4955",
              "name": "http://pathwaycommons.org/pc2/Complex_e3180c57825016ae20a8eb45b664068a-e4955",
              "id": "ab1494cb-6a20-4e70-a63d-13436710e661"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20",
              "is_directed": false,
              "target": "e5820",
              "name": "http://pathwaycommons.org/pc2/Complex_cfe9ad8bf3eab284ef5fc47f63c5af20-e5820",
              "id": "d1d44fe4-a17e-45ea-b036-c8a360a5fb92"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8",
              "is_directed": false,
              "target": "e3862",
              "name": "http://pathwaycommons.org/pc2/Protein_1dc1c19ae566688e9f84c356cc848dc8-e3862",
              "id": "37b8bad1-3ff7-49f5-92df-5fc740f13ac4"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7449",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1",
              "name": "e7449-http://pathwaycommons.org/pc2/Complex_bd3fe3bc119dc0f8c5c5e4a6b8fbebd1",
              "id": "67a7c02e-ec1d-4ed6-88bd-2d6be3ce103e"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a",
              "is_directed": false,
              "target": "e1393",
              "name": "http://pathwaycommons.org/pc2/Complex_3a9571f150530cfdab1a42f929a5f55a-e1393",
              "id": "ca1ad391-dded-4f0a-b13d-5e8bd3948c52"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e",
              "is_directed": false,
              "target": "e1386",
              "name": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e-e1386",
              "id": "07ea4314-f126-442e-8a85-2a5b3995468a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e",
              "is_directed": false,
              "target": "e5636",
              "name": "http://pathwaycommons.org/pc2/Protein_5a1c5206c2abbe6935471fe59cd2db6e-e5636",
              "id": "8e5d6fe5-1877-4dd1-a9ae-f8c63b1fa01e"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b",
              "is_directed": false,
              "target": "e3862",
              "name": "http://pathwaycommons.org/pc2/Protein_a69d4b8ba3763fad6a1c750ff7a2a06b-e3862",
              "id": "56fe58a7-07e3-4f0c-bf25-7bd59a0d0cc4"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3863",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3863",
              "id": "1798fcbd-48be-4711-b2c8-230002413786"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3862",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3862",
              "id": "06fa0e24-868c-4cdd-b958-d494865f4afd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3861",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3861",
              "id": "283b7a36-9a75-46c9-83b9-2f3c1c9d2b7c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3860",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3860",
              "id": "744745cd-928f-44e4-b7af-cd5f4f8141a9"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3867",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3867",
              "id": "df9f6caa-d211-454a-9af0-bc3a0c4d263b"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3866",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3866",
              "id": "e82ea863-0a32-43db-9be2-a05867fb27d0"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3865",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3865",
              "id": "2cfe6ff8-3e85-4183-9227-8ce2b17eea77"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3864",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3864",
              "id": "6c1557aa-26ee-4d9c-8282-fef2fa43cebb"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e6102",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e6102",
              "id": "22b2aaab-aab2-46f1-8488-d023bc237f96"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3858",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3858",
              "id": "0e0ddd08-e523-4812-9009-49a725455d3c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3859",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3859",
              "id": "2d6504a2-32f0-4268-b3be-1892eed69a45"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3",
              "is_directed": false,
              "target": "e3215",
              "name": "http://pathwaycommons.org/pc2/Complex_aa4057edd27209457a6c42705be5bbc3-e3215",
              "id": "467c2f29-9100-4e98-a043-bcc9443f5046"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b",
              "popup": "e5208 http://identifiers.org/reactome/R-HSA-170868",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680",
              "name": "http://pathwaycommons.org/pc2/Complex_ed6a5eb635fc7f8eb94bca2d6583732b-http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680",
              "id": "5004e32c-9dec-4fc5-a6de-a1506e8af089"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8",
              "is_directed": false,
              "target": "e3686",
              "name": "http://pathwaycommons.org/pc2/Complex_a1fd4731a51458c01a4ef8c0130fc4a8-e3686",
              "id": "943d03e3-3840-400f-bede-20907741be7b"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e2220",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25",
              "name": "e2220-http://pathwaycommons.org/pc2/Complex_d42414a4683f8bfb6c30638028986e25",
              "id": "f515beec-13e9-49b6-b415-f97a8a912aad"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2220",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131",
              "name": "e2220-http://pathwaycommons.org/pc2/Protein_1b641c94c1e7ee0c4b73c5f91882f131",
              "id": "c5e83e82-708b-4772-9428-60515315257f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55",
              "popup": "e2289 http://identifiers.org/reactome/R-HSA-870477",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c",
              "name": "http://pathwaycommons.org/pc2/Complex_613f6dae871095fc15de1074a375ff55-http://pathwaycommons.org/pc2/Complex_7d45022707d34e531e1301881c8a115c",
              "id": "a5403289-21c4-49ae-9859-51f1665ab7ab"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2518",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948",
              "name": "e2518-http://pathwaycommons.org/pc2/Complex_32ba1d4ac9e81b20e6b456b9dd07a948",
              "id": "bf3a0215-5cb0-4dec-a5e1-98f1b2bdff8e"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2518",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f",
              "name": "e2518-http://pathwaycommons.org/pc2/Protein_4b3bb7b6ade22d05d1884ac2f623744f",
              "id": "2f0ba0d9-96fd-4197-98f0-20d40e135624"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2518",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b",
              "name": "e2518-http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b",
              "id": "d85ec4e2-1523-48aa-b0a1-0571e30a3185"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c",
              "is_directed": false,
              "target": "e6950",
              "name": "http://pathwaycommons.org/pc2/Protein_1c1881e429622cdc509e574024ac138c-e6950",
              "id": "610c8477-340f-4b94-af0f-64258f0d3fbd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51",
              "is_directed": false,
              "target": "e3999",
              "name": "http://pathwaycommons.org/pc2/Complex_b0198cd221cb58c7c4f3f4bd1a5aaa51-e3999",
              "id": "13fb9945-7b70-4495-8f61-4ff08dbaa928"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0",
              "is_directed": false,
              "target": "e5636",
              "name": "http://pathwaycommons.org/pc2/Dna_20ad6d58a9acc43372aa6bcf6e827cf0-e5636",
              "id": "5ce54150-520b-4f08-a2a4-a514a4a6770f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_dd6591fd8445fbe967da8e74a90cacd6-e5435",
              "id": "0f7efd21-42ae-45c6-b8f4-4f154f0966cd"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680",
              "is_directed": false,
              "target": "e4491",
              "name": "http://pathwaycommons.org/pc2/Complex_cb7e262fdb0cdf3dcb311ebd8f905680-e4491",
              "id": "cbfe7736-bb48-4bd4-ad2b-cdbcc493701c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e",
              "is_directed": false,
              "target": "e3860",
              "name": "http://pathwaycommons.org/pc2/Protein_0c838e2eabecbb2061d61fb03d1ad39e-e3860",
              "id": "ad21411f-7c9d-4b62-97ab-db2db3aa4cfc"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d",
              "is_directed": false,
              "target": "e5713",
              "name": "http://pathwaycommons.org/pc2/Complex_dbf76c0dbdf60e51185042e66ca3c00d-e5713",
              "id": "444fdb36-bd0d-4a4c-8bcf-5b5105f57c74"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e2034",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a",
              "name": "e2034-http://pathwaycommons.org/pc2/Complex_96662c7f232019d43ba655b91d334d1a",
              "id": "ca91b80c-e22c-4817-afe6-f2126e4b6b7f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e2034",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "name": "e2034-http://pathwaycommons.org/pc2/Complex_f13ae9f2a0a604cc0974c4695abf5571",
              "id": "5f8ecf1b-0f1c-42db-a7c3-b74b1502a0a6"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e",
              "is_directed": false,
              "target": "e3858",
              "name": "http://pathwaycommons.org/pc2/PhysicalEntity_3b7ccfbf504d2bf4b46e0f043e1b966e-e3858",
              "id": "3e161c5f-fcd9-4815-a5d8-2bb0e5be8c98"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76",
              "is_directed": false,
              "target": "e4274",
              "name": "http://pathwaycommons.org/pc2/Protein_3c95a1c29b91284dab3aa43a7f347d76-e4274",
              "id": "e62f932f-14e6-48db-a309-b901bb2a01ff"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6",
              "is_directed": false,
              "target": "e5548",
              "name": "http://pathwaycommons.org/pc2/Complex_fed836a63c2bded9017a612bb3581de6-e5548",
              "id": "0b2daf13-e4ea-4af6-ab53-4a57cc86f4bc"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd",
              "is_directed": false,
              "target": "e5945",
              "name": "http://pathwaycommons.org/pc2/Dna_a12d7ebcad61f786f2800e49a3aa91fd-e5945",
              "id": "5473e390-26fb-4917-917b-6f0cc4fc2d3f"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7124",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1",
              "name": "e7124-http://pathwaycommons.org/pc2/Complex_80cac08c4f318893e7be74f333e333f1",
              "id": "fae38d63-4085-424e-aa7e-d3d25570a757"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4365",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119",
              "name": "e4365-http://pathwaycommons.org/pc2/Protein_187a016b8028fd5fda820d54cfc97119",
              "id": "3048004f-cb4c-4184-8ba1-da81ba43ddf8"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4365",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44",
              "name": "e4365-http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44",
              "id": "43d93d64-a7a4-4182-9fc4-0fa572e8133f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4365",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b",
              "name": "e4365-http://pathwaycommons.org/pc2/Protein_5a9389b4117978c2b032b32d4c72ac9b",
              "id": "d0a5ce9c-864f-49c2-9b70-639a6dad5ff9"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7",
              "is_directed": false,
              "target": "e4877",
              "name": "http://pathwaycommons.org/pc2/Protein_b7ef868124a54a29f6e21ec132bb8fc7-e4877",
              "id": "a8cc52a7-ecf9-475d-aca0-58308cbdc75a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309",
              "is_directed": false,
              "target": "e3498",
              "name": "http://pathwaycommons.org/pc2/Protein_4cf7d6ab778a6f6a6df4d78865fdc309-e3498",
              "id": "cc19e9d2-5937-4dcb-b3cc-f187f1ea61ae"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_3515b32db4767a24e98b4820bad8f4a0-e5435",
              "id": "69280a73-38ef-4865-b87c-7927545160a3"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219",
              "is_directed": false,
              "target": "e7299",
              "name": "http://pathwaycommons.org/pc2/Protein_4094c4dbf6212b6191d4fcb78a5eb219-e7299",
              "id": "227ec6ef-fea8-4909-8cb6-31aa429744d7"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44",
              "is_directed": false,
              "target": "e3866",
              "name": "http://pathwaycommons.org/pc2/Protein_df5f8bee80287f5873b5d2727c496a44-e3866",
              "id": "99d90267-1d95-4188-9711-2619523259b5"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a",
              "is_directed": false,
              "target": "e463",
              "name": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a-e463",
              "id": "5bea3c1c-6c67-4055-8f5d-3cc2680b1dda"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a",
              "is_directed": false,
              "target": "e5452",
              "name": "http://pathwaycommons.org/pc2/Protein_bf60c486cab4e78031c5efdf21d5db0a-e5452",
              "id": "2db7e632-4ca1-4bba-99c9-071e3325f07d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7914",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b",
              "name": "e7914-http://pathwaycommons.org/pc2/Complex_ee9bada8dcecd01d7e9b9f48e5ee3f9b",
              "id": "ea9b1fa4-66d0-45b2-8ed2-47ab585352ae"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690",
              "is_directed": false,
              "target": "e6718",
              "name": "http://pathwaycommons.org/pc2/Protein_069e0c79642cbd5cee1643b7a8e28690-e6718",
              "id": "a3d5ebb0-7b64-4968-9091-e26aff7c8380"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7582",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec",
              "name": "e7582-http://pathwaycommons.org/pc2/Complex_8b6e28539fe6202f9d19719cd39fbfec",
              "id": "f2ee10c1-bdfc-4149-b405-cf5845768a71"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3859",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209",
              "name": "e3859-http://pathwaycommons.org/pc2/Complex_70eb71b8dc1abbd5bc37f03d117cc209",
              "id": "308a4b62-77cb-4709-a049-eacea29b7445"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375",
              "is_directed": false,
              "target": "e4955",
              "name": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375-e4955",
              "id": "d8e4892e-fc07-40fd-a679-0df3d2f24ce2"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375",
              "is_directed": false,
              "target": "e4876",
              "name": "http://pathwaycommons.org/pc2/Protein_c90d0d480b2483115a9ff63bee377375-e4876",
              "id": "eb19ea1e-64ef-49a6-8e22-092a25b45b88"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7",
              "popup": "e646 http://identifiers.org/reactome/R-HSA-201472",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886",
              "name": "http://pathwaycommons.org/pc2/Complex_19577e18a51a4ac966413f9eb16457d7-http://pathwaycommons.org/pc2/Complex_97489d39d45187b1db8d5cca1e359886",
              "id": "cadeaefe-58ac-4d0e-97db-b74eb41cec38"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c",
              "is_directed": false,
              "target": "e2882",
              "name": "http://pathwaycommons.org/pc2/Complex_784b744e2b66b75c8de35ca4d31df19c-e2882",
              "id": "bc2b9272-7f49-4993-844f-bd8c1fb6f0c4"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5636",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1",
              "name": "e5636-http://pathwaycommons.org/pc2/Complex_a8f9aa928307d8247b912f62259b7ff1",
              "id": "e8002ee2-ab03-4456-a165-dacb3a376b79"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51",
              "is_directed": false,
              "target": "e4875",
              "name": "http://pathwaycommons.org/pc2/Protein_5cbb821a6466ffdb39cac62c0e77cc51-e4875",
              "id": "a5ecf0c3-e49c-402a-a493-3767bdf2d2bb"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3686",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "name": "e3686-http://pathwaycommons.org/pc2/Protein_3d9c79a018d9c56d6a715d974f5716a9",
              "id": "ccba879a-77f0-4fd0-b0d0-0ebc9439edac"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3686",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a",
              "name": "e3686-http://pathwaycommons.org/pc2/Complex_a63c20048997fbc518fa7ec4270ce42a",
              "id": "cce9e868-ec45-4b01-b048-c385797097c1"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "is_directed": false,
              "target": "e2882",
              "name": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e2882",
              "id": "66ba7d27-9530-4734-a1fa-5948ed533686"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "is_directed": false,
              "target": "e2034",
              "name": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e2034",
              "id": "fa25320e-efb8-4758-b713-c732e07f5916"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "is_directed": false,
              "target": "e1802",
              "name": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e1802",
              "id": "13fcbda3-3a0a-4157-8e03-5f960ed77fb1"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30-e5435",
              "id": "be90a649-c962-47e2-a5d6-7df7ba5083f6"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e6102",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd",
              "name": "e6102-http://pathwaycommons.org/pc2/Protein_e9ab50906f39aa9989e4adf1cb82d7bd",
              "id": "a9f72349-2077-4468-a196-d8feac5ced7a"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Complex_f814fb818ef7fb6f605ad308fd5fc441-e5435",
              "id": "229143fe-4fc9-4a41-8856-1bd1817f955e"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3",
              "is_directed": false,
              "target": "e7582",
              "name": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3-e7582",
              "id": "f2c13b0d-4d73-4d99-a882-6b429dd4e2f7"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3",
              "is_directed": false,
              "target": "e4457",
              "name": "http://pathwaycommons.org/pc2/Protein_5f460e094aa54a69bdbc491dfa7cb8b3-e4457",
              "id": "80c5f162-3fc7-4790-bd65-a2583a60800d"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3",
              "is_directed": false,
              "target": "e7084",
              "name": "http://pathwaycommons.org/pc2/Protein_2880640b0eb3d42de76e8210d5ec51f3-e7084",
              "id": "a52b6765-7f68-43dd-ba54-cd1225a107ba"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4491",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef",
              "name": "e4491-http://pathwaycommons.org/pc2/Complex_d79d058b3e4afd1c77437625d05171ef",
              "id": "cf2044fb-3af6-451d-aa3d-4dcb764a87fc"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4491",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "name": "e4491-http://pathwaycommons.org/pc2/Protein_500961beb1e03bd4e9d2e4f0ef5a9e41",
              "id": "8e102bea-1511-4500-a758-54a65519e866"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e1909",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60",
              "name": "e1909-http://pathwaycommons.org/pc2/Complex_31c488f05d4ba003cdac51655053ea60",
              "id": "55e8fe1c-7c00-438d-b1a3-9c815217e539"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b",
              "is_directed": false,
              "target": "e1802",
              "name": "http://pathwaycommons.org/pc2/Protein_a9ae8c9e2b10c6e5e5a0df258992ce9b-e1802",
              "id": "801390f2-d0f2-423c-966c-28e673b0f1be"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e5793",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "name": "e5793-http://pathwaycommons.org/pc2/Protein_85aa6a23af190ee984da4c4bad4cbfde",
              "id": "794a97e0-acf6-4a7e-a354-faa58ca7a1e1"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e463",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "name": "e463-http://pathwaycommons.org/pc2/Protein_84efe1f7d28624c034cd3cbe7364ff30",
              "id": "93bd4657-23d6-4096-a713-531e9b065aed"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e463",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7",
              "name": "e463-http://pathwaycommons.org/pc2/Complex_f02dd3219c376c141c54d9e16e1c53f7",
              "id": "312efd98-cc81-4f4b-9476-af420a17d702"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e",
              "is_directed": false,
              "target": "e3178",
              "name": "http://pathwaycommons.org/pc2/Complex_86d9fa18d914d70eafb951be9323f18e-e3178",
              "id": "7afa4001-8e02-4e80-a589-d3280a5f3473"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a",
              "is_directed": false,
              "target": "e4776",
              "name": "http://pathwaycommons.org/pc2/Complex_dabc93f0a00e0cfcf18f116001e7c22a-e4776",
              "id": "35bcce6a-3323-43ea-bb56-840e659a2a20"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e7450",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3",
              "name": "e7450-http://pathwaycommons.org/pc2/Complex_26cdb2531384f90eb0cf2cef9022e1f3",
              "id": "1f32f8e3-c4b8-4a15-ac91-a82caba0e14f"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4955",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d",
              "name": "e4955-http://pathwaycommons.org/pc2/Complex_f9e16bdfc3911a1157ff5b16ef14096d",
              "id": "bd5cff8c-4d5e-4cf3-8335-b892f7b783eb"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_7373ef3d1607f9f50c8b37101439958a-e5435",
              "id": "26a4bdde-f28e-464f-a7a8-859d144f9307"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27",
              "is_directed": false,
              "target": "e5435",
              "name": "http://pathwaycommons.org/pc2/Protein_610af79ad3ba839a7a34093c17139f27-e5435",
              "id": "8446caed-122c-4555-a88e-79e2e8493e55"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e4877",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03",
              "name": "e4877-http://pathwaycommons.org/pc2/Complex_5fb610925c6a29677db081eeb71cbf03",
              "id": "1ed546f3-3870-48f6-a510-7d7cfdf87abf"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4876",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e",
              "name": "e4876-http://pathwaycommons.org/pc2/Complex_2366474da678748a5310bf6b9bbd273e",
              "id": "d9453c56-d8ac-494e-809f-150be20722b0"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb",
              "is_directed": false,
              "target": "e3117",
              "name": "http://pathwaycommons.org/pc2/Complex_836fc87519e6f23fd38327c01ee26cfb-e3117",
              "id": "92b827ba-fc53-4b14-a3db-1c04f7303cd7"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a",
              "is_directed": false,
              "target": "e5793",
              "name": "http://pathwaycommons.org/pc2/Complex_e647ce6ab33d9195703c099096b4711a-e5793",
              "id": "dd8bbd44-5379-42f5-b140-8ebbd2868185"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590",
              "is_directed": false,
              "target": "e85",
              "name": "http://pathwaycommons.org/pc2/Complex_030479b20a05e607e2a32d7702f1b590-e85",
              "id": "4dbf8549-a4d1-4d8d-9f29-fff6e7191aef"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "e3117",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "name": "e3117-http://pathwaycommons.org/pc2/Protein_293f27d61ef9e6901613a24473d68a21",
              "id": "57004734-c58d-4173-a895-815a2dfc46c1"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e3117",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b",
              "name": "e3117-http://pathwaycommons.org/pc2/Protein_d08739c843b3142dc78e8b376499c04b",
              "id": "7cb215ca-76eb-4870-a471-83d37fbeee40"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e4776",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f",
              "name": "e4776-http://pathwaycommons.org/pc2/Complex_ab0f30a890f54fe9e166854e40b8df0f",
              "id": "a8b0a520-ea33-48c0-9ea5-9927d8054487"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "e5435",
              "is_directed": true,
              "target": "http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc",
              "name": "e5435-http://pathwaycommons.org/pc2/Complex_08a5e16fb2641e933991a44ebd49fcdc",
              "id": "f846bac0-dec9-42a3-aeda-6a40465afb5c"
            },
            "style": {
              "curve-style": "bezier",
              "line-color": "#000000",
              "target-arrow-shape": "triangle",
              "target-arrow-fill": "filled",
              "width": "1px",
              "line-style": "solid",
              "target-arrow-color": "#000000"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89",
              "is_directed": false,
              "target": "e3858",
              "name": "http://pathwaycommons.org/pc2/Protein_5b10abc160af47b36e90f320b01c0d89-e3858",
              "id": "e6a394f0-b304-4573-bc18-7c209afcf2d5"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61",
              "is_directed": false,
              "target": "e1807",
              "name": "http://pathwaycommons.org/pc2/Complex_4a62b6dc06a63eb4fffe47c1b24eaf61-e1807",
              "id": "1211b58d-e079-4986-8b0a-41b5b986b6ab"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7",
              "is_directed": false,
              "target": "e8046",
              "name": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7-e8046",
              "id": "f835ead8-db0c-4995-8dd9-ebc8ff49be68"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7",
              "is_directed": false,
              "target": "e7310",
              "name": "http://pathwaycommons.org/pc2/Protein_97fbc6ca2b42c58f2f1b7477ac118ed7-e7310",
              "id": "dfec2744-a6ec-4d2b-af93-2445b69c9e1a"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90",
              "is_directed": false,
              "target": "e1802",
              "name": "http://pathwaycommons.org/pc2/Complex_4a407bc5e378d9b03b5918472350fe90-e1802",
              "id": "b77a7e90-1f64-4fed-ba81-3b29e9a88e7c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681",
              "is_directed": false,
              "target": "e5793",
              "name": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681-e5793",
              "id": "69ba174c-34e7-41e0-bdd7-c96d4f4c9037"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          },
          {
            "data": {
              "source": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681",
              "is_directed": false,
              "target": "e5702",
              "name": "http://pathwaycommons.org/pc2/Complex_c3a09ff57a917a1dc603e5eb308b7681-e5702",
              "id": "22d2d524-bdba-45ae-910e-ff15d949885c"
            },
            "style": {
              "width": "3px",
              "curve-style": "bezier",
              "line-style": "solid",
              "line-color": "black",
              "target-arrow-shape": "none"
            }
          }
        ]
      },
      "data": {
        "name": "Signaling-by-Activin TO Signaling-by-TGF-beta-Receptor-Complex k=3",
        "tags": [
          "GLBio2019"
        ]
      }
    }
  }

  private stampNodeAndElementGroupsAndDeleteFields(result: any, edgeFields: string[]) {
    // @ts-ignore
    result.elements.nodes.forEach(node => {
      node.group = 'nodes'
    })
    // @ts-ignore
    result.elements.edges.forEach(edge => {
      edge.group = 'edges'
      this.deleteFields(edge.style, edgeFields)
    })
  }

  // Without this called with ['curve-bezier'], you get:
  // core.js:6272 ERROR Error: An element must have a core reference and parameters set
  // at ke (cytoscape.min.js:23)
  // at new Re (cytoscape.min.js:23)
  // at eo.add (cytoscape.min.js:23)
  // at CytoscapeGraphComponent.render (cytoscape-angular.js:86)
  // at CytoscapeGraphComponent.ngOnChanges (cytoscape-angular.js:37)
  // at CytoscapeGraphComponent.wrapOnChangesHook_inPreviousChangesStorage (core.js:27246)
  // at callHook (core.js:4774)
  // at callHooks (core.js:4734)
  // at executeCheckHooks (core.js:4654)
  // at selectIndexInternal (core.js:9729)
  private deleteFields(obj: any, fields: string[]) {
    fields?.forEach(field => delete obj[field])
  }

  bigGraphLayoutToolbarChange($event: any) {
    console.log(`app gets big layout toolbar change ${JSON.stringify($event)}`)
    this.bigGraph?.render()
  }

  bigGraphLayoutStylesToolbarChange($event: cytoscape.Stylesheet[]) {
    console.log(`app gets biggraph style toolbar change ${JSON.stringify($event)}`)
    this.bigGraph?.render()
  }

  bigGraphLayoutStylesSelectorChange(selector: string) {
    console.log(`app gets biggraph style selector change: ${JSON.stringify(selector)}`)
    this.bigGraph?.zoomToElement(selector)
  }

  @HostListener('window:beforeunload', ['$event'])
  ngOnDestroy() {
    console.log(`on destroy`)
    if (this.subscription != null) {
      this.subscription.unsubscribe()
    }
  }
}

