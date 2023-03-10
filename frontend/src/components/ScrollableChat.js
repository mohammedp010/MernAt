import { Avatar } from '@chakra-ui/avatar';
import { Text } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from "../Context/ChatProvider"


const ScrollableChat = ({messages}) => {

    const { user } = ChatState();

  return( <ScrollableFeed>
    {messages && messages.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
            {(
                isSameSender(messages, m, i, user._id)
                || isLastMessage(messages, i, user._id)
            ) && (
                <Tooltip
                    label={m.sender.name}
                    placement="bottom-start"
                    hasArrow
                >
                {/* // <Text>{m.sender.name} */}
                    <Avatar
                        mt="7px"
                        mr={1}
                        size="sm"
                        cursor="pointer"
                        name={m.sender.name}
                        src={m.sender.pic}
                    />
                {/* // </Text> */}
                </Tooltip>
            )}
            <span style={{
                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#89F5D0"}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
            }}>
                {m.content}
            </span>
        </div>
    ))}

  </ScrollableFeed>
  )
};

export default ScrollableChat
