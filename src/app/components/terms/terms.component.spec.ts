import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsService } from '../../services/terms/terms.service'
import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;
  let MockTermService;
  beforeEach(async(() => {
    MockTermService = jasmine.createSpyObj(['getTerms']);
    TestBed.configureTestingModule({
      declarations: [TermsComponent],
      providers: [{ provide: TermsService, useValue: MockTermService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });
});
