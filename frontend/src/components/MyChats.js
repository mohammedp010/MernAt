import React, { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, Stack, Text } from "@chakra-ui/layout";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
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

  const deleteChat = async (chatId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.delete("api/chat/", {
        ...config,
        data: { chatId },
      });

      if (response.status === 200) {
        setChats((prevChats) =>
          prevChats.filter((chat) => chat._id !== chatId)
        );
        onClose();
        toast({
          title: "Deleted!",
          description: "Chat deleted successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    } catch (error) {
      console.error("Error deleting chat:", error);

      toast({
        title: "Error Occurred",
        description: "Failed to delete the chat",
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
    // eslint-disable-next-line
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
      bgColor="#C9D1D5"
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
        bgColor="#C9D1D5"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            // colorScheme="whatsapp"
            bgColor="#55C2C3"
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
        bgColor="#C9D1D5"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                position="relative"
                borderRadius="lg"
                bg={
                  selectedChat === chat
                    ? "#0C243C"
                    : // : chat.isGroupChat
                      // ? "#83be57"
                      "#55C2C3"
                }
                color={selectedChat === chat ? "white" : "#465255"}
                px={3}
                py={2}
                transition="background-color 0.3s ease, color 0.3s ease"
                opacity={chats.includes(chat) ? 1 : 0}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  {!chat.isGroupChat && (
                    <Tooltip placement="bottom-start" hasArrow display="flex">
                      <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={getSender(loggedUser, chat.users)}
                        src={chat.users[1].pic}
                      />
                    </Tooltip>
                  )}
                  <Menu isLazy placement="left-end">
                    <MenuButton
                      as={Box}
                      position="absolute"
                      right="5px"
                      top="5px"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Image
                        src={
                          selectedChat === chat ? "dotswhite.png" : "dots.png"
                        }
                        h="4"
                        w="4"
                      />
                    </MenuButton>
                    <MenuList>
                      <MenuItem color="black" onClick={onOpen}>
                        Delete Chat
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          Delete Chat
                        </AlertDialogHeader>

                        <AlertDialogBody>
                          Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                          </Button>
                          <Button
                            colorScheme="red"
                            onClick={() => deleteChat(chat._id)}
                            ml={3}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialogOverlay>
                  </AlertDialog>
                  <Text mt={!chat.isGroupChat && "2.5"}>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.isGroupChat && (
                    <Image
                      position="absolute"
                      right="6"
                      mt="1"
                      src="groupchatlogo.png"
                      h="4"
                      w="4"
                    />
                  )}
                </div>
                {chat.latestMessage && (
                  <Text fontSize="xs" mt="2">
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

export default MyChats;
