import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'front';
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
                label: 'Graph',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Browse', icon: 'pi pi-fw pi-book', routerLink: '/browse' }
                ]
            }
        ];
    }
}
