import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DatabaseService } from './services/database.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'front';
    items: MenuItem[] = [];

    constructor() {

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
}
