import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';

export default function useGenerate() {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [promptWeighting, setPromptWeighting] = useState(7);
  const [noOfImages, setNoOfImages] = useState(1);
  const [seed, setSeed] = useState('');
  const [useSeed, setUseSeed] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imagesData, setImagesData] = useState([]);

  const navigate = useNavigate();

  const { token, isLoggedIn } = useAuth();

  const generateImages = () => {
    if (!isLoggedIn) navigate('/sign-in');
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/generate_fast`,
      params: {
        prompt: 'Picture',
        width,
        height,
        prompt_weight: promptWeighting,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setIsLoading(false);
        setImagesData((prev) => {
          return [...prev, ...res.data.image_urls];
        });
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
    prompt,
    setPrompt,
    isLoading,
    isDrawerOpen,
    setIsDrawerOpen,
    generateImages,
    imagesData,
  };
}
