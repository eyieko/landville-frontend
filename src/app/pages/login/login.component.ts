import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  
  ngOnInit() {

    this.router.data.subscribe(data => {
      document.title = data['title']
    })
  }

}
