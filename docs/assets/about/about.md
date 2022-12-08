## My system

This tool aim to design complex system with a component view target
- based on [cytoscapejs](https://js.cytoscape.org)
- based on [primeng](https://www.primefaces.org/primeng/)
- based on [json-rules-engine](https://github.com/CacheControl/json-rules-engine)

I used it on my own to design my system

## December 2022 : version 1.2.x

### Features releases

#### Features release "ruleset"

- Add ruleset manager to check graph integrity
    - ex: check each node having some tag
    - ex: check label naming rule
    - etc ...
- Add sample ruleset
```json
[
    {
        "name": "Each listener must have a label with @reference or different label and is an alias",
        "sets": [
            "element[type='node' and data.tag='listener']"
        ],
        "asserts": [
            "data.label = '@reference'"
        ]
    },
    {
        "name": "All edge targeting a listener must have a label 'provide' or 'ClientId: *",
        "sets": [
            "element[type='edges' and data.target.tag='listener']"
        ],
        "asserts": [
            "data.label = 'provide'",
            "data.label = 'ClientId: *'"
        ]
    }
]
```

- Click on failed ruleset will update ruleset status
- Add debug mode and property "Apply ruleset on save" in preferences

## November 2022 : version 1.1.x

### Features releases

- Manage many style sheet
- Find alias by label or id (target and alias)
- Display alias documentation only
- Add alias option on node
- Modify inline documentation
- Rework any node id on next save
- Add 3d view of graph

### Bugs

- GEXF can export more than one edge over 2 nodes
- Rewrite with a new GUID cloned node (without infinte @.. append)

## October 2022

### Features releases

- Add icon to menu action (core, node and edge)
- Add a default content value in style if content is not defined

![Alt text](assets/about/display-node.PNG "display node label")

### Bugs

- Add favicon.ico (replace default angular favicon.ico)
- Generate error in console while mis selecting any node

