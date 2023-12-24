import { React, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useHistory } from "react-router";
import { OwnerModal } from "../components/ownerModal/ownerModal";
// import { createBrowserHistory } from 'history';

const HomePage = () => {
  const history = useHistory();
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <>
      <Container maxW="xl" mr={!isMobile ? "10" : ""} mt="14" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          bgColor="#ECE5DD"
        >
          <Text
            fontSize="4xl"
            fontFamily="Work sans"
            justifyContent="center"
            color="black"
          >
            MERNAT
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded">
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
        {isMobile && <Text mt="60" mr="20" ml="3" color="#F0F3F4" whiteSpace="nowrap" fontSize="12">
          Designed and Developed by{" "}
          <Link color="#FFF" textDecoration="underline" href="https://linktr.ee/mohammed_sd">
            Mohammed Patrawala
          </Link>
        </Text>}
      </Container>
        {!isMobile && <Text mt="4" mb="0" mr="10" color="#F0F3F4">
          Designed and Developed by{" "}
          <Link color="#FFF" textDecoration="underline" href="https://linktr.ee/mohammed_sd">
            Mohammed Patrawala
          </Link>
        </Text>}
    </>
  );
};

export default HomePage;
