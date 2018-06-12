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

  i = 0;
  people = [
    {name: 'Jeremy'},
    {name: 'Damian'},
    {name: 'Brian'},
    {name: 'Guy'},
    {name: 'Nick'},
    {name: 'James'},
    {name: 'Harry'},
    {name: 'Mike'}
  ];

  timer$: Observable<number>;
  pause$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  reset$: Subject<void> = new Subject();
  current$: Subject<Person> = new BehaviorSubject(this.people[0]);

  // @ViewChild('mob-timer')
  // ngTimer$: Observable<number>;

  constructor(private fb: FormBuilder, private audio: AudioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      minutes: [15, Validators.required]
    });
  }

  addField() {
    this.people.push({name: ''});
  }

  startTimer() {
    const interval$ = interval(1000).pipe(
      startWith(0),
      map(() => -1)
    );

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
    this.pause$.next(!this.pause$.value);
  }

  restart() {
    this.reset$.next();
    this.current$.next(this.people[this.i % this.people.length]);
    this.startTimer();
  }

  next() {
    this.reset$.next();
    this.current$.next(this.people[++this.i % this.people.length]);
    this.startTimer();
  }

  reset() {
    this.i = 0;
    this.reset$.next();
    this.current$.next(this.people[this.i % this.people.length]);
    this.stopTimer();
  }

  // whoIsNext() {
  //   let next: string;
  //   const rand = Math.floor(Math.random() * this.people.length);
  //   next = this.people[rand];
  //   this.people.splice(rand, 1);
  //   return next;
  // }

  // shuffleArray() {
  //   let shuffledPeople: string[] = [];
  //   do {
  //     shuffledPeople.push(this.whoIsNext());
  //   }
  //   while (this.people.length > 0);
  //   this.people = shuffledPeople;
  // }
}
