import React from 'react';
import { Anime } from '../../../interfaces';
import { Flex, Image, Text } from '@chakra-ui/react';

const AnimeCard = ({ 
    id, 
    title, 
    imageURI
  }: Anime ) => {
  return (
    <Flex
      direction = "column"
      align = "center"
      justify = "center"
    >
      <Image 
        src = { imageURI }
        alt = { title }
        objectFit = "fill"
        w = "11rem"
        h = "15rem"
      />
      <Text
        color = "white"
        fontSize = "md"
        as = "b"
        textAlign = "center"
        w = "11rem"
        my = { 1 }
      >
        { title } 
      </Text>
    </Flex>
  )
}

export default AnimeCard;
