import React, { useState, useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from '../config/ChatLogics'
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      padding={3}
      bg="white"
      height="100%"
      width={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      bgColor="#ECE5DD"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        bgColor="#ECE5DD"
      >
        My Chats
        <GroupChatModal>

          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            colorScheme='whatsapp'
          >
            New Group Chat
          </Button>
        </GroupChatModal>

      </Box>

      <Box
        display="flex"
        flexDir="column"
        padding={3}
        bg="#F8F8F8"
        width="100%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
        bgColor="#128C7E"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#25D366" : "#DCF8C6"}
                color={selectedChat === chat ? "black" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat ? (
                    getSender(loggedUser, chat.users)

                  ) : (chat.chatName)}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                  </Text>
                  )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats
