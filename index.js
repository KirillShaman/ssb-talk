var path = require('path')
var marked = require('marked')
var h = require('hyperscript')
var fs = require('fs')

document.body.style.fontSize = '3em'
document.body.appendChild(
  h('div', {style: {fontSize: '3em'}},
  fs.readFileSync(path.join(__dirname, 'slides.md'), 'utf8')
  //this divider is valid markdown (<hr>) but easier to split it
  //then parse each section, because then we can easily surround each slide in a div.
  .split('---')
  .map(function (d) {
    var div = h('div.slide', {style: {display: 'none'}})
    div.innerHTML = marked(
      //this was a hack because when it's running in electron it has the wrong
      //location...  turns out, this because I was running it via my electro module.
      //anyway it was faster to fix it like this in the moment.
      d.split('./images').join(path.join(__dirname, 'images'))
    )
    return div
  })
))

n = 0

var slides = [].slice.call(document.querySelectorAll('.slide'))

//37 <- -> 39

function visible(n) {
  n = Math.min(Math.max(n, 0), slides.length)
  slides.forEach(function (e) {
    e.style.display = 'none'
  })
  var el = slides[n]
  el.style.display = 'block'
}

visible(0)

window.onkeydown = function (e) {
  if(e.keyCode == 37) visible(--n)
  if(e.keyCode == 39) visible(++n)
}








