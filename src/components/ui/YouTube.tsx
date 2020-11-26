import { AspectRatio, AspectRatioProps } from "@chakra-ui/react";
import React, { FC } from "react";

interface Props extends AspectRatioProps {
  videoUrl: string;
}

const YouTube: FC<Props> = ({ videoUrl, ...rest }) => {
  if (!videoUrl) return null;
  const embedId = new URL(videoUrl).searchParams.get("v");

  return (
    <AspectRatio maxW="560px" ratio={1.6} width="100%" my={4} {...rest}>
      <iframe
        style={{ border: "5px solid black" }}
        title="Youtube video"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
};

export default YouTube;
