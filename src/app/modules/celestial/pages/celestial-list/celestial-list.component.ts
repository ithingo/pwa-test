import { Component } from "@angular/core";
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CelestialService } from '../../celestial.service';

@Component({
  selector: 'app-celestial-list',
  templateUrl: './celestial-list.component.html',
  styleUrls: ['./celestial-list.component.scss']
})
export class CelestialListComponent {
  public celestials: Observable<any>;

  private loadCelestialList(): void {
    this.celestials = this.celestialService.getAllCelestials();
  }

  constructor(
    private celestialService: CelestialService,
    private router: Router,
  ) {
    this.loadCelestialList();
  }

  public addCelestial(): void {
    this.router.navigateByUrl('celestial/new');
  }

  public changeCelestial(channel): void {
    this.router.navigateByUrl(`celestial/edit/${channel.payload.doc.id}`);
  }
  
  public deleteCelestial(channel): void {
    this.celestialService.deleteCelestial(channel.payload.doc.id);
    this.loadCelestialList();
  }
}