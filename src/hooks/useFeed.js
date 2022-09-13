import { useContext } from 'react';

import FeedContext from '../contexts/FeedContext';

export default function useFeed() {
  const context = useContext(FeedContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
