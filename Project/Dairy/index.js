const images = {
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

mapping = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
}

const initScreen = () => {
    console.log(window.localStorage.getItem('DairyTargetDate'));
    console.log("Before", window.localStorage.getItem('targetDate'));
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
    getTargetDate = window.localStorage.getItem('DairyTargetDate')
    dairyTargetDate = JSON.parse(getTargetDate);
    console.log(dairyTargetDate);
    document.querySelector('.date').textContent = `${dairyTargetDate.year} ${mapping[dairyTargetDate.month]} ${dairyTargetDate.day}`;
    window.localStorage.setItem('targetDate', getTargetDate);
    console.log("After", window.localStorage.getItem('targetDate'));
};

initScreen();

const updateThumbnail = (ev) =>{
    thumbnailList = [currentIndex-1,currentIndex,currentIndex+1];
    for (idx of thumbnailList){
        idx = adjustIndex(idx);
        imageUrl = "url(\""+images[idx]+"\")";
        document.querySelector("[data-index=\"" + CSS.escape(idx) + "\"]").style.backgroundImage = imageUrl;
        console.log(imageUrl,currentIndex);
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


// // attach event handler to all of the image tags 
// // (after initScreen() has been invoked).

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;
document.querySelector('.featured_image').onclick = showNext;