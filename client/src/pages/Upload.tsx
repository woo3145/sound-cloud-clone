import React, { ChangeEvent, useEffect, useState } from "react";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

function Upload() {
  const loaded = !!window.SharedArrayBuffer;
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const load = async () => {
    if (ready) {
      return;
    }
    await ffmpeg.load();
    setReady(true);
  };

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    if (fileList[0].type !== "mp3") {
      setFile(fileList[0]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="w-full flex justify-center py-28">
      <div className="w-full max-w-3xl border h-auto relative">
        <progress
          className="progress progress-primary w-full top-0 absolute"
          value="20"
          max="100"
        ></progress>
        <div className="flex flex-col items-center">
          <div className="py-20 flex flex-col items-center">
            <p className="text-xl pb-4">음원파일을 선택해주세요.</p>
            <input
              type="file"
              className="hidden"
              id="fileUpload"
              accept="audio/*"
              onChange={onChangeHandler}
            />
            <label
              htmlFor="fileUpload"
              className="btn btn-primary w-40 normal-case"
            >
              파일선택
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
