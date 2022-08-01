const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusicBtn = wrapper.querySelector("#close");


let musicIndex = 1;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
})

// load music function
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = allMusic[indexNumb -1].img;
    mainAudio.src = allMusic[indexNumb -1].src;
}
// Play Music
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

// Pause the music
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();  
}

// Prev Music Function
function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// Next Music Function
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


playPauseBtn.addEventListener("click", () =>{
    const isMusicPaused = wrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
});

// Prev music button
prevBtn.addEventListener("click", () =>{
    prevMusic();
})

// Next music button
nextBtn.addEventListener("click", () =>{
    nextMusic();
});

// Update progess bar width acc to the music current timeT
mainAudio.addEventListener("timeupdate", (e) =>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    // console.log(progressWidth);
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    let musicDuration  =  wrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", ()=>{
        // update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60 );
        let totalSec =  Math.floor(audioDuration % 60 );
        totalSec < 10 ? totalSec= `0${totalSec}`:totalSec= totalSec;
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // update playing song curent time
    let currentMin = Math.floor(currentTime / 60 );
    let currentSec =  Math.floor(currentTime % 60 );
    currentSec < 10 ? currentSec= `0${currentSec}`: currentSec = currentSec;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// Update palying song current time according to the progress bar button
progressArea.addEventListener("click", (e)=>{
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;
    
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

// Work on repeat, suffle song according to the icon
const repeatBtn = wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",()=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText =  "repeat_one";
            repeatBtn.setAttribute("title","Song looped ");
            break;
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title"," Playback shuffle");
            break;    
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title","Playlist looped");
            break;    
    }
});
mainAudio.addEventListener("ended",()=>{

    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            nextMusic();
            break;
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;    
        case "shuffle":
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do{
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            }while(musicIndex == randIndex )
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;    
    }
});

// 

showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");
for(let i = 0; i < allMusic.length; i++) {
    let liTag = `<li>
                    <div class ="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                        </div>
                        <audio class ="${allMusic[i].src}"  id= "${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                        <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                    </div>
                </li>`
    ulTag.innerAdjacentHTML("beforeend", liTag);

    let liAudioTagDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`#${allMusic[i].src}`);


    liAudioTaga.addEventListener("loadeddata",()=>{
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec =  Math.floor(audioDuration % 60 );
        if(totalSec < 10 ){
            totalSec = `0${totalSec}`;
        }
        liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
    });
}
