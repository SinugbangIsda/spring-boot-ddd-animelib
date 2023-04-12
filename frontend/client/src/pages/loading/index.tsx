import React from 'react';
import { CubeSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <section className = "min-h-screen bg-[#22272E]">
      <div className = "flex justify-center items-center h-screen">
        <CubeSpinner size = { 30 } frontColor = "#E6613E" backColor = "#b95238" loading />
      </div>
    </section>
  )
}

export default Loading;
