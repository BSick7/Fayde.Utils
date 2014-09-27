/// <reference path="src/Fayde.d.ts" />
/// <reference path="Extensions.d.ts" />
declare module Fayde.Utils {
    var Version: string;
}
declare module Fayde.Utils {
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
