import { React, useEffect } from 'react';
import { Container, Box, Text, Tab, TabList, TabPanel,TabPanels, Tabs } from "@chakra-ui/react";
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useHistory } from "react-router";
// import { createBrowserHistory } from 'history';

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push('/chats');
    }
  }, [history]);

  return <Container maxW='xl' centerContent>
    <Box 
    display='flex'
    justifyContent="center"
    p={3}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="lg"
    borderWidth="1px"
      bgColor="#ECE5DD"
    >
      <Text fontSize="4xl" fontFamily="Work sans" justifyContent="center" color="black">MERNAT</Text>
    </Box>
    
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded'>
        <TabList mb="1em">
          <Tab width="50%">Login</Tab>
          <Tab width="50%">Sign-up</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>

          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>

      </Tabs>
    </Box>
  </Container>;
} 

export default HomePage
