import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, VStack, HStack, Text, Input, Button, Image, IconButton, Flex, Spacer, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp } from "react-icons/fa";
import SongList from '../components/SongList';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState(['Your Playlist']);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songs, setSongs] = useState([
    { id: 1, title: "Song 1", artist: "Artist 1", url: "https://example.com/song1.mp3" },
    { id: 2, title: "Song 2", artist: "Artist 2", url: "https://example.com/song2.mp3" },
    { id: 3, title: "Song 3", artist: "Artist 3", url: "https://example.com/song3.mp3" },
  ]);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  const createPlaylist = () => {
    if (newPlaylistName.trim() !== '') {
      setPlaylists([...playlists, newPlaylistName]);
      setNewPlaylistName('');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = song.url;
      audioRef.current.play();
    }
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
              <Text fontSize="xl" fontWeight="bold" mb={4}>Playlists</Text>
              <Box mb={4}>
                <HStack>
                  <Input
                    placeholder="New playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <Button colorScheme="blue" onClick={createPlaylist}>Create Playlist</Button>
                </HStack>
              </Box>
              <VStack align="stretch" spacing={2}>
                {playlists.map((playlist, index) => (
                  <Text key={index} fontWeight={index === 0 ? "bold" : "normal"}>{playlist}</Text>
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
                <Text fontSize="2xl" fontWeight="bold">{currentSong?.title || "No song selected"}</Text>
                <Text fontSize="lg" color="gray.500">{currentSong?.artist || "Select a song to play"}</Text>
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
                  <Text>{formatTime(currentTime)}</Text>
                  <Slider value={currentTime} min={0} max={duration} step={1} onChange={handleSeek}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Text>{formatTime(duration)}</Text>
                </HStack>
                <HStack width="100%" spacing={4}>
                  <FaVolumeUp />
                  <Slider defaultValue={30} min={0} max={100} step={1} onChange={(value) => {
                    if (audioRef.current) {
                      audioRef.current.volume = value / 100;
                    }
                  }}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </HStack>
                <Box mt={4} width="100%">
                  <Text fontSize="xl" fontWeight="bold" mb={2}>Song List</Text>
                  <SongList songs={songs} onPlaySong={playSong} />
                </Box>
              </VStack>
            </Box>
          </Flex>
        </VStack>
      </Container>
      <audio ref={audioRef} src={currentSong?.url} />
    </Box>
  );
};

export default Index;