var Fayde;
(function (Fayde) {
    (function (Utils) {
        Utils.Version = '0.2.2';
    })(Fayde.Utils || (Fayde.Utils = {}));
    var Utils = Fayde.Utils;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Utils) {
        (function (Collections) {
            var _hasOwnProperty = Object.prototype.hasOwnProperty;
            var has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            };

            

            

            

            function defaultCompare(a, b) {
                if (a < b) {
                    return -1;
                } else if (a === b) {
                    return 0;
                } else {
                    return 1;
                }
            }
            Collections.defaultCompare = defaultCompare;

            function defaultEquals(a, b) {
                return a === b;
            }
            Collections.defaultEquals = defaultEquals;

            function defaultToString(item) {
                if (item === null) {
                    return 'COLLECTION_NULL';
                } else if (Collections.isUndefined(item)) {
                    return 'COLLECTION_UNDEFINED';
                } else if (Collections.isString(item)) {
                    return '$s' + item;
                } else {
                    return '$o' + item.toString();
                }
            }
            Collections.defaultToString = defaultToString;

            function makeString(item, join) {
                if (typeof join === "undefined") { join = ","; }
                if (item === null) {
                    return 'COLLECTION_NULL';
                } else if (Collections.isUndefined(item)) {
                    return 'COLLECTION_UNDEFINED';
                } else if (Collections.isString(item)) {
                    return item.toString();
                } else {
                    var toret = "{";
                    var first = true;
                    for (var prop in item) {
                        if (has(item, prop)) {
                            if (first)
                                first = false;
                            else
                                toret = toret + join;
                            toret = toret + prop + ":" + item[prop];
                        }
                    }
                    return toret + "}";
                }
            }
            Collections.makeString = makeString;

            function isFunction(func) {
                return (typeof func) === 'function';
            }
            Collections.isFunction = isFunction;

            function isUndefined(obj) {
                return (typeof obj) === 'undefined';
            }
            Collections.isUndefined = isUndefined;

            function isString(obj) {
                return Object.prototype.toString.call(obj) === '[object String]';
            }
            Collections.isString = isString;

            function reverseCompareFunction(compareFunction) {
                if (!Collections.isFunction(compareFunction)) {
                    return function (a, b) {
                        if (a < b) {
                            return 1;
                        } else if (a === b) {
                            return 0;
                        } else {
                            return -1;
                        }
                    };
                } else {
                    return function (d, v) {
                        return compareFunction(d, v) * -1;
                    };
                }
            }
            Collections.reverseCompareFunction = reverseCompareFunction;

            function compareToEquals(compareFunction) {
                return function (a, b) {
                    return compareFunction(a, b) === 0;
                };
            }
            Collections.compareToEquals = compareToEquals;

            (function (arrays) {
                function indexOf(array, item, equalsFunction) {
                    var equals = equalsFunction || Collections.defaultEquals;
                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        if (equals(array[i], item)) {
                            return i;
                        }
                    }
                    return -1;
                }
                arrays.indexOf = indexOf;

                function lastIndexOf(array, item, equalsFunction) {
                    var equals = equalsFunction || Collections.defaultEquals;
                    var length = array.length;
                    for (var i = length - 1; i >= 0; i--) {
                        if (equals(array[i], item)) {
                            return i;
                        }
                    }
                    return -1;
                }
                arrays.lastIndexOf = lastIndexOf;

                function contains(array, item, equalsFunction) {
                    return arrays.indexOf(array, item, equalsFunction) >= 0;
                }
                arrays.contains = contains;

                function remove(array, item, equalsFunction) {
                    var index = arrays.indexOf(array, item, equalsFunction);
                    if (index < 0) {
                        return false;
                    }
                    array.splice(index, 1);
                    return true;
                }
                arrays.remove = remove;

                function frequency(array, item, equalsFunction) {
                    var equals = equalsFunction || Collections.defaultEquals;
                    var length = array.length;
                    var freq = 0;
                    for (var i = 0; i < length; i++) {
                        if (equals(array[i], item)) {
                            freq++;
                        }
                    }
                    return freq;
                }
                arrays.frequency = frequency;

                function equals(array1, array2, equalsFunction) {
                    var equals = equalsFunction || Collections.defaultEquals;

                    if (array1.length !== array2.length) {
                        return false;
                    }
                    var length = array1.length;
                    for (var i = 0; i < length; i++) {
                        if (!equals(array1[i], array2[i])) {
                            return false;
                        }
                    }
                    return true;
                }
                arrays.equals = equals;

                function copy(array) {
                    return array.concat();
                }
                arrays.copy = copy;

                function swap(array, i, j) {
                    if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                        return false;
                    }
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                    return true;
                }
                arrays.swap = swap;

                function toString(array) {
                    return '[' + array.toString() + ']';
                }
                arrays.toString = toString;

                function forEach(array, callback) {
                    var lenght = array.length;
                    for (var i = 0; i < lenght; i++) {
                        if (callback(array[i]) === false) {
                            return;
                        }
                    }
                }
                arrays.forEach = forEach;
            })(Collections.arrays || (Collections.arrays = {}));
            var arrays = Collections.arrays;

            

            var LinkedList = (function () {
                function LinkedList() {
                    this.firstNode = null;
                    this.lastNode = null;
                    this.nElements = 0;
                }
                LinkedList.prototype.add = function (item, index) {
                    if (Collections.isUndefined(index)) {
                        index = this.nElements;
                    }
                    if (index < 0 || index > this.nElements || Collections.isUndefined(item)) {
                        return false;
                    }
                    var newNode = this.createNode(item);
                    if (this.nElements === 0) {
                        this.firstNode = newNode;
                        this.lastNode = newNode;
                    } else if (index === this.nElements) {
                        this.lastNode.next = newNode;
                        this.lastNode = newNode;
                    } else if (index === 0) {
                        newNode.next = this.firstNode;
                        this.firstNode = newNode;
                    } else {
                        var prev = this.nodeAtIndex(index - 1);
                        newNode.next = prev.next;
                        prev.next = newNode;
                    }
                    this.nElements++;
                    return true;
                };

                LinkedList.prototype.first = function () {
                    if (this.firstNode !== null) {
                        return this.firstNode.element;
                    }
                    return undefined;
                };

                LinkedList.prototype.last = function () {
                    if (this.lastNode !== null) {
                        return this.lastNode.element;
                    }
                    return undefined;
                };

                LinkedList.prototype.elementAtIndex = function (index) {
                    var node = this.nodeAtIndex(index);
                    if (node === null) {
                        return undefined;
                    }
                    return node.element;
                };

                LinkedList.prototype.indexOf = function (item, equalsFunction) {
                    var equalsF = equalsFunction || Collections.defaultEquals;
                    if (Collections.isUndefined(item)) {
                        return -1;
                    }
                    var currentNode = this.firstNode;
                    var index = 0;
                    while (currentNode !== null) {
                        if (equalsF(currentNode.element, item)) {
                            return index;
                        }
                        index++;
                        currentNode = currentNode.next;
                    }
                    return -1;
                };

                LinkedList.prototype.contains = function (item, equalsFunction) {
                    return (this.indexOf(item, equalsFunction) >= 0);
                };

                LinkedList.prototype.remove = function (item, equalsFunction) {
                    var equalsF = equalsFunction || Collections.defaultEquals;
                    if (this.nElements < 1 || Collections.isUndefined(item)) {
                        return false;
                    }
                    var previous = null;
                    var currentNode = this.firstNode;

                    while (currentNode !== null) {
                        if (equalsF(currentNode.element, item)) {
                            if (currentNode === this.firstNode) {
                                this.firstNode = this.firstNode.next;
                                if (currentNode === this.lastNode) {
                                    this.lastNode = null;
                                }
                            } else if (currentNode === this.lastNode) {
                                this.lastNode = previous;
                                previous.next = currentNode.next;
                                currentNode.next = null;
                            } else {
                                previous.next = currentNode.next;
                                currentNode.next = null;
                            }
                            this.nElements--;
                            return true;
                        }
                        previous = currentNode;
                        currentNode = currentNode.next;
                    }
                    return false;
                };

                LinkedList.prototype.clear = function () {
                    this.firstNode = null;
                    this.lastNode = null;
                    this.nElements = 0;
                };

                LinkedList.prototype.equals = function (other, equalsFunction) {
                    var eqF = equalsFunction || Collections.defaultEquals;
                    if (!(other instanceof Collections.LinkedList)) {
                        return false;
                    }
                    if (this.size() !== other.size()) {
                        return false;
                    }
                    return this.equalsAux(this.firstNode, other.firstNode, eqF);
                };

                LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
                    while (n1 !== null) {
                        if (!eqF(n1.element, n2.element)) {
                            return false;
                        }
                        n1 = n1.next;
                        n2 = n2.next;
                    }
                    return true;
                };

                LinkedList.prototype.removeElementAtIndex = function (index) {
                    if (index < 0 || index >= this.nElements) {
                        return undefined;
                    }
                    var element;
                    if (this.nElements === 1) {
                        element = this.firstNode.element;
                        this.firstNode = null;
                        this.lastNode = null;
                    } else {
                        var previous = this.nodeAtIndex(index - 1);
                        if (previous === null) {
                            element = this.firstNode.element;
                            this.firstNode = this.firstNode.next;
                        } else if (previous.next === this.lastNode) {
                            element = this.lastNode.element;
                            this.lastNode = previous;
                        }
                        if (previous !== null) {
                            element = previous.next.element;
                            previous.next = previous.next.next;
                        }
                    }
                    this.nElements--;
                    return element;
                };

                LinkedList.prototype.forEach = function (callback) {
                    var currentNode = this.firstNode;
                    while (currentNode !== null) {
                        if (callback(currentNode.element) === false) {
                            break;
                        }
                        currentNode = currentNode.next;
                    }
                };

                LinkedList.prototype.reverse = function () {
                    var previous = null;
                    var current = this.firstNode;
                    var temp = null;
                    while (current !== null) {
                        temp = current.next;
                        current.next = previous;
                        previous = current;
                        current = temp;
                    }
                    temp = this.firstNode;
                    this.firstNode = this.lastNode;
                    this.lastNode = temp;
                };

                LinkedList.prototype.toArray = function () {
                    var array = [];
                    var currentNode = this.firstNode;
                    while (currentNode !== null) {
                        array.push(currentNode.element);
                        currentNode = currentNode.next;
                    }
                    return array;
                };

                LinkedList.prototype.size = function () {
                    return this.nElements;
                };

                LinkedList.prototype.isEmpty = function () {
                    return this.nElements <= 0;
                };

                LinkedList.prototype.toString = function () {
                    return Collections.arrays.toString(this.toArray());
                };

                LinkedList.prototype.nodeAtIndex = function (index) {
                    if (index < 0 || index >= this.nElements) {
                        return null;
                    }
                    if (index === (this.nElements - 1)) {
                        return this.lastNode;
                    }
                    var node = this.firstNode;
                    for (var i = 0; i < index; i++) {
                        node = node.next;
                    }
                    return node;
                };

                LinkedList.prototype.createNode = function (item) {
                    return {
                        element: item,
                        next: null
                    };
                };
                return LinkedList;
            })();
            Collections.LinkedList = LinkedList;

            

            var Dictionary = (function () {
                function Dictionary(toStrFunction) {
                    this.table = {};
                    this.nElements = 0;
                    this.toStr = toStrFunction || Collections.defaultToString;
                }
                Dictionary.prototype.getValue = function (key) {
                    var pair = this.table['$' + this.toStr(key)];
                    if (Collections.isUndefined(pair)) {
                        return undefined;
                    }
                    return pair.value;
                };

                Dictionary.prototype.setValue = function (key, value) {
                    if (Collections.isUndefined(key) || Collections.isUndefined(value)) {
                        return undefined;
                    }

                    var ret;
                    var k = '$' + this.toStr(key);
                    var previousElement = this.table[k];
                    if (Collections.isUndefined(previousElement)) {
                        this.nElements++;
                        ret = undefined;
                    } else {
                        ret = previousElement.value;
                    }
                    this.table[k] = {
                        key: key,
                        value: value
                    };
                    return ret;
                };

                Dictionary.prototype.remove = function (key) {
                    var k = '$' + this.toStr(key);
                    var previousElement = this.table[k];
                    if (!Collections.isUndefined(previousElement)) {
                        delete this.table[k];
                        this.nElements--;
                        return previousElement.value;
                    }
                    return undefined;
                };

                Dictionary.prototype.keys = function () {
                    var array = [];
                    for (var name in this.table) {
                        if (has(this.table, name)) {
                            var pair = this.table[name];
                            array.push(pair.key);
                        }
                    }
                    return array;
                };

                Dictionary.prototype.values = function () {
                    var array = [];
                    for (var name in this.table) {
                        if (has(this.table, name)) {
                            var pair = this.table[name];
                            array.push(pair.value);
                        }
                    }
                    return array;
                };

                Dictionary.prototype.forEach = function (callback) {
                    for (var name in this.table) {
                        if (has(this.table, name)) {
                            var pair = this.table[name];
                            var ret = callback(pair.key, pair.value);
                            if (ret === false) {
                                return;
                            }
                        }
                    }
                };

                Dictionary.prototype.containsKey = function (key) {
                    return !Collections.isUndefined(this.getValue(key));
                };

                Dictionary.prototype.clear = function () {
                    this.table = {};
                    this.nElements = 0;
                };

                Dictionary.prototype.size = function () {
                    return this.nElements;
                };

                Dictionary.prototype.isEmpty = function () {
                    return this.nElements <= 0;
                };

                Dictionary.prototype.toString = function () {
                    var toret = "{";
                    this.forEach(function (k, v) {
                        toret = toret + "\n\t" + k.toString() + " : " + v.toString();
                    });
                    return toret + "\n}";
                };
                return Dictionary;
            })();
            Collections.Dictionary = Dictionary;

            var MultiDictionary = (function () {
                function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
                    if (typeof allowDuplicateValues === "undefined") { allowDuplicateValues = false; }
                    this.dict = new Dictionary(toStrFunction);
                    this.equalsF = valuesEqualsFunction || Collections.defaultEquals;
                    this.allowDuplicate = allowDuplicateValues;
                }
                MultiDictionary.prototype.getValue = function (key) {
                    var values = this.dict.getValue(key);
                    if (Collections.isUndefined(values)) {
                        return [];
                    }
                    return Collections.arrays.copy(values);
                };

                MultiDictionary.prototype.setValue = function (key, value) {
                    if (Collections.isUndefined(key) || Collections.isUndefined(value)) {
                        return false;
                    }
                    if (!this.containsKey(key)) {
                        this.dict.setValue(key, [value]);
                        return true;
                    }
                    var array = this.dict.getValue(key);
                    if (!this.allowDuplicate) {
                        if (Collections.arrays.contains(array, value, this.equalsF)) {
                            return false;
                        }
                    }
                    array.push(value);
                    return true;
                };

                MultiDictionary.prototype.remove = function (key, value) {
                    if (Collections.isUndefined(value)) {
                        var v = this.dict.remove(key);
                        return !Collections.isUndefined(v);
                    }
                    var array = this.dict.getValue(key);
                    if (Collections.arrays.remove(array, value, this.equalsF)) {
                        if (array.length === 0) {
                            this.dict.remove(key);
                        }
                        return true;
                    }
                    return false;
                };

                MultiDictionary.prototype.keys = function () {
                    return this.dict.keys();
                };

                MultiDictionary.prototype.values = function () {
                    var values = this.dict.values();
                    var array = [];
                    for (var i = 0; i < values.length; i++) {
                        var v = values[i];
                        for (var j = 0; j < v.length; j++) {
                            array.push(v[j]);
                        }
                    }
                    return array;
                };

                MultiDictionary.prototype.containsKey = function (key) {
                    return this.dict.containsKey(key);
                };

                MultiDictionary.prototype.clear = function () {
                    this.dict.clear();
                };

                MultiDictionary.prototype.size = function () {
                    return this.dict.size();
                };

                MultiDictionary.prototype.isEmpty = function () {
                    return this.dict.isEmpty();
                };
                return MultiDictionary;
            })();
            Collections.MultiDictionary = MultiDictionary;

            var Heap = (function () {
                function Heap(compareFunction) {
                    this.data = [];
                    this.compare = compareFunction || Collections.defaultCompare;
                }
                Heap.prototype.leftChildIndex = function (nodeIndex) {
                    return (2 * nodeIndex) + 1;
                };

                Heap.prototype.rightChildIndex = function (nodeIndex) {
                    return (2 * nodeIndex) + 2;
                };

                Heap.prototype.parentIndex = function (nodeIndex) {
                    return Math.floor((nodeIndex - 1) / 2);
                };

                Heap.prototype.minIndex = function (leftChild, rightChild) {
                    if (rightChild >= this.data.length) {
                        if (leftChild >= this.data.length) {
                            return -1;
                        } else {
                            return leftChild;
                        }
                    } else {
                        if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                            return leftChild;
                        } else {
                            return rightChild;
                        }
                    }
                };

                Heap.prototype.siftUp = function (index) {
                    var parent = this.parentIndex(index);
                    while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                        Collections.arrays.swap(this.data, parent, index);
                        index = parent;
                        parent = this.parentIndex(index);
                    }
                };

                Heap.prototype.siftDown = function (nodeIndex) {
                    var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));

                    while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                        Collections.arrays.swap(this.data, min, nodeIndex);
                        nodeIndex = min;
                        min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
                    }
                };

                Heap.prototype.peek = function () {
                    if (this.data.length > 0) {
                        return this.data[0];
                    } else {
                        return undefined;
                    }
                };

                Heap.prototype.add = function (element) {
                    if (Collections.isUndefined(element)) {
                        return undefined;
                    }
                    this.data.push(element);
                    this.siftUp(this.data.length - 1);
                    return true;
                };

                Heap.prototype.removeRoot = function () {
                    if (this.data.length > 0) {
                        var obj = this.data[0];
                        this.data[0] = this.data[this.data.length - 1];
                        this.data.splice(this.data.length - 1, 1);
                        if (this.data.length > 0) {
                            this.siftDown(0);
                        }
                        return obj;
                    }
                    return undefined;
                };

                Heap.prototype.contains = function (element) {
                    var equF = Collections.compareToEquals(this.compare);
                    return Collections.arrays.contains(this.data, element, equF);
                };

                Heap.prototype.size = function () {
                    return this.data.length;
                };

                Heap.prototype.isEmpty = function () {
                    return this.data.length <= 0;
                };

                Heap.prototype.clear = function () {
                    this.data.length = 0;
                };

                Heap.prototype.forEach = function (callback) {
                    Collections.arrays.forEach(this.data, callback);
                };
                return Heap;
            })();
            Collections.Heap = Heap;

            var Stack = (function () {
                function Stack() {
                    this.list = new LinkedList();
                }
                Stack.prototype.push = function (elem) {
                    return this.list.add(elem, 0);
                };

                Stack.prototype.add = function (elem) {
                    return this.list.add(elem, 0);
                };

                Stack.prototype.pop = function () {
                    return this.list.removeElementAtIndex(0);
                };

                Stack.prototype.peek = function () {
                    return this.list.first();
                };

                Stack.prototype.size = function () {
                    return this.list.size();
                };

                Stack.prototype.contains = function (elem, equalsFunction) {
                    return this.list.contains(elem, equalsFunction);
                };

                Stack.prototype.isEmpty = function () {
                    return this.list.isEmpty();
                };

                Stack.prototype.clear = function () {
                    this.list.clear();
                };

                Stack.prototype.forEach = function (callback) {
                    this.list.forEach(callback);
                };
                return Stack;
            })();
            Collections.Stack = Stack;

            var Queue = (function () {
                function Queue() {
                    this.list = new LinkedList();
                }
                Queue.prototype.enqueue = function (elem) {
                    return this.list.add(elem);
                };

                Queue.prototype.add = function (elem) {
                    return this.list.add(elem);
                };

                Queue.prototype.dequeue = function () {
                    if (this.list.size() !== 0) {
                        var el = this.list.first();
                        this.list.removeElementAtIndex(0);
                        return el;
                    }
                    return undefined;
                };

                Queue.prototype.peek = function () {
                    if (this.list.size() !== 0) {
                        return this.list.first();
                    }
                    return undefined;
                };

                Queue.prototype.size = function () {
                    return this.list.size();
                };

                Queue.prototype.contains = function (elem, equalsFunction) {
                    return this.list.contains(elem, equalsFunction);
                };

                Queue.prototype.isEmpty = function () {
                    return this.list.size() <= 0;
                };

                Queue.prototype.clear = function () {
                    this.list.clear();
                };

                Queue.prototype.forEach = function (callback) {
                    this.list.forEach(callback);
                };
                return Queue;
            })();
            Collections.Queue = Queue;

            var PriorityQueue = (function () {
                function PriorityQueue(compareFunction) {
                    this.heap = new Heap(Collections.reverseCompareFunction(compareFunction));
                }
                PriorityQueue.prototype.enqueue = function (element) {
                    return this.heap.add(element);
                };

                PriorityQueue.prototype.add = function (element) {
                    return this.heap.add(element);
                };

                PriorityQueue.prototype.dequeue = function () {
                    if (this.heap.size() !== 0) {
                        var el = this.heap.peek();
                        this.heap.removeRoot();
                        return el;
                    }
                    return undefined;
                };

                PriorityQueue.prototype.peek = function () {
                    return this.heap.peek();
                };

                PriorityQueue.prototype.contains = function (element) {
                    return this.heap.contains(element);
                };

                PriorityQueue.prototype.isEmpty = function () {
                    return this.heap.isEmpty();
                };

                PriorityQueue.prototype.size = function () {
                    return this.heap.size();
                };

                PriorityQueue.prototype.clear = function () {
                    this.heap.clear();
                };

                PriorityQueue.prototype.forEach = function (callback) {
                    this.heap.forEach(callback);
                };
                return PriorityQueue;
            })();
            Collections.PriorityQueue = PriorityQueue;

            var Set = (function () {
                function Set(toStringFunction) {
                    this.dictionary = new Dictionary(toStringFunction);
                }
                Set.prototype.contains = function (element) {
                    return this.dictionary.containsKey(element);
                };

                Set.prototype.add = function (element) {
                    if (this.contains(element) || Collections.isUndefined(element)) {
                        return false;
                    } else {
                        this.dictionary.setValue(element, element);
                        return true;
                    }
                };

                Set.prototype.intersection = function (otherSet) {
                    var set = this;
                    this.forEach(function (element) {
                        if (!otherSet.contains(element)) {
                            set.remove(element);
                        }
                        return true;
                    });
                };

                Set.prototype.union = function (otherSet) {
                    var set = this;
                    otherSet.forEach(function (element) {
                        set.add(element);
                        return true;
                    });
                };

                Set.prototype.difference = function (otherSet) {
                    var set = this;
                    otherSet.forEach(function (element) {
                        set.remove(element);
                        return true;
                    });
                };

                Set.prototype.isSubsetOf = function (otherSet) {
                    if (this.size() > otherSet.size()) {
                        return false;
                    }

                    var isSub = true;
                    this.forEach(function (element) {
                        if (!otherSet.contains(element)) {
                            isSub = false;
                            return false;
                        }
                        return true;
                    });
                    return isSub;
                };

                Set.prototype.remove = function (element) {
                    if (!this.contains(element)) {
                        return false;
                    } else {
                        this.dictionary.remove(element);
                        return true;
                    }
                };

                Set.prototype.forEach = function (callback) {
                    this.dictionary.forEach(function (k, v) {
                        return callback(v);
                    });
                };

                Set.prototype.toArray = function () {
                    return this.dictionary.values();
                };

                Set.prototype.isEmpty = function () {
                    return this.dictionary.isEmpty();
                };

                Set.prototype.size = function () {
                    return this.dictionary.size();
                };

                Set.prototype.clear = function () {
                    this.dictionary.clear();
                };

                Set.prototype.toString = function () {
                    return Collections.arrays.toString(this.toArray());
                };
                return Set;
            })();
            Collections.Set = Set;

            var Bag = (function () {
                function Bag(toStrFunction) {
                    this.toStrF = toStrFunction || Collections.defaultToString;
                    this.dictionary = new Dictionary(this.toStrF);
                    this.nElements = 0;
                }
                Bag.prototype.add = function (element, nCopies) {
                    if (typeof nCopies === "undefined") { nCopies = 1; }
                    if (Collections.isUndefined(element) || nCopies <= 0) {
                        return false;
                    }

                    if (!this.contains(element)) {
                        var node = {
                            value: element,
                            copies: nCopies
                        };
                        this.dictionary.setValue(element, node);
                    } else {
                        this.dictionary.getValue(element).copies += nCopies;
                    }
                    this.nElements += nCopies;
                    return true;
                };

                Bag.prototype.count = function (element) {
                    if (!this.contains(element)) {
                        return 0;
                    } else {
                        return this.dictionary.getValue(element).copies;
                    }
                };

                Bag.prototype.contains = function (element) {
                    return this.dictionary.containsKey(element);
                };

                Bag.prototype.remove = function (element, nCopies) {
                    if (typeof nCopies === "undefined") { nCopies = 1; }
                    if (Collections.isUndefined(element) || nCopies <= 0) {
                        return false;
                    }

                    if (!this.contains(element)) {
                        return false;
                    } else {
                        var node = this.dictionary.getValue(element);
                        if (nCopies > node.copies) {
                            this.nElements -= node.copies;
                        } else {
                            this.nElements -= nCopies;
                        }
                        node.copies -= nCopies;
                        if (node.copies <= 0) {
                            this.dictionary.remove(element);
                        }
                        return true;
                    }
                };

                Bag.prototype.toArray = function () {
                    var a = [];
                    var values = this.dictionary.values();
                    var vl = values.length;
                    for (var i = 0; i < vl; i++) {
                        var node = values[i];
                        var element = node.value;
                        var copies = node.copies;
                        for (var j = 0; j < copies; j++) {
                            a.push(element);
                        }
                    }
                    return a;
                };

                Bag.prototype.toSet = function () {
                    var toret = new Set(this.toStrF);
                    var elements = this.dictionary.values();
                    var l = elements.length;
                    for (var i = 0; i < l; i++) {
                        var value = elements[i].value;
                        toret.add(value);
                    }
                    return toret;
                };

                Bag.prototype.forEach = function (callback) {
                    this.dictionary.forEach(function (k, v) {
                        var value = v.value;
                        var copies = v.copies;
                        for (var i = 0; i < copies; i++) {
                            if (callback(value) === false) {
                                return false;
                            }
                        }
                        return true;
                    });
                };

                Bag.prototype.size = function () {
                    return this.nElements;
                };

                Bag.prototype.isEmpty = function () {
                    return this.nElements === 0;
                };

                Bag.prototype.clear = function () {
                    this.nElements = 0;
                    this.dictionary.clear();
                };
                return Bag;
            })();
            Collections.Bag = Bag;

            
            var BSTree = (function () {
                function BSTree(compareFunction) {
                    this.root = null;
                    this.compare = compareFunction || Collections.defaultCompare;
                    this.nElements = 0;
                }
                BSTree.prototype.add = function (element) {
                    if (Collections.isUndefined(element)) {
                        return false;
                    }

                    if (this.insertNode(this.createNode(element)) !== null) {
                        this.nElements++;
                        return true;
                    }
                    return false;
                };

                BSTree.prototype.clear = function () {
                    this.root = null;
                    this.nElements = 0;
                };

                BSTree.prototype.isEmpty = function () {
                    return this.nElements === 0;
                };

                BSTree.prototype.size = function () {
                    return this.nElements;
                };

                BSTree.prototype.contains = function (element) {
                    if (Collections.isUndefined(element)) {
                        return false;
                    }
                    return this.searchNode(this.root, element) !== null;
                };

                BSTree.prototype.remove = function (element) {
                    var node = this.searchNode(this.root, element);
                    if (node === null) {
                        return false;
                    }
                    this.removeNode(node);
                    this.nElements--;
                    return true;
                };

                BSTree.prototype.inorderTraversal = function (callback) {
                    this.inorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };

                BSTree.prototype.preorderTraversal = function (callback) {
                    this.preorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };

                BSTree.prototype.postorderTraversal = function (callback) {
                    this.postorderTraversalAux(this.root, callback, {
                        stop: false
                    });
                };

                BSTree.prototype.levelTraversal = function (callback) {
                    this.levelTraversalAux(this.root, callback);
                };

                BSTree.prototype.minimum = function () {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.minimumAux(this.root).element;
                };

                BSTree.prototype.maximum = function () {
                    if (this.isEmpty()) {
                        return undefined;
                    }
                    return this.maximumAux(this.root).element;
                };

                BSTree.prototype.forEach = function (callback) {
                    this.inorderTraversal(callback);
                };

                BSTree.prototype.toArray = function () {
                    var array = [];
                    this.inorderTraversal(function (element) {
                        array.push(element);
                        return true;
                    });
                    return array;
                };

                BSTree.prototype.height = function () {
                    return this.heightAux(this.root);
                };

                BSTree.prototype.searchNode = function (node, element) {
                    var cmp = null;
                    while (node !== null && cmp !== 0) {
                        cmp = this.compare(element, node.element);
                        if (cmp < 0) {
                            node = node.leftCh;
                        } else if (cmp > 0) {
                            node = node.rightCh;
                        }
                    }
                    return node;
                };

                BSTree.prototype.transplant = function (n1, n2) {
                    if (n1.parent === null) {
                        this.root = n2;
                    } else if (n1 === n1.parent.leftCh) {
                        n1.parent.leftCh = n2;
                    } else {
                        n1.parent.rightCh = n2;
                    }
                    if (n2 !== null) {
                        n2.parent = n1.parent;
                    }
                };

                BSTree.prototype.removeNode = function (node) {
                    if (node.leftCh === null) {
                        this.transplant(node, node.rightCh);
                    } else if (node.rightCh === null) {
                        this.transplant(node, node.leftCh);
                    } else {
                        var y = this.minimumAux(node.rightCh);
                        if (y.parent !== node) {
                            this.transplant(y, y.rightCh);
                            y.rightCh = node.rightCh;
                            y.rightCh.parent = y;
                        }
                        this.transplant(node, y);
                        y.leftCh = node.leftCh;
                        y.leftCh.parent = y;
                    }
                };

                BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.inorderTraversalAux(node.rightCh, callback, signal);
                };

                BSTree.prototype.levelTraversalAux = function (node, callback) {
                    var queue = new Queue();
                    if (node !== null) {
                        queue.enqueue(node);
                    }
                    while (!queue.isEmpty()) {
                        node = queue.dequeue();
                        if (callback(node.element) === false) {
                            return;
                        }
                        if (node.leftCh !== null) {
                            queue.enqueue(node.leftCh);
                        }
                        if (node.rightCh !== null) {
                            queue.enqueue(node.rightCh);
                        }
                    }
                };

                BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.preorderTraversalAux(node.rightCh, callback, signal);
                };

                BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
                    if (node === null || signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.leftCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    this.postorderTraversalAux(node.rightCh, callback, signal);
                    if (signal.stop) {
                        return;
                    }
                    signal.stop = callback(node.element) === false;
                };

                BSTree.prototype.minimumAux = function (node) {
                    while (node.leftCh !== null) {
                        node = node.leftCh;
                    }
                    return node;
                };

                BSTree.prototype.maximumAux = function (node) {
                    while (node.rightCh !== null) {
                        node = node.rightCh;
                    }
                    return node;
                };

                BSTree.prototype.heightAux = function (node) {
                    if (node === null) {
                        return -1;
                    }
                    return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
                };

                BSTree.prototype.insertNode = function (node) {
                    var parent = null;
                    var position = this.root;
                    var cmp = null;
                    while (position !== null) {
                        cmp = this.compare(node.element, position.element);
                        if (cmp === 0) {
                            return null;
                        } else if (cmp < 0) {
                            parent = position;
                            position = position.leftCh;
                        } else {
                            parent = position;
                            position = position.rightCh;
                        }
                    }
                    node.parent = parent;
                    if (parent === null) {
                        this.root = node;
                    } else if (this.compare(node.element, parent.element) < 0) {
                        parent.leftCh = node;
                    } else {
                        parent.rightCh = node;
                    }
                    return node;
                };

                BSTree.prototype.createNode = function (element) {
                    return {
                        element: element,
                        leftCh: null,
                        rightCh: null,
                        parent: null
                    };
                };
                return BSTree;
            })();
            Collections.BSTree = BSTree;
        })(Utils.Collections || (Utils.Collections = {}));
        var Collections = Utils.Collections;
    })(Fayde.Utils || (Fayde.Utils = {}));
    var Utils = Fayde.Utils;
})(Fayde || (Fayde = {}));
var Fayde;
(function (Fayde) {
    (function (Utils) {
        var Color = (function () {
            function Color() {
            }
            Color.Float32ColorToARGB = function (float32Color) {
                var a = (float32Color & 0xff000000) >>> 24;
                var r = (float32Color & 0xff0000) >>> 16;
                var g = (float32Color & 0xff00) >>> 8;
                var b = float32Color & 0xff;
                var result = [a, r, g, b];

                return result;
            };

            Color.ComponentToHex = function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };

            Color.RGBToHexString = function (rgb) {
                Color.Coalesce(rgb);
                return "#" + Color.ComponentToHex(rgb[0]) + Color.ComponentToHex(rgb[1]) + Color.ComponentToHex(rgb[2]);
            };

            Color.ARGBToHexString = function (argb) {
                return "#" + Color.ComponentToHex(argb[0]) + Color.ComponentToHex(argb[1]) + Color.ComponentToHex(argb[2]) + Color.ComponentToHex(argb[3]);
            };

            Color.Coalesce = function (arr) {
                for (var i = 1; i < arr.length; i++) {
                    if (typeof (arr[i]) === 'undefined')
                        arr[i] = arr[i - 1];
                }
            };
            return Color;
        })();
    })(Fayde.Utils || (Fayde.Utils = {}));
    var Utils = Fayde.Utils;
})(Fayde || (Fayde = {}));



var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Utils) {
        var Size = (function (_super) {
            __extends(Size, _super);
            function Size(width, height) {
                _super.call(this);

                this.Width = width;
                this.Height = height;
            }
            Object.defineProperty(Size.prototype, "Width", {
                get: function () {
                    return this._Width;
                },
                set: function (width) {
                    this._Width = width;
                    this.OnPropertyChanged("Width");
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Size.prototype, "Height", {
                get: function () {
                    return this._Height;
                },
                set: function (height) {
                    this._Height = height;
                    this.OnPropertyChanged("Height");
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Size.prototype, "AspectRatio", {
                get: function () {
                    return this.Height / this.Width;
                },
                enumerable: true,
                configurable: true
            });
            return Size;
        })(Fayde.MVVM.ObservableObject);
        Utils.Size = Size;
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
    return window.btoa(window.unescape(encodeURIComponent(this)));
};
String.prototype.b64_to_utf8 = function () {
    return decodeURIComponent(window.escape(window.atob(this)));
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
;

if (!Array.prototype.clone) {
    Array.prototype.clone = function () {
        return this.slice(0);
    };
}
;

if (!Array.prototype.last) {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
}
;

if (!Array.prototype.contains) {
    Array.prototype.contains = function (item) {
        return this.indexOf(item) !== -1;
    };
}
;

Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

Array.prototype.insert = function (item, index) {
    this.splice(index, 0, item);
};

Math.clamp = function (value, min, max) {
    return Math.min(Math.max(value, min), max);
};

Math.roundToDecimalPlace = function (num, dec) {
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
};

Math.normalise = function (num, min, max) {
    return (num - min) / (max - min);
};

Math.constrain = function (value, low, high) {
    return Math.clamp(value, low, high);
};

Math.radiansToDegrees = function (radians) {
    return (radians * 360) / Math.TAU;
};

Math.distanceBetween = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.sq(x2 - x1) + Math.sq(y2 - y1));
};

Math.lerp = function (start, stop, amount) {
    return start + (stop - start) * amount;
};

Math.mag = function (a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
};

Math.map = function (value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
};

Math.degreesToRadians = function (degrees) {
    return Math.TAU * (degrees / 360);
};

Math.randomBetween = function (low, high) {
    if (!high) {
        high = low;
        low = 0;
    }

    if (low >= high)
        return low;

    return low + (high - low) * Math.random();
};

Math.sq = function (n) {
    return n * n;
};

Math.TAU = Math.PI * 2;

Number.prototype.isInt = function () {
    return this % 1 === 0;
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
