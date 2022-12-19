import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { selectMenuIds, setDrawMode, setGroupMode, setZoom } from './stats/menu.actions';
import { menuIds } from './models/menu';
import { selectMenu, selectParameter } from './stats/menu.selectors';
import { MenuService } from './services/menu.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    items: MenuItem[] = [];

    subscriptions: any = [];
    static aboutMd: string

    zoom = 1.;
    drawMode = false;
    groupMode = false;
    menu$ = this.store.select(selectMenu);
    parameter$ = this.store.select(selectParameter);

    constructor(
        private title: Title,
        private menuService: MenuService,
        private store: Store) {
        this.title.setTitle('MySystem 1.2.4')

        this.subscriptions.push(this.parameter$.subscribe(message => {
            this.drawMode = message.drawMode
            this.groupMode = message.groupMode
            this.zoom = message.zoom
        })
        )
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Graph',
                icon: 'pi pi-fw pi-box',
                items: [
                    { label: 'Graph(s)', icon: 'pi pi-fw pi-book', routerLink: '/graphs' },
                    {
                        label: 'Apply',
                        icon: 'pi pi-sitemap',
                        items: [
                            {
                                label: 'Apply rules', icon: 'pi pi-map', command: () => {
                                    this.menuService.dispatch(menuIds.graph_apply_rules)
                                }
                            },
                            {
                                label: 'Apply properties', icon: 'pi pi-wallet', command: () => {
                                    this.menuService.dispatch(menuIds.graph_change_properties)
                                }
                            },
                            {
                                label: 'Add new node', icon: 'pi pi-plus', command: () => {
                                    this.menuService.dispatch(menuIds.graph_add_new_node)
                                }
                            }
                        ],
                    },
                    {
                        label: 'Graph',
                        icon: 'pi pi-sitemap',
                        items: [
                            {
                                label: 'Bread First Layout', icon: 'pi pi-ellipsis-h', command: () => {
                                    this.menuService.dispatch(menuIds.graph_layout_bread_first)
                                }
                            },
                            {
                                label: 'Concentric Layout', icon: 'pi pi-ellipsis-h', command: () => {
                                    this.menuService.dispatch(menuIds.graph_layout_concentric)
                                }
                            },
                            {
                                label: 'Circle Layout', icon: 'pi pi-ellipsis-h', command: () => {
                                    this.menuService.dispatch(menuIds.graph_layout_circle)
                                }
                            },
                            {
                                label: 'Grid Layout', icon: 'pi pi-ellipsis-h', command: () => {
                                    this.menuService.dispatch(menuIds.graph_layout_grid)
                                }
                            },
                            {
                                label: 'Cose Layout', icon: 'pi pi-ellipsis-h', command: () => {
                                    this.menuService.dispatch(menuIds.graph_layout_cose)
                                }
                            },
                        ]
                    }
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
            },
            {
                label: 'Statistics',
                icon: 'pi pi-chart-pie',
                items: [
                    {
                        label: 'Groups', icon: 'pi pi-chart-pie', command: () => {
                            this.menuService.dispatch(menuIds.statistics_groups)
                        }
                    },
                    {
                        label: 'Tags', icon: 'pi pi-chart-pie', command: () => {
                            this.menuService.dispatch(menuIds.statistics_tags)
                        }
                    }
                ]
            }
        ];
    }

    onChangeZoom(event: any): void {
        this.store.dispatch(setZoom({ message: this.zoom }))
    }

    onChangeDrawMode(event: any): void {
        this.store.dispatch(setDrawMode({ message: this.drawMode }))
    }

    onChangeGroupMode(event: any): void {
        this.store.dispatch(setGroupMode({ message: this.groupMode }))
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            _.each(this.subscriptions, (subscription) => {
                subscription.unsubscribe();
            })
        }
    }
}
