
// String

String.prototype.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

String.prototype.startsWith = function (str) { return this.indexOf(str) == 0; };
String.prototype.endsWith = function(str) { return this.indexOf(str, this.length - str.length) !== -1; };
String.prototype.trim = function () { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
String.prototype.toFileName = function () { return this.replace(/[^a-z0-9]/gi, '_').toLowerCase(); };
String.prototype.contains = function(str) { return this.indexOf(str) !== -1; };
String.prototype.utf8_to_b64 = function(){ return window.btoa(unescape(encodeURIComponent(this))); };
String.prototype.b64_to_utf8 = function(){ return decodeURIComponent(escape(window.atob(this))); };


// Array

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement: any, fromIndex?: number) {
        var i = (fromIndex || 0);
        var j = this.length;

        for (i; i < j; i++) {
            if (this[i] === searchElement) {
                return i;
            }
        }
        return -1;
    };
}

if (!Array.prototype.clone) {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}

if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
};

if (!Array.prototype.contains) {
    Array.prototype.contains = function (val: any){
        return this.indexOf(val) !== -1;
    };
}

// Math

Math.clamp = function(value: number, min: number, max: number){
    return Math.min(Math.max(value, min), max);
};

Math.roundToDecimalPlace = function(num: number, dec: number): number {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

Math.normalise = function(num: number, min: number, max: number): number {
    return (num - min) / (max - min);
};

Math.TAU = Math.PI * 2;

// Number

Number.prototype.isInt = function(){ return this % 1 === 0; };

// Animation

//var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
//    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//window.requestAnimationFrame = requestAnimationFrame;
//
//export class Utils{
//    constructor(){
//
//    }
//}

