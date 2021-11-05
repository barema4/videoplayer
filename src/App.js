import React, { useRef } from "react";
import logo from './logo.svg';
import './App.css';
import Poster from './poster.jpg'
import Video from "./assets/Hang.mp4"
import useVideoPlayer from "./hooks/useVideoPlayer";


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
          poster={Poster}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAOxJREFUaEPtmEEKwzAQAzcPL6TvaR/U3zQYGnrpKaOVMVXusj2rAZtstfi3LX7+CsDsBtNAGoATiEJwgDieBvAI4QJ/3cCjqm5V9YJDRHHSwPuz872qdnQKEFYAjO1HC6ONJzjLpagK4Nx8AFi1UgOcIDatugBsWnUCWLRyALRq5QRo0coNINdqFoBMq9kAWKsAXLr/vyF84c1qQPbkcAPIH31OAKzLL10dADJd3AByXZwALbo4AFp16QSw6NIFYNNFDbD8bxX4itDEyT2gOQFcJQBwgDieBvAI4QJpAA4Qx9MAHiFcIA3AAeL4AUAwPjG/7r16AAAAAElFTkSuQmCC"/>
              ) : (
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAKlJREFUaEPtl0sKgFAMA/vuf2jd+4GEEUQZ121fO2kKrvn4tz7e/zjA2wqqgApAAq4QBIjTVQAjhAVUAALE6SowM9sNxiOcNK5S5QkF0sbSOAeoCLhCw/5J9IAr5Aq1N+ccn973NK7qSBNrYk1cWeYyODVnGld1pIk1sSauLPNPE3MEoMITVwg8z1MdgDNkFVSA8ePZKsAZsgoqwPjxbBXgDFkFFWD8ePYO1bAoMfln2GgAAAAASUVORK5CYII="/>
              )}
            </button>
          </div>
          <input
            type='range'
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
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
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAuhJREFUaEPtmfGVDEEQxr+LgAwQwREBIkAERwTIgAgQATJwESACRIAIEAHv53V7tXXV3TU7s+9mnp2/drt7uuqr+qq6qudEG39ONq6/jgAu24NHD/wPHngs6VkB+kDSBwea/8z78ZRtDkmh65JeS7pjNPkm6YbT7Hf5/07SI0k/U5qXRYcCUK1+NVDGy6wAWIrykZeamJYGEFndC+8BqGvxxJuMJ5YE0LO61cXLvF+UveIUToFYAkDP6r8kecUimVCNID6dCmIugJ7VP0p6KOmrU6olMwJBTNyV9LlFp30BjKxOWnxZhNogZagnMwIRZa5/eFqboeALSTcl8Tv7VKsjtD4jAHjJBizysLil3nNzluzoEgFgg0+SohTYAgLXrdXtuhEA5qGJPcieFAPWfaAS58eFMyICwIFyL2tySZHVpwKIaMLYNbPRU0PLLoV+JK3/vWxYud7CnPEA7/q0CbU4yesTxkLkgZHACc75u3S0X533CkJhxmws3PIZaU0AAOsVJLjPejRaGwCfbXwwvy1nSzcGRi4/FIXYl4Rgq1d+vzcC/Xx4qFwmAPI/NKoPcUBSaQby2iiEoqNqdWf+CCARECNK2vkvpXxpUYizZ6e0WZsHNh/Em0+jmz7IPL9JoTRDtipOlRKUrL4NjGKVOoVC7tUgkLNBPCrmLgRwlHMZm1pOU8cj3DYxFlMGQKTc3uV01BGNsiVeo6GJvJEBMGpoaJjQK9XQoCyLoQctpW0qRkAib4wARC2l7wgntZQjJStASt3bwWLvjREAuwUBS/GG4eoTcr9O7nsrUd+n3IU6UdBXb0y5VvHKQx0q0sWvVazVoFvPG/5yoHWx5ZVHxvB2bq4HLJCeN+y66GqR3tcDHSrfSqOZGGit6XmjRVsfIynLLxUDLSA9b/TqfTjPZW/6Y8eSFPJgIm9EGaV64Lz0u6v4wBHFBmORdVf7iWlOLKXfPSSF0krMWXgEMMd6S7x79MASVpyzxx/ztsoxlQV+BgAAAABJRU5ErkJggg=="/>
            ) : (
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA1dJREFUaEPtme1x1EAMht9UAB0AFYRUAFQAqSBQQaACoIKECoAOkgqADqACoIKQCmDemRWjk7WS9mzncjPxn8zZa0nP6nOdA+z5dbDn9uMOYNcezDzwFMDXXRsZ6Y8APgJ4CeAVgE+3FaIHIMaL3XMgTgG8a4KOHY9+AfB+W097AAwbCrXXKMRDANwIypPrF4BHRvDf9vuiefvPiLd7HmDoUPm2ELLr9x0ZVqcAcCmN97zUZYpyYBsIb9et8ghgOGSzKjQCEe26hrA6X7Qicc+QlkI2A6DMDCLa9WsA1jBPJ0ON5fpwFKICEEGwvHIHvVj/1uB/GqN6Oj0I5sQzAN97SVAFiCCsbO46y+Z5e6CTlLcinR6EV7n+64x2g+WPpU1fvXCSNbLrVCpXBkCZulEyJLnjOvTYJ6SXbBjkATxuJZR/vUTqQVy2cLIeyQD4nGGiR5bXAM6UIIYS+8ekR3gA3I0T9fIIhLe2AuCFCe89UHa8UWEZhhCTjm7U1xyICgB1WR3W024ueB7IFFZyQhuTyZPn1kAmNO/pXDiyFWkuQKVPVAEoyxpow3kSRksAZBB2popGCVttbDJ/br0lzIFsx3o9JSux8l4EwDKsp1c7GdvnblPZFqDa7CIA1n+GkVzMgyv1e5LIS4VQJbErHuCabFrdeL4GQOaJIQMBhBGxFkCW2Hp00AZyjtKDIfuRHgZ/2x61JkAVQgPsPIm9CpWdJzRAVkYn89baHhCgCEL3CdvIOA0/j+ahmwLIEpvPbXwzFxj/OidKowRHVnsM9EKDNZmHlg+9zubcj5pdNsxNEtirubxn3ZbZxzmeyvUhJnqnB2HnHDsVu4caL4S8E1EGQa/xxOR5w564KtWJst4qpSyvtKt0oOF7XMzw4KlMHyoyEM8brDIj5wkab4+PQ0fKzEgBZDN64iy23pAyOQKhxf5oG+naNfJVwhPAcZe75SW9eEN30lEIhg4n0kU+q/Q8w3CLvGG/GXmb1kvsyfxvjZjrAS0v8oZe19OZdexVQsgKjbwha6NNG4ZY0gNVb2Q6hyAyYZWKNJIbbjcd6Nj8uLXRMNcEELskN/ibH4Kr/zS0nnA/t98EwBwvCkT3fwW3HUCaZnfO2geA0IN3AHMCfIl3994D/wAogecxtLwskAAAAABJRU5ErkJggg=="/>
            )}
          </button>
          <div className="time">
                                <span className="time-elapsed">{Math.round( currentTime * 10 ) / 10}/</span>
                                <span className="time-duration">{Math.round( duration * 10 ) / 10}</span>

                            </div>
        <div className="fullscreen-button">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAANZJREFUaEPtmUEOhDAMA+H/j4YrQkA9KNCChrOJm3Giot15+vgzf/z8kw30TtAERk5guXm4Vqqlda/MSo02MErr2sDBmA07Qq2D3VyZ09f2o3boT0bIBmBEJhARgFSJPPJ3BwhSqDWBiACkSuSR/693gNDqpn37di1v1AbKkcKCJgCBlctNoBwpLPjriyy6yiEwIo/8TYAghVoTiAhAqkQe+bsDBCnUmkBEAFIl8sif7EBq3vq+8uf1LUkTGPn/gXTmu+paC9f1cIm5DSSUntSYwJN0k9orTH04MQ9PM8sAAAAASUVORK5CYII=" onClick={toggleFullscreen}/>
        </div>
        <div>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZBJREFUaEPtmO9NAzEMxV8nKEzQjsAGwAZsUjYoTAIbsAJsRCcoehJXtdHpznYSx5GSL/clf/yL/eyLN+h8bDq3HwOgtQetHngBcADwAODOAeIbwDsAfm+GBYDGfzkYPXfEcwphAeAtPDYC+AHwdH22BeDcyHge+wvgvmcA2n5z6b15YADwBlpqwNUDTHmfAHaFRe+mgemgVwBvALaFQNwBaDerNSFYvXNHE4DJ6P1/WOUUwlWAVKRpqpWKeClFs5pa9RECYPKIRR+hACz6CAeg1UdogI/0b3MmZYUDYIo9AqAeJCMUAI2m8ZpXXQgAplGGC+uCdjQFoMGSOF+CagKgjfNQAJY4DwHA32lrnIcA0IpTOt9NA1KDtPMGgPR3Wnuz0vlde+CUVu25R8fagyZ8a3ENIHxzdw2AsUoIFii210t1G5Y0wKYumwKi9roEQCq46vMsGqhulOaAAaC5rRpzJR6oce71npYW/2X93GLvPF8cwDvPFwfwzvNVAGrHfbH9s+iLWZGx0QDIuLwiS/8Ad89WMe4EFBYAAAAASUVORK5CYII=" onClick={togglePictureInPicture}/>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;
