import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {OnInit} from '@angular/core';

export class AppareilService implements OnInit {

  appareilsSubject = new Subject<any[]>();

  private appareils: any[];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAppareilsFromServer();
  }
  saveAppareilsToServer() {
    this.httpClient
      .put('https://mon-angular-projet.firebaseio.com/appareils.json', this.appareils)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }
  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>('https://mon-angular-projet.firebaseio.com/appareils.json')
      .subscribe(
        (response) => {
          this.appareils = response;
          this.emitAppareilSubject();
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
      );
  }

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }
  switchOnAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'allumé';
    }
    this.emitAppareilSubject();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      appareil.status = 'éteint';
    }
    this.emitAppareilSubject();
  }

  switchOnOne(i: number) {
    //i = i - 1;
    this.appareils[i].status = 'allumé';
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
   // i = i - 1;
    this.appareils[i].status = 'éteint';
    this.emitAppareilSubject();
  }

    getAppareilById(id: number) {
      const appareil = this.appareils.find(
        (s) => {
          return s.id === id;
        }
      );
      return appareil;
    }
  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: '',
      status: '',
      index: 0
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length - 1)].id + 1;
    appareilObject.index = this.appareils[(this.appareils.length - 1)].index + 1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
  }
}
