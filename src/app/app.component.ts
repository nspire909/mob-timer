import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, merge, Observable, BehaviorSubject, Subject, NEVER, EMPTY } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, tap, map, takeUntil } from 'rxjs/operators';
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
  form: FormGroup;
  editing = false;

  i = 0;
  people = [
    {name: 'Amy'},
    {name: 'Bill'},
    {name: 'Charlene'},
  ];

  timer$: Observable<number>;
  pause$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reset$: Subject<number> = new Subject();
  current$: Observable<number>;

  // @ViewChild('mob-timer')
  // ngTimer$: Observable<number>;

  constructor(private fb: FormBuilder, private audio: AudioService) { }

  ngOnInit() {
    console.log(this.editing);
    this.form = this.fb.group({
      minutes: [15, Validators.required]
    });

    this.current$ = this.reset$.pipe(
      startWith(0),
      map(i => i)
    );
  }

  addField() {
    this.people.push({name: ''});
  }

  startTimer(i: number) {
    this.editing = false;
    const interval$ = interval(1000).pipe(
      startWith(0),
      map(() => -1)
    );

    this.reset$.next(this.i = i);
    this.pause$.next(false);

    const seconds = 60 * +this.form.get('minutes').value;

    this.pause$.next(false);

    this.timer$ = merge(this.pause$)
      .pipe(
        switchMap(val => (!val ? interval$ : EMPTY)),
        scan((acc, curr) => (curr ? curr + acc : acc), seconds),
        takeUntil(this.reset$),
        tap(x => x === 31 || x === 30 || x === 29 ? this.audio.beep() : () => { }),
        tap(x => x === 2 ? this.audio.gameOver() : () => { }),
        tap(x => x === 0 ? this.next() : () => { }),
        map(x => x * 1000),
        takeWhile(v => v >= 0)
      );

    // this.ngTimer$.pipe(
    //   tap(x => x === 31 || x === 30 || x === 29 ? this.audio.beep() : () => { }),
    //   tap(x => x === 3 ? this.audio.gameOver() : () => { }),
    //   tap(x => x === 0 ? this.next() : () => { }),
    //   map(x => x * 1000)
    // );
  }

  stopTimer() {
    this.timer$ = NEVER;
    // this.ngTimer$ = NEVER;
  }

  toggleTimer() {
    this.editing = false;
    this.pause$.next(!this.pause$.value);
  }

  restart() {
    this.reset$.next(this.i);
    this.pause$.next(false);
    this.timer$ = NEVER;
    this.startTimer(this.i);
  }

  next() {
    this.reset$.next(++this.i);
    this.pause$.next(false);
    this.timer$ = NEVER;
    this.startTimer(this.i);
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
