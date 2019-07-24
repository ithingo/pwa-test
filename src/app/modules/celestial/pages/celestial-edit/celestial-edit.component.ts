import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

import { CelestialService } from '../../celestial.service';

@Component({
  selector: 'app-celestial-edit',
  templateUrl: './celestial-edit.component.html',
  styleUrls: ['./celestial-edit.component.scss']
})
export class CelestialEditComponent {
  private celestialId: string;

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private celestialService: CelestialService,
  ) {
    this.createForm();
    this.initWithObjectToEdit();
  }

  public addCelestialObject(): void {
    if (this.celestialForm.invalid) { return; }

    const actionPromise = this.editMode
      ? this.celestialService.updateCelestial(this.celestialId, this.celestialForm.value)
      : this.celestialService.addCelestial(this.celestialForm.value);
    actionPromise
      .then(res => {
        console.log(res)
        this.celestialForm.reset();
        this.router.navigateByUrl('celestial/list');
      })
      .catch(err => console.error(err));
  }
}