import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Volume2, VolumeX, Music } from "lucide-react";

const AudioPlayer = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  const audioUrl =
    new URL(window.location.href).searchParams.get("url") ||
    `${import.meta.env.VITE_API_URL}/${data?.filePath}`;

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#4f46e5",
      progressColor: "#818cf8",
      cursorColor: "#6366f1",
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      barGap: 3,
    });

    wavesurferRef.current.load(audioUrl);

    wavesurferRef.current.on("ready", () => {
      setDuration(wavesurferRef.current.getDuration());
    });

    wavesurferRef.current.on("audioprocess", () => {
      setCurrentTime(wavesurferRef.current.getCurrentTime());
    });

    wavesurferRef.current.on("finish", () => {
      wavesurferRef.current.play(0);
    });

    return () => {
      wavesurferRef.current.destroy();
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  };

  const handleToggleMute = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="min-w-48 h-48 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 md:mb-0 md:mr-8">
              <Music className="w-24 h-24 text-white/80" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {data?.root || "Now Playing"}
              </h2>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <span className="text-indigo-200">
                  {formatTime(currentTime)}
                </span>
                <span className="text-indigo-200">/</span>
                <span className="text-indigo-200">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          <div ref={waveformRef} className="mb-8" />

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handlePlayPause}
                className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full p-4 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggleMute}
                className="text-white hover:text-indigo-400 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
