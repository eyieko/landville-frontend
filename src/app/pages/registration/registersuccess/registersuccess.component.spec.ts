import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistersuccessComponent } from './registersuccess.component';
import {ActivatedRoute} from '@angular/router';


describe('RegistersuccessComponent', () => {
  let component: RegistersuccessComponent;
  let fixture: ComponentFixture<RegistersuccessComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistersuccessComponent ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
