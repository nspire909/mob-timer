import {
  Component, ElementRef, OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {interval, merge, Observable, BehaviorSubject, Subject, NEVER, EMPTY} from 'rxjs';
import { switchMap, scan, takeWhile, startWith, tap, map, takeUntil } from 'rxjs/operators';
import {sound} from '../assets/sounds';

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
  reset$: Subject<number> = new Subject();
  current$: Observable<string>;

  constructor(private fb: FormBuilder) { }

  static beep() {
    const snd = new Audio(`data:audio/wav;base64,${sound.beep}`);
    snd.play();
  }

  static gameOver() {
    const snd = new Audio(`data:audio/wav;base64,${sound.gameOver}`);
    snd.play();
  }

  ngOnInit() {
    this.form = this.fb.group({
      minutes: [15, Validators.required]
    });

    this.current$ = this.reset$.pipe(
      startWith(0),
      map(i => this.people[(i + 0) % this.people.length].name)
    );
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

    this.timer$ = merge(this.pause$)
      .pipe(
        switchMap(val => (!val ? interval$ : EMPTY)),
        scan((acc, curr) => (curr | curr ? curr + acc : acc), seconds),
        takeUntil(this.reset$),
        tap(x => x === 31 || x === 30 || x === 29 ? AppComponent.beep() : () => { }),
        tap(x => x === 3 ? AppComponent.gameOver() : () => { }),
        tap(x => x === 0 ? this.next() : () => { }),
        map(x => x * 1000),
        takeWhile(v => v >= 0)
      );
  }

  toggleTimer() {
    this.pause$.next(!this.pause$.value);
  }

  restart() {
    this.reset$.next(this.i);
    this.pause$.next(false);
    this.timer$ = NEVER;
    this.startTimer();
  }

  next() {
    this.reset$.next(++this.i);
    this.pause$.next(false);
    this.timer$ = NEVER;
    this.startTimer();
  }

  reset() {
    this.i = 0;
    this.reset$.next(0);
    this.pause$.next(false);
    this.timer$ = NEVER;

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
