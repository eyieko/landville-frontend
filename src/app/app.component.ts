import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(private metaService: Meta) {

  }

  ngOnInit(): void {
    this.setPageMetaData();
  }
  setPageMetaData() {
    this.metaService.addTags([
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Bitly' },
    ]);
  }

}
