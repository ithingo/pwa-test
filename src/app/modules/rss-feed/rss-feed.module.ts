import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RssFeedRoutingModule } from './rss-feed-routing.module';

import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { FeedsComponent } from './pages/feeds/feeds.component';
import { NewRssComponent } from './pages/new-rss/new-rss.component';
import { RssFeedComponent } from './pages/rss-feed/rss-feed.component';
import { RssItemComponent } from './components/rss-item/rss-item.component';
import { RssListComponent } from './pages/rss-list/rss-list.component';

@NgModule({
  declarations: [
    FeedItemComponent,
    RssItemComponent,

    RssFeedComponent,
    FeedsComponent,
    NewRssComponent,
    RssListComponent,
  ],
  imports: [
    CommonModule,
    RssFeedRoutingModule,
  ]
})
export class RssFeedModule { }
