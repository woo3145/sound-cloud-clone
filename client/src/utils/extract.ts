export const extractExtension = (fileName: string): string => {
  const fileExtendtionPos = fileName.lastIndexOf(".");
  if (fileExtendtionPos === -1) {
    throw new Error("파일명이 잘못되었습니다.");
  }
  const fileExtendtion = fileName.substring(fileExtendtionPos);

  return fileExtendtion;
};
