import {Directive, ElementRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {debounceTime, delay, filter} from "rxjs/operators";

@Directive({
  selector: '[ngWheelRotate]'
})
export class NgWheelRotateDirective implements OnInit, OnDestroy {

  @Input() set debounce(value: number) {
    this._debounce = value;
    this._syncWheelRotate();
  }

  @Input() set delay(value: number) {
    this._delay = value;
    this._syncWheelRotate();
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value;
    this._syncWheelRotate();
  }

  @Input() activeAxis: WheelRotateAxis = WheelRotateAxis.BOTH;

  @Output() onWheelRotate = new Subject<WheelRotateEvent>();


  private _debounce: number = 0;
  private _delay: number = 0;
  private _disabled: boolean = false;
  private _wheelRotate$ = new Subject<WheelRotateEvent>();
  private _wheelRotateSubscription!: Subscription;

  constructor(private _host: ElementRef<HTMLElement>) {
    this._rotateEventsFilter = this._rotateEventsFilter.bind(this);
    this._setWheelRotateEventData = this._setWheelRotateEventData.bind(this);
  }

  ngOnInit() {
    this._syncWheelRotate();
    this._attachWheelListener();
  }

  private _syncWheelRotate() {
    this._wheelRotateSubscription?.unsubscribe();
    this._wheelRotateSubscription = this._wheelRotate$.pipe(
      debounceTime(this._debounce),
      delay(this._delay),
      filter(this._rotateEventsFilter),
    ).subscribe((wheelRotateEvent: WheelRotateEvent) => this.onWheelRotate.next(wheelRotateEvent));
  }

  private _rotateEventsFilter(wheelRotateEvent: WheelRotateEvent): boolean {
    if (this._disabled) {
      return false;
    } else {
      return this.activeAxis === WheelRotateAxis.BOTH || this.activeAxis === wheelRotateEvent.axis;
    }
  }

  private _attachWheelListener() {
    this._host.nativeElement.onwheel = this._setWheelRotateEventData;
  }

  private _setWheelRotateEventData(event: WheelEvent) {
    const { deltaX, deltaY } = event;
    const unidirectional: boolean =
      (Math.abs(deltaX) === 0 && Math.abs(deltaY) !== 0) ||
      (Math.abs(deltaX) !== 0 && Math.abs(deltaY) === 0);

    if (!unidirectional) return;

    const axis: WheelRotateAxis = (Math.abs(deltaX) === 0 && Math.abs(deltaY) !== 0) ?
      WheelRotateAxis.VERTICAL :
      WheelRotateAxis.HORIZONTAL;

    const source: WheelSource = (axis === WheelRotateAxis.VERTICAL) ?
      ( Number.isInteger(event.deltaY) ? WheelSource.MOUSE : WheelSource.TOUCHPAD ) :
      WheelSource.TOUCHPAD;

    const direction: WheelDirection = Math.abs(deltaX) !== 0 ?
      ( deltaX > 0 ? WheelDirection.RIGHT : WheelDirection.LEFT ) :
      ( deltaY > 0 ? WheelDirection.DOWN : WheelDirection.UP );

    this._wheelRotate$.next({ event, direction, source, axis });
  }

  ngOnDestroy() {
    this._wheelRotateSubscription?.unsubscribe();
  }
}

export interface WheelRotateEvent {
  event: WheelEvent;
  direction: WheelDirection;
  source: WheelSource;
  axis: WheelRotateAxis;
}

export enum WheelDirection {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT'
}

export enum WheelSource {
  TOUCHPAD = 'TOUCHPAD',
  MOUSE = 'MOUSE'
}

export enum WheelRotateAxis {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  BOTH = 'BOTH'
}
