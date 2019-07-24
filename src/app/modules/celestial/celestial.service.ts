import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class CelestialService {
  constructor(
    private firestore: AngularFirestore,
  ) { }

  public addCelestial(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("celestials")
          .add(data)
          .then(res => resolve(res), err => reject(err));
    });
  }

  public getAllCelestials(): Observable<any> {
    return this.firestore
          .collection("celestials")
          .snapshotChanges();
  }

  public getCelestial(docId: string): Observable<any> {
    return this.firestore
      .collection("celestials")
      .doc(docId)
      .valueChanges();
  }

  public updateCelestial(docId: string, data: any): Promise<any> { // data.payload.doc.id
    return this.firestore
          .collection("celestials")
          .doc(docId)
          .set(data, { merge: true });
  }

  public deleteCelestial(docId: string): Promise<any> { // data.payload.doc.id
    return this.firestore
          .collection("celestials")
          .doc(docId)
          .delete();
  }
}