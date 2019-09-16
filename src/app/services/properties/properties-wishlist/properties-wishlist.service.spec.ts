import { TestBed, tick } from '@angular/core/testing';

import { PropertiesWishlistService } from 'src/app/services/properties/properties-wishlist/properties-wishlist.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { APPCONFIG } from 'src/app/config';

describe('test for PropertiesWishlistService', () => {
  let httpTestingController: HttpTestingController;
  let service: PropertiesWishlistService ;
  let wishlistUrl: string;
  const testSlug = 'test-test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertiesWishlistService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PropertiesWishlistService);
    wishlistUrl = `${APPCONFIG.base_url}${service.wishlistUrl}`;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all items in my wishlist', () => {
    const mockWihslistProperties = {
      data: {
        property: [
          {
            id: 7,
            price: 20000000.0,
            title: 'Gemini Court',
            property_type: 'B',
            description: 'Awesome property',
            slug: 'g-c'
          }, ]}};

    service.getMyWishlist().subscribe(response => {
      const returnedProperties = response.data.property;
      expect(returnedProperties[0].id).toEqual(7);
      expect(returnedProperties[0].title).toEqual('Gemini Court');
      expect(returnedProperties[0].slug).toEqual('g-c');

    });

    const req = httpTestingController.expectOne(wishlistUrl);

    // the real mocking is done here , it's like we are expecting the request response to be
    req.flush(mockWihslistProperties);
  });

  it('should add items in my wishlist', () => {

    const mockedResponse = {
      status: 200, body: {
        data: 'Beautiful House with Basement has been successfully added to your buy list'
      }};

    service.addToWishlist(testSlug).subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body.data).toEqual('Beautiful House with Basement has been successfully added to your buy list');
    });
    const req = httpTestingController.expectOne(`${wishlistUrl}${testSlug}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockedResponse);
  });

  it('should remove items from the wishlist', () => {

    const mockedResponse = {
      status: 200, body: {
        data: 'Beautiful House with Basement has been successfully removed from your buy list'
      }
    };

    service.removeFromWishList(testSlug).subscribe(response => {
      expect(response.status).toEqual(200);
      expect(response.body.data).toEqual('Beautiful House with Basement has been successfully removed from your buy list');
    });
    const req = httpTestingController.expectOne(`${wishlistUrl}${testSlug}/`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockedResponse);

  });
  it('should fail to add an item to the wishlist if already added', () => {

    const mockedResponse = {
      status: 400, body: {
        errors: 'Beautiful Home is already in your buy list'
      }
    };
    service.addToWishlist(testSlug).subscribe(response => {
      expect(response.status).toEqual(400);
      expect(response.body.errors).toEqual('Beautiful Home is already in your buy list');
    });
    const req = httpTestingController.expectOne(`${wishlistUrl}${testSlug}/`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockedResponse);
  });
  it('should fail to remove an item from the wishlist if not in the wishlist', () => {
    const mockedResponse = {
      status: 400, body: {
        errors: 'Beautiful House with Basement is not in your buy list'
      }
    };
    service.removeFromWishList(testSlug).subscribe(response => {
      expect(response.status).toEqual(400);
      expect(response.body.errors).toEqual('Beautiful House with Basement is not in your buy list');
    });
    const req = httpTestingController.expectOne(`${wishlistUrl}${testSlug}/`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockedResponse);
  });
   });
