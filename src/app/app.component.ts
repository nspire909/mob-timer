import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerService, Timer, Unit, TimerControlsComponent } from '@devrec/ng-timer';

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

  timeFcn = (x => {
    if (x === 31000 || x === 30000 || x === 29000) {
      this.audio.beep();
    } else if (x === 2000) {
      this.audio.gameOver();
    } else if (x === 0) {
      this.next();
    }
  });

  @ViewChild(TimerControlsComponent)
  timerControls: TimerControlsComponent;

  i = 0;
  people = [
    {name: 'Amy'},
    {name: 'Bill'},
    {name: 'Charlene'},
  ];

  current$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private audio: AudioService, private timerService: TimerService) {
    this.timer = this.timerService.newTimer(this.name, {
      startTime: .1,
      units: Unit.Minutes,
      countdown: true,
      autostart: false,
      timeFormat: 'mm:ss'
    });
  }

  ngOnInit() {
  }

  addField() {
    this.people.push({name: ''});
  }

  next(i: number | null = null) {
    this.editing = false;
    this.current$.next(i === null ? (this.current$.getValue() + 1) % this.people.length : i);

    this.timerControls.stopTimer();
    this.timerControls.startTimer();
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
