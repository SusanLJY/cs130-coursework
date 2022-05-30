// Part I: Images
let images = {
    0: 'images/field1.jpg',
    1: 'images/purple.jpg',
    2: 'images/jar.jpg'
};

let currentIndex = 1;

const adjustIndex = (index) =>{
    if (index < 0 ) {
        index = Object.keys(images).length -1;
    }else if (index >= Object.keys(images).length ) {
        index = 0;
    }
    // console.log(index)
    return index;
}

const mapping = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

getTargetDate = window.localStorage.getItem('DairyTargetDate')
dairyTargetDate = JSON.parse(getTargetDate);

const initScreen = () => {

    thumbnailList = [currentIndex-1,currentIndex,currentIndex+1];
    document.querySelector('.cards').innerHTML ="";
    for (idx of thumbnailList){
        idx = adjustIndex(idx);
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <button class="image"
                style="background-image:url('${images[idx]}')"
                data-index="${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
    };
    // console.log(dairyTargetDate);
    document.querySelector('.date').textContent = `${dairyTargetDate.year} ${mapping[dairyTargetDate.month]} ${dairyTargetDate.day}`;
    window.localStorage.setItem('targetDate', getTargetDate);
    // console.log("After", window.localStorage.getItem('targetDate'));
};

initScreen();

const updateThumbnail = (ev) =>{
    thumbnailList = [currentIndex-1,currentIndex,currentIndex+1];
    for (idx of thumbnailList){
        idx = adjustIndex(idx);
        imageUrl = "url(\""+images[idx]+"\")";
        document.querySelector("[data-index=\"" + CSS.escape(idx) + "\"]").style.backgroundImage = imageUrl;
        // console.log(imageUrl,currentIndex);
    };
    document.querySelector('.featured_image').style.backgroundImage = "url(\""+images[currentIndex]+"\")";
}

// Part 1: Thumbnail Click
const showImage = (ev) => {
    const elem = ev.currentTarget;
    // console.log("Here!",elem.style.backgroundImage);
    // Update 'currentIndex' when doing thumbnail click.
    const imageUrl = elem.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    let index = 0;
    for (e of Object.keys(images)) {
        if (imageUrl == images[e]){
            currentIndex = index;
        }
        index ++;
    }
    document.querySelector('.featured_image').style.backgroundImage = elem.style.backgroundImage;
    updateThumbnail();
};

// attach event handler to all of the image tags 
// (after initScreen() has been invoked).

// first get all of the image elements from the DOM:
const imageElements = document.querySelectorAll('.image');

// then loop through each one and attach an event handler
// to each element's click event:
for (const elem of imageElements) {
    elem.onclick = showImage;
}


//Part 2: Next & Previous Buttons
// currentIndex as a global variable:


const showNext = (ev) => {
    currentIndex += 1;
    // console.log("currentIndex:", currentIndex);
    currentIndex = adjustIndex(currentIndex);
    // console.log("currentIndex:", currentIndex);
    const elem = "url("+'"'+images[currentIndex]+'")';
    // console.log("currentImage", elem);
    document.querySelector('.featured_image').style.backgroundImage = elem;
    updateThumbnail();
};

const showPrev = (ev) => {
    currentIndex -= 1;
    // console.log("currentIndex:", currentIndex);
    currentIndex = adjustIndex(currentIndex);
    // console.log("currentIndex:", currentIndex);
    const elem = "url("+'"'+images[currentIndex]+'")';
    // console.log("currentImage", elem);
    document.querySelector('.featured_image').style.backgroundImage = elem;
    updateThumbnail();
};

const image_input = document.querySelector('#file-upload');
var upload_image ="";

image_input.addEventListener("change", function(){
    upload_image = image_input.value.split('fakepath\\')[1];
    if (upload_image){
        images[currentIndex] = 'images/'+upload_image;
        updateImage();
    }
    console.log(images, upload_image);
    // const reader = new FileReader();
    // reader.addEventListener("load", () =>{
    //     upload_image = reader.result;
    //     console.log(`url(${upload_image})`);

    // })
    // reader.readAsDataURL(this.files[0]);

})

const updateImage = () =>{
    document.querySelector('.featured_image').style.backgroundImage = `url('${images[currentIndex]}')`;
    updateThumbnail();
}

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;
document.querySelector('.featured_image').onclick = showNext;

// Part II: Save & Reload
// Satndard format of localStorage:
// dairyStorage = [{
//     date: "2022-1-15(etc.)",
//     text: "xxxxx",
//     images: images(dict),    
// }, {},...,{}]

var dairyDate = dairyTargetDate.year+"-"+dairyTargetDate.month+"-"+dairyTargetDate.day+"-Dairy";
const loadDairy = () =>{
    // Check if any dairy is saved before.
    if (window.localStorage.getItem('dairyStorage')){
        dairyStorage = JSON.parse(window.localStorage.getItem('dairyStorage'));
        // Check if today's dairy is saved before.
        for (dairy of dairyStorage) {
            // If today's dairy is saved before.
            if (dairy.date == dairyDate){
                images = dairy.images;
                updateImage();
                document.querySelector(".textarea").value=dairy.text;
                console.log(dairy);
                return true;
            }
        }
    }
    return false;
}


const saveDairy =() =>{
    updateYN = false;
    console.log("Text content", document.querySelector(".textarea").value);
    // Check if any dairy is saved before.
    if (window.localStorage.getItem('dairyStorage')){
        dairyStorage = JSON.parse(window.localStorage.getItem('dairyStorage'));
        thisDairy = {
            date: dairyDate,
            text: document.querySelector(".textarea").value,
            images: images,
        };
        // Check if today's dairy is saved before.
        for (dairy of dairyStorage) {
            // If today's dairy is saved before.
            if (dairy.date == dairyDate){
                console.log("today's dairy is saved before");
                dairy.text = document.querySelector(".textarea").value;
                dairy.images = images;
                console.log(dairy);
                updateYN = true;
            }
        }
        if (updateYN == false){
            console.log("today's dairy is NOT saved before");
            dairyStorage.push(thisDairy);
            console.log(dairyStorage);
            updateYN = true;
        }
    }else{
        dairyStorage = [{
            date: dairyDate,
            text: document.document.querySelector(".textarea").value,
            images: images,
        }];
        
        updateYN = true;
    }
    window.localStorage.setItem('dairyStorage',JSON.stringify(dairyStorage));
    return updateYN;   
}

function saveDairyCheck(){
    var YN = saveDairy();
    if (YN){
        alert("Save Successfully!");
    }else{
        alert("Fail to save, please try again!");
    }
    console.log("Save dairy check\n",window.localStorage.getItem('dairyStorage'));
}

function loadDairyCheck(){
    console.log("Load dairy check\n",window.localStorage.getItem('dairyStorage'));
    var loadSuccess = loadDairy();
    if (loadSuccess){
        alert("Detect previously saved dairy. Load successfully!");
    }else{
        alert("No previous dairy is detected.");
    }
}

document.querySelector(".save").addEventListener("click", saveDairyCheck);
document.querySelector(".load").addEventListener("click", loadDairyCheck);
// document.querySelector('.save').onclick = saveDairyCheck();
// document.querySelector('.load').onclick = loadDairyCheck();