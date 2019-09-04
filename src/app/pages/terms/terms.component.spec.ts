import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsService } from 'src/app/services/terms/terms.service';
import { TermsPageComponent } from 'src/app/pages/terms/terms.component';

describe('TermsPageComponent', () => {
  let component: TermsPageComponent;
  let fixture: ComponentFixture<TermsPageComponent>;
  let MockTermService;
  beforeEach(async(() => {
    MockTermService = jasmine.createSpyObj(['getTerms']);
    TestBed.configureTestingModule({
      declarations: [TermsPageComponent],
      providers: [{ provide: TermsService, useValue: MockTermService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create successfully', () => {
    expect(component).toBeTruthy();
  });
});
