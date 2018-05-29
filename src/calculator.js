import {Btn} from "./symbol.js";
var math = require("mathjs");

export class Calculator {
    constructor() {
        this.stack = ["0"];
        this.topType = Btn.number.type; // the type of last element in stack 
        this.afterEqual = false; // a flag for is equal button just pressed or not
    }
    setTop(top) {
        this.stack[this.stack.length - 1] = top;
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    append(type, element) {
        //append dot or digit
        let top;
        if (type === Btn.number.type) {
            top = (this.top() === "0") ? element : this.top() + element;
        } else {
            top = this.top() + Btn.dot.symbol;
        }
        this.setTop(top);
    }

    clear() {
        // reset calcuator
        this.stack = ["0"];
        this.afterEqual = false;
        this.topType = Btn.number.type;
    }

    digitIndex() {
        // get lastDigit index
        for (let i = this.stack.length - 1; i >= 0; i--) {
            if (Btn.number.is(this.stack[i]) || Btn.dot.is(this.stack[i])) {
                return i;
            }
        }
        return 0;
    }

    lastDigit() {
        // current lastDigit value on stack
        return this.stack[this.digitIndex()] || "0";
    }

    getTotal() {

        // return false if total is infinity
        let total;
        if (this.topType !== Btn.operator.type) {
            total = math.eval(this.stack.join(""));
        } else {
            // get total after pressed a operator of +-*/;
            total = math.eval(this.stack.join("") + this.lastDigit());
        }
        return isFinite(total) ? total.toString() : false;
    }

    sendBtn(type, element) {

        let isEqual = this.afterEqual;

        if ((isEqual && this.topType !== Btn.operator.type) || type ===
            Btn.clear.type) {
            this.clear();
        }

        // if send a digit button [0-9]
        if (type === Btn.number.type) {
            // if top is not a operator, append digit;
            if (this.topType !== Btn.operator.type) {
                this.append(type, element);
            } else {
                this.stack.push(element);
                this.topType = Btn.number.type;
            }

        }

        // if send a operator button [+-*/]
        if (type === Btn.operator.type) {
            //replace top if top is an operator 
            if (this.topType === Btn.operator.type) {
                this.stack.pop();
                //esle get total  
            } else {
                this.stack = [this.getTotal()];
                this.topType = Btn.number.type;
            }

            this.stack.push(element);
            // this.afterEqual = false;
            this.topType = Btn.operator.type;
        }

        // if send a dot button [.]
        if (type === Btn.dot.type) {
            if (this.topType === Btn.operator.type) {
                this.stack.push("0" + Btn.dot.symbol);
            } else if (isEqual || this.topType === Btn.number.type) {
                this.append(type, Btn.dot.symbol);
            }
            this.topType = Btn.dot.type;
        }

        // if send a equal button [=] 
        if (type === Btn.equal.type) {
            this.afterEqual = true;
            this.stack = [this.getTotal()];
            this.topType = Btn.number.type;
        }

        // if send a switch sign button [+/-]
        if (type === Btn.switchSign.type) {
            this.stack[this.digitIndex()] = (this.lastDigit() * -1).toString();
        }

        if (type === Btn.percent.type) {
            let total = this.getTotal();
            if (total !== false) {
                this.stack[this.digitIndex()] =
                    math.eval(total + "/ 100").toString();
            }
        }
    }
}


