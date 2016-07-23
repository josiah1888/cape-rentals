import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare let Firebase: any;

export const BASE_URL: string = 'https://glaring-torch-2375.firebaseio.com/'

@Injectable()
export class FirebaseService<T extends CollectionItem> {
  
  public collection$: BehaviorSubject<T[]>;
  public _collection: T[] = [];
    
  protected firebase: any;
  
  constructor(private baseUrl: string = BASE_URL) {
    this.firebase = new Firebase(this.baseUrl);
    this.collection$ = new BehaviorSubject(this._collection);
    this.collection$.subscribe();
    
    this.firebaseInit();
  }
  
  private firebaseInit() {
    // this.firebase.on('child_added', snapshot => {
    //   let item = Object.assign(snapshot.val(), {id: snapshot.key()});
    //     if (this._collection.map(i => i.id).indexOf(item.id) === -1) {
    //       this._collection.push(item);
    //       this.collection$.next(this._collection);
    //     }
    // });
    
    this.firebase.on('child_removed', snapshot => {
      this._collection.splice(this._collection.map(i => i.id).indexOf(snapshot.key()), 1);
      this.collection$.next(this._collection);      
    }); 
    
    this.firebase.on('child_changed', snapshot => {
      this._collection[(this._collection.map(i => i.id).indexOf(snapshot.key()))] = snapshot.val();
      this.collection$.next(this._collection);      
    });
  }

  create(item: T) {
    if (item.id) {
      this.update(item);
    } else {
      this.firebase.push(item);
    }
  }
  
  update(item: T) {
    let ref = new Firebase(`${this.baseUrl}/${item.id}`);
    ref.set(item);
  }
  
  delete(item: T) {
    let ref = new Firebase(`${this.baseUrl}/${item.id}`);
    ref.set(null);
  }
  
  get collection(): T[] {
    return Object.assign([], this._collection);
  }
}

export interface CollectionItem {
  id: string;
}