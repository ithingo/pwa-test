import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import idb from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private data$ = new Subject<any>();
  private dbPromise;

  constructor() {}

  public connectToIdb(): void {
    this.dbPromise = idb
      .open('pwa-test-db', 1, (upgardeDb) => {
        if (!upgardeDb.objectStoreNames.contains('Items')) {
          upgardeDb.createObjectStore('Items', { keyPath: 'id', autoIncrement: true });
        }
        if (!upgardeDb.objectStoreNames.contains('Sync-Items')) {
          upgardeDb.createObjectStore('Sync-Items', { keyPath: 'id', autoIncrement: true });
        }
      });
  }

  public addItems(target: string, celestial: any) {
    this.dbPromise
      .then(db => {
        const transaction = db.transaction(target, 'readwrite');
        const object = {
          name: celestial.name,
          age: celestial.age,
          radius: celestial.radius,
          distance: celestial.distance,
        };
        transaction.objectStore(target).put(object);
        this.getAllData('Items').then(items => this.data$.next(items));
        return transaction.complete;
      });
  }

  public deleteItems(target: string, celestial: any): void {
    this.dbPromise
      .then(db => {
        const transaction = db.transaction(target, 'readwrite');
        const store = transaction.objectStore(target);
        store.delete(celestial);
        this.getAllData(target)
          .then(items => this.data$.next(items))
          .catch(err => console.error(err));
        return transaction.complete;
      });
  }
  
  public getAllData(target: string): Promise<any> {
    return this.dbPromise
      .then(db => {
        const transaction = db.transaction(target, 'readonly');
        const store = transaction.objectStore(target);
        return store.getAll();
      });
  }

  public dataChanged(): Observable<any> {
    return this.data$;
  }
}