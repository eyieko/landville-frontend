import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { by, element } from 'protractor';

import { Error500Component } from './error500.component';

describe('Error500Component', () => {
  let component: Error500Component;
  let fixture: ComponentFixture<Error500Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Error500Component ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const code = 500;
  const codeTitle = 'INTERNAL SERVER ERROR';
  const codeDescription = 'Sorry Something went wrong on our end. We are currently working to fix the problem.';
  const redirectTo = '/';
  const buttonName = 'Go back to main page';

  it('should pass properties to children properly', () => {
    const parent = element.all(by.tagName('app-error500')).get(0);
    const heroes = parent.all(by.tagName('app-custom-error'));

    const childTitle = heroes.element(by.tagName('h3')).getText();
    const childDetail = heroes.element(by.tagName('p')).getText();
    expect(childTitle).toEqual(`${ code } - ${ codeTitle }`);
  });
});
