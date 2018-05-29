import "./style/style.scss";
import {
    elements,
    Btn
} from "./symbol.js";
import {
    Calculator
} from "./calculator.js";


let buttons = document.getElementById("buttons");
let result = document.getElementById("result");


const createBtn = (arr, parent) => {
    arr.map((row) => {
        row.map((element) => {
            var btn = document.createElement("div");
            btn.innerHTML = element;
            addTypeAsClassName(element, btn);
            parent.appendChild(btn);
            btn.setAttribute("name", element);
        });
    });
};

const addTypeAsClassName = (element, target) => {
    let keys = Object.keys(Btn);
    for (let i = 0; i < keys.length; i++) {
        if (Btn[keys[i]].is(element)) {
            target.classList.add(Btn[keys[i]].type);
            break;
        }
    }
};


createBtn(elements, buttons);
let c = new Calculator();

const addev = () => {
    let nodes = buttons.childNodes;
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener("click", (e) => {
            let eType = e.target.className;
            let val = e.target.innerHTML ;
            c.sendBtn(eType, val);
            if (c.stack[0] !== false) {
                result.innerHTML = c.lastDigit();
            } else {
                result.innerHTML = "Not a Number";
            }
        }, false);
    }
};

addev();
