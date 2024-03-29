import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

export interface User {
  user_id: string;
  username: string;
  email: string;
  creation_date: string;
}

export interface ITrafficEvent {
  name: string;
  lat: number;
  lng: number;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  listFeed: Observable<any[]>;
  objFeed: Observable<any>;

  constructor(public db: AngularFireDatabase) {}

  connectToDatabase() {
    this.listFeed = this.db.list('list').valueChanges();
    this.objFeed = this.db.object('obj').valueChanges();
  }

  getChangeFeedList() {
    return this.listFeed;
  }

  getChangeFeedObj() {
    return this.objFeed;
  }

  getPoints() {
    return this.db.object('obj');
  }

  addPointItem(lat: number, lng: number, name: string) {
    let item: ITrafficEvent = {
      name: name,
      lat: lat,
      lng: lng,
    };
    this.db.list('list').push(item);
  }

  syncPointItem(lat: number, lng: number, name: string) {
    let item: ITrafficEvent = {
      name: name,
      lat: lat,
      lng: lng,
    };
    this.db.object('obj').set([item]);
  }
  

  addUser(id: string, username: string, email: string) {
    let item: User = {
      user_id: id,
      username: username,
      email: email,
      creation_date: new Date().toISOString(),
    };
    this.db.list('users').push(item);
  }
}
