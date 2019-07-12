import {async, TestBed} from '@angular/core/testing';

import {CommonLayoutComponent} from './common-layout.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FooterComponent} from '../../components/footer/footer.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';


describe('CommonLayoutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        CommonLayoutComponent,
        FooterComponent,
        NavbarComponent,
      ]
    }).compileComponents();
  }));

  it('should create the commonLayoutComponent', () => {
    const fixture = TestBed.createComponent(CommonLayoutComponent);
    const commonLayoutComponent = fixture.debugElement.componentInstance;
    expect(commonLayoutComponent).toBeTruthy();
  });
});

