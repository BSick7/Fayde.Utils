/// <reference path="Extensions.d.ts" />
/// <reference path="src/Fayde.d.ts" />
declare module Fayde.Utils {
    var Version: string;
}
declare module Utils {
    class Vector extends Fayde.MVVM.ObservableObject {
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
