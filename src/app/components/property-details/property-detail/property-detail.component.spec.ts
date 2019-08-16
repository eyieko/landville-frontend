import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  PropertyDetailComponent
} from 'src/app/components/property-details/property-detail/property-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { propertiesWishlistSpy, toastServiceSpy, routerSpy } from 'src/app/helpers/tests/spies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyDetailComponent],
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
    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call remove property function and add the item from wishlist', () => {
    const response = { data: "the item test data was added from your wishlist" }
    propertiesWishlistSpy.addToWishlist.and.returnValue(of(response));
    component.addToWishlist('test-test')
    expect(toastServiceSpy.success).toHaveBeenCalledWith(response.data);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/my-wishlist'])
  });

  it('should show a toast with error message when failed to remove from wishlist', () => {
    const error = { errors: "An error occurs when adding the property to your wishlist" }
    propertiesWishlistSpy.addToWishlist.and.returnValue(throwError(error));
    component.addToWishlist('test-test');
    expect(toastServiceSpy.error).toHaveBeenCalledWith(error.errors);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/my-wishlist'])
  });
});
