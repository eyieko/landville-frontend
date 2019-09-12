import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { httpClientSpy, resetSpies } from 'src/app/helpers/tests/spies';

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
        });
    });

    it('should update the property', () => {
        const slug = 'hello';
        const response = {
            title: 'new title'
        };
        const data = {
            title: 'new title'
        };

        httpClientSpy.patch.and.returnValue(of(response));
        propertyDetailService.updateProperty(slug, data).subscribe(res => {
            expect(res).toBe(response);
        })
    })
});
