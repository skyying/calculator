
# Calculator 
A simple calculator build with Javascript from a javascript beginner.

[Give it a try](https://skyying.github.io/Calculator/)

# Screenshot
![screenshot](https://github.com/skyying/Calculator/blob/master/img/screenshot.jpg)


# What I learned from this project

## Design
have been a UX designer, I love design. It's fun as you can experiment so many
things. I've try different color schemes, picked a right font for display
digits, and think about what kind of background can emphasize the calculator
better. 


## Languages/Tools/IDE

### webpack, npm
I learn how to configure webpack by reading their official document and crated a
project by following their guide step by step. 

webpack is such a powerful tool compared to web development workflow one decade ago. 
I learn how to separate source code under `./src` and let webpack loader /
plugin to bundle `js, css, html` files for you. 

npm can help you managing plugins, packages, and we can use `npm start` to let
webpack build the project and run. There are thousand packages in npm, separate
worthy to check out.

### sass
- how to use `dispaly : flex` to position those buttons
- how to select for specific DOM element by using CCS3 child-selector
- how to add gradient background and using google fonts

### javascript / es6
After my first version, there are still plenty issues need to be fixed.  
Until I realize the existing code won't succeed longer, I decided to refactor it.

I spent hours thinking of possible use cases, and another two full days 
refactoring code, been very enjoy the process. 

I learn how the tricky `this` means in javascript, writing es6 class,
  import/export modules, and interact with DOM element 

### vim   
  I am new to vim, but I was *vimed* since I use it for a couple of days.
  I learned how to setup my `~/.vimrc` to speed up my productivity, how to use
  ESlint to improve the code quality, and jsBeautify to organize the code. 

  [my vimrc](https://github.com/skyying/dotfiles/blob/master/vim/.vimrc)


### Module I used
  Due to javascript only have 64 bit floating point, the calculation might be
  incorrect ,i use [ mathjs ](http://mathjs.org/) to do the calculation.


