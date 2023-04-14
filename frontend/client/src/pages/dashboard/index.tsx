import React, { 
  useContext,
  useState
} from 'react'
import AppLayout from '../../components/applayout';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/global';
import AnimeCard from '../../components/animecard';
import { AnimeList } from '../../interfaces';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

const DUMMY_DATA = [
  {
    animeId: "1",
    title: "One Piece",
    animeType: "TV",
    coverImageUri: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/28cfcb04-4005-4a10-8051-bf7232b0adb1/d5z2zrr-e7e3e6ac-ff4e-40fa-82ee-3b83aa73d7c6.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI4Y2ZjYjA0LTQwMDUtNGExMC04MDUxLWJmNzIzMmIwYWRiMVwvZDV6Mnpyci1lN2UzZTZhYy1mZjRlLTQwZmEtODJlZS0zYjgzYWE3M2Q3YzYuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VUknMN84J2v8_BDZnGKwoy8QTDusj4KGGZesAl0nxhs"
  },
  {
    animeId: "2",
    title: "Naruto Shippuden",
    animeType: "TV",
    coverImageUri: "https://m.media-amazon.com/images/M/MV5BZGFiMWFhNDAtMzUyZS00NmQ2LTljNDYtMmZjNTc5MDUxMzViXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
  }
]
const Dashboard = () => {
  const [ opened, { open, close }] = useDisclosure(false);
  return (
    <AppLayout>
      <section className = "space-y-4">
        <div className = "flex flex-row justify-between items-center">
          <input 
            className = "w-1/3 p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
            type = "text"
            placeholder = "Search Anime"
          />
        </div>
        <div className = "flex flex-row justify-start items-center space-x-10">
          { DUMMY_DATA.map((anime: AnimeList) => (
            <Link 
              key = { anime.animeId }
              to = { `/anime/${anime.animeId}` }
            >
              <AnimeCard 
                animeId = { anime.animeId }
                title = { anime.title }
                animeType = { anime.animeType }
                coverImageUri = { anime.coverImageUri }
              />
            </Link>
          ))}
        </div>
      </section>
      <Modal 
        opened = { opened } 
        onClose = { close }
        title = "Add Anime"
        centered
        styles={{
          header :{
            backgroundColor: '#373E47',
            color: '#fff'
          },
          body: {
            backgroundColor: '#373E47',
            color: '#fff'
          },
        }}
                    
      >
        asdas
      </Modal>
    </AppLayout>
  )
}

export default Dashboard;
