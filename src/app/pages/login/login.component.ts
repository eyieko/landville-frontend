import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: ActivatedRoute, private titleService: Title, private meta: Meta) {

  }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.titleService.setTitle(data.title);
    });
    this.meta.addTag({ property: 'og: title', content: 'Home | Make that Property yours Today' });
  }

}
