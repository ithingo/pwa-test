import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { RssFeedService } from '../../rss-feed.service';

@Component({
  selector: 'app-new-rss',
  templateUrl: './new-rss.component.html',
  styleUrls: ['./new-rss.component.scss']
})
export class NewRssComponent {
  public newRssForm: FormGroup;

  constructor(
    private router: Router,
    private rssFeedService: RssFeedService,
  ) {
    this.newRssForm = new FormGroup({
      title: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required)
    });
  }

  public addNewRss(): void {
    if (this.newRssForm.invalid) { return; }

    this.rssFeedService
        .createRssChannel(this.newRssForm.value)
        .then(res => {
          this.newRssForm.reset();
          this.router.navigate(['home/feeds']);
        })
        .catch(err => console.error(err));
  }
}