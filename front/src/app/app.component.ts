import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';

// node.js, the same, but with sugar:
var md = require('markdown-it')();

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    items: MenuItem[] = [];

    subscriptions: any = [];
    static aboutMd: string

    constructor(
        private title: Title,
        private store: Store) {
        this.title.setTitle(`MySystem 1.2.1`)
        AppComponent.aboutMd = md.render(`
## My system

This tool aim to design complex system with a component view target
- based on [cytoscapejs](https://js.cytoscape.org)
- based on [primeng](https://www.primefaces.org/primeng/)
- based on [json-rules-engine](https://github.com/CacheControl/json-rules-engine)

I used it on my own to design my system

## December 2022 : version 1.2.x

### Features releases

- Add ruleset manager to check graph integrity
    - ex: check each node having some tag
    - ex: check label naming rule
    - etc ...

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

`)
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Graph',
                icon: 'pi pi-fw pi-box',
                items: [
                    { label: 'Graph(s)', icon: 'pi pi-fw pi-book', routerLink: '/graphs' }
                ]
            },
            {
                label: 'Rule',
                icon: 'pi pi-fw pi-box',
                items: [
                    { label: 'Rule(s)', icon: 'pi pi-fw pi-book', routerLink: '/rules' }
                ]
            },
            {
                label: 'Style',
                icon: 'pi pi-fw pi-box',
                items: [
                    { label: 'Style(s)', icon: 'pi pi-fw pi-book', routerLink: '/styles' }
                ]
            },
            {
                label: 'Misc',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Preferences', icon: 'pi pi-fw pi-database', routerLink: '/preferences' },
                    { label: 'Images', icon: 'pi pi-fw pi-cloud-upload', routerLink: '/converters/images' },
                    { label: 'About', icon: 'pi pi-fw pi-at', routerLink: '/about' }
                ]
            }
        ];
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            _.each(this.subscriptions, (subscription) => {
                subscription.unsubscribe();
            })
        }
    }
}
