import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators'

import { RssFeedService } from '../../rss-feed.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'Origin': 'http://127.0.0.1:4200',
    'Access-Control-Allow-Headers': 'Content-Type'
  })
};

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent {
  public feeds: any[];

  private loadRssUrls(): void {
    this.rssFeedService
        .getRssChannels()
        .pipe(map(channel => channel.map(elem => elem.payload.doc.data())))
        .subscribe(data => {
          this.loadFeeds(data);
        });
  }

  private loadFeeds(data: any[]): void {
    const promises = [];
    data.forEach(rss => promises.push(this.http.get(rss.url, httpOptions).toPromise())); // @FIXME: fix cors
    // data.forEach(rss => promises.push(this.http.get(rss.url).toPromise())); // @FIXME: fix cors
    Promise
      .all(promises)
      .then(res => (this.feeds = res, console.log(res))) // @TODO: process rss feeds
      .catch(err => console.error(err));
  }

  constructor(
    private router: Router,
    private rssFeedService: RssFeedService,
    private http: HttpClient,
  ) {
    this.loadRssUrls();
  }

  public viewRssList(): void {
    this.router.navigate(['home/rss-list']);
  }

  public addRss(): void {
    this.router.navigate(['home/new-feed']);
  }
}