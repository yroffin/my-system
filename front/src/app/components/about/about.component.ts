import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about!: string

  constructor() {
  }

  ngOnInit(): void {
    this.about = AppComponent.aboutMd
  }

}
