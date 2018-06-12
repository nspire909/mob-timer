import { Component, OnInit, Input, Output } from '@angular/core';
import { interval, merge, Observable, BehaviorSubject, Subject, NEVER, EMPTY } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mob-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input()
  minutes = 10;

  @Output()
  timer$: Observable<number>;

  @Output()
  pause$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  @Output()
  reset$: Subject<number> = new Subject();

  constructor() { }

  ngOnInit() {

  }

  start() {
    const interval$ = interval(1000).pipe(
      startWith(0),
      map(() => -1),
      takeUntil(this.reset$)
    );

    const seconds = 60 * this.minutes;

    this.pause$.next(false);

    this.timer$ = merge(this.pause$)
      .pipe(
        switchMap(val => (!val ? interval$ : EMPTY)),
        scan((acc, curr) => (curr ? curr + acc : acc), seconds),
        takeUntil(this.reset$),
        takeWhile(t => t >= 0)
      );
  }

  stop() {
    this.timer$ = NEVER;
  }

  toggle() {
    this.pause$.next(!this.pause$.value);
  }
}
