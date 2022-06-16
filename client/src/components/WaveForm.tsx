import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveForm = ({ sound_id }: { sound_id: number }) => {
  const wavesurfer = useRef<null | WaveSurfer>(null);
  const trackUrl = "audio/cw-blues.mp3";
  useEffect(() => {
    if (wavesurfer.current) {
      return;
    }
    wavesurfer.current = WaveSurfer.create({
      container: `#waveform-${sound_id}`,
      barWidth: 3,
      barRadius: 3,
      cursorWidth: 1,
      height: 100,
      barGap: 3,
    });
    wavesurfer.current.load(trackUrl);
  }, [sound_id]);
  const playToggle = () => {
    if (wavesurfer.current) {
      wavesurfer.current.isPlaying()
        ? wavesurfer.current.pause()
        : wavesurfer.current.play();
    }
  };
  return (
    <div className="w-full">
      <div id={`waveform-${sound_id}`} className="w-full"></div>
      <button onClick={playToggle}>Play</button>
    </div>
  );
};

export default WaveForm;
