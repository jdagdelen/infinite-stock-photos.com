import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
import moment from 'moment';

export default function useGenerate() {
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [promptWeighting, setPromptWeighting] = useState(5);
  const [noOfImages, setNoOfImages] = useState(1);
  const [seed, setSeed] = useState('');
  const [useSeed, setUseSeed] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const shownIndex = useRef(0);
  const index = useRef(0);

  const navigate = useNavigate();

  const { token, isLoggedIn, user } = useAuth();

  const generateImages = async () => {
    if (!isLoggedIn) {
      navigate('/sign-in');
      return;
    }
    if (!!!user.role) {
      navigate('/manage-account');
      return;
    }
    setIsLoading(true);
    const newArray = [...imagesData];
    newArray.push(...Array.from(Array(noOfImages).keys()));

    setImagesData(newArray);
    index.current = 0;
    const generation_session = `${user.id}${moment().valueOf()}`;
    while (index.current < noOfImages) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}/generate_fake`,
          params: {
            prompt: prompt,
            generation_session,
            width,
            height,
            guidance_scale: promptWeighting,
            seed:
              useSeed && seed
                ? seed + shownIndex.current
                : Math.floor(Math.random() * 1000000000),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        newArray[shownIndex.current] = data;
        if (index === noOfImages - 1) setIsLoading(false);
      } catch (e) {}
      shownIndex.current++;
      index.current++;
    }
    setImagesData(newArray);
    setIsLoading(false);
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
