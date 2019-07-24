import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-celestial-item',
  templateUrl: './celestial-item.component.html',
  styleUrls: ['./celestial-item.component.scss']
})
export class CelestialItemComponent {
  @Input() channel: any;

  @Output() changeCelestial = new EventEmitter<void>();
  @Output() deleteCelestial = new EventEmitter<void>();

  constructor() {}

  public edit(): void {
    this.changeCelestial.emit();
  }

  public delete(): void {
    this.deleteCelestial.emit();
  }
}