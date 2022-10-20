# About

Simple webapp single page to edit graph, i use it to design all my solution and share with my team graph view of system i support

# Demo

Simply go to https://yroffin.github.io/my-system then load sample.gexf as new graph
And use demo tag style stored in asset (cut and paste if thru tag menu)

First create a single graph named sample, then open it with icon selector

![Alt text](front/demo/graph.PNG "graph creation")

In graph editor simply grad and drop sample.gexf onto graph

![Alt text](front/demo/drag.PNG "graph editor")

Last actoin could be style import with style editot (like sample.gexf drag and drop style.json file)

![Alt text](front/demo/style.PNG "style editor")

# How to build

```
npm start
```

# How to deploy

```
ng build --output-path ../docs --base-href /my-system/
```
