import { useState } from 'react';

export default function useGenerate() {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [promptWeighting, setPromptWeighting] = useState(7);
  const [noOfImages, setNoOfImages] = useState(6);
  const [seed, setSeed] = useState('');
  const [useSeed, setUseSeed] = useState(false);

  return {
    width,
    setWidth,
    height,
    setHeight,
    promptWeighting,
    setPromptWeighting,
    noOfImages,
    setNoOfImages,
    seed,
    setSeed,
    useSeed,
    setUseSeed,
  };
}
