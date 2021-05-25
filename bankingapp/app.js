/////////////////////   CURRENT USER  /////////////////////
// get button to enter account number (from side menu modal)
let accNumEnterBtn = document.getElementById('accNumEnter');
let getActiveUserLabel = document.getElementById('activeUserAccName');
let currentBalance = document.getElementById('currentBalance');
// Function event listener on the button -> changes balance on dashboard and name on sidemenu
accNumEnterBtn.addEventListener('click', function() {
    // Get the value of the user Key from input
    let activeUserKey = document.getElementById('smmAccNumInput').value;
    // Match user key to local storage
    let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
    // DOM for account name and balance display

    // Checks if user key exists in local storage
        if (activeUserKey in localStorage) {
            getActiveUserLabel.innerHTML = activeUser.name;
            // Checks for presence of current balance since js is linked to 2 diff html files
            if(currentBalance) {
            currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                }
            }   else {
                alert("Please enter an existing account number.")
                }
    })

/////////////////////   MODALS  /////////////////////

////////// SIDE MENU MODAL
let sideMenuBtn = document.querySelector('#menu_logo');
let sideMenuModal = document.querySelector('.sideMenuModal');
// Opens deposit modal on click of deposit button
sideMenuBtn.addEventListener('click',function(){
    sideMenuModal.classList.add('openSideMenuModal')
})
// Opens newuser.html when clicked from sidemenumodal
let createNewAccSideMenu = document.querySelector('#createNewAccSideMenu');
createNewAccSideMenu.addEventListener('click', function() {
    window.open(newuser.html);
})

//////// ADD EXPENSE MODAL
let expenseBtn = document.querySelector('#expenseBtn');
let addExpenseModal = document.querySelector('.addExpenseModal');
// let addExpenseItemInput = document.querySelector('#addExpenseItemInput').value;
// Opens deposit modal on click of deposit button
if(addExpenseModal) {
    expenseBtn.addEventListener('click',function(){
    addExpenseModal.classList.add('openAddExpenseModal')
})};
////////// DEPOSIT MODAL
let depositBtn = document.querySelector('#depositBtn');
let depositModal = document.querySelector('.depositModal');
// Opens deposit modal on click of deposit button
if(depositModal) {
    depositBtn.addEventListener('click',function(){
        depositModal.classList.add('openDepositModal')
    // When ADD FUNDS is clicked within the deposit modal, current balance is changed of current user
    // if(getActiveUserLabel === "ACCOUNT NAME") {
    //     alert("Please enter a valid account number before trying a transaction!")
    // }
        let depositModalBtn = document.getElementById('depositModalBtn');
            depositModalBtn.addEventListener('click', function(){
            
                let activeUserKey = document.getElementById('smmAccNumInput').value;
                let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
                // console.log(activeUser)
                if(activeUser == null) {
                    alert("Please enter a valid account number before trying a transaction!")
                }
                {
                let depositAmountInput = document.getElementById('depositAmountInput').value;
                activeUser.balance = parseInt(activeUser.balance) + parseInt(depositAmountInput);
                let currentBalance = document.getElementById('currentBalance');
                currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                console.log(activeUser)
                localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
                alert(`Successfuly deposited PHP ${depositAmountInput}`);
                depositModal.classList.remove('openDepositModal');
        }})
})};

////////// WITHDRAW MODAL
let withdrawBtn = document.querySelector('#withdrawBtn');
let withdrawModal = document.querySelector('.withdrawModal');
// Opens deposit modal on click of deposit button
if(withdrawModal) {    
    withdrawBtn.addEventListener('click',function(){
    withdrawModal.classList.add('openWithdrawModal');
     // When WITHDRAW is clicked within the deposit modal, current balance is changed of current user
    let withdrawModalBtn = document.getElementById('withdrawModalBtn');
    withdrawModalBtn.addEventListener('click', function(){
            let activeUserKey = document.getElementById('smmAccNumInput').value;
            let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
            // console.log(activeUser)
            if(activeUser == null) {
                alert("Please enter a valid account number before trying a transaction!")
            }
            {
            let withdrawAmountInput = document.getElementById('withdrawAmountInput').value;
            activeUser.balance = parseInt(activeUser.balance) - parseInt(withdrawAmountInput);
            let currentBalance = document.getElementById('currentBalance');
            currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            console.log(activeUser)
            localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
            alert(`Successfuly withdrew PHP ${withdrawAmountInput}`);
            withdrawModal.classList.remove('openWithdrawModal');
    }})
})};

////////// TRANSFER MODAL
let transferBtn = document.querySelector('#transferBtn');
let transferModal = document.querySelector('.transferModal');
// Opens transfer modal on click of transfer button
if(transferModal) {
    transferBtn.addEventListener('click',function(){
    transferModal.classList.add('openTransferModal')
     // When TRANSFER is clicked within the deposit modal, current balance is changed of current
    
     //  user and balance of recipient is changed as well
     let transferModalBtn = document.getElementById('transferModalBtn');
     transferModalBtn.addEventListener('click', function(){
            let activeUserKey = document.getElementById('smmAccNumInput').value;
            let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
            // console.log(activeUser)
            if(activeUser == null) {
                alert("Please enter a valid account number before trying a transaction!")
            }
            {
            let recipientUserKey = document.getElementById('recipientAccNumberInput').value;
            let recipientUser = JSON.parse(window.localStorage.getItem(recipientUserKey));

            let recipientAmountInput = document.getElementById('recipientAmountInput').value;
            activeUser.balance = parseInt(activeUser.balance) - parseInt(recipientAmountInput);
            recipientUser.balance = parseInt(recipientUser.balance) + parseInt(recipientAmountInput);
            let currentBalance = document.getElementById('currentBalance');
            currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            console.log(activeUser)

            // UPDATE values of local storage items
            localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
            localStorage.setItem(recipientUserKey, JSON.stringify(recipientUser));
            alert(`Successfuly transferred PHP ${recipientAmountInput} to ${recipientUser.name}`);
            transferModal.classList.remove('openTransferModal');
     }})
})};

////////// DISPLAY ALL USERS MODAL
let displayAllUsersBtn = document.querySelector('#displayAllUsersBtn');
let displayAllUsersModal = document.querySelector('.displayAllUsersModal');
// Opens users modal on click of deposit button
if(displayAllUsersModal) {    
    displayAllUsersBtn.addEventListener('click',function(){
    displayAllUsersModal.classList.add('opendisplayAllUsersModal')

    for (var i = 0; i < localStorage.length; i++){

        let userKey = localStorage.key(i);
        let userfromstorage = JSON.parse(localStorage.getItem(userKey));
        let userlist = document.createElement("p");

        userlist.innerHTML = "#" + userKey + " - "  + userfromstorage.name;
        // userfromstorage.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        let userlistdiv = document.querySelector('.userlistdiv');
        userlistdiv.appendChild(userlist)
        // console.log(userfromstorage.name);
    }
})};

// Closes modals on click outside of modal
window.addEventListener("click", function(event){
    if (event.target == sideMenuModal) {
        sideMenuModal.classList.remove('openSideMenuModal')
    }
    if (event.target == addExpenseModal) {
        addExpenseModal.classList.remove('openAddExpenseModal')
    }
    if (event.target == depositModal) {
        depositModal.classList.remove('openDepositModal')
    } 
    if (event.target == withdrawModal) {
        withdrawModal.classList.remove('openWithdrawModal')
    } 
    if (event.target == transferModal) {
        transferModal.classList.remove('openTransferModal')
    } 
    if (event.target == displayAllUsersModal) {
        displayAllUsersModal.classList.remove('opendisplayAllUsersModal');
        document.querySelector('.userlistdiv').innerHTML = "";
    } 
}); 


/////////////////////   NEWUSER.HTML /////////////////////

class User {
    constructor (name, email, password, balance, accountNumber) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
}

let createNewAccBtn = document.getElementById('createNewAcc');

let userStorage = [];

if (createNewAccBtn) {
createNewAccBtn.addEventListener('click', (e) => {
    // e.preventDefault();

    let nameInput = document.getElementById('nameInput').value;
    let emailInput = document.getElementById('emailInput').value;
    let passwordInput = document.getElementById('passwordInput').value;
    let initialDeposit = parseInt(document.getElementById('initialDepositInput').value);
    let accountNumber = Math.floor(Math.random()*1000)



    if (nameInput && emailInput && passwordInput && initialDeposit){
        const newUser = new User(nameInput, emailInput, passwordInput, initialDeposit, accountNumber);
        alert(`${nameInput} has successfuly created an account with an initial deposit of ${initialDeposit}! Your account number is ${accountNumber}, please take note of this as you will need this to transact later on.`);
        localStorage.setItem(`${accountNumber}`, JSON.stringify(newUser));
        userStorage.push(newUser);
        console.log(newUser);
    }
    console.log(userStorage);
})};
