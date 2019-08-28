import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistersuccessComponent } from './registersuccess.component';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';




import { BehaviorSubject } from 'rxjs';

export class MockActivatedRoute {
  private testParams: {};
  private paramsSubject = new BehaviorSubject(this.testParams);
  params  = this.paramsSubject.asObservable();

  get getParams() {
    return this.testParams;
  }
  set setParams(newParams: any) {
    this.testParams = newParams;
    this.paramsSubject.next(newParams);
  }
}



describe('RegistersuccessComponent', () => {
  let activeRoute: MockActivatedRoute;
  let component: RegistersuccessComponent;
  let fixture: ComponentFixture<RegistersuccessComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersuccessComponent ],
      providers: [{provide: ActivatedRoute, useValue: MockActivatedRoute}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activeRoute = new MockActivatedRoute();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
