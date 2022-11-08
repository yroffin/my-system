import { Component, OnInit } from '@angular/core';

// node.js, the same, but with sugar:
var md = require('markdown-it')();

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: string

  constructor() {
    this.about = md.render(`
  ## My system

  This tool aim to design complex system with a component view target
  - based on [cytoscapejs](https://js.cytoscape.org)
  - based on [primeng](https://www.primefaces.org/primeng/)

  I used it on my own to design my system

  ## November 2022

  ### Features releases

  - Add alias option on node
  - Modify inline documentation
  - Rework any node id on next save
  - Add 3d view of graph

  ### Bugs
  
  - Rewrite with a new GUID cloned node (without infinte @.. append)

  ## October 2022

  ### Features releases

  - Add icon to menu action (core, node and edge)
  - Add a default content value in style if content is not defined

  ![Alt text](assets/about/display-node.PNG "display node label")

  ### Bugs

  - Add favicon.ico (replace default angular favicon.ico)
  - Generate error in console while mis selecting any node

  `)
  }

  ngOnInit(): void {
  }

}
