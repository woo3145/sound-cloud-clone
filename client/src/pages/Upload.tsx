import React from "react";
import TrackFileChooser from "../components/Features/Upload/TrackFileChooser";
import TrackFileTransProgress from "../components/Features/Upload/TrackFileTransProgress";
import TrackUploadForm from "../components/Features/Form/TrackUploadForm/TrackUploadForm";
import useTransAndUploadTrack from "../hooks/useTransAndUploadTrack";

function Upload() {
  const {
    loadable,
    ready,
    message,
    onTrackFileChangeHandler,
    onCancel,
    uploadTrack,

    inputFile,
    outputFile,
    fileName,
    duration,
    progress,
  } = useTransAndUploadTrack();

  if (!loadable) {
    return <div>지원하지 않는 브라우저입니다.</div>;
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center py-28">
      <div className="w-full max-w-3xl border h-auto relative">
        <div className="flex flex-col items-center py-10 px-12">
          {!inputFile && (
            <TrackFileChooser onChangeHandler={onTrackFileChangeHandler} />
          )}
          {inputFile && !outputFile && (
            <TrackFileTransProgress progress={progress} />
          )}
          {message && <div className="mx-auto mt-2">{message}</div>}
          {outputFile && (
            <TrackUploadForm
              onCancel={onCancel}
              fileName={fileName}
              upload={uploadTrack}
              duration={duration}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
