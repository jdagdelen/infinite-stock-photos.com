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

  const { token, isLoggedIn, user } = useAuth();

  function UrlExists(url) {
    const response = fetch(
      `${process.env.REACT_APP_API_URL}/check_image?image=` + url
    )
      .then((response) => response.json())
      .catch((e) => console.log(e));
    return response;
  }

  async function waitForIt(url) {
    while (!(await UrlExists(url))) {
      await new Promise((r) => setTimeout(r, 10000));
    }
    setImagesData((prev) => {
      return [...prev, url];
    });
    setIsLoading(false);
    return url;
  }

  const generateImages = () => {
    if (!isLoggedIn) navigate('/sign-in');
    if (!!!user.role) navigate('/manage-account');
    setIsLoading(true);
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}/generate_fast`,
      params: {
        prompt: prompt,
        width,
        height,
        prompt_weight: promptWeighting,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        res.data.image_urls.forEach(async (i) => await waitForIt(i));
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
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
