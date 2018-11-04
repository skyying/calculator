import {Btn} from "./symbol.js";
var math = require("mathjs");

/*
 * A Calculator class
 */
export class Calculator {
  constructor() {
    this.stack = ["0"];
    this.topType = Btn.number.type; // the type of last element in stack
    this.afterEqual = false; // a flag for is equal button just pressed or not
  }

  setTop(top) {
    this.stack[this.stack.length - 1] = top;
  }

  // get top element in calcualting stack
  top() {
    return this.stack[this.stack.length - 1];
  }

  // append dot or digit to stack
  append(type, element) {
    let top;
    if (type === Btn.number.type) {
      top = this.top() === "0" ? element : this.top() + element;
    } else {
      top = this.top() + Btn.dot.symbol;
    }
    this.setTop(top);
  }

  // reset calcuator
  clear() {
    this.stack = ["0"];
    this.afterEqual = false;
    this.topType = Btn.number.type;
  }

  // get lastDigit index
  digitIndex() {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (Btn.number.is(this.stack[i]) || Btn.dot.is(this.stack[i])) {
        return i;
      }
    }
    return 0;
  }

  // current lastDigit value on stack
  lastDigit() {
    return this.stack[this.digitIndex()] || "0";
  }

  // return false if total is infinity
  // get total of stack
  getTotal() {
    let total;
    if (this.topType !== Btn.operator.type) {
      total = math.eval(this.stack.join(""));
    } else {
      // get total after pressed a operator of +-*/;
      total = math.eval(this.stack.join("") + this.lastDigit());
    }
    return isFinite(total) ? total.toString() : false;
  }

  calc(type, element) {
    console.log("in calc, --------------");
    console.log("type", type);
    console.log("element", element);
    console.log("this.stack", this.stack);

    let isEqual = this.afterEqual;

    if (
      (isEqual &&
                this.stack.length <= 1 &&
                type === Btn.number.type &&
                this.topType !== Btn.operator.type) ||
            type === Btn.clear.type
    ) {
      this.clear();
    }

    switch (type) {
      // if send a digit button [0-9]
      case Btn.number.type: {
        // if top is not a operator, append digit;
        if (
          this.topType === Btn.dot.type ||
                    this.topType !== Btn.operator.type
        ) {
          this.append(type, element);
        } else {
          this.stack.push(element);
          this.topType = Btn.number.type;
        }
        break;
      }
      // if send a operator button [+-*/]
      case Btn.operator.type: {
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
        break;
      }
      // if send a dot button [.]
      case Btn.dot.type: {
        if (this.top().includes(Btn.dot.symbol)) return;
        if (this.topType === Btn.operator.type) {
          this.stack.push("0" + Btn.dot.symbol);
        } else if (isEqual || this.topType === Btn.number.type) {
          this.append(type, Btn.dot.symbol);
        }
        this.topType = Btn.dot.type;
        break;
      }
      // if send a equal button [=]
      case Btn.equal.type: {
        this.afterEqual = true;
        this.stack = [this.getTotal()];
        this.topType = Btn.number.type;
        break;
      }
      // if send a switch sign button [+/-]
      case Btn.switchSign.type: {
        this.stack[this.digitIndex()] = (
          this.lastDigit() * -1
        ).toString();
        break;
      }
      // if send a switch sign button [%]
      case Btn.percent.type: {
        let total = this.getTotal();
        if (total !== false) {
          this.stack[this.digitIndex()] = math
            .eval(total + "/ 100")
            .toString();
        }
        break;
      }
      default:
        return;
    }
  }
}
