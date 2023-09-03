//IIfe function, immidiately invoked function
(function(window, document) {
    const video = document.getElementById('video')
    const playPauseButton = document.getElementById('playPause')
    const inputRange = document.getElementById('progressInput')
    const videoProgress = document.getElementById('videoProgress')
    const muteButton = document.getElementById('mute')
    const fullScreenSupported = !!document.fullscreenEnabled //!! - undefined = false
    const fullscreenButton = document.getElementById('fullscreen')
    const videoControls = document.getElementById('controls')
    const videoContainer = document.getElementById('videoContainer')

    function clickedPlayPause() {
        if (video.paused) {
            video.play()
        }else {
            video.pause()
        }
    }

    function changeIconPlayPause() {
        if(video.paused) {
            playPauseButton.innerHTML = '<i class="fa fa-play"></i>'
        }else {
            playPauseButton.innerHTML = '<i class="fa fa-pause"></i>'
        }
        
    } 

    function muteButtonClicked() {
        video.muted = !video.muted
        if(video.muted) {
            muteButton.innerHTML = '<i class="fa fa-volume-mute"></i>'
        }else {
            muteButton.innerHTML = '<i class="fa fa-volume-up"></i>'
        }
    }

    function updateVideoProgress() {
        inputRange.value = ( video.currentTime / video.duration ) * 100
        let minutes = Math.floor(video.currentTime / 60);
        if(minutes < 10) minutes = "0" + minutes;
        let seconds = Math.floor(video.currentTime % 60);
        if(seconds < 10) seconds = "0" + seconds;
        videoProgress.innerHTML = `${minutes}:${seconds}`;
    }

    function seekVideo() {
        let seekToTime = (video.duration * inputRange.value)/100
        if(seekToTime<0 || seekToTime > video.duration) return
        video.pause()
        video.currentTime = seekToTime
        var timer = setInterval(function() {
            if(video.paused && video.readyState == 4) {
                video.play()
                clearInterval(timer)
            }
        },100)
    }

    function handleFullScreen() {
        if(!fullScreenSupported) return
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            fullscreenButton.innerHTML = '<i class=" fa fa-compress"></i>'
        }else {
            document.exitFullscreen()
            fullScreenSupported.innerHTML = '<i class=" fa fa-expand"></i>'
        }
    }

    function init() {
        video.controls = false
        playPauseButton.addEventListener("click",clickedPlayPause)
        video.addEventListener("play",changeIconPlayPause)
        video.addEventListener("pause",changeIconPlayPause)
        muteButton.addEventListener("click",muteButtonClicked)
        video.addEventListener("timeupdate",updateVideoProgress)
        inputRange.addEventListener("change", seekVideo)
        if(fullScreenSupported) {
            fullscreenButton.addEventListener("click",handleFullScreen)
        }else {
            fullscreenButton.style.display = "none"
        }
    }

    window.onload = init
})(window, document)