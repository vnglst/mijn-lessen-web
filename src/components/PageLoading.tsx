import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";

const PageLoading: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleStart = (url: string) => {
      if (url !== router.asPath && !timer) {
        timer = setTimeout(() => {
          setLoading(true);
        }, 500);
      }
    };

    const handleComplete = (url: string) => {
      clearTimeout(timer);
      if (url === router.asPath) setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      clearTimeout(timer);
    };
  });

  if (loading)
    return (
      <Progress
        position="absolute"
        zIndex={10}
        size="xs"
        bg="white"
        isIndeterminate
        width="100%"
      />
    );

  return null;
};

export default PageLoading;
