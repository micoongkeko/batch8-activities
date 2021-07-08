
var about = document.getElementById('about')
var div = document.createElement('div')
var newAlert = document.createElement('button')
newAlert.textContent = 'THIS BUTTON DOES NOT DO ANYTHING!'
newAlert.style.border = '1px'
newAlert.style.color =  'black'
newAlert.style.backgroundColor = 'rgb(224, 224, 224, 0.5)'
newAlert.style.margin = '10px'
newAlert.style.padding = '1rem'
newAlert.style.paddingLeft = '2rem'
newAlert.style.paddingRight = '2rem'
newAlert.style.fontSize = '0.6rem'
newAlert.style.fontFamily = "Dela Gothic One"
newAlert.style.border = '.20em solid black'

div.appendChild(newAlert)
about.appendChild(div)


var about = document.getElementById('about')
var div = document.createElement('div')
var newAlert = document.createElement('button')
newAlert.innerHTML = 'CHEER FOR ME!'
newAlert.style.border = '1px'
newAlert.style.color =  'black'
newAlert.style.backgroundColor = 'rgb(224, 224, 224, 0.8)'
newAlert.style.margin = '10px'
newAlert.style.padding = '1rem'
newAlert.style.paddingLeft = '2rem'
newAlert.style.paddingRight = '2rem'
newAlert.style.fontSize = '0.7rem'
newAlert.style.fontFamily = "Dela Gothic One"
newAlert.style.border = '.15em solid black'
newAlert.setAttribute('id', 'about-btn')

div.appendChild(newAlert)

about.appendChild(div)

document.getElementById('about-btn').addEventListener('click', sayHey)


function sayHey() {
    alert('Thanks for cheering! :D')
}
/*
 alert('Thanks for cheering! :D')

jumbotronTitle =
document.querySelector('.jumbotron-title')
var counter = 0

function sayHey() {
    counter += 1
    jumbotronTitle.textContent = counter

jumbotronTitle = 
document.querySelector('.jumbotron-title')

function sayHey() {
    jumbotronTitle.textContent = 'uhhhh'
}
*/