//------ Path ------ //
//------  /   ------ //
//------------------ //

import { useState, useEffect } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import FeedTab from '../Components/Tabs/FeedTab';
import MyGenerations from '../Components/Tabs/MyGenerations';
import useAuth from '../hooks/useAuth';

const Feed = () => {
  const [tabValue, setTabValue] = useState('1');
  const { isLoggedIn } = useAuth();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    document.title = 'Feed';
  }, []);

  return (
    <TabContext value={tabValue}>
      <TabList
        variant='fullWidth'
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'
      >
        <Tab label='Feed' value='1' />
        <Tab label='My Generations' value='2' disabled={!isLoggedIn} />
      </TabList>
      <TabPanel value='1'>
        <FeedTab />
      </TabPanel>
      <TabPanel value='2'>
        <MyGenerations />
      </TabPanel>
    </TabContext>
  );
};

export default Feed;
