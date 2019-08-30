import { Component, OnInit, Output, EventEmitter , Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyDetailService } from 'src/app/services/property-detail/property-detail.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  isModalClosed = false;
  slug: string;
  message: string;
  @Output() closeModalOutput = new EventEmitter<boolean>();
  @Input() deletePropertyMessage: string;

  constructor(
    private propertyService: PropertyDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(result => {
      this.slug = result.get('slug');
    });
  }
  closeModal() {
    this.isModalClosed = this.propertyService.displayModalService();
    this.closeModalOutput.emit(this.isModalClosed);
  }
  deleteProperty() {
    this.propertyService.deletePropertyService(this.slug).subscribe(
      response => {
        this.message = response.message;
        this.toastrService.success(this.message);
        this.closeModal();
        this.router.navigate([`/properties/`]);
      },
      error => {
        this.toastrService.error(error.errors.detail || error.errors);
        this.router.navigate([`/properties/${this.slug}`]);
        this.closeModal();
      }
    );
  }
}
