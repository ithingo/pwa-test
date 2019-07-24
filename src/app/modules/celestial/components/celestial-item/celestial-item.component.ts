import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-celestial-item',
  templateUrl: './celestial-item.component.html',
  styleUrls: ['./celestial-item.component.scss']
})
export class CelestialItemComponent {
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