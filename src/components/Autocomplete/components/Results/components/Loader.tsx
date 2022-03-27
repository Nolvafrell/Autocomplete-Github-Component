import { Lottie, ReactLottieConfig } from "@crello/react-lottie";
import { AnimationItem } from "lottie-web";
import { FC, useRef } from "react";
import loaderAnimation from "../../../assets/loader.json";
import { StyledLoaderWrapper } from "./StyledLoaderWrapper";

export const Loader: FC = () => {
  const animRef = useRef<AnimationItem>({} as AnimationItem);
  const defaultOptions: ReactLottieConfig = {
    animationData: loaderAnimation,
    loop: true,
    autoplay: false,
  };
  return (
    <StyledLoaderWrapper>
      <Lottie
        animationRef={animRef}
        config={defaultOptions}
        height={"40px"}
        width={"40px"}
      />
      LOADING
    </StyledLoaderWrapper>
  );
};
