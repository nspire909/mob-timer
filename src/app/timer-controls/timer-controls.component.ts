import { Component, Input, OnInit } from '@angular/core';
import { TimerService, Timer } from '@devrec/ng-timer';

@Component({
  selector: 'mob-timer-controls',
  templateUrl: './timer-controls.component.html',
  styleUrls: ['./timer-controls.component.scss']
})
export class TimerControlsComponent implements OnInit {
  @Input()
  name = 'timer';

  @Input()
  timeFcn: (value: number) => void = (() => {});

  timer: Timer;

  constructor(public timerService: TimerService) {}

  ngOnInit() {
    this.timer = this.timerService.timers[this.name];
  }
}
