import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { PropertyDetailService } from './property-detail.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from '../local-storage.service';
import { httpClientSpy, resetSpies } from '../../helpers/spies';

describe('PropertyDetailService', () => {
    let propertyDetailService: PropertyDetailService;
    beforeAll(() => resetSpies([httpClientSpy]));
    afterAll(() => resetSpies([httpClientSpy]));

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LocalStorageService,
                {
                    provide: HttpClient, useValue: httpClientSpy
                }
            ]
        });
       
        propertyDetailService = TestBed.get(PropertyDetailService);
    }
    );

    it('should be created', () => {
        propertyDetailService = TestBed.get(PropertyDetailService);
        expect(propertyDetailService).toBeTruthy();
    });

    it('should test getting property', () => {
        const slug = 'hello';
  
        const responseObject = {
            success: true,
            message: 'successful'
        };
        httpClientSpy.get.and.returnValue(of(responseObject));
        propertyDetailService.getProperty(slug).subscribe(res => {
            expect(res).toBe(responseObject);
        })
    });
    
})