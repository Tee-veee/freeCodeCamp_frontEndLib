import React, { useRef, useEffect, useState } from "react";

function Drum({ audioItem, volume, setDisplayText }) {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, []);

  const keyPress = (e) => {
    if (e.keyCode === audioItem.keyCode) {
      playSound();
    }
  };

  const soundRef = useRef(null);

  const playSound = () => {
    const currentSound = soundRef.current;
    currentSound.currentTime = 0;
    currentSound.volume = volume;
    currentSound.play();
    setDisplayText(audioItem.id);
    setActive(true);
    setTimeout(() => {
      setActive(false);
      currentSound.pause();
    }, 2200);
  };

  return (
    <button
      onClick={playSound}
      className={`drum-pad ${isActive && "active-btn"}`}
      id={audioItem.id}
    >
      <p>{audioItem.keyTrig}</p>
      <audio
        className="clip"
        id={audioItem.keyTrig}
        src={audioItem.src}
        ref={soundRef}
      />
    </button>
  );
}

export default Drum;
