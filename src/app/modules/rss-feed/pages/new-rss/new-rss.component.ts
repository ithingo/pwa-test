import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-rss',
  templateUrl: './new-rss.component.html',
  styleUrls: ['./new-rss.component.scss']
})
export class NewRssComponent {
  constructor(
    private router: Router,
  ) {}

  public addNewRss(): void {
    // @TODO: add rss
    this.router.navigate(['home/feeds']);
  }
}