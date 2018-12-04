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

  people: Person[] = [];

  current$: BehaviorSubject<Person> = new BehaviorSubject(this.people[0]);

  showLoadNames = true;

  constructor(private audio: AudioService, private timerService: TimerService) {
    this.timer = this.timerService.newTimer(this.name, {
      startTime: 15,
      units: Unit.Minutes,
      countdown: true,
      autostart: false,
      timeFormat: 'mm:ss'
    });
  }

  next(person?: Person) {
    this.editing = false;

    this.current$.next(!person ? this.nextPerson() : person);
    if (person || !this.timer.pause$.getValue()) {
      this.timerControls.startTimer();
    }
  }

  private nextPerson(): Person {
    const currentPerson = this.current$.getValue();
    return currentPerson
      ? this.people[(this.people.findIndex(x => x.name === currentPerson.name) + 1) % this.people.length]
      : this.people[0];
  }

  addPerson() {
    if (!this.people.find(x => x.name === this.newName) && this.newName) {
      this.people.push({name: this.newName});
      this.newName = '';
      if (this.people.length === 1) {
        this.next();
      }
    } else {
      // Todo: name must be unique
    }
  }

  deletePerson(person: Person) {
    const index = this.people.findIndex(x => x.name === person.name);

    if (person.name === this.current$.getValue().name) {
      this.next();
    }

    if (index > -1) {
      this.people.splice(index, 1);
    }
  }

  // Todo: edit all names, not just currentPerson, move trashcan icon to an x icon on the name field (maybe?)
  changeName() {
    this.editing = true;
  }

  acceptName() {
    this.editing = false;
  }

  loadNames() {
    this.people = [
      {name: 'Brian'},
      {name: 'Damian'},
      {name: 'Guy'},
      {name: 'Jeremy'},
      {name: 'Harry'},
      {name: 'James'},
      {name: 'Mike'},
      {name: 'Nick'}
    ];
    this.next();
    this.showLoadNames = false;
  }
}
