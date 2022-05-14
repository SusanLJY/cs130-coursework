const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';

// Note: AudioPlayer is defined in audio-player.js
const audioFile = 'https://p.scdn.co/mp3-preview/bfead324ff26bdd67bb793114f7ad3a7b328a48e?cid=9697a3a271d24deea38f8b7fbfa0e13c';
const audioPlayer = AudioPlayer('.player', audioFile);

const search = (ev) => {
    const term = document.querySelector('#search').value;
    console.log('search for:', term);
    // issue three Spotify queries at once... And display the corresponding results in web.
    getTracks(term);
    getAlbums(term);
    getArtist(term);
    if (ev) {
        ev.preventDefault();
    }
}

const getTracksHTML = (data) =>{
    if (!data.preview_url){
        return ``
    }
    return `
    <button class="track-item preview" data-preview-track="${data.preview_url}" onclick="handleTrackClick(event)>
        <img src="${data.album.image_url}">
        <i class="fas play-track fa-play" aria-hidden="true"></i>
        <div class="label">
            <h2>${data.album.name}</h2>
            <p>
                ${data.artist.name}
            </p>
        </div>
    </button>
    `
};

const getTracks = (term) => {
    console.log(`
        get tracks from spotify based on the search term
        "${term}" and load them into the #tracks section 
        of the DOM...`);
    const elem = document.querySelector('#tracks');
    //innerHTML: the content inside the section.
    elem.innerHTML = ""; // clear the content in "tracks" box.
    //get data from other's api
    fetch(baseURL + "?type=track&q=" + term)
    //wait for the response come back from the URL inside fetch.
        .then(response => response.json()) //response is the data we get back from the fetch URL. json turns the data into a list which can be manipulate in js.
        .then(data => {
            if (data.length > 0){
                const firstFiveTracks = data.slice(0,5);
                for (const track of firstFiveTracks){
                    elem.innerHTML += getTracksHTML(track);
                }
            } else {
                `
                <section class="track-card" id="no-matching-result">
                    <div>
                        <h2>No tracks found that match your search criteria.</h2>
                    </div>
                </section>
                `
            }
        })
};

const getAlbumsHTML = (data) =>{
    if (!data.image_url){
        return `
        <section class="album-card" id="no-matching-result">
            <div>
                <h2>No albums were returned.</h2>
            </div>
        </section>
        `
    }
    return `
    <section class="album-card" id="${data.id}">
        <div>
            <img src="${data.image_url}">
            <h2>${data.name}</h2>
            <div class="footer">
                <a href="${data.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>
    `
};

const getAlbums = (term) => {
    console.log(`
        get albums from spotify based on the search term
        "${term}" and load them into the #albums section 
        of the DOM...`);
    const elem = document.querySelector('#albums');
    //innerHTML: the content inside the section.
    elem.innerHTML = ""; // clear the content in "tracks" box.
    //get data from other's api
    fetch(baseURL + "?type=album&q=" + term)
    //wait for the response come back from the URL inside fetch.
        .then(response => response.json()) //response is the data we get back from the fetch URL. json turns the data into a list which can be manipulate in js.
        .then(data => {
            if (data.length > 0){
                for (const album of data){
                    elem.innerHTML += getAlbumsHTML(album);
                }
            }
        })
};

const getArtistHTML = (data) => {
    if (!data.image_url){
        return `
        <section class="artist-card" id="no-matching-result">
            <div>
                <h2>No artists were returned.</h2>
            </div>
        </section>
        `
    }
    return `
    <section class="artist-card" id="${data.id}" onclick="handleArtistClick(event);>
        <div>
            <img src="${data.image_url}">
            <h2>${data.name}</h2>
            <div class="footer">
                <a href="${data.spotify_url}" target="_blank">
                    view on spotify
                </a>
            </div>
        </div>
    </section>
    `
};

const getArtist = (term) => {
    console.log(`
        get artists from spotify based on the search term
        "${term}" and load the first artist into the #artist section 
        of the DOM...`);
    const elem = document.querySelector('#artist');
    //innerHTML: the content inside the section.
    elem.innerHTML = ""; // clear the content in "artist" box.
    //get data from other's api
    fetch(baseURL + "?type=artist&q=" + term)
    //wait for the response come back from the URL inside fetch.
        .then(response => response.json()) //response is the data we get back from the fetch URL. json turns the data into a list which can be manipulate in js.
        // the real data we can display on the webpage.
        .then(data => {
            if (data.length > 0){
                const firstArtist = data[0];
                elem.innerHTML += getArtistHTML(firstArtist);
            }
        })

};

const getTrackPreview = (data) => {
    if (!data.getAttribute('data-preview-track')){

    }
    return `
    <img src="${data.getElementsByTagName('img')[0].src}">
    <i class="fas play-track fa-pause" aria-hidden="true"></i>
    <div class="label">
        <h2>${data.getElementsByTagName('h2')[0].innerHTML}</h2>
        <p>
        ${data.getElementsByTagName('p')[0].innerHTML}
        </p>
    </div>
    `
};

const handleTrackClick = (ev) => {
    const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    console.log(previewUrl);
    const elem = document.querySelector('#current-track');
    console.log(ev.currentTarget);
    //console.log(ev.currentTarget.getElementsByTagName('h2')[0].innerHTML);
    elem.innerHTML = "";
    elem.innerHTML += getTrackPreview(ev.currentTarget);
    audioPlayer.setAudioFile(previewUrl);
    audioPlayer.play();
};

const handleArtistClick = (ev) => {
    // const previewUrl = ev.currentTarget.getAttribute('data-preview-track');
    // console.log(previewUrl);
    // const elem = document.querySelector('#current-track');
    // console.log(ev.currentTarget);
    // //console.log(ev.currentTarget.getElementsByTagName('h2')[0].innerHTML);
    // elem.innerHTML = "";
    // elem.innerHTML += getTrackPreview(ev.currentTarget);
    // audioPlayer.setAudioFile(previewUrl);
    // audioPlayer.play();
};

document

// onkeyup: once take the key off the button.
document.querySelector('#search').onkeyup = (ev) => {
    // Number 13 is the "Enter" key on the keyboard
    console.log(ev.keyCode);
    // 13 is the key for enter.
    if (ev.keyCode === 13) {
        ev.preventDefault();
        search();
    }
};