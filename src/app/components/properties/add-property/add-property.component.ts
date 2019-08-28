import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"]
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  numberLengthLess(control: FormControl): { [key: string]: boolean } | null {
    if (control.value.toString().length > 14) {
      return { maxLen: true };
    }

    return null;
  }

  ngOnInit() {
    this.addPropertyForm = this.fb.group({
      propertyTitle: ["", [Validators.required, Validators.minLength(5)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      price: ["", [Validators.required, this.numberLengthLess]],
      lotSize: ["", [Validators.required, this.numberLengthLess]],
      propertyType: ["", [Validators.required, Validators.maxLength(1)]],
      purchasePlan: ["", [Validators.required, Validators.maxLength(1)]],
      state: ["", [Validators.required, Validators.minLength(3)]],
      street: ["", [Validators.required, Validators.minLength(3)]],
      city: ["", [Validators.required, Validators.minLength(3)]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      mainImage: [null, [Validators.required]],
      video: [""],
      otherImages: [null],
      bedrooms: [""],
      bathrooms: ["0"],
      garages: ["0"]
    });
  }

  addNewProperty(value: any) {}

  changedTo(value: string) {
    console.log(value);

    const bedrooms = this.addPropertyForm.get("bedrooms");
    if (value === "Building") {
      bedrooms.setValidators([Validators.required, Validators.max(500)]);
    } else {
      bedrooms.clearValidators();
      bedrooms.updateValueAndValidity();
    }
    this.addPropertyForm.updateValueAndValidity();
  }
}
