/////////////////////   DOM  /////////////////////
// Dashboard Page
let currentBalance = document.getElementById('currentBalance');
let expenseBtn = document.getElementById('expenseBtn');
let depositBts = document.getElementById('depositBts');
let withdrawBtn = document.getElementById('withdrawBtn');
let transferBtn = document.getElementById('transferBtn');
let sideMenuBtn = document.querySelector('#menu_logo');
let sideMenuModal = document.querySelector('.sideMenuModal');
let addExpenseModal = document.querySelector('.addExpenseModal');
let depositModal = document.querySelector('.depositModal');
let depositAmountInput;
let withdrawModal = document.querySelector('.withdrawModal');
let withdrawAmountInput;
let transferModal = document.querySelector('.transferModal');
let recipientAmountInput;
let addExpenseForm = document.getElementById('addExpenseForm');
let addExpenseItemInput;
let addExpenseAmountInput;
let depositForm = document.getElementById('depositForm');
let withdrawForm = document.getElementById('withdrawForm');
let transferForm = document.getElementById('transferForm');
let recipientUserKey;
let recipientUser;
let displayExpensesModal = document.querySelector('.displayExpensesModal');

// Create New Account Page
let displayAllUsersBtn = document.querySelector('#displayAllUsersBtn');
let displayAllUsersModal = document.querySelector('.displayAllUsersModal');
let newAccForm = document.getElementById('newAccForm');
let userStorage = [];
let users;

function getUsers() {
    if(JSON.parse(window.localStorage.getItem("users"))) {
        users = JSON.parse(window.localStorage.getItem("users"));
        for(i=0; i < users.length; i++) {
            userStorage.push(users[i].name)
        }
    } else {
        users = [];
    }
}

getUsers();

// Side Menu Page
let accNumEnterBtn = document.getElementById('accNumEnter');
let getActiveUserLabel = document.getElementById('activeUserAccName');
let createNewAccSideMenu = document.querySelector('#createNewAccSideMenu');
let displayExpenses = document.getElementById('displayExpenses');
let activeUserKey; // to be declared in accNum event listener
let activeUserStorage; // to be declared in accNum event listener
let activeUser;
let activeUserArrNum;

/////////////////////   SETTING ACTIVE USER  /////////////////////
// Sets activeUser, changes balance on dashboard and name on sidemenu
accNumEnterBtn.addEventListener('click', function() {
    activeUserKey = parseFloat(document.getElementById('smmAccNumInput').value); // Gets current accountnum from live input
    activeUserStorage = JSON.parse(window.localStorage.getItem("users")); // Match user key to local storage
    for (i=0; i<activeUserStorage.length; i++) {
        
        if (activeUserStorage[i].accountNumber == activeUserKey) {
            activeUser = activeUserStorage[i];
            getActiveUserLabel.innerHTML = activeUser.name;
            currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            activeUserArrNum = activeUserStorage.findIndex(user => user == activeUser)
            console.log("index of active user is " + activeUserArrNum)
            alert(`You are now using ${activeUser.name}`)
        }
    }
    if (activeUser == undefined) {
        alert("Please enter a valid account number.")
    }      
})

/////////////////////   MODALS  /////////////////////
////////// SIDE MENU MODAL
sideMenuBtn.addEventListener('click',function(){
    sideMenuModal.classList.add('openSideMenuModal') // Opens side menu modal on click of deposit button
})
// createNewAccSideMenu.addEventListener('click', function() {
//     window.open(newuser.html); // Opens newuser.html when clicked from sidemenumodal
// })
////////// EXPENSES LIST MODAL
function popUpExpensesModal(){
    if(activeUser == undefined) {
        alert("Please enter a valid account number on the side menu before viewing your expenses.")
    } else {
        displayExpensesModal.classList.add('opendisplayExpensesModal');
        let activeUserExpenses = users[activeUserArrNum].expenseItems
        console.log(activeUserExpenses);
    }
}

//////// ADD EXPENSE MODAL
if(addExpenseModal) {
    expenseBtn.addEventListener('click',function(){
    if(activeUser == undefined) { // Checks activeUser
        alert("Please enter a valid account number on the side menu before trying a transaction!")
    } else {
        addExpenseModal.classList.add('openAddExpenseModal') // Opens deposit modal on click of deposit button
        }      
    })
};

if(addExpenseForm) {
    addExpenseForm.addEventListener('submit', function(e){
        addExpenseItemInput = document.getElementById('addExpenseItemInput').value;
        addExpenseAmountInput = document.getElementById('addExpenseAmountInput').value;
        users[activeUserArrNum].balance = parseInt(users[activeUserArrNum].balance) - parseInt(addExpenseAmountInput);
        currentBalance.innerHTML = "PHP " + users[activeUserArrNum].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        users[activeUserArrNum].expenseItems.push(new ExpenseItem(addExpenseItemInput,parseInt(addExpenseAmountInput), activeUserKey))
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Successfuly spent PHP ${addExpenseAmountInput}`);
        addExpenseModal.classList.remove('openAddExpenseModal');
        addExpenseForm.reset();
        e.preventDefault();
    }
)}

////////// DEPOSIT MODAL
if(depositModal) { // Checks for existence of depositModal (true in index.html, false in newuser.html)
    depositBts.addEventListener('click',function(){
        if(activeUser == undefined) { // Checks activeUser
            alert("Please enter a valid account number before trying a transaction!")
        } else {
            depositModal.classList.add('openDepositModal') // Opens deposit modal on click of deposit button
        }
    })
}

if(depositForm) {
    depositForm.addEventListener('submit', function(e){
        depositAmountInput = document.getElementById('depositAmountInput').value;
        users[activeUserArrNum].balance = parseInt(users[activeUserArrNum].balance) + parseInt(depositAmountInput);
        currentBalance.innerHTML = "PHP " + users[activeUserArrNum].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Successfuly deposited PHP ${depositAmountInput}`);
        depositModal.classList.remove('openDepositModal');
        depositForm.reset();
        e.preventDefault();
    });
}

function checkAccountBalance(activeUser) {
    if (activeUser.balance < 0) {
        alert("You do not have enough to make ")
    }
}
////////// WITHDRAW MODAL
// Opens deposit modal on click of deposit button
if(withdrawModal) {    
    withdrawBtn.addEventListener('click',function(){
        if(activeUser == undefined) { // Checks activeUser
            alert("Please enter a valid account number on the side menu before trying a transaction!")
        } else {
            withdrawModal.classList.add('openWithdrawModal');   
        }
    })
};

if(withdrawForm) {
    withdrawForm.addEventListener('submit', function(e){
        withdrawAmountInput = document.getElementById('withdrawAmountInput').value;
        users[activeUserArrNum].balance = parseInt(users[activeUserArrNum].balance) - parseInt(withdrawAmountInput);
        currentBalance.innerHTML = "PHP " + users[activeUserArrNum].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        localStorage.setItem("users", JSON.stringify(users));
        alert(`Successfuly withdrew PHP ${withdrawAmountInput}`);
        withdrawModal.classList.remove('openWithdrawModal');
        withdrawForm.reset();
        e.preventDefault();
    });
}

////////// TRANSFER MODAL
// Opens transfer modal on click of transfer button
if(transferModal) {
    transferBtn.addEventListener('click',function(){
        if(activeUser == undefined) {
            alert("Please enter a valid account number on the side menu before trying a transaction!")
        } else {
            transferModal.classList.add('openTransferModal')
        }
    })
};

if(transferForm) {
    transferForm.addEventListener('submit', function(e){
        recipientUserKey = document.getElementById('recipientAccNumberInput').value;
        // recipientUser = JSON.parse(window.localStorage.getItem(parseInt(recipientUserKey)));
        for (i=0; i<users.length; i++) {
            if (users[i].accountNumber == recipientUserKey) {
                recipientUser = users[i];
            }
        }
        recipientAmountInput = document.getElementById('recipientAmountInput').value;
        let recipientUserArrNum = users.findIndex(user => user == recipientUser)
        console.log(recipientUserKey)
        console.log(recipientUserArrNum);
        console.log(recipientUser)
        if ((recipientUser != undefined) && (recipientUserKey != activeUserKey)) {
            users[activeUserArrNum].balance = parseInt(users[activeUserArrNum].balance) - parseInt(recipientAmountInput);
            currentBalance.innerHTML = "PHP " + users[activeUserArrNum].balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            users[recipientUserArrNum].balance = parseInt(users[recipientUserArrNum].balance) + parseInt(recipientAmountInput);
            localStorage.setItem("users", JSON.stringify(users)); // UPDATE values of local storage items           
            alert(`Successfuly transferred PHP ${recipientAmountInput} to ${recipientUser.name}`);
            transferModal.classList.remove('openTransferModal');
            transferForm.reset();
            e.preventDefault();
            recipientUser = undefined;
        } else {
            alert("Please enter a valid recipient account number.")
            transferForm.reset();
        }
    })
}

////////// DISPLAY ALL USERS MODAL
// Opens users modal on click of display button
if(displayAllUsersModal) {    
    displayAllUsersBtn.addEventListener('click',function(){
        displayAllUsersModal.classList.add('opendisplayAllUsersModal')
        for (i=0; i<users.length; i++) {
                let userfromstorage = users[i];
                let userlist = document.createElement("p");
                userlist.innerHTML = "#" + userfromstorage.accountNumber + " - "  + userfromstorage.name;
                let userlistdiv = document.querySelector('.userlistdiv');
                userlistdiv.appendChild(userlist)
        }
    })
};

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
    if (event.target == displayExpensesModal) {
        displayExpensesModal.classList.remove('opendisplayExpensesModal')
    } 
    if (event.target == displayAllUsersModal) {
        displayAllUsersModal.classList.remove('opendisplayAllUsersModal');
        document.querySelector('.userlistdiv').innerHTML = "";
    } 
}); 


/////////////////////   NEWUSER.HTML /////////////////////

class User {
    constructor (name, email, password, balance, accountNumber, expenseItems) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.accountNumber = accountNumber;
        this.expenseItems = expenseItems;
    }
}

if (newAccForm) {
    newAccForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let nameInput = document.getElementById('nameInput').value;
        let emailInput = document.getElementById('emailInput').value;
        let passwordInput = document.getElementById('passwordInput').value;
        let initialDeposit = parseInt(document.getElementById('initialDepositInput').value);
        let accountNumber = Math.floor(Math.random()*1000);
        let expenseItems = [];
        // addToUserStorage();
        if (userStorage.includes(nameInput)) {
            alert("An account with the same name has already been created. Please create a new account or log in to your existing one from the side menu.");
            newAccForm.reset();
        } else {
            users.push(new User(nameInput, emailInput, passwordInput, initialDeposit, accountNumber, expenseItems));
            alert(`${nameInput} has successfuly created an account with an initial deposit of ${initialDeposit}! Your account number is ${accountNumber}, please take note of this as you will need this to transact later on.`);
            localStorage.setItem("users", JSON.stringify(users));
            userStorage.push(nameInput);
            newAccForm.reset();
            // localStorage.setItem("users",userStorage)
        }
        console.log("Current existing users on the platform are: " + userStorage);
    })
};

class ExpenseItem {
    constructor (itemLabel, itemCost, owner) {
        this.itemLabel = itemLabel;
        this.itemCost = itemCost;
        this.owner = owner;
    }
}

///////////////////////////////////OLD CODE (BACK UP CODE)
/////////////////////   CURRENT USER  /////////////////////
// get button to enter account number (from side menu modal)
// let accNumEnterBtn = document.getElementById('accNumEnter');
// let getActiveUserLabel = document.getElementById('activeUserAccName');
// let currentBalance = document.getElementById('currentBalance');
// // Function event listener on the button -> changes balance on dashboard and name on sidemenu
// accNumEnterBtn.addEventListener('click', function() {
//     // Get the value of the user Key from input
//     let activeUserKey = document.getElementById('smmAccNumInput').value;
//     // Match user key to local storage
//     let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
//     // DOM for account name and balance display

//     // Checks if user key exists in local storage
//         if (activeUserKey in localStorage) {
//             getActiveUserLabel.innerHTML = activeUser.name;
//             // Checks for presence of current balance since js is linked to 2 diff html files
//             if(currentBalance) {
//             currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//                 }
//             }   else {
//                 alert("Please enter an existing account number.")
//                 }
//     })

// /////////////////////   MODALS  /////////////////////

// ////////// SIDE MENU MODAL
// let sideMenuBtn = document.querySelector('#menu_logo');
// let sideMenuModal = document.querySelector('.sideMenuModal');
// // Opens deposit modal on click of deposit button
// sideMenuBtn.addEventListener('click',function(){
//     sideMenuModal.classList.add('openSideMenuModal')
// })
// // Opens newuser.html when clicked from sidemenumodal
// let createNewAccSideMenu = document.querySelector('#createNewAccSideMenu');
// createNewAccSideMenu.addEventListener('click', function() {
//     window.open(newuser.html);
// })

// //////// ADD EXPENSE MODAL
// let expenseBtn = document.querySelector('#expenseBtn');
// let addExpenseModal = document.querySelector('.addExpenseModal');
// // let addExpenseItemInput = document.querySelector('#addExpenseItemInput').value;
// // Opens deposit modal on click of deposit button
// if(addExpenseModal) {
//     expenseBtn.addEventListener('click',function(){
//     addExpenseModal.classList.add('openAddExpenseModal')
// })};
// ////////// DEPOSIT MODAL
// let depositBtn = document.querySelector('#depositBtn');
// let depositModal = document.querySelector('.depositModal');
// // Opens deposit modal on click of deposit button
// if(depositModal) {
//     depositBtn.addEventListener('click',function(){
//         depositModal.classList.add('openDepositModal')
//     // When ADD FUNDS is clicked within the deposit modal, current balance is changed of current user
//     // if(getActiveUserLabel === "ACCOUNT NAME") {
//     //     alert("Please enter a valid account number before trying a transaction!")
//     // }
//         let depositModalBtn = document.getElementById('depositModalBtn');
//             depositModalBtn.addEventListener('click', function(){
            
//                 let activeUserKey = document.getElementById('smmAccNumInput').value;
//                 let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
//                 // console.log(activeUser)
//                 if(activeUser == null) {
//                     alert("Please enter a valid account number before trying a transaction!")
//                 }
//                 {
//                 let depositAmountInput = document.getElementById('depositAmountInput').value;
//                 activeUser.balance = parseInt(activeUser.balance) + parseInt(depositAmountInput);
//                 let currentBalance = document.getElementById('currentBalance');
//                 currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//                 console.log(activeUser)
//                 localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
//                 alert(`Successfuly deposited PHP ${depositAmountInput}`);
//                 depositModal.classList.remove('openDepositModal');
//         }})
// })};

// ////////// WITHDRAW MODAL
// let withdrawBtn = document.querySelector('#withdrawBtn');
// let withdrawModal = document.querySelector('.withdrawModal');
// // Opens deposit modal on click of deposit button
// if(withdrawModal) {    
//     withdrawBtn.addEventListener('click',function(){
//     withdrawModal.classList.add('openWithdrawModal');
//      // When WITHDRAW is clicked within the deposit modal, current balance is changed of current user
//     let withdrawModalBtn = document.getElementById('withdrawModalBtn');
//     withdrawModalBtn.addEventListener('click', function(){
//             let activeUserKey = document.getElementById('smmAccNumInput').value;
//             let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
//             // console.log(activeUser)
//             if(activeUser == null) {
//                 alert("Please enter a valid account number before trying a transaction!")
//             }
//             {
//             let withdrawAmountInput = document.getElementById('withdrawAmountInput').value;
//             activeUser.balance = parseInt(activeUser.balance) - parseInt(withdrawAmountInput);
//             let currentBalance = document.getElementById('currentBalance');
//             currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//             console.log(activeUser)
//             localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
//             alert(`Successfuly withdrew PHP ${withdrawAmountInput}`);
//             withdrawModal.classList.remove('openWithdrawModal');
//     }})
// })};

// ////////// TRANSFER MODAL
// let transferBtn = document.querySelector('#transferBtn');
// let transferModal = document.querySelector('.transferModal');
// // Opens transfer modal on click of transfer button
// if(transferModal) {
//     transferBtn.addEventListener('click',function(){
//     transferModal.classList.add('openTransferModal')
//      // When TRANSFER is clicked within the deposit modal, current balance is changed of current
    
//      //  user and balance of recipient is changed as well
//      let transferModalBtn = document.getElementById('transferModalBtn');
//      transferModalBtn.addEventListener('click', function(){
//             let activeUserKey = document.getElementById('smmAccNumInput').value;
//             let activeUser = JSON.parse(window.localStorage.getItem(activeUserKey));
//             // console.log(activeUser)
//             if(activeUser == null) {
//                 alert("Please enter a valid account number before trying a transaction!")
//             }
//             {
//             let recipientUserKey = document.getElementById('recipientAccNumberInput').value;
//             let recipientUser = JSON.parse(window.localStorage.getItem(recipientUserKey));

//             let recipientAmountInput = document.getElementById('recipientAmountInput').value;
//             activeUser.balance = parseInt(activeUser.balance) - parseInt(recipientAmountInput);
//             recipientUser.balance = parseInt(recipientUser.balance) + parseInt(recipientAmountInput);
//             let currentBalance = document.getElementById('currentBalance');
//             currentBalance.innerHTML = "PHP " + activeUser.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//             console.log(activeUser)

//             // UPDATE values of local storage items
//             localStorage.setItem(activeUserKey, JSON.stringify(activeUser));
//             localStorage.setItem(recipientUserKey, JSON.stringify(recipientUser));
//             alert(`Successfuly transferred PHP ${recipientAmountInput} to ${recipientUser.name}`);
//             transferModal.classList.remove('openTransferModal');
//      }})
// })};

// ////////// DISPLAY ALL USERS MODAL
// let displayAllUsersBtn = document.querySelector('#displayAllUsersBtn');
// let displayAllUsersModal = document.querySelector('.displayAllUsersModal');
// // Opens users modal on click of deposit button
// if(displayAllUsersModal) {    
//     displayAllUsersBtn.addEventListener('click',function(){
//     displayAllUsersModal.classList.add('opendisplayAllUsersModal')

//     for (var i = 0; i < localStorage.length; i++){

//         let userKey = localStorage.key(i);
//         let userfromstorage = JSON.parse(localStorage.getItem(userKey));
//         let userlist = document.createElement("p");

//         userlist.innerHTML = "#" + userKey + " - "  + userfromstorage.name;
//         // userfromstorage.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
//         let userlistdiv = document.querySelector('.userlistdiv');
//         userlistdiv.appendChild(userlist)
//         // console.log(userfromstorage.name);
//     }
// })};

// // Closes modals on click outside of modal
// window.addEventListener("click", function(event){
//     if (event.target == sideMenuModal) {
//         sideMenuModal.classList.remove('openSideMenuModal')
//     }
//     if (event.target == addExpenseModal) {
//         addExpenseModal.classList.remove('openAddExpenseModal')
//     }
//     if (event.target == depositModal) {
//         depositModal.classList.remove('openDepositModal')
//     } 
//     if (event.target == withdrawModal) {
//         withdrawModal.classList.remove('openWithdrawModal')
//     } 
//     if (event.target == transferModal) {
//         transferModal.classList.remove('openTransferModal')
//     } 
//     if (event.target == displayAllUsersModal) {
//         displayAllUsersModal.classList.remove('opendisplayAllUsersModal');
//         document.querySelector('.userlistdiv').innerHTML = "";
//     } 
// }); 


// /////////////////////   NEWUSER.HTML /////////////////////

// class User {
//     constructor (name, email, password, balance, accountNumber) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.balance = balance;
//         this.accountNumber = accountNumber;
//     }
// }

// let createNewAccBtn = document.getElementById('createNewAcc');

// let userStorage = [];

// if (createNewAccBtn) {
// createNewAccBtn.addEventListener('click', (e) => {
//     // e.preventDefault();

//     let nameInput = document.getElementById('nameInput').value;
//     let emailInput = document.getElementById('emailInput').value;
//     let passwordInput = document.getElementById('passwordInput').value;
//     let initialDeposit = parseInt(document.getElementById('initialDepositInput').value);
//     let accountNumber = Math.floor(Math.random()*1000)



//     if (nameInput && emailInput && passwordInput && initialDeposit){
//         const newUser = new User(nameInput, emailInput, passwordInput, initialDeposit, accountNumber);
//         alert(`${nameInput} has successfuly created an account with an initial deposit of ${initialDeposit}! Your account number is ${accountNumber}, please take note of this as you will need this to transact later on.`);
//         localStorage.setItem(`${accountNumber}`, JSON.stringify(newUser));
//         userStorage.push(newUser);
//         console.log(newUser);
//     }
//     console.log(userStorage);
// })};
