import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CelestialService } from '../../celestial.service';
import { IdbService } from 'src/app/shared/services/idb.service';

@Component({
  selector: 'app-celestial-list',
  templateUrl: './celestial-list.component.html',
  styleUrls: ['./celestial-list.component.scss']
})
export class CelestialListComponent implements OnInit {
  private networkMode: 'online' | 'offline';

  public celestials: Observable<any>;

  private processActions(channels: any): any {
    channels.map(chan => {
      const data = chan.payload.doc.data() as any;
      this.idbService.addItems('Items', data);
      return { ...data };
    });
  }

  private loadDataAndSyncIDb(): void {
    this.idbService.connectToIdb();
    let onlineDataLength;

    this.idbService
      .getAllData('Items')
      .then(items => {
        onlineDataLength = items.length;
        if (this.networkMode === 'online' && onlineDataLength === 0) {
          this.celestials = this.celestialService
            .getAllCelestials()
            .pipe(this.processActions);
        } else { this.celestials = of(items);}

        this.idbService
          .dataChanged()
          .subscribe(data => this.celestials = of(data));
      });
  }

  private getOfflineData(): Promise<any> {
    return this.idbService.getAllData('Sync-Items');
  }

  private async mergeDatabases(): Promise<void> {
    // @FIXME: returns empty array
    this.getOfflineData()
      .then(offlineData => {
        if (offlineData.length > 0) {
          offlineData.forEach((cel: any, index: number) => {
            if (cel == offlineData[index]) {
              this.celestialService.addCelestial(cel);
              this.idbService.addItems('Items', cel);
              this.idbService.deleteItems('Sync-Items', cel.id);
            }
          });
        }
      })
      .catch(err => console.error(err));
  }

  constructor(
    private celestialService: CelestialService,
    private router: Router,
    private idbService: IdbService,
  ) {
    navigator.onLine ? this.networkMode = 'online' : this.networkMode = 'offline';
    this.loadDataAndSyncIDb();
  }

  public ngOnInit(): void {
    this.mergeDatabases();
  }

  public addCelestial(): void {
    this.router.navigateByUrl('celestial/new');
  }

  public changeCelestial(channel): void {
    // @FIXME: later pass doc id, now passes only celestial obj
    // this.router.navigateByUrl(`celestial/edit/${channel.payload.doc.id}`);
  }
  
  public deleteCelestial(channel): void {
    // @FIXME: later pass doc id, now passes only celestial obj
    // this.celestialService.deleteCelestial(channel.payload.doc.id);
    this.loadDataAndSyncIDb();
  }
}