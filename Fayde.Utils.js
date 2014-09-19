var Fayde;
(function (Fayde) {
    (function (Utils) {
        Utils.Version = '0.1.0';
    })(Fayde.Utils || (Fayde.Utils = {}));
    var Utils = Fayde.Utils;
})(Fayde || (Fayde = {}));
String.prototype.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }

    return s;
};

String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
};
String.prototype.endsWith = function (str) {
    return this.indexOf(str, this.length - str.length) !== -1;
};
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
};
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
};
String.prototype.fulltrim = function () {
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' ');
};
String.prototype.toFileName = function () {
    return this.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};
String.prototype.contains = function (str) {
    return this.indexOf(str) !== -1;
};
String.prototype.utf8_to_b64 = function () {
    return window.btoa(unescape(encodeURIComponent(this)));
};
String.prototype.b64_to_utf8 = function () {
    return decodeURIComponent(escape(window.atob(this)));
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
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
}
;

if (!Array.prototype.contains) {
    Array.prototype.contains = function (val) {
        return this.indexOf(val) !== -1;
    };
}

Math.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

Math.roundToDecimalPlace = function (num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

Math.normalise = function (num, min, max) {
    return (num - min) / (max - min);
};

Math.TAU = Math.PI * 2;

Number.prototype.isInt = function () {
    return this % 1 === 0;
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Utils) {
        var Vector = (function (_super) {
            __extends(Vector, _super);
            function Vector(x, y) {
                _super.call(this);

                this.X = x;
                this.Y = y;
            }
            Vector.prototype.Get = function () {
                return new Vector(this.X, this.Y);
            };

            Vector.prototype.Set = function (x, y) {
                this.X = x;
                this.Y = y;
            };

            Object.defineProperty(Vector.prototype, "X", {
                get: function () {
                    return this._X;
                },
                set: function (value) {
                    this._X = value;
                    this.OnPropertyChanged("X");
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Vector.prototype, "Y", {
                get: function () {
                    return this._Y;
                },
                set: function (value) {
                    this._Y = value;
                    this.OnPropertyChanged("Y");
                },
                enumerable: true,
                configurable: true
            });


            Vector.prototype.Add = function (v) {
                this.X += v.X;
                this.Y += v.Y;
            };

            Vector.Add = function (v1, v2) {
                return new Vector(v1.X + v2.X, v1.Y + v2.Y);
            };

            Vector.prototype.Sub = function (v) {
                this.X -= v.X;
                this.Y -= v.Y;
            };

            Vector.Sub = function (v1, v2) {
                return new Vector(v1.X - v2.X, v1.Y - v2.Y);
            };

            Vector.prototype.Mult = function (n) {
                this.X = this.X * n;
                this.Y = this.Y * n;
            };

            Vector.Mult = function (v1, v2) {
                return new Vector(v1.X * v2.X, v1.Y * v2.Y);
            };

            Vector.MultN = function (v1, n) {
                return new Vector(v1.X * n, v1.Y * n);
            };

            Vector.prototype.Div = function (n) {
                this.X = this.X / n;
                this.Y = this.Y / n;
            };

            Vector.Div = function (v1, v2) {
                return new Vector(v1.X / v2.X, v1.Y / v2.Y);
            };

            Vector.DivN = function (v1, n) {
                return new Vector(v1.X / n, v1.Y / n);
            };

            Vector.prototype.Mag = function () {
                return Math.sqrt(this.X * this.X + this.Y * this.Y);
            };

            Vector.prototype.MagSq = function () {
                return (this.X * this.X + this.Y * this.Y);
            };

            Vector.prototype.Normalise = function () {
                var m = this.Mag();
                if (m != 0 && m != 1) {
                    this.Div(m);
                }
            };

            Vector.prototype.Limit = function (max) {
                if (this.MagSq() > max * max) {
                    this.Normalise();
                    this.Mult(max);
                }
            };

            Vector.prototype.Equals = function (v) {
                return (this.X == v.X && this.Y == v.Y);
            };

            Vector.prototype.Heading = function () {
                var angle = Math.atan2(-this.Y, this.X);
                return -1 * angle;
            };

            Vector.Random2D = function () {
                return Vector.FromAngle((Math.random() * Math.TAU));
            };

            Vector.FromAngle = function (angle) {
                return new Vector(Math.cos(angle), Math.sin(angle));
            };
            return Vector;
        })(Fayde.MVVM.ObservableObject);
        Utils.Vector = Vector;
    })(Fayde.Utils || (Fayde.Utils = {}));
    var Utils = Fayde.Utils;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Fayde.Utils.js.map
