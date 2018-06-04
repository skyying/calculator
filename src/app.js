import "./style/style.scss";
import { elements, Btn } from "./symbol.js"; 
import { Calculator } from "./calculator.js";
import { buttons, result, resultContainer } from "./domElement.js";


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

const resize = () => {

    let currentSize, step = 2,
        margin = 30,
        letterCount = 10,
        unit = "px",
        defaultFontSize = "50px";

    while ((resultContainer.offsetWidth - margin) < result.offsetWidth) {
        currentSize = parseFloat(window.getComputedStyle(result, null).getPropertyValue("font-size"));
        result.style.fontSize = (currentSize - step) + unit;
    }

    if (result.innerHTML.length < letterCount) {
        result.style.fontSize = defaultFontSize;
    }

};


const rePosition = () => {
    let distance = resultContainer.offsetHeight - result.offsetHeight;
    result.style.marginTop = (distance / 2) + "px";
};

createBtn(elements, buttons);
let c = new Calculator();

const addev = () => {
    let nodes = buttons.childNodes;

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener("click", (e) => {

            // prevent double click;
            e.preventDefault;

            // click feedback on result
            result.classList.remove("shine");
            
            // check button type and handle event by type
            let eType = e.target.className;
            let val = e.target.innerHTML;
            c.sendBtn(eType, val);
            if (c.stack[0] !== false) {
                let ans = c.lastDigit();
                result.innerHTML = ans;
            } else {
                result.innerHTML = "Not a Number";
            }

            // resize totol if needed;
            resize();

            // reCenter totoal position vertically if needed
            rePosition();

            // restart click button feedback
            result.classList.add("shine");
        }, false);
    }
};

addev();
