import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registersuccess',
  templateUrl: './registersuccess.component.html',
  styleUrls: ['./registersuccess.component.scss']
})
export class RegistersuccessComponent implements OnInit {

  constructor(
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags);
    });
  }

}
