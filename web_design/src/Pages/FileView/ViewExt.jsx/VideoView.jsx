import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactPlayer from "react-player";

export default function VideoView({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [hover, setHover] = useState(false);
  const [volumeHover, setVolumeHover] = useState(false);
  const [volumeIcon, setVolumeIcon] = useState("low");
  const [lastMove, setLastMove] = useState(Date.now());

  const playerRef = useRef(null);

  const APIurl = process.env.REACT_APP_API;
  const video = `${APIurl}${data.filePath}`;

  const toggleIsPlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleLastMove = () => {
    setLastMove(Date.now());
    setHover(true);
  };

  useEffect(() => {
    const checkHoverState = () => {
      if (Date.now() - lastMove >= 5000) {
        setHover(false);
      }
    };

    const player = document.getElementById("ReactVideoPlayer");

    player.addEventListener("mousemove", handleLastMove);
    player.addEventListener("mouseleave", () => setHover(false));

    const hoverCheckInterval = setInterval(checkHoverState, 1000);

    return () => {
      window.removeEventListener("mousemove", handleLastMove);
      clearInterval(hoverCheckInterval);
    };
  }, [lastMove]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        toggleIsPlaying();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setCurrentTime((prevTime) => Math.min(prevTime + 10, duration));
        playerRef.current.seekTo(currentTime + 10);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentTime((prevTime) => Math.max(prevTime - 10, 0));
        playerRef.current.seekTo(currentTime - 5);
      } else if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        toggleFullScreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, volume, currentTime, duration, toggleIsPlaying]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setPreviousVolume(newVolume);

    const slider = e.target;
    const percentage = (newVolume / 1) * 100;
    slider.style.background = `linear-gradient(to right, #16143b ${percentage}%, lightgray ${percentage}%)`;
  };

  const toggleMute = () => {
    if (volume === 0) {
      const newVolume = previousVolume || 0.5;
      setVolume(newVolume);

      const slider = document.getElementById("volume-slider");
      const percentage = (newVolume / 1) * 100;
      slider.style.background = `linear-gradient(to right, #16143b ${percentage}%, lightgray ${percentage}%)`;
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      const slider = document.getElementById("volume-slider");
      slider.style.background = `lightgray`;
    }
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

  const handleProgress = (state) => {
    setPlayed(state.played);
    setCurrentTime(state.playedSeconds);

    const slider = document.querySelector(".videoDurater");
    const percentage = state.played * 100;

    slider.style.background = `linear-gradient(to right, #16143b ${percentage}%, lightgray ${percentage}%, lightgray ${percentage}%)`;
  };

  const handleSeekChange = (e) => {
    const seekTo = parseFloat(e.target.value);
    setPlayed(seekTo);
    playerRef.current.seekTo(seekTo);

    const percentage = seekTo * 100;
    const slider = document.querySelector(".videoDurater");
    slider.style.background = `linear-gradient(to right, #16143b ${percentage}% lightgray ${percentage}%)`;
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hoursStr = hours > 0 ? `${hours}:` : "";
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const secsStr = secs < 10 ? `0${secs}` : secs;

    return `${hoursStr}${minutesStr}:${secsStr}`;
  };

  const [fullIcon, setFullIcon] = useState("expand");

  const toggleFullScreen = () => {
    const element = document.getElementById("ReactVideoPlayer");
    const isFullScreen = document.fullscreenElement;
    if (isFullScreen) {
      document.exitFullscreen();
      setFullIcon("expand");
    } else {
      element.requestFullscreen();
      setFullIcon("compress");
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <>
      <section>
        <div className="container p-4">
          <div className="row justify-content-center">
            <div className="col-md-10 p-0">
              <div
                className="video-container position-relative"
                id="ReactVideoPlayer"
              >
                <ReactPlayer
                  ref={playerRef}
                  url={video}
                  playing={isPlaying}
                  volume={volume}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onClick={toggleIsPlaying}
                  className="react-player w-100 h-100 bg-dark"
                />
                {!isPlaying && (
                  <button
                    className="btn btn-deep position-absolute align-content-center top-50 start-50 translate-middle"
                    onClick={toggleIsPlaying}
                  >
                    <i className="fa fa-play fs-1"></i>
                  </button>
                )}

                <div
                  className={`controls bottom-0 text-light py-2 px-2 d-flex align-items-center justify-content-between position-absolute w-100`}
                  style={{ opacity: hover || !isPlaying ? 1 : 0 }}
                >
                  <button
                    className="btn btn-deep btn-sm"
                    onClick={toggleIsPlaying}
                  >
                    {isPlaying ? (
                      <i className="fa fa-pause"></i>
                    ) : (
                      <i className="fa fa-play"></i>
                    )}
                  </button>

                  <div className="d-flex align-items-center flex-grow-1 mx-md-3 mx-1">
                    <span>{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={played}
                      onChange={handleSeekChange}
                      className="mx-md-3 mx-1 flex-grow-1 videoDurater"
                    />
                    <span>{formatTime(duration)}</span>
                  </div>

                  <div
                    className="position-relative"
                    onMouseEnter={() => setVolumeHover(true)}
                    onMouseLeave={() => setVolumeHover(false)}
                  >
                    <button
                      className="btn btn-deep me-md-2 me-1 btn-sm"
                      onClick={toggleMute}
                      aria-label={volume === 0 ? "Unmute" : "Mute"}
                    >
                      <i className={`fa fa-volume-${volumeIcon}`}></i>
                    </button>

                    {volumeHover && (
                      <div
                        className="volume-slider-box position-absolute p-2 d-flex flex-row-reverse shadow-sm align-items-center justify-content-center"
                        style={{ background: "rgba(0, 0, 0, 0.8)" }}
                      >
                        <input
                          id="volume-slider"
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                        />
                        <p
                          className="text-light text-center mt-3"
                          style={{ transform: "rotate(90deg)" }}
                        >
                          {(volume * 100).toFixed(0)}%
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-deep me-md-2 btn-sm"
                    onClick={toggleFullScreen}
                  >
                    <i className={`fa fa-${fullIcon}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
