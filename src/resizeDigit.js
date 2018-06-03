
// a canvas text object used to masure result text's width;
export class CanvasText {
    constructor(parent, ref) {
        this.parent = parent;
        this.ref = ref;
        this.createCanvas();
        this.setFontSize();
    }
    createCanvas() {
        let canvas = document.createElement("canvas");
        this.ctx = canvas.getContext("2d");
        this.ctx.fontFamily = this.ref.style.fontFamily;
        this.parent.appendChild(canvas);
    }
    getFontSize() {
        return this.ctx.fontSize; 
    }
    setFontSize(size = this.ref.style.fontSize) {
        this.ctx.fontSize = size;
    }
    getFontWidth(text){
        return this.ctx.measureText(text).width;
    }
}




// const setFontSize = (self, size) => {
//     self.style.fontSize = size;
// };


// export const resizeFont = (text) => {
//     let count = 0;
//     while (getTextWidth(text) > boundary && count < 10) {
//         count++;
//         console.log(ctx.fontSize);
//         ctx.fontSize -= 1;
//         setFontSize(result, ctx.fontSize);
//     }
// };
