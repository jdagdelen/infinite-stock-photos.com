//------ Path ------ //
//------  /search   ------ //
//------------------ //

import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';

import SearchTab from '../Components/Tabs/SearchTab';

const Search = () => {
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <TabContext value={tabValue}>
        <TabList
          variant='fullWidth'
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
        >
          <Tab label='Search' value='1' />
          {/* <Tab label='My Favorites' value='2' /> */}
        </TabList>
        <TabPanel value='1'>
          <SearchTab />
        </TabPanel>
        {/* <TabPanel value='2'>
          <FavoritesTab />
        </TabPanel> */}
      </TabContext>
    </>
  );
};

export default Search;
