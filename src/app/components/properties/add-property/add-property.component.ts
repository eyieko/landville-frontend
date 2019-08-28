import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { PropertyService } from "src/app/services/property/property.service";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"]
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

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
      lot_size: ["", [Validators.required, this.numberLengthLess]],
      property_type: ["", [Validators.required, Validators.maxLength(1)]],
      purchase_plan: ["", [Validators.required, Validators.maxLength(1)]],
      state: ["", [Validators.required, Validators.minLength(3)]],
      street: ["", [Validators.required, Validators.minLength(3)]],
      city: ["", [Validators.required, Validators.minLength(3)]],
      latitude: ["", [Validators.required]],
      longitude: ["", [Validators.required]],
      image_main: [null, [Validators.required]],
      video: [""],
      image_others: [null],
      bedrooms: [""],
      bathrooms: ["0"],
      garages: ["0"]
    });
  }

  addNewProperty(value: any) {
    console.log(value);

    const createProperty = new FormData();

    Object.keys(value).forEach(key => {
      createProperty.append(key, value[key]);
    });

    this.propertyService.addNewProperty(createProperty).subscribe(
      data => {
        console.log("property added");
        console.log(data);
      },
      error => console.log(error)
    );
  }

  changedTo(value: string) {
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
