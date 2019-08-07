import { TestBed } from "@angular/core/testing";

import { InternationalPaymentService } from "./international-payment.service";

describe("InternationalPaymentService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: InternationalPaymentService = TestBed.get(
      InternationalPaymentService
    );
    expect(service).toBeTruthy();
  });
});
