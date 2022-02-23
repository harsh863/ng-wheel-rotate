<div align="center">
    <img src="https://img.icons8.com/fluency/96/000000/wheel.png"/>
</div>
<h1 align="center">ngWheelRotate</h1>

<p align="center"><b><i>Angular directive to parse wheel event with additional informative data and gives more controlled output.</i></b></p>
<p align="center">
		<a href="https://www.npmjs.com/package/ng-wheel-rotate"><img alt="NPM Version" src="https://img.shields.io/npm/v/ng-wheel-rotate.svg" height="20"/></a>
    <a href="https://www.npmjs.com/package/ng-wheel-rotate"><img alt="Total downloads" src="https://img.shields.io/npm/dt/ng-wheel-rotate.svg" height="20"/></a>
</p>

## Demo:-

Here is the working demonstration of package: https://ng-wheel-rotate-demo.vercel.app/

## Installation:-

1.&nbsp; Download the package from npm using: `npm i ng-wheel-rotate`.

2.&nbsp; Add `NgWheelRotateModule` into your NgModule imports:
```ts
import {NgWheelRotateModule} from "ng-wheel-rotate";

@NgModule({
  ...
  imports: [ NgWheelRotateModule, ... ],
  ...
})
```

3.&nbsp; Add `ngWheelRotate` on any element like this:
```angular2html
<div ngWheelRotate
     [debounce]="<DEBOUNCE_TIME(in milliseconds, default = 0)>"
     [delay]="<DELAY_TIME(in milliseconds, default = 0)>"
     [disabled]="<LISTEN_EVENTS_OR_NOT(boolean, default = false)>"
     [activeAxis]="<LISTEN_EVENTS_OF_SPECIFIC_AXIS(WheelRotateAxis, default = WheelRotateAxis.BOTH )>"
     (onWheelRotate)="onWheelRotate($event)">
  ...
</div>
```

4.&nbsp; Now in your `component.ts`:
```ts
import {WheelRotateEvent} from "ng-wheel-rotate";
...
onWheelRotate(data: WheelRotateEvent) {
  // your logic goes here.
}
```

## Interface:-

```ts
interface WheelRotateEvent {
  event: WheelEvent;
  direction: WheelDirection;
  source: WheelSource;
  axis: WheelRotateAxis;
}
```

## Enums:-

```ts
enum WheelDirection {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT'
}

enum WheelSource {
  TOUCHPAD = 'TOUCHPAD',
  MOUSE = 'MOUSE'
}

enum WheelRotateAxis {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
  BOTH = 'BOTH'
}
```

## Author:-

<img src="https://avatars.githubusercontent.com/u/53868138?s=400&u=af1bb288033e40fde4f68cfc6ed4b10f7a696316&v=4" alt="Harsh Mittal Github" width="100"/>

**[Harsh Mittal](https://github.com/harsh863/)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/harsh863/)
[![StackOverflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?logo=stack-overflow&logoColor=white)](https://stackoverflow.com/users/12774193/harsh-mittal)
[![DEV](https://img.shields.io/badge/DEV-%23000000.svg?logo=dev.to&logoColor=white)](https://dev.to/harsh863)
[![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=facebook&logoColor=white)](https://www.facebook.com/harsh863)

<a href="https://www.buymeacoffee.com/harsh863" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40"></a>
