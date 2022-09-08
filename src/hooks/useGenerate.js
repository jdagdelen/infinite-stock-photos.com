import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useCredits from '../hooks/useCredits';

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
  const credits = useCredits().creditsRemaining;

  const navigate = useNavigate();

  const { token, isLoggedIn, user } = useAuth();

  const generateImages = () => {
    if (!isLoggedIn) {
      navigate('/sign-in');
      return;
    }
    if (user.role !== 'premium' && credits < noOfImages) {
      navigate('/manage-account');
      return;
    }
    setIsLoading(true);
    var generation_session =`${user.id}${moment().valueOf()}`;
    for (let i = 0; i <= noOfImages - 1; i++) {
      axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/generate`,
        params: {
          prompt: prompt,
          generation_session: generation_session,
          width,
          height,
          guidance_scale: promptWeighting,
          seed: useSeed && seed ? seed + i : Math.floor(Math.random() * 1000000000),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          setImagesData((prev) => {
            return [...prev, res.data];
          });
          if (i === noOfImages - 1) setIsLoading(false);
        })
        .catch((e) => {setIsLoading(false)});
    }
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
