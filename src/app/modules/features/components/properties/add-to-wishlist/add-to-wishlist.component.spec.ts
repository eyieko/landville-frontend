import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddToWishlistComponent } from 'src/app/modules/features/components/properties/add-to-wishlist/add-to-wishlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import {PropertiesWishlistService} from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { HttpClientModule } from '@angular/common/http';
import {  toastServiceSpy, propertiesWishlistSpy, routerSpy} from 'src/app/helpers/tests/spies';
import { ToastrService } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AddToWishlistComponent', () => {
  let component: AddToWishlistComponent;
  let fixture: ComponentFixture<AddToWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToWishlistComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule],
      providers: [
        {
          provide: PropertiesWishlistService,
          useValue: propertiesWishlistSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the component with the onclick button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Save');
  });
  it('test if we can click to the add to wishlist button', fakeAsync( () => {
    fixture.detectChanges();
    spyOn(component, 'addToWishlist');
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.addToWishlist).toHaveBeenCalled();
  }));
  it('test if the user is redirect to his wishlist page after successfully adding an item to it', () => {
    const mockedResponse = {
      data: 'Beautiful House with Basement has been successfully added to your buy list'
    };
    propertiesWishlistSpy.addToWishlist.and.returnValue(of(mockedResponse));
    component.addToWishlist();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/my-wishlist']);
    expect(toastServiceSpy.success).toHaveBeenCalledWith(mockedResponse.data);
   });

  it('test if  toast with error message is return when it fails to add to wishlist', () => {
     const mockedResponse = {
        errors: 'Beautiful House with Basement is already in your buy list'
       };
     propertiesWishlistSpy.addToWishlist.and.returnValue(throwError(mockedResponse));
     component.addToWishlist();
     expect(toastServiceSpy.error).toHaveBeenCalledWith(mockedResponse.errors);
   });
});
