import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { selectGraph } from './stats/graph.selectors';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    items: MenuItem[] = [];

    subscriptions: any = [];

    constructor(
        private title: Title,
        private store: Store) {
        this.title.setTitle(`MySystem 1.1.1`)
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
