//------ Path ------ //
//------  /   ------ //
//------------------ //

import { useState } from 'react';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import FeedTab from '../Components/Tabs/FeedTab';
import useFeed from '../hooks/useFeed';

const Feed = () => {
  const [tabValue, setTabValue] = useState('1');
  const [pageNo, setPageNo] = useState(1);
  const { isLoading, imagesData } = useFeed(pageNo);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <TabContext value={tabValue}>
      <TabList
        variant='fullWidth'
        onChange={handleChange}
        textColor='secondary'
        indicatorColor='secondary'
      >
        <Tab label='Feed' value='1' />
        <Tab label='My Generations' value='2' />
      </TabList>
      <TabPanel value='1'>
        <FeedTab
          imagesData={imagesData}
          isLoading={isLoading}
          setPageNo={setPageNo}
        />
      </TabPanel>
      <TabPanel value='2'>
        <FeedTab
          imagesData={imagesData}
          isLoading={isLoading}
          setPageNo={setPageNo}
        />
      </TabPanel>
    </TabContext>
  );
};

export default Feed;
