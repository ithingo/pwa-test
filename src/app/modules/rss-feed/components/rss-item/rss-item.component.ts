import { Component, Input, AfterViewInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-rss-item',
  templateUrl: './rss-item.component.html',
  styleUrls: ['./rss-item.component.scss']
})
export class RssItemComponent {
  @Input() channel: any;

  @Output() changeRss = new EventEmitter<void>();
  @Output() deleteRss = new EventEmitter<void>();

  constructor() {}

  public edit(): void {
    this.changeRss.emit();
  }

  public delete(): void {
    this.deleteRss.emit();
  }
}