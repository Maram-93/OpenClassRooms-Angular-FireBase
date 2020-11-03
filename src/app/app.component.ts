import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilService} from './services/appareil.service';
import {interval, Observable} from 'rxjs';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // isAuth = false;
  title = 'Ma Première application Angular' ;
  secondes: number;
  counterSubscription: Subscription;

  constructor(private appareilService: AppareilService) {}

  ngOnInit() {
    const counter = interval(1000);

    this.counterSubscription = counter.subscribe (
      (value) => {
            this.secondes = value;
      },
    (error) => {
      console.log('Uh-oh, an error occurred! : ' + error);
    },
    () => {
      console.log('Observable complete!');
    }
    );
  }

    ngOnDestroy(): void {
      this.counterSubscription.unsubscribe();
    }
}
