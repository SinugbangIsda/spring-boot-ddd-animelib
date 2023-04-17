import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import AppLayout from '../../components/applayout';
import { IoIosArrowRoundBack } from "react-icons/all";

const Anime = () => {
  const { animeId } = useParams();
  
  return (
    <AppLayout>
      <section className = "space-y-4">
        <div className = "flex flex-row justify-start items-center">
          <IoIosArrowRoundBack className = "text-white text-2xl hover:cursor-pointer" />
          <Link 
            to = "/"
          >
            <p className = "text-white text-xl font-bold hover:cursor-pointer hover:underline select-none">
              Back
            </p>
          </Link>
        </div>
        <div className = "flex flex-row justify-start items-start space-x-8">
          <div className = "space-y-2">
            <img 
              src = "https://upload.wikimedia.org/wikipedia/en/c/ce/Yawaramanga.jpg"
              className = "w-44 h-48 aspect-square select-none"
            />
            <button className = "w-full text-white bg-[#E6613E] hover:bg-[#d44f2e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 select-none">
              Add to Watchlist
            </button>
          </div>
          <div className = "space-y-1">
            <p className = "text-white font-bold text-2xl">
              Anime Title
            </p>
            <p className = "text-white text-lg">
              Alt Title
            </p>
            <div className = "flex flex-row justify-start items-start space-x-2">
              <p className = "text-white text-lg">
                Type: 
              </p>
              <p className = "text-white text-lg">
                Type
              </p>
            </div>
            <div className = "flex flex-row justify-start items-start space-x-2">
              <p className = "text-white text-lg">
                Episodes: 
              </p>
              <p className = "text-white text-lg">
                Episodes
              </p>
            </div>
            <div className = "flex flex-row justify-start items-start space-x-2">
              <p className = "text-white text-lg">
                Genres: 
              </p>
              <p className = "text-white text-lg">
                Genres
              </p>
            </div>
            <div className = "flex flex-row justify-start items-start space-x-2">
              <p className = "text-white text-lg">
                Status: 
              </p>
              <p className = "text-white text-lg">
                Status
              </p>
            </div>
          </div>
        </div>
        <div className = "space-y-2">
          <p className = "text-white text-lg">
            Synopsis
          </p>
          <p className = "text-white text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque, sapien ac varius pretium, ipsum ligula luctus eros, quis congue nulla risus faucibus lectus. Aliquam et porttitor turpis, vel laoreet ipsum. Morbi vitae justo faucibus, dictum orci a, consequat orci. Phasellus dolor eros, accumsan eu sem at, facilisis pulvinar mauris. Duis ac arcu eget ligula scelerisque hendrerit eget ac nunc. Nullam vel lacus nec enim mollis tempor in sit amet magna. Donec tempor elementum feugiat. Cras imperdiet blandit magna, ac ultrices enim. Vestibulum facilisis enim sit amet sapien varius, non rutrum orci varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin orci eget lobortis sagittis. Praesent a congue turpis, non venenatis ante.
          </p>
        </div>
      </section>
    </AppLayout>
  )
}

export default Anime;
