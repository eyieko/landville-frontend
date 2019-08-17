import { Component, OnInit } from '@angular/core';
import { TermsService } from 'src/app/services/terms/terms.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsPageComponent implements OnInit {

  terms: Observable<any>;
  constructor(private termsService: TermsService) {
  }

  ngOnInit() {
    this.terms = this.termsService.getTerms();

  }

}
