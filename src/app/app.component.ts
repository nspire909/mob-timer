import { Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimerService, Timer, Unit, TimerControlsComponent } from '@devrec/ng-timer';

import { AudioService } from 'src/app/shared/audio.service';
import { Person } from 'src/app/shared/models';

@Component({
  selector: 'mob-app-component',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  editing = false;
  name = 'myTimer';
  timer: Timer;
  isDarkTheme = true;
  newName = '';

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

  // Todo: names must be unique
  people: Person[] = [
    {name: 'Brian'},
    {name: 'Damian'},
    {name: 'Guy'},
    {name: 'Jeremy'},
    {name: 'Harry'},
    {name: 'James'},
    {name: 'Mike'},
    {name: 'Nick'}
  ];

  current$: BehaviorSubject<Person> = new BehaviorSubject(this.people[0]);

  constructor(private audio: AudioService, private timerService: TimerService) {
    this.timer = this.timerService.newTimer(this.name, {
      startTime: .1,
      units: Unit.Minutes,
      countdown: true,
      autostart: false,
      timeFormat: 'mm:ss'
    });
  }

  next(person: Person | null = null) {
    this.editing = false;

    this.current$.next(person === null ? this.nextPerson() : person);

    this.timerControls.startTimer();
  }

  private nextPerson(): Person {
    const currentPerson = this.current$.getValue();
    return this.people[(this.people.findIndex(x => x.name === currentPerson.name) + 1) % this.people.length];
  }

  addPerson() {
    if (!this.people.find(x => x.name === this.newName) && this.newName) {
      this.people.push({name: this.newName});
      this.newName = '';
    } else {
      // Todo: name must be unique
    }
  }

  changeName() {
    this.editing = true;
  }

  acceptName() {
    this.editing = false;
  }



  deletePerson(person: Person) {
    const index = this.people.findIndex(x => x.name === person.name);

    if (index > -1) {
      this.people.splice(index, 1);
    }
  }
}
