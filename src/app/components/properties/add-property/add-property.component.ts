import { Component, OnInit, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { PropertyService } from "src/app/services/property/property.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-property",
  templateUrl: "./add-property.component.html",
  styleUrls: ["./add-property.component.scss"]
})
export class AddPropertyComponent implements OnInit {
  addPropertyForm: FormGroup;
  loading: boolean = false;
  disable: boolean;
  manyImages: any[];


  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  numberLengthLess(control: FormControl): { [key: string]: boolean } | null {
    if (control.value.toString().length > 14) {
      return { maxLen: true };
    }

    return null;
  }

  ngOnInit() {
    this.addPropertyForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
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
      image_others: [""],
      bedrooms: [""],
      bathrooms: [""],
      garages: [""]
    });
  }

  addNewProperty(value: any) {

    const createProperty = new FormData();
    const {
      title,
      description,
      price,
      lot_size,
      property_type,
      purchase_plan,
      state: State,
      street: Street,
      city: City,
      latitude: lat,
      longitude: lon,
      image_main,
      image_others,
      video,
      bedrooms,
      bathrooms,
      garages
    } = value;

    const propertyObject = {
      title,
      description,
      price,
      lot_size,
      property_type,
      purchase_plan,
      address: { Street, City, State },
      coordinates: { lat, lon },
      image_main,
      image_others: image_others || undefined,
      video: video || undefined,
      bedrooms,
      bathrooms,
      garages
    };

    Object.keys(propertyObject).forEach(key => {
      let actualValue = propertyObject[key];
      if (key == "coordinates" || key == "address") {
        actualValue = JSON.stringify(actualValue);
      }
      if (!!actualValue) {
        createProperty.append(key, actualValue);
      }
    });

    this.propertyService.addNewProperty(createProperty).subscribe(
      data => {
        
        this.loading = true;
        this.router.navigate(["/properties"]);
        this.toastrService.success("Property successfully Added.");
        this.loading = false;
      },
      error => {

        this.loading = true;
        this.toastrService.error(JSON.stringify(error.errors));
        this.toastrService.warning("Check an Input field blank.");
        this.loading = false;
      }
    );
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addPropertyForm.get('image_main').setValue(file);
    }
  }

  onVideoSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addPropertyForm.get("video").setValue(file);
    }
  }
  uploadMaximumFive(event: any){
    for (var i = 0; i < event.target.files.length; i++) {  
      this.manyImages.push(event.target.files[i])
    }
    this.addPropertyForm.get("image_others").setValue(this.manyImages);
    
  }
  
}
