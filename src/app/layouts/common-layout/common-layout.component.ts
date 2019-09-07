import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: [ './common-layout.component.scss' ]
})
export class CommonLayoutComponent implements OnInit {

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.pushProfile();
  }

}
