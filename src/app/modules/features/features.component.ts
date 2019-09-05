import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.pushProfile();
  }

}
