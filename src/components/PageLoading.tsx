import { Progress } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";

const PageLoading: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        timer = setTimeout(() => {
          setLoading(true);
        }, 500);
      }
    };

    const handleComplete = (url: string) => {
      if (timer) clearTimeout(timer);
      if (url === router.asPath) setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      clearTimeout(timer);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  if (loading) return <Progress size="xs" bg="white" isIndeterminate />;

  return null;

  return <Progress size="xs" bg="white" value={0} />;
};

export default PageLoading;
