import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { RssFeedService } from '../../rss-feed.service';


@Component({
  selector: 'app-rss-list',
  templateUrl: './rss-list.component.html',
  styleUrls: ['./rss-list.component.scss']
})
export class RssListComponent {
  public rssList: Observable<any>;

  private loadRssList(): void {
    this.rssList = this.rssFeedService.getRssChannels();
  }

  constructor(
    private rssFeedService: RssFeedService,
    private router: Router,
  ) {
    this.loadRssList();
  }

  public changeRss(channel): void {
    // navigate to newrss with params
    const queryParams = { queryParams: { channel: channel } };
    this.router.navigate(['home/new-feed'], queryParams);
  }
  
  public deleteRss(channel): void {
    this.rssFeedService.deleteRssChannel(channel.payload.doc.id);
    this.loadRssList();
  }
}