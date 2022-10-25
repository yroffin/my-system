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
                label: 'Converters',
                icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Images(s)', icon: 'pi pi-fw pi-cloud-upload', routerLink: '/converters/images' }
                ]
            }
        ];
    }
}
