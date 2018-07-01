import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subject, NEVER, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TimerService, Timer, Unit } from '@devrec/ng-timer';

import { AudioService } from 'src/app/shared/audio.service';

export interface Person {
  name: string;
}

@Component({
  selector: 'mob-app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  editing = false;
  name = 'myTimer';
  timer: Timer;
  isDarkTheme = true;
  timerSubscription: Subscription;

  i = 0;
  people = [
    {name: 'Amy'},
    {name: 'Bill'},
    {name: 'Charlene'},
  ];

  current$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private audio: AudioService, private timerService: TimerService) {
    this.timerService.newTimer(this.name, {
      startTime: .1,
      units: Unit.Minutes,
      countdown: true,
      autostart: false,
      timeFormat: 'mm:ss'
    });

    this.timer = this.timerService.timers[this.name];
  }

  ngOnInit() {
    console.log(this.editing);
  }

  addField() {
    this.people.push({name: ''});
  }

  startTimer(i: number) {
    this.editing = false;

    this.current$.next(i);

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = this.timerService.start(this.name)
      .subscribe(x => {
        if (x === 31000 || x === 30000 || x === 29000) {
          this.audio.beep();
        } else if (x === 2000) {
          this.audio.gameOver();
        } else if (x === 0) {
          this.next();
        }
      });
  }

  next() {
    this.startTimer((this.current$.getValue() + 1) % this.people.length);
  }

  deletePerson(i: number) {
    this.people.splice(i, 1);
  }

  addPerson() {
    const newPerson = window.prompt('Name');
    this.people.push({name: newPerson});
  }

  changeName(i: number) {
    this.editing = true;
  }

  acceptName() {
    this.editing = false;
  }
}
