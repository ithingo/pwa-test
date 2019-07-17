import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class RssFeedService {
  constructor(
    private firestore: AngularFirestore,
  ) { }

  public createRssChannel(data): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore
          .collection("rssChannels")
          .add(data)
          .then(res => resolve(res), err => reject(err));
    });
  }

  public getRssChannels(): Observable<any> {
    return this.firestore
          .collection("rssChannels")
          .snapshotChanges();
  }

  public updateRssChannel(docId, data): Promise<any> { // data.payload.doc.id
    return this.firestore
          .collection("rssChannels")
          .doc(docId)
          .set(data, { merge: true });
  }

  public deleteRssChannel(docId): Promise<any> { // data.payload.doc.id
    return this.firestore
          .collection("rssChannels")
          .doc(docId)
          .delete();
  }
}