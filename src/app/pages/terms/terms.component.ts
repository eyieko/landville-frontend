import { Component, OnInit } from '@angular/core';
import { TermsService } from 'src/app/services/terms/terms.service';
import { Observable } from 'rxjs';
import { Term } from 'src/app/models/Term';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsPageComponent implements OnInit {

  terms: Observable<Term>;
  constructor(private termsService: TermsService) {
  }

  ngOnInit() {
    this.terms = this.termsService.getTerms();

  }

}
