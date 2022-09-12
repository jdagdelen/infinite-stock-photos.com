//------ Path ------ //
//------  /   ------ //
//------------------ //

import { useState, useEffect } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import FeedTab from '../Components/Tabs/FeedTab';
import useFeed from '../hooks/useFeed';
import MyGenerations from '../Components/Tabs/MyGenerations';
import useAuth from '../hooks/useAuth';

const Feed = () => {
  const [tabValue, setTabValue] = useState('1');
  const [pageNo, setPageNo] = useState(1);
  const [myCPageNo, setMyCPageNo] = useState(1);
  const { isLoggedIn } = useAuth();
  const { feedLoading, imagesData, creationLoading, myCreationsData } = useFeed(
    pageNo,
    myCPageNo
  );

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
        <FeedTab
          imagesData={imagesData}
          isLoading={feedLoading}
          setPageNo={setPageNo}
        />
      </TabPanel>
      <TabPanel value='2'>
        <MyGenerations
          setMyCPageNo={setMyCPageNo}
          isLoading={creationLoading}
          imagesData={myCreationsData}
        />
      </TabPanel>
    </TabContext>
  );
};

export default Feed;
