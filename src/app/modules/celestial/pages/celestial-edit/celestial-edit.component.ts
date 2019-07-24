import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { CelestialService } from '../../celestial.service';
import { IdbService } from 'src/app/shared/services/idb.service';

@Component({
  selector: 'app-celestial-edit',
  templateUrl: './celestial-edit.component.html',
  styleUrls: ['./celestial-edit.component.scss']
})
export class CelestialEditComponent {
  private celestialId: string;
  private networkMode: 'online' | 'offline';

  public editMode: boolean = false;
  public celestialForm: FormGroup;

  private createForm(): void {
    this.celestialForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      radius: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      distance: new FormControl('', Validators.required),
    });
  }

  private initWithObjectToEdit(): void {
    const url = this.router.url;
    this.editMode = /edit/.test(url);
    if (this.editMode) {
      this.celestialId = this.route.snapshot.paramMap.get('id');
      this.celestialService
        .getCelestial(this.celestialId)
        .subscribe(data => this.updateForm(data));
    }
  }

  private updateForm(data: any): void {
    this.celestialForm.setValue(data);
  }

  private async syncData(): Promise<any> {
    const data = this.celestialForm.value;
    if (this.networkMode === 'offline') {
      this.idbService.addItems('Sync-Items', data);
      this.idbService.addItems('Items', data);
    }
    if (this.networkMode === 'online') {
      this.idbService.addItems('Items', data);
      await this.idbService.getAllData('Items');
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private celestialService: CelestialService,
    private idbService: IdbService,
  ) {
    this.createForm();
    this.initWithObjectToEdit();
  }

  public async addCelestialObject(): Promise<void> {
    if (this.celestialForm.valid) {
      await this.syncData();
      if (this.networkMode === 'online') {
        const actionPromise = this.editMode
          ? this.celestialService.updateCelestial(this.celestialId, this.celestialForm.value)
          : this.celestialService.addCelestial(this.celestialForm.value);
        actionPromise
          .then(res => {
            this.celestialForm.reset();
            this.router.navigateByUrl('celestial/list');
          })
          .catch(err => console.error(err));
        }
      }
  }
}