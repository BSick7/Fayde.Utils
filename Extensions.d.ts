// not included in lib.d.ts
declare function escape(s: string): any;
declare function unescape(s: string): any;

interface HTMLElement{
    ontouchstart: any;
}

interface Window{
    btoa(str: string): string;
    atob(str: string): string;
}

interface Window {
    webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    mozRequestAnimationFrame(callback: FrameRequestCallback): number;
    oRequestAnimationFrame(callback: FrameRequestCallback): number;
}

// String
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

// Array
interface Array<T>{
    clone(): Array<T>;
    last(): any;
    contains(val: any): boolean;
}

// Number
interface Number {
    isInt(): boolean;
}

// Math
interface Math {
    clamp(value: number, min: number, max: number): number;
    roundToDecimalPlace(num: number, dec: number): number;
    normalise(num: number, min: number, max: number): number;
    TAU: number;
}