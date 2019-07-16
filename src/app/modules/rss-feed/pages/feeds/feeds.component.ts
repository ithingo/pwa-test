import { Component } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {
  constructor(
    private router: Router,
  ) {}

  public viewRssList(): void {
    this.router.navigate(['home/rss-list']);
  }

  public addRss(): void {
    this.router.navigate(['home/new-feed']);
  }
}