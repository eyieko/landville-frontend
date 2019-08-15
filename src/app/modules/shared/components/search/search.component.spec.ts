import { configureTestSuite } from 'ng-bullet';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';
import { SearchService } from 'src/app/services/search/search.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { searchServiceSpy, resetSpies } from 'src/app/helpers/tests/spies';
import { mockSearchResponse } from 'src/app/helpers/tests/mocks';
import { ButtonComponent } from 'src/app/modules/shared/components/button/button.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeAll(() => {
    resetSpies([searchServiceSpy]);
    searchServiceSpy.search$ = of(mockSearchResponse);
  });

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, ButtonComponent],
      providers: [
        {
          provide: SearchService,
          useValue: searchServiceSpy
        },
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchServiceSpy.searchProperties.and.returnValue(of(mockSearchResponse));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use search function', () => {
    component.search({ value: 'any' });
    expect(searchServiceSpy.searchProperties).toBeDefined();
  });

});
