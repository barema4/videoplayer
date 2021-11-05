import React from 'react'
import { useState, useEffect } from "react";

function useVideoPlayer(videoElement) {

    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        speed: 1,
        isMuted: false,
      });

    const [ currentTime, setCurrentTime] = useState(0)
    const [ duration, setDuration] = useState(0)
    const [fullscreen ,setFullscreen] = useState(false)


      const togglePlay = () => {
        setPlayerState({
          ...playerState,
          isPlaying: !playerState.isPlaying,
        });
        fullScreen()
      };

      useEffect(() => {
        playerState.isPlaying
          ? videoElement.current.play()
          : videoElement.current.pause();
      }, [playerState.isPlaying, videoElement]);

    
      useEffect(()=> {
        // setCurrentTime(videoElement.current.currentTime )
        setDuration(videoElement.current.duration)
      },[videoElement])


      const handleOnTimeUpdate = () => {
        setCurrentTime(videoElement.current.currentTime )
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
          ...playerState,
          progress,
        });
      };

      const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
          ...playerState,
          progress: manualChange,
        });
      };


      const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setPlayerState({
          ...playerState,
          speed,
        });
      };


      const toggleMute = () => {
        setPlayerState({
          ...playerState,
          isMuted: !playerState.isMuted,
        });
      };


   useEffect(() => {
    playerState.isMuted
      ? (videoElement.current.muted = true)
      : (videoElement.current.muted = false);
   }, [playerState.isMuted, videoElement]);
    
   const fullScreen = () => {
       console.log(videoElement, 'ejnnekjekjejej')
   }

    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        currentTime,
        duration
       
      };
}

export default useVideoPlayer
