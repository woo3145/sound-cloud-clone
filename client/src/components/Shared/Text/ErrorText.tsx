import React from "react";

interface Props {
  text: string;
  size?: string;
}

const ErrorText = ({ text, size }: Props) => {
  return <p className="text-xs text-red-500">{text}</p>;
};

export default ErrorText;
