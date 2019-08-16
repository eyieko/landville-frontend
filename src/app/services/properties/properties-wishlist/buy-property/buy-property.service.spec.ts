import { TestBed } from '@angular/core/testing';
import { BuyPropertyService } from 'src/app/services/properties/properties-wishlist/buy-property/buy-property.service';
import { mockWishlistProperties } from 'src/app/shared/mocks';


describe('BuyPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuyPropertyService = TestBed.get(BuyPropertyService);
    expect(service).toBeTruthy();
  });

  it('should change the current property and purpose', () => {
    let service: BuyPropertyService;
    service = TestBed.get(BuyPropertyService);
    const property = mockWishlistProperties.data.property[0]
    service.changeProperty(property, 'Buying')
    service.currentProperty.subscribe( data => {
      expect(data.property).toBe(property);
      expect(data.purpose).toBe('Buying');
    });
  });
});
