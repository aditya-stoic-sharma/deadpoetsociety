import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import PoetryContext from '../Context/poetry/PoetryContext';


export default function Shabdarth() {

  const Navigate = useNavigate();
  const back = () => {
    Navigate("/Homepage")
  }


  const context = useContext(PoetryContext);
  const { getPoems, poem, addPoem } = context;

  const kosh = useNavigate();

  const mkosh = () => {
    Navigate('/Shabdkosh');
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      getPoems()
        .then(() => console.log(poem)) // Log poem after it's fetched
        .catch(error => console.error("Error fetching poems:", error)); // Handle any errors
    } else {
      Navigate("/login");
    }
  }, []);


  // const [islike, setislike] = useState("false");


  // const likey = (index) => {
  //   const newData = [...poem];

  //   if (islike === true) {
  //     newData[index].likes -= 1; // Increase likes by 1
  //     // icon.class.add('fa fa-thumbs-o-up');

  //   }

  //   else if (islike === false) {
  //     newData[index].likes += 1;
  //     // icon.class.add('fa fa-thumbs-up');
  //   }


  //   setPoem(newData);
  //   setislike(!islike);
  // };

  const copy = (text) => {

    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  }

  const [showPopup, setShowPopup] = useState(false);



  const popup = () => {

    // console.log(showPopup);

    setShowPopup(!showPopup);
    // console.log(showPopup);

    if (showPopup === true)
      document.body.style.overflow = "";

    else if (showPopup === false)
      document.body.style.overflow = "hidden";
  }

  const [poetryText, setPoetryText] = useState('');

  const addPoetry = (text) => {
    // const newData = [...dataWithLikes];
    // newData.push({ p: text, likes: 0 });
    // setDataWithLikes(newData);
    // setPoetryText(''); // Reset textarea value after adding poetry
    addPoem(poetryText);
    popup(); // Close the popup after adding poetry
  };



  return (

    <div className='main'>


      <header className='text-center sticky top-0  flex items-center justify-between h-14 m-auto bg-yellow-700 border border-black'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1HVasfT-jTGxQ3HbknNgD4-COSX8EPCmrT68kFnGQyK-grSFMUj2AvXcJrPo37jEJqkM&usqp=CAU" className='h-10   w-10 ml-5 cursor-pointer rounded-full' onClick={back} alt="" />

        <h1 className='text-3xl font-serif'>Shabdarth</h1>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVoSui3gOAhWucHNkFj_0h9SMgNFccA5L36H0CpISdqiI78wDEWb8GYejN22Ksgt5pJw&usqp=CAU" alt="" onClick={mkosh} className='h-10 w-10 mr-5 rounded-full' />
      </header>



      < div className='overflow-y-auto boxes  items-center flex flex-col justify-center '>
        {/* poetryData: 'jinka hissho mai likha ho safarnama unka hisso mai ghar nhi atte', likes: 6 */}
        {poem.map((d, index) => (

          <div key={index} className='  w-3/4 h-[300px] border overflow-y-auto rounded-xl m-10 border-black'>
            <div className='bg-white   h-4/5'>
              <p className='text-black font-mono p-20 '>{d.poetryData}</p>

            </div>
            <div className='bg-yellow-600  flex justify-evenly items-center h-1/5'>

              <div className='w-1/2 text-center cursor-pointer font-bold text-2xl ' onClick={() => console.log("hello")}><i
                className={`like-icon fa fa-thums-up mr-3`} ></i>{d.likes}</div>
              {/* className={`like-icon fa ${islike[index] ? 'fa-thumbs-up' : 'fa-thumbs-o-up'} mr-3`} ></i>{d.likes}</div> */}

              <div className='h-full w-0.5 bg-black'></div>

              <div className='cursor-pointer w-1/2 text-center text-black font-bold text-2xl' onClick={() => copy(d.poetryData)}><i class="fa fa-edit"></i></div>
            </div>
          </div>
        ))}

      </div>




      <footer className=' irshaad sticky bottom-0 cursor-pointer'>
        <div style={{ backgroundColor: "#C19A6B" }} onClick={popup} className='text-center flex items-center justify-center h-14 m-auto  border border-black'>
          <h1 className='text-3xl font-serif'>Zehmat-E-Kalaam </h1>
        </div>
      </footer>

      {/*POP UP PAGE   */}

      {showPopup && <div className=' h-full w-screen  backdrop-blur-md fixed border-b-slate-600 z-10 top-0'>

        <div className=' bg-yellow-50 rounded-lg shadow-slate-500 shadow-lg top-1/4 left-[300px]  w-3/5 h-96 z-20 fixed  overflow-y-auto'>

          <div className=' flex justify-between'>
            <div></div>
            <div onClick={popup} ><img src="https://png.pngtree.com/png-clipart/20220603/original/pngtree-flat-x-cross-mark-button-in-red-color-and-white-line-png-image_7900019.png" alt="" className='h-12 w-12 m-5 cursor-pointer  ' /></div>
          </div>

          <div className='text-center '>
            <textarea value={poetryText} onChange={(e) => setPoetryText(e.target.value)} className=" outline outline-yellow-950 text-center cursor-text m-3" name="poetry" type="text" cols="100" placeholder='Farmaayein.......' rows="5"></textarea>
          </div>

          <div className='text-center m-10'>
            <button onClick={() => addPoetry(poetryText)} className='h-14 w-24 text-xl font-serif font-bold rounded-2xl text-black bg-yellow-700'>Irshaad</button>

          </div>

        </div>


      </div>}

    </div>



  );
}

