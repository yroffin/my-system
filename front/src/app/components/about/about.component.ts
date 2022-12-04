import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// node.js, the same, but with sugar:
var md = require('markdown-it')();

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about!: string

  constructor(
    private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.http.get('assets/about/about.md', {
      responseType: "text"
    }
    ).subscribe((body) => {
      this.about = md.render(body)
    })
  }

}
