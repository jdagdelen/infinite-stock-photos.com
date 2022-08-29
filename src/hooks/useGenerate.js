import axios from 'axios';
import { useState } from 'react';

export default function useGenerate() {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [promptWeighting, setPromptWeighting] = useState(7);
  const [noOfImages, setNoOfImages] = useState(1);
  const [seed, setSeed] = useState('');
  const [useSeed, setUseSeed] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imagesData, setImagesData] = useState([]);

  const generateImages = () => {
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/generate_fast`,
      params: { prompt: 'Volatile' },
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

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
    message,
    setMessage,
    isLoading,
    isDrawerOpen,
    setIsDrawerOpen,
    generateImages,
    imagesData,
  };
}
