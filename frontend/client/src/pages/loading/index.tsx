import React from 'react';
import { CubeSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <section className = "min-h-screen bg-[#22272E]">
      <div className = "flex justify-center items-center h-screen">
        <CubeSpinner size = { 30 } color = "#E6613E" loading />
      </div>
    </section>
  )
}

export default Loading;
