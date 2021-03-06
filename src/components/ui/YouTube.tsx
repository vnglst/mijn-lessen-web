import { AspectRatio, AspectRatioProps } from "@chakra-ui/react";

interface Props extends AspectRatioProps {
  videoUrl: string | null;
}

const YouTube = ({ videoUrl, ...rest }: Props): JSX.Element | null => {
  if (!videoUrl) return null;
  const embedId = new URL(videoUrl).searchParams.get("v");

  return (
    <AspectRatio ratio={1.6} width="100%" my={4} {...rest}>
      <iframe
        style={{ border: "5px solid black" }}
        title="Youtube-video"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
};

export default YouTube;
