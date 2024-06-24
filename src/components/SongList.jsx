import React from 'react';
import { Box, VStack, HStack, Text, IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

const SongList = ({ songs, onPlaySong }) => {
  return (
    <Box>
      <VStack align="stretch" spacing={2}>
        {songs.map((song, index) => (
          <HStack key={index} justify="space-between" p={2} bg="gray.100" borderRadius="md">
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{song.title}</Text>
              <Text fontSize="sm" color="gray.600">{song.artist}</Text>
            </VStack>
            <IconButton
              icon={<FaPlay />}
              aria-label={`Play ${song.title}`}
              onClick={() => onPlaySong(song)}
              size="sm"
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default SongList;