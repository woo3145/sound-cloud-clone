import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import customAxios from "../utils/customAxios";
import { extractExtension } from "../utils/extract";
import { useFetchMe } from "./useFetchMe";

const useTransAndUploadTrack = () => {
  const { user } = useFetchMe();
  const loadable = !!window.SharedArrayBuffer;
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [outputFile, setOutputFile] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const ffmpeg: FFmpeg = useMemo(
    () =>
      createFFmpeg({
        log: true,
        corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
      }),
    []
  );

  const load = async () => {
    await ffmpeg.load();
    ffmpeg.setProgress(({ ratio }: { ratio: number }) => {
      setProgress(ratio * 100);
    });
    setReady(true);
  };

  const onTrackFileChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setInputFile(fileList[0]);
    setFileName(fileList[0].name);
  };

  const transFile = async () => {
    try {
      if (!inputFile) return;

      setProgress(0);
      setMessage("파일을 인코딩 중입니다...");

      const fileExtention = extractExtension(inputFile.name);
      ffmpeg.FS(
        "writeFile",
        `input${fileExtention}`,
        await fetchFile(inputFile)
      );
      await ffmpeg.run(
        "-i",
        `input${fileExtention}`,
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
      setOutputFile(blob);
      setMessage("");
      return;
    } catch (e) {
      console.log(e);
      setProgress(0);
      setDuration(0);
      setInputFile(null);
      setOutputFile(null);
      setMessage("에러가 발생하였습니다.");
    }
  };

  const uploadTrack = async () => {
    try {
      if (!outputFile) {
        throw new Error("업로드할 파일이 존재하지 않습니다.");
      }

      const formData = new FormData();
      const nFile = new File([outputFile], `${user?.username}.mp3`, {
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
    setProgress(0);
    setDuration(0);
    setInputFile(null);
    setOutputFile(null);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!inputFile) {
      return;
    }
    // audio 재생시간 가져오기
    const audio = new Audio(URL.createObjectURL(inputFile));
    audio.onloadedmetadata = (e: Event) => {
      const audioElement: HTMLAudioElement = e.target as HTMLAudioElement;
      setDuration(audioElement.duration);
    };
    // 오디오 변환
    transFile();
    // eslint-disable-next-line
  }, [inputFile]);

  return {
    loadable,
    message,
    ready,
    onTrackFileChangeHandler,
    uploadTrack,
    onCancel,

    inputFile,
    outputFile,
    fileName,
    duration,
    progress,
  };
};

export default useTransAndUploadTrack;
