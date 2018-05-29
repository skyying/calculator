export let elements = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];


export const Btn = {
    number: {
        type: "number",
        is: function(element) {
            return /\d/g.test(element);
        },
    },
    operator: {
        type: "operator",
        is: function(element) {
            return element.length === 1 && /[+\-*/]/g.test(element);
        },
    },
    equal: {
        type: "equal",
        is: function(element) {
            return element === this.symbol;
        },
        symbol: "=",
    },
    dot: {
        type: "dot",
        is: function(element) {
            return element === this.symbol;
        },
        symbol: ".",
    },
    clear: {
        type: "clear",
        is: function(element) {
            return element === this.symbol;
        },
        symbol: "C",
    },
    switchSign: {
        type: "switchSign",
        is: function(element) {
            return element === this.symbol;
        },
        symbol: "+/-",
    },
    percent: {
        type: "percent",
        is: function(element) {
            return element === this.symbol;
        },
        symbol: "%",
    }
};
