import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MyWishlistComponent } from 'src/app/pages/properties/my-wishlist/my-wishlist.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { propertiesWishlistSpy, toastServiceSpy, routerSpy, buyPropertyServiceSpy} from 'src/app/helpers/spies';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CardComponent } from 'src/app/components/card/card.component';
import { mockWishlistProperties } from 'src/app/shared/mocks'
import { BuyPropertyService } from 'src/app/services/properties/properties-wishlist/buy-property/buy-property.service';

describe('MyWishlistComponent', () => {
  let component: MyWishlistComponent;
  let fixture: ComponentFixture<MyWishlistComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyWishlistComponent, CardComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule, ],
      providers: [
        {
          provide: PropertiesWishlistService,
          useValue: propertiesWishlistSpy
        },
        {
          provide : BuyPropertyService,
          useValue: buyPropertyServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        },
        { provide: Router, useValue: routerSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWishlistComponent);
    component = fixture.componentInstance;
    propertiesWishlistSpy.getMyWishlist.and.returnValue(of(mockWishlistProperties));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show a toast with error when it fails to load wishlist items on init', () => {
    const mockedResponse = {
      errors: 'An error occurs when retrieving your wishlist'
    };
    propertiesWishlistSpy.getMyWishlist.and.returnValue(throwError(mockedResponse));
    component.ngOnInit();
    expect(toastServiceSpy.error).toHaveBeenCalledWith(mockedResponse.errors);

  });
  it('test if it displays all the components in my wishlist', () => {
    const htmlelments = fixture.debugElement;
    expect(htmlelments.queryAll(By.css('.cardinp')).length).toEqual(2);
    expect(htmlelments.queryAll(By.css('app-card')).length).toEqual(mockWishlistProperties.data.property.length);
  });
  it('test if a message is shown when empty wishlist', () => {
    propertiesWishlistSpy.getMyWishlist.and.returnValue(of({data: {
      property: []}}));
    fixture = TestBed.createComponent(MyWishlistComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    expect(component.properties.length).toBe(0);
   });
  it('test when I click to remove a component if it is removed and an toast shown', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'removeFromWishlist');
    // this is in case  remove from wishlist is the first button
    const removeBtn = fixture.debugElement.query(By.css('button'));
    removeBtn.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.removeFromWishlist).toHaveBeenCalledWith(mockWishlistProperties.data.property[0].slug);
  }));
  it('test when I click to whether buying or saving an action is called', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'payProperty');
    const actions = Array.of('Buying', 'Saving');
    actions.forEach((action, index) => {
      const actionBtn = fixture.debugElement.queryAll(By.css('button'))[1 + index];
      actionBtn.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      expect(component.payProperty).toHaveBeenCalledWith(mockWishlistProperties.data.property[0], action);
    });
  }));

  it('should call remove property function and remove the item from wishlist', ()=>{
    const response = {data: "the item test data was removed from your wishlist"} 
    propertiesWishlistSpy.removeFromWishList.and.returnValue(of(response));
    component.removeFromWishlist('test-test')
    expect(toastServiceSpy.success).toHaveBeenCalledWith(response.data);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/my-wishlist'])
  });

  it('should show a toast with error message when failed to remove from wishlist', () => {
    const error = {errors : "the item test data was removed from your wishlist" }
    propertiesWishlistSpy.removeFromWishList.and.returnValue(throwError(error));
    component.removeFromWishlist('test-test');
    expect(toastServiceSpy.error).toHaveBeenCalledWith(error.errors);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/my-wishlist'])
  });

  it('should navigate to payement with pin when click to buy property', ()=>{
    const property = mockWishlistProperties.data.property[0]
    component.payProperty(property, 'Buying');
    expect(buyPropertyServiceSpy.changeProperty).toHaveBeenCalledWith(property, 'Buying');
  })
});
