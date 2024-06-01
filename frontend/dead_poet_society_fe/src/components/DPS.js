import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DPS(props) {

  const navigate = useNavigate();

  const Shabdarth = () => {
    navigate('/Shabdarth');
    document.body.classList.remove('overflow-hidden');
  }

  const Shabdkosh = () => {
    navigate('/Shabdkosh');

    document.body.classList.remove('overflow-hidden');
  }

  const cart = () => {
    navigate('/Cart');

    document.body.classList.remove('overflow-hidden');
  }


  const About = () => {
    navigate('/Aboutus');

    document.body.classList.remove('overflow-hidden');
  }

  return (

    <div className=' justify-between flex flex-col  items-center backdrop-blur-lg top-1 fixed  z-10 h-screen w-screen'>

      <div className='flex  justify-between w-screen'  >

        <img src="https://tse4.mm.bing.net/th?id=OIP.LsXAl9LbjS19uVppSknGBwHaHa&pid=Api&P=0&h=180" className='logo rounded-full border  border-white h-12 w-12 ml-4 mt-4' />

        <img src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-flat-x-cross-mark-button-in-red-color-and-white-line-png-image_7900019.png" alt="" onClick={props.dead} className='h-12 w-12 m-5 rounded-full cursor-pointer   ' />


      </div>

      <div className='space-y-8'>

        <div onClick={props.mody} className=" bg-yellow-100 w-screen border border-yellow-700  h-10 text-center hover:font-bold hover:text-yellow-800 transition-transform hover:scale-125 hover:cursor-pointer duration-200 hover:bg-yellow-200">
          <button className='mt-2'>Home</button>
        </div>

        <div onClick={Shabdarth} className=" bg-yellow-100 w-screen border border-yellow-700  h-10 text-center hover:font-bold hover:text-yellow-800 transition-transform hover:scale-125 hover:cursor-pointer duration-200 hover:bg-yellow-200">
          <button className='mt-2'>Shabdarth</button>
        </div>

        <div onClick={Shabdkosh} className=" bg-yellow-100 w-screen border border-yellow-700  h-10 text-center hover:font-bold hover:text-yellow-800 transition-transform hover:scale-125 hover:cursor-pointer duration-200 hover:bg-yellow-200">
          <button className='mt-2'>Shabdkosh</button>
        </div>

        <div onClick={cart} className=" bg-yellow-100 w-screen border border-yellow-700  h-10 text-center hover:font-bold hover:text-yellow-800 transition-transform hover:scale-125 hover:cursor-pointer duration-200 hover:bg-yellow-200">
          <button className='mt-2'>My Cart</button>
        </div>

        <div onClick={About} className=" bg-yellow-100 w-screen border border-yellow-700  h-10 text-center hover:font-bold hover:text-yellow-800 transition-transform hover:scale-125 hover:cursor-pointer duration-200 hover:bg-yellow-200">
          <button className='mt-2'>About Us </button>
        </div>

      </div>


      <div style={{ transform: 'translateZ(10px)' }} className='text-7xl mb-5 font-bold text-white font-mono animate-pulse'>Dead Poet Society Welcomes You</div>

    </div>
  );
}
