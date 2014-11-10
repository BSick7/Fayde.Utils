declare module Fayde.Utils {
    var Version: string;
}
declare module Fayde.Utils {
}
interface HTMLElement {
    ontouchstart: any;
}
interface Window {
    btoa(str: string): string;
    atob(str: string): string;
    escape(s: string): any;
    unescape(s: string): any;
}
interface Window {
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    mozRequestAnimationFrame(callback: FrameRequestCallback): number;
    oRequestAnimationFrame(callback: FrameRequestCallback): number;
}
interface String {
    format(template: string, ...args: any[]): string;
    startsWith(text: string): boolean;
    endsWith(text: string): boolean;
    ltrim(): string;
    rtrim(): string;
    fulltrim(): string;
    toFileName(): string;
    contains(str: string): boolean;
    utf8_to_b64(str: string): string;
    b64_to_utf8(str: string): string;
}
interface Array<T> {
    clone(): T[];
    last(): any;
    contains(item: any): boolean;
    remove(item: any): void;
    removeAt(index: number): void;
    insert(item: any, index: number): void;
}
interface Number {
    isInt(): boolean;
}
interface Math {
    clamp(value: number, min: number, max: number): number;
    constrain(value: number, low: number, high: number): number;
    degreesToRadians(degrees: number): number;
    distanceBetween(x1: number, y1: number, x2: number, y2: number): number;
    lerp(start: number, stop: number, amount: number): number;
    mag(a: number, b: number, c: number): number;
    map(value: number, start1: number, stop1: number, start2: number, stop2: number): number;
    randomBetween(low: number, high?: number): number;
    roundToDecimalPlace(num: number, dec: number): number;
    radiansToDegrees(radians: number): number;
    normalise(num: number, min: number, max: number): number;
    sq(n: number): number;
    TAU: number;
}
declare module Fayde.Utils {
    class Size extends MVVM.ObservableObject {
        private _Width;
        private _Height;
        constructor(width: number, height: number);
        public Width : number;
        public Height : number;
        public AspectRatio : number;
    }
}
declare module Fayde.Utils {
    class Vector extends MVVM.ObservableObject {
        private _X;
        private _Y;
        constructor(x: number, y: number);
        public Get(): Vector;
        public Set(x: number, y: number): void;
        public X : number;
        public Y : number;
        public Add(v: Vector): void;
        static Add(v1: Vector, v2: Vector): Vector;
        public Sub(v: Vector): void;
        static Sub(v1: Vector, v2: Vector): Vector;
        public Mult(n: number): void;
        static Mult(v1: Vector, v2: Vector): Vector;
        static MultN(v1: Vector, n: number): Vector;
        public Div(n: number): void;
        static Div(v1: Vector, v2: Vector): Vector;
        static DivN(v1: Vector, n: number): Vector;
        public Mag(): number;
        public MagSq(): number;
        public Normalise(): void;
        public Limit(max: number): void;
        public Equals(v: Vector): boolean;
        public Heading(): number;
        static Random2D(): Vector;
        static FromAngle(angle: number): Vector;
    }
}
