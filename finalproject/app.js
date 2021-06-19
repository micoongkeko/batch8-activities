// SECTION DOM HANDLERS
let landing = document.querySelector('.landing')
let storyboard = document.querySelector('.storyboard')

// SECTION 1 - LANDING , DOM HANDLERS
let babLogo = document.querySelector('#logoBtn')
let ourApiMenu = document.querySelector('#ourApi')
let createSbMenu = document.querySelector('#createSb')
let createSbModal = document.querySelector('.createSbModal')
let createSbFrameInputForm = document.querySelector('#createSbFrameInputForm')
let createSbFrameInput = document.querySelector('#createSbFrameInput')
let createSbBtn = document.querySelector('#createSbBtn')
let imageSearchForm = document.querySelector('#imageSearch')
let imageSearchInput = document.querySelector('#imageSearchInput')
let imageSearchBtn = document.querySelector('#imageSearchBtn')
let imageSearchReset = document.querySelector('#imageSearchReset')
let imageSearchResults = document.querySelector('#imageSearchResults')
let imgBtn;
let imgBtns;
let imgContainer;
let storyboardSearch = document.querySelector('#storyboardSearch')
let deleteFramesBtn = document.querySelector('#deleteFramesBtn')
let restartStoryboard = document.querySelector('#restartStoryboard')
let activeStoryboardFrame;
let activeStoryboardFrameId;
let activeImageResult;
let radioBtns;
let addFramesBtn = document.querySelector('#addFramesBtn')
let addFramesModal = document.querySelector('.addFramesModal') 
let addFrameForm = document.querySelector('#addFrameForm')
let addFrameInputForm = document.querySelector('#addFrameInputForm')
let confirmAddFramesBtn = document.querySelector('#confirmAddFramesBtn')
let deleteFramesModal = document.querySelector('.deleteFramesModal')
let deleteFramesModalContainer = document.querySelector('#deleteFramesModalContainer')
let deleteFrameForm = document.querySelector('#deleteFrameForm')
let deleteFrameInputForm = document.querySelector('#deleteFrameInputForm')
let confirmDeleteFramesBtn = document.querySelector('#confirmDeleteFramesBtn')
let existingFramesNo = 0;
let frames = []

// TOP MENU HANDLERS
createSbMenu.addEventListener('mouseover',function(){
    createSbModal.classList.add('openCreateSbModal') 
})

createSbMenu.addEventListener('mouseout',function(){
    createSbModal.classList.remove('openCreateSbModal')
})

// BAB LOGO CHANGE ON MEDIA QUERY
function changeLogo(x) {
    if (x.matches) { // If media query matches
        babLogo.src = "media/bab_logo_secondary_white.png"
    } else {
        console.log('media query')
    }
}
var x = window.matchMedia("only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3)")
changeLogo(x) // Call listener function at run time
x.addEventListener('change', changeLogo) // Attach listener function on state changes



// DECLARE FRAME CLASS FOR STORYBOARD
class Frame {
    constructor (storyboardPhoto, storyboardDesc) {
        this.storyboardPhoto = storyboardPhoto;
        this.storyboardDesc = storyboardDesc;
    }
}

// CREATES THE STORYBOARD BASED ON HOW MANY FRAMES ARE INPUTTED
createSbBtn.addEventListener('click', function(){
    window.location.href='index.html#storyboard';
    landing.style.display = "none";
    storyboard.style.display = "flex";
    // add create new object here
    if(frames.length !== 0) {
        alert('You already have an existing storyboard. You will be redirected to your current storyboard.')
        // break
    } else {
        for(i=0; i<createSbFrameInput.value; i++) {
            let storyboardPhoto = ""
            let storyboardDesc = `Frame ${i + 1}.`
            frames.push(new Frame(storyboardPhoto, storyboardDesc))
            localStorage.setItem("frames", JSON.stringify(frames));
            const newStoryboardObj = document.createElement('div')
            const newStoryboardPhoto = document.createElement('img')
            const newStoryboardDesc = document.createElement('div')
            const radioBtn = document.createElement('input')
            newStoryboardObj.className = "storyboardObject"
            newStoryboardObj.id = `frame${i + 1}`
            newStoryboardPhoto.className = "storyboardPhoto"
            newStoryboardPhoto.id = `${i+1}`
            newStoryboardDesc.className = "storyboardDesc"
            newStoryboardDesc.contentEditable = "true"
            newStoryboardDesc.innerHTML = frames[i].storyboardDesc
            radioBtn.type = 'radio'
            radioBtn.className = 'storyboardRadio'
            radioBtn.name = "storyboardRadioStatus"
            storyboardSheet.append(newStoryboardObj)
            newStoryboardObj.append(newStoryboardPhoto)
            newStoryboardObj.append(newStoryboardDesc)
            newStoryboardObj.append(radioBtn)
            console.log(`Should create ${i+1} frames`)
            existingFramesNo++
            console.log(existingFramesNo)
            // 
        }
        radioBtns = document.getElementsByName('storyboardRadioStatus')
        // console.log(radioBtns)
        createSbModal.classList.remove('openCreateSbModal')
        createSbFrameInput.value = ""
        frameDescEdit();
    }
})

// BAB LOGO HANDLER 
babLogo.addEventListener('click', function(){
    if(storyboard.style.display = "none") {
        console.log('should reset to landing page')
        window.location.href='index.html#landingBody';
        landing.style.display = "";
        storyboard.style.display = "none";
    }
})

// STORYBOARD HANDLERS
// IMAGE SEARCH HANDLER
imageSearchBtn.addEventListener('click', function SearchPhotos() {
    imageSearchResults.innerHTML = "";
    console.log('onclick working')
    storyboardSearch.style.overflowY = "scroll"
    let clientId = "6jhe5KTTtzppzjtmsKAnWFfs4BdXwZRirgYR_5zTnS4";
    let query = imageSearchInput.value;
    let url = "https://api.unsplash.com/search/photos/?client_id=" + clientId + "&query=" + query + "&orientation=landscape" + "&per_page=25";
    let loader = `<div class="lds-ripple"><div></div><div></div></div>`;
    imageSearchResults.innerHTML = loader;
    // make request to api
    fetch(url)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        console.log(data);
        imageSearchResults.innerHTML = ""
        imageSearchResults.style.visibility = "hidden"
        data.results.forEach(photo => {
            imageSearchResults.style.visibility = "none"
            imgContainer = document.createElement('div')
            let img = document.createElement('img');
            imgBtn = document.createElement('button')
            imgContainer.className = "imgContainer"
            imgBtn.innerHTML = "select"
            img.src = `${photo.urls.regular}`
            img.className = "searchResult"
            imgBtn.className = "imgBtn"
            imgContainer.append(img)
            imgContainer.append(imgBtn)
            imageSearchResults.append(imgContainer)
            // let result =  `<img src="${photo.urls.regular}">`;
            // imageSearchResults.append(result)
            // console.log(imgBtn)
        })
        // console.log(imgBtn)
        imageSearchResults.style.visibility = "visible"
        imgBtns = document.querySelectorAll('.imgBtn')
        console.log(imgBtns)      
        selectFromImageSearch();  
    });
})

// IMAGE SEARCH RESET HANDLER
imageSearchReset.addEventListener('click', function(){
    imageSearchResults.innerHTML = "";
    imageSearchInput.value = "";
    storyboardSearch.style.overflowY = "hidden"
})

// IMAGE SEARCH SELECT HANDLER
function selectFromImageSearch() {
    if(imgBtns == undefined) {
        console.log('imgBtns undefined')
        } else {
            // console.log("about to click")
            imgBtns.forEach((btn) => {
                btn.addEventListener('click', function(e) {
                    if(activeStoryboardFrame == undefined){
                        alert('Please select a frame from the storyboard to place this photo in.')
                    } else {
                        console.log(e)
                        console.log(e.path[1].firstChild.src)
                        activeImageResult = e.path[1].firstChild.src
                        console.log(activeImageResult)
                        frames[activeStoryboardFrameId-1].storyboardPhoto = activeImageResult;
                        console.log(frames)
                        localStorage.setItem("frames", JSON.stringify(frames));
                        activeStoryboardFrame.src = activeImageResult;
                    }
                })
            })
        }
}

// ACTIVE STORYBOARD FRAME HANDLER
storyboardSheet.addEventListener('change', function(e) {
    console.log(e.target)
    console.log(e.path[1].children[0])
    activeStoryboardFrame = e.path[1].children[0]
    activeStoryboardFrameId = e.path[1].children[0].id
    // console.log(`active frame is ${activeStoryboardFrame}`)
})

// FRAME DESCRIPTION EDIT CHANGES ARRAY AND LOCALSTORAGE VALUES
function frameDescEdit () {
    let descriptions = document.querySelectorAll('.storyboardDesc');
    descriptions.forEach(desc => {
        desc.addEventListener('input', function(e){
            // console.log('desc changed')
            // console.log(e)
            // console.log(e.path[1].children[0].id-1)
            frames[e.path[1].children[0].id-1].storyboardDesc = desc.innerHTML;
            // console.log(desc.innerHTML)
            localStorage.setItem("frames", JSON.stringify(frames));
        })
    })
}

// STORYBOARD RESTART HANDLER
restartStoryboard.addEventListener('click', function(){
    storyboardSheet.innerHTML = ""
    frames = []
    console.log(frames)
    localStorage.setItem("frames", JSON.stringify(frames));
    activeStoryboardFrameId = ""
    activeStoryboardFrame = ""
})

// DELETE FRAMES HANDLERS
// deleteFramesBtn.addEventListener('click', function(){
//     console.log('delete frames working');
//     deleteFramesModal.classList.add('openDeleteFramesModal')

// })

// confirmDeleteFramesBtn.addEventListener('click', function(){
//     if(frames.length < deleteFrameInputForm.value){
//         alert('This frame does not exist. Please enter a valid frame number.')
//     } else {
//         console.log(`Should delete Frame ${deleteFrameInputForm.value}`)
//         let toBeDeleted = document.getElementById(`frame${deleteFrameInputForm.value}`)
//         toBeDeleted.remove();
//     }
// })


window.addEventListener("click", function(event){
    if (event.target == deleteFramesModal) {
        deleteFramesModal.classList.remove('openDeleteFramesModal')
    }
})

// ADD FRAMES HANDLERS, INCLUDES MODAL
addFramesBtn.addEventListener('click', function(){
    addFramesModal.classList.add('openAddFramesModal')
})

confirmAddFramesBtn.addEventListener('click', function(){
    for(i=0; i<addFrameInputForm.value; i++) {
        let storyboardPhoto = ""
        let storyboardDesc = `Frame ${existingFramesNo + 1}.`
        frames.push(new Frame(storyboardPhoto, storyboardDesc))
        localStorage.setItem("frames", JSON.stringify(frames));
        const newStoryboardObj = document.createElement('div')
        const newStoryboardPhoto = document.createElement('img')
        const newStoryboardDesc = document.createElement('div')
        const radioBtn = document.createElement('input')
        newStoryboardObj.className = "storyboardObject"
        newStoryboardObj.id = `frame${existingFramesNo + 1}`
        newStoryboardPhoto.className = "storyboardPhoto"
        newStoryboardPhoto.id = `${existingFramesNo+1}`
        newStoryboardDesc.className = "storyboardDesc"
        newStoryboardDesc.contentEditable = "true"
        newStoryboardDesc.innerHTML = storyboardDesc
        radioBtn.type = 'radio'
        radioBtn.className = 'storyboardRadio'
        radioBtn.name = "storyboardRadioStatus"
        storyboardSheet.append(newStoryboardObj)
        newStoryboardObj.append(newStoryboardPhoto)
        newStoryboardObj.append(newStoryboardDesc)
        newStoryboardObj.append(radioBtn)
        console.log(`Should create frame ${existingFramesNo+1}`)
        existingFramesNo++
        console.log(existingFramesNo)
        // 
    }
    radioBtns = document.getElementsByName('storyboardRadioStatus')
    addFramesModal.classList.remove('openAddFramesModal')
    frameDescEdit();
})

window.addEventListener("click", function(event){
    if (event.target == addFramesModal) {
        addFramesModal.classList.remove('openAddFramesModal')
    }
})