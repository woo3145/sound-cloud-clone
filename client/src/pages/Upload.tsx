import React, { ChangeEvent, useEffect, useState } from "react";
import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setUploadProgress } from "../redux/reducers/progressSlice";
import UploadChooser from "../components/Upload/UploadChooser";
import UploadProgressBar from "../components/Upload/UploadProgressBar";
import UploadForm from "../components/Form/UploadForm";
import customAxios from "../utils/customAxios";
import { useMe } from "../hooks/useMe";

const ffmpeg: FFmpeg = createFFmpeg({
  log: true,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});

function Upload() {
  const { user } = useMe();
  const loadable = !!window.SharedArrayBuffer;
  const dispatch = useAppDispatch();
  const progress = useAppSelector((state) => state.progress.uploadProgress);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isEncoding, setIsEncoding] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [encodedFile, setEncodedFile] = useState<File | null>(null);

  const load = async () => {
    await ffmpeg.load();
    ffmpeg.setProgress(({ ratio }: { ratio: number }) => {
      dispatch(setUploadProgress(ratio * 100));
    });
    setReady(true);
  };

  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
  };

  const transFile = async () => {
    try {
      if (!file) return;
      dispatch(setUploadProgress(0));
      setIsEncoding(true);
      setMessage("파일을 인코딩 중입니다...");
      const fileExtendtionPos = file.name.lastIndexOf(".");
      const fileExtendtion = file.name.substring(fileExtendtionPos);
      ffmpeg.FS("writeFile", `input${fileExtendtion}`, await fetchFile(file));
      await ffmpeg.run(
        "-i",
        `input${fileExtendtion}`,
        "-y",
        "-vn",
        "-ar",
        "44100",
        "-ac",
        "2",
        "-b:a",
        "192k",
        "output.mp3"
      );
      const data = ffmpeg.FS("readFile", "output.mp3");
      const blob = new Blob([data.buffer], {
        type: "audio/mp3",
      });
      const newFile = new File([blob], `${user?.username}.mp3`, {
        type: "audio/mp3",
      });
      setEncodedFile(newFile);
    } catch (e) {
      console.log(e);
      setIsEncoding(false);
      dispatch(setUploadProgress(0));
      setDuration(0);
      setFile(null);
      setEncodedFile(null);
      setMessage("에러가 발생하였습니다.");
    }
  };

  const upload = async () => {
    try {
      if (!encodedFile) {
        throw new Error("업로드할 파일이 존재하지 않습니다.");
      }
      if (!file) return;

      const formData = new FormData();
      const blob = new Blob([encodedFile], { type: "audio/mp3" });
      const nFile = new File([blob], encodedFile.name, {
        type: "audio/mp3",
      });
      formData.append("file", nFile);

      const res = await customAxios.post("/uploads/audio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.ok) {
        return res.data.url;
      } else {
        throw new Error(res.data.error);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const onCancel = () => {
    setIsEncoding(false);
    dispatch(setUploadProgress(0));
    setDuration(0);
    setFile(null);
    setEncodedFile(null);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }
    // audio 재생시간 가져오기
    const audio = new Audio(URL.createObjectURL(file));
    audio.onloadedmetadata = (e: Event) => {
      const audioElement: HTMLAudioElement = e.target as HTMLAudioElement;
      setDuration(audioElement.duration);
    };
    // 오디오 변환
    transFile();
  }, [file]);

  useEffect(() => {
    if (!encodedFile) return;
    setIsEncoding(false);
    setMessage("");
  }, [encodedFile]);

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
          {!file && (
            <UploadChooser
              onChangeHandler={onChangeHandler}
              isLoading={isEncoding}
            />
          )}
          {isEncoding && <UploadProgressBar progress={progress} />}
          {message && <div className="mx-auto mt-2">{message}</div>}
          {encodedFile && file && (
            <UploadForm
              onCancel={onCancel}
              fileName={file.name}
              upload={upload}
              duration={duration}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;
