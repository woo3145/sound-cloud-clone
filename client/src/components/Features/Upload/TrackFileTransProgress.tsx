import React from "react";

interface Props {
  progress: number;
}

const TrackFileTransProgress = ({ progress }: Props) => {
  return (
    <div
      className="radial-progress text-primary"
      style={{ "--value": progress } as any}
    >
      {Math.floor(progress)}%
    </div>
  );
};

export default TrackFileTransProgress;
