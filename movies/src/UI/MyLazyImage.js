import React, {useRef} from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const myLazyImage = (props) => {
    const {src, alt, onClick} = props;
    const refPlaceholder = useRef();

    const removePlaceholder = () => {
        refPlaceholder.current.remove();
    };

    return (
        <ImageWrapper>
            <Placeholder ref={refPlaceholder} />
            <LazyLoad>
                <StyledImage
                    onLoad={removePlaceholder}
                    onError={removePlaceholder}
                    src={src}
                    alt={alt}
                    onClick={onClick}
                />
            </LazyLoad>
        </ImageWrapper>
    );
};

export default myLazyImage;