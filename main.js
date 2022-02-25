const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Songs title
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 1;

// Initially load song details in DOM
loadSong(songs[songIndex]);

//Update song details
function loadSong(song){
    title.innerText = song;
    audio.src =  `./music/${song}.mp3`;
    cover.src =  `./images/${song}.jpg`;
}

// Play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    // Play audio
    audio.play();
}

// Pause Song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    // Pause audio
    audio.pause();
}

// Preveous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong(){
    songIndex++;
    if(songIndex >= songs.length){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong()
}

// Update progress 
function updateProgress(e){
    const {duration, currentTime}  = e.srcElement;
    const progressPercent = (currentTime/duration)*100;
    progress.style.width = `${progressPercent}%`;
}

// Set Pregress 
function setPregress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Add Event Listener
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progres bar
progressContainer.addEventListener('click', setPregress);

// Song end
audio.addEventListener('ended', nextSong);