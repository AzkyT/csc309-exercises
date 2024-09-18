function flattenArray(nestedArray) {
    let flatArray = [];
    for (const item of nestedArray) {
        if (Array.isArray(item)) {
            flatArray = flatArray.concat(flattenArray(item));
        } else {
            flatArray.push(item);
        }
    }
    return flatArray;
}

function groupBy(arr, property) {
    return arr.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (!cache[key]) {
            cache[key] = fn(...args);
        }
        return cache[key];
    };
}

function sumNestedValues(obj) {
    let sum = 0;
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            sum += sumNestedValues(obj[key]);
        } else {
            sum += obj[key];
        }
    }
    return sum;
}

function paginateArray(arr, pageSize, pageNumber) {
    return arr.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            for (const listener of this.events[event]) {
                listener(...args);
            }
        }
    }
}

function firstNonRepeatingChar(str) {
    const charCount = {};
    for (const char of str) {
        if (!charCount[char]) {
            charCount[char] = 0;
        }
        charCount[char]++;
    }
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    return null;
}

module.exports = {
    flattenArray,
    groupBy,
    memoize,
    sumNestedValues,
    paginateArray,
    EventEmitter,
    firstNonRepeatingChar,
  };