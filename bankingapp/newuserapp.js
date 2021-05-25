

class User {
    constructor (name, email, password, balance) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }
}

let createNewAccBtn = document.getElementById('createNewAcc');

createNewAccBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let nameInput = document.getElementById('nameInput').value;
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    let initialDeposit = document.getElementById('initialDepositInput').value;
    const newuser = new User(nameInput, emailInput, passwordInput, initialDeposit);

    console.log(newuser);


});


// createNewAccBtn.addEventListener('click', newUser());
//     console.log("hello")
// let nameInput = document.querySelector('nameInput').value;
// let emailInput = document.querySelector('emailInput').value;
// let passwordInput = document.querySelector('passwordInput').value;
// let initialDeposit = document.querySelector('initialDepositInput').value;

// let book = new User(nameInput, emailInput, passwordInput, initialDeposit)
// console.log(book);
// });

/////////////////////   MODALS  /////////////////////

////////// SIDE MENU MODAL
let sideMenuBtn = document.querySelector('#menu_logo');
let sideMenuModal = document.querySelector('.sideMenuModal');
// Opens deposit modal on click of deposit button
sideMenuBtn.addEventListener('click',function(){
    sideMenuModal.classList.add('openSideMenuModal')
})

window.onclick = function closeExpense(event) {
    if (event.target == sideMenuModal) {
        sideMenuModal.classList.remove('openSideMenuModal')
    }
}


// let newAccFormSubmitBtn = document.querySelector('createNewAcc');
// newAccFormSubmitBtn.addEventListener('click', newUser());

// function newUser() {
// let nameInput = document.querySelector('nameInput').value;
// let emailInput = document.querySelector('emailInput').value;
// let passwordInput = document.querySelector('passwordInput').value;
// let initialDeposit = document.querySelector('initialDepositInput').value;

// const account = {
//     name: nameInput,
//     email: emailInput,
//     passowrd: passwordInput,
//     balance: initialDeposit

// }

// window.localStorage.setItem(key,JSON.stringify(account));

