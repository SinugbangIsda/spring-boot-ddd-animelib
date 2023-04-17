import React from 'react';
import { Anime } from '../../interfaces';

const AnimeCard = ({ 
    animeId, 
    title, 
    coverImageUri 
  }: Anime ) => {
  return (
    <div className = "flex flex-col items-center space-y-2">
      <img 
        src = { coverImageUri }
        alt = { title }
        className = "w-[250px] h-[300px] aspect-square"
      />
      <p className = "text-white font-medium">
        { title }
      </p>
    </div>
  )
}

export default AnimeCard;
