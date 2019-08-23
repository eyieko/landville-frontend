import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';
@Component({
  selector: 'app-update-property',
  templateUrl: './updateProperty.component.html',
  styleUrls: ['./updateProperty.component.scss']
})
export class UpdatePropertyComponent implements OnInit {
  multipleImages: any = [];
  video: any = null;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  slug: string;
  updatePropertyForm: FormGroup;
  currentProperty = {
    slug: '',
    bedrooms: '',
    bathrooms: '',
    garages: '',
    city: '',
    state: '',
    street: '',
    title: '',
    price: '',
    description: '',
    imageMain: '',
    imageOthers: [],
    size: '',
    type: '',
    video: '',
    lat: '',
    long: '',
    lastViewedOn: '',
    viewers: ''
  };
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private propertyservice: PropertyDetailService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe(result => {
      this.slug = result.get('slug');
      this.getPropertyInfo(this.slug);
    });

    this.updatePropertyForm = this.fb.group({
      title: [''],
      price: [''],
      lot_size: [''],
      type: [''],
      bedrooms: [''],
      bathrooms: [''],
      description: [''],
      image_main: [''],
      video: [''],
      image_others: ['']
    });
  }

  getPropertyInfo(slug) {
    this.propertyservice.getProperty(slug).subscribe(
      response => {
        this.currentProperty.title = response.data.property.title;
        this.currentProperty.price = response.data.property.price;
        this.currentProperty.size = response.data.property.lot_size;
        this.currentProperty.type = response.data.property.property_type;
        this.currentProperty.bathrooms = response.data.property.bathrooms;
        this.currentProperty.bedrooms = response.data.property.bedrooms;
        this.currentProperty.video = response.data.property.video;
        this.currentProperty.description = response.data.property.description;
        this.currentProperty.imageMain = response.data.property.image_main,
        this.currentProperty.lat = response.data.property.coordinates.lat,
        this.currentProperty.long = response.data.property.coordinates.lon,
        this.currentProperty.city = response.data.property.address.City,
        this.currentProperty.state = response.data.property.address.State,
        this.currentProperty.street = response.data.property.address.Street,
        this.currentProperty.imageOthers = response.data.property.image_others,
        this.currentProperty.lastViewedOn = response.data.property.last_viewed,
        this.currentProperty.viewers = response.data.property.view_count;
      },
      error => {
        this.toastrService.error('Something went wrong');
      }
    );
  }

  updateProperty() {
    const updateProperty = new FormData();
    const formValue = this.updatePropertyForm.value;
    Object.keys(formValue).forEach(key => {
      const check = formValue[key];
      if (check && key !== 'image_others') {
        updateProperty.append(key, check);
      }
    });
    for (const i in this.multipleImages) {
      updateProperty.append('image_others', this.multipleImages[i]);
    }
    if (this.video !== null ) {
      updateProperty.append('video', this.video);
    }
    this.propertyservice.updateProperty(this.slug, updateProperty).subscribe(
      response => {
        this.toastrService.success(response.message);
        this.router.navigate([`/properties/${this.slug}`]);
      },
      error => {
        // get the corresponding values of errors that will be returned
        this.toastrService.error('Something went wrong');
      }
    );
  }

  fileProgress(fileInput: any) {
    // take the an image and update the value of image main in the form
    this.fileData = fileInput.target.files[0] as File;
    const file = fileInput.target.files[0];
    this.updatePropertyForm.value.image_main = file;
    this.preview();
  }

  uploadMultiple(filesInput: any) {
    // take every single image file and push it to a multipleImages
    for (let i = 0; i < filesInput.target.files.length; i++) {
      if (filesInput.target.files[i].type.match(/video\/*/)) {
        this.video = filesInput.target.files[i];
      } else {
        this.multipleImages.push(filesInput.target.files[i]);
      }
    }
  }
  preview() {
    // Show preview of a new image
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
  }
}
