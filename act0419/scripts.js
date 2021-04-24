
////////////////////  TIME  ////////////////////
let clock = document.getElementById('clock');

setInterval(function() {
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString().slice(0,-6);
})



////////////////////  TO DO LIST  ////////////////////



// document.getElementById("newToDo").value = "hello"

// let addToDoButton = document.getElementById('addToDo');
// let todolist = document.getElementById('todolist');
// let inputField = document.getElementById('newToDo');

// addToDoButton.addEventListener('click',function(){
//     var paragraph = document.createElement('p')
//     paragraph.innerText = inputField.nodeValue;
//     todolist.appendChild(paragraph);

// })


// var todolist = document.getElementsByClassName('todolist');
// var newToDo = document.getElementById('newToDo');

// addToDo.addEventListener('click', function(){
//     let addedTask = newToDo;
//     todolist.appendChild(addedTask);
// })

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('todolist');
let inputField = document.getElementById('newToDo')

addToDoButton.addEventListener('click', function todo(){
    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = "•  " + inputField.value;
    toDoContainer.appendChild(paragraph);
    inputField.value = "";
    paragraph.addEventListener('click', function strike(){
        paragraph.style.textDecoration = "line-through";
    })
    paragraph.addEventListener('dblclick', function remove() {
        toDoContainer.removeChild(paragraph);
    })
})

////////////////////  RANDOM QUOTE FOOTER  ////////////////////
let quoterefreshbtn = document.getElementById('quoterefreshbtn');
let output = document.getElementById('footercontent');
let quotes = [
        "Just Do It - Nike",
    "The Best Way To Get Started Is To Quit Talking And Begin Doing. – Walt Disney",
    "Don’t Let Yesterday Take Up Too Much Of Today. – Will Rogers",
    "Whether You Think You Can Or Think You Can’t, You’re Right. – Henry Ford",
]


quoterefreshbtn.addEventListener('click',function(){
    var randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    output.innerHTML = randomQuote;
})



////////////////////  ADD QUOTE  ////////////////////

var modal = document.getElementById("myModal");
var btn = document.getElementById("quoteaddbtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function addtoquotes () {
//   let quotes = [
//     "Just Do It - Nike",
// "The Best Way To Get Started Is To Quit Talking And Begin Doing. – Walt Disney",
// "Don’t Let Yesterday Take Up Too Much Of Today. – Will Rogers",
// "Whether You Think You Can Or Think You Can’t, You’re Right. – Henry Ford",
// ]

    newquote = document.getElementById('newquote').value;
    quotes.push(newquote);
    console.log(quotes);
}

