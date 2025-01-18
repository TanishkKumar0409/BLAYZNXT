import React, { useState, useRef, useEffect, useCallback } from "react";

export default function AudioView({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeHover, setVolumeHover] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("low");
  const [lastVolume, setLastVolume] = useState(volume);

  const audioRef = useRef(null);
  const APIurl = process.env.REACT_APP_API;

  const audio = `${APIurl}${data.filePath}`;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = useCallback(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
    }
  }, [isPlaying]);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    const slider = e.target;
    const percentage = (newVolume / 1) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent-purple) ${percentage}%, var(--accent-cyan) ${percentage}%)`;
  };

  const handleTrackChange = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeating;
    }
  };

  const updateTime = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    }
    const slider = document.querySelector(".videoDurater");
    let percentage = (currentTime / duration) * 100;

    slider.style.background = `linear-gradient(to right, var(--warning-yellow) ${
      percentage || 20
    }%, var(--error-red) ${percentage || 60}%, var(--primary-soft-gray) ${
      percentage || 100
    }%)`;
  };

  useEffect(() => {
    if (volume === 0) {
      setVolumeIcon("mute");
    } else if (volume <= 0.5) {
      setVolumeIcon("low");
    } else {
      setVolumeIcon("high");
    }
  }, [volume]);

  const toggleMute = () => {
    if (volume > 0) {
      setLastVolume(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
      const slider = document.getElementById("volume-slider");
      slider.style.background = `linear-gradient(to right, var(--accent-purple) 0%, var(--accent-cyan) 0%)`;
    } else {
      setVolume(lastVolume);
      const newVolume = lastVolume || 0.5;
      if (audioRef.current) {
        audioRef.current.volume = lastVolume;
      }
      const slider = document.getElementById("volume-slider");
      const percentage = (newVolume / 1) * 100;
      slider.style.background = `linear-gradient(to right, var(--accent-purple) ${percentage}%, var(--accent-cyan) ${percentage}%)`;
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (audioElement) {
      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case " ":
        case "Space":
          e.preventDefault();
          togglePlay();
          break;

        case "ArrowUp":
          if (volume < 1) {
            e.preventDefault();
            setVolume((prevVolume) => Math.min(prevVolume + 0.05, 1));
            if (audioRef.current)
              audioRef.current.volume = Math.min(volume + 0.05, 1);
          }
          break;

        case "ArrowDown":
          if (volume > 0) {
            e.preventDefault();
            setVolume((prevVolume) => Math.max(prevVolume - 0.05, 0));
            if (audioRef.current)
              audioRef.current.volume = Math.max(volume - 0.05, 0);
          }
          break;

        case "ArrowRight":
          e.preventDefault();
          setCurrentTime((prevTime) => Math.min(prevTime + 10, duration));
          if (audioRef.current)
            audioRef.current.currentTime = Math.min(currentTime + 10, duration);
          break;

        case "ArrowLeft":
          e.preventDefault();
          setCurrentTime((prevTime) => Math.max(prevTime - 10, 0));
          if (audioRef.current)
            audioRef.current.currentTime = Math.max(currentTime - 10, 0);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [volume, duration, currentTime, isPlaying, togglePlay]);

  return (
    <>
      <section className="audio-view bg-white text-dark p-2 rounded shadow">
        <div className="container bg-light p-3 rounded ">
          <div className="row mb-4 justify-content-center">
            <div className="col-auto text-center">
              <img
                src="https://i.pinimg.com/originals/42/c8/4f/42c84f4f71bf4b1c51ecef5336aac55d.gif"
                className="img-fluid rounded shadow-sm mb-2 p-2"
                style={{
                  width: "350px",
                  objectFit: "cover",
                  aspectRatio: "3/3",
                }}
                alt="Default Profile"
              />
              <h2>{data.root}</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="audio-controls d-flex justify-content-between align-items-center p-3 rounded shadow-sm bg-white">
                <button
                  className="btn btn-primary play-btn shadow"
                  onClick={togglePlay}
                >
                  <i className={`fa ${isPlaying ? "fa-pause" : "fa-play"}`}></i>
                </button>
                <div className="audio-track d-flex flex-column align-items-center flex-grow-1 mx-3">
                  <input
                    type="range"
                    className="w-100 track-slider videoDurater"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleTrackChange}
                  />
                  <div className="timers d-flex justify-content-between w-100 mt-1">
                    <small>{formatTime(currentTime)}</small>
                    <small>{formatTime(duration)}</small>
                  </div>
                </div>
                <div className="audio-btns d-flex">
                  <div
                    className="audioVolume position-relative"
                    onMouseEnter={() => setVolumeHover(true)}
                    onMouseLeave={() => setVolumeHover(false)}
                  >
                    <button
                      className="btn btn-primary volume-btn shadow"
                      onClick={toggleMute}
                    >
                      <i className={`fa fa-volume-${volumeIcon}`}></i>
                    </button>
                    {volumeHover && (
                      <div
                        className="volume-slider-box position-absolute p-2 d-flex flex-row-reverse shadow-sm align-items-center justify-content-center"
                        style={{ top: "-340%" }}
                      >
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume * 100}
                          onChange={handleVolumeChange}
                          id="volume-slider"
                        />
                        <p
                          className="text-center mt-3"
                          style={{ transform: "rotate(90deg)" }}
                        >
                          {Math.round(volume * 100)}%
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    className={`btn btn-primary repeat-btn shadow ms-2 ${
                      isRepeating ? "active" : ""
                    }`}
                    onClick={toggleRepeat}
                  >
                    <i className="fa fa-repeat"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <audio
        src={audio}
        ref={audioRef}
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
      ></audio>
    </>
  );
}
