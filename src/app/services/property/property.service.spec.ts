import { TestBed } from "@angular/core/testing";

import { PropertyService } from "./property.service";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe("PropertyService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: []
    })
  );

  it("should be created", () => {
    const service: PropertyService = TestBed.get(PropertyService);
    expect(service).toBeTruthy();
  });
});
