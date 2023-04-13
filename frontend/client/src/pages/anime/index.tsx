import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Anime = () => {
  const { animeId } = useParams();
  const [ gege, setGege ] = useState<string | undefined>(undefined);
  
  const fetchhData = async () => {
    setGege(animeId);
  }

  useEffect(() => {
    fetchhData();
  }, [ fetchhData ])

  return (
    <div>
      { gege }
    </div>
  )
}

export default Anime;
