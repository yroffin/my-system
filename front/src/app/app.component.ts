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
                label: 'File',
                items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        { label: 'Project' },
                        { label: 'Other' },
                    ]
                },
                { label: 'Open' },
                { label: 'Quit' }
                ]
            },
            {
                label: 'Graph',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Browse', icon: 'pi pi-fw pi-book', routerLink: '/browse' },
                    { label: 'Default', icon: 'pi pi-fw pi-trash', routerLink: '/graph/Default' },
                    { label: 'Another', icon: 'pi pi-fw pi-refresh', routerLink: '/graph/Another' },
                    { label: 'D3', icon: 'pi pi-fw pi-refresh', routerLink: '/graphd3/Default' }
                ]
            }
        ];
    }
}
