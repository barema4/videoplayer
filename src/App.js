import React, { useRef } from "react";
import logo from './logo.svg';
import './App.css';
import Poster from './Video.png'
import Video from "./assets/Hang.mp4"
import useVideoPlayer from "./hooks/useVideoPlayer";
import Icon from './Icon'
import PauseIcon from './PauseIcon'
import VolumeIcon from './VolumeIcon';
import FullScreen from './FullScreen'
import PictureInPicture from "./PictureInPicture";


function App() {
  const videoElement = useRef(null);
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
    currentTime,
    duration
  } = useVideoPlayer(videoElement);

  const videoContainer = document.getElementById('video-wrapper');

  function toggleFullscreen() {
    let elem = document.querySelector("video");
  
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function togglePictureInPicture() {
    let elem = document.querySelector("video");
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
      if (document.pictureInPictureEnabled) {
        elem.requestPictureInPicture();
      }
    }
  }

 
  return (
    <div className="container">
      
      <div className="video-wrapper">
        <video
          src={Video}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          // poster={Poster}
        />
              <input
                type='range'
                min="0"
                max="100"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
              />

         
        <div className="controls">
          <div className="action-bar">
            <div className="left-control">
                <div className="actions">
                    <button onClick={togglePlay}>
                      {!playerState.isPlaying ? (
                        <Icon/>
                      ) : (
                        <PauseIcon/>
                      )}
                    </button>
                  </div>
                  <div className="time">
                                        <span className="time-elapsed">{Math.round( currentTime * 10 ) / 10}/</span>
                                        <span className="time-duration">{Math.round( duration * 10 ) / 10}</span>

                  </div>
                  <div>
                  <button className="mute-btn" onClick={toggleMute}>
                    {!playerState.isMuted ? (
                      <VolumeIcon/>
                    ) : (
                      <VolumeIcon/>
                    )}
                  </button>

                  </div>
                 

            </div>
            <div className="speed-btn">
                <select
                    className="velocity"
                    value={playerState.speed}
                    onChange={(e) => handleVideoSpeed(e)}
                  >
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                  </select>

            </div>
            <div className="right-controls">
                <div>
                <FullScreen onClick={toggleFullscreen}/>
                </div>
                <div className="fullscreen-button">
                <PictureInPicture onClick={togglePictureInPicture}/>
                </div>
              
            </div>
            

          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default App;
