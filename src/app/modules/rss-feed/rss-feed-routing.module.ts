import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedsComponent } from './pages/feeds/feeds.component';
import { NewRssComponent } from './pages/new-rss/new-rss.component';
import { RssFeedComponent } from './pages/rss-feed/rss-feed.component';
import { RssListComponent } from './pages/rss-list/rss-list.component';

const routes: Routes = [
  {
    path: '', component: RssFeedComponent,
    children: [
      { path: 'feeds', component: FeedsComponent },
      { path: 'new-feed', component: NewRssComponent },
      { path: 'rss-list', component: RssListComponent },
      { path: '**', redirectTo: 'feeds' },
    ],
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RssFeedRoutingModule { }
