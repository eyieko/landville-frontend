import { Component, OnInit } from '@angular/core';
import { TermsService } from 'src/app/services/terms/terms.service';
import { Observable } from 'rxjs';
import { Term } from 'src/app/models/Term';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsPageComponent implements OnInit {

  terms: Observable<Term>;
  constructor(private termsService: TermsService, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('LandVille Terms and Conditions of Use')
    this.terms = this.termsService.getTerms();

  }

}
