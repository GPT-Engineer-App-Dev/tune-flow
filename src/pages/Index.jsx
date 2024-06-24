import React, { useState } from 'react';
import { Box, Container, VStack, HStack, Text, Input, Button, Image, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from "react-icons/fa";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Box bg="gray.100" minHeight="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Flex align="center">
            <Text fontSize="3xl" fontWeight="bold">MusicStream</Text>
            <Spacer />
            <Input placeholder="Search for songs, artists, or albums" width="300px" mr={4} />
            <Button colorScheme="blue">Search</Button>
          </Flex>

          {/* Main Content */}
          <Flex>
            {/* Playlist */}
            <Box width="30%" bg="white" p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" fontWeight="bold" mb={4}>Your Playlist</Text>
              <VStack align="stretch" spacing={2}>
                {['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5'].map((song, index) => (
                  <HStack key={index} p={2} _hover={{ bg: "gray.100" }} cursor="pointer">
                    <Text>{song}</Text>
                    <Spacer />
                    <Text color="gray.500">3:30</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            {/* Now Playing */}
            <Box width="70%" bg="white" p={4} borderRadius="md" boxShadow="md" ml={8}>
              <VStack spacing={4} align="center">
                <Image
                  borderRadius="full"
                  boxSize="200px"
                  src="https://via.placeholder.com/200"
                  alt="Album Cover"
                />
                <Text fontSize="2xl" fontWeight="bold">Currently Playing Song</Text>
                <Text fontSize="lg" color="gray.500">Artist Name</Text>
                <HStack spacing={4}>
                  <IconButton icon={<FaStepBackward />} aria-label="Previous song" />
                  <IconButton
                    icon={isPlaying ? <FaPause /> : <FaPlay />}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    onClick={togglePlay}
                    colorScheme="blue"
                    size="lg"
                  />
                  <IconButton icon={<FaStepForward />} aria-label="Next song" />
                </HStack>
                <HStack width="100%" spacing={4}>
                  <FaVolumeUp />
                  <Box width="100%" bg="gray.200" height="4px" borderRadius="full">
                    <Box width="30%" bg="blue.500" height="100%" borderRadius="full" />
                  </Box>
                </HStack>
              </VStack>
            </Box>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;