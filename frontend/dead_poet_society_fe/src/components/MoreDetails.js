import React from 'react';
import { SiBackbonedotjs } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
// import Books from './Books';
import { useLocation } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import PoetryContext from '../Context/poetry/PoetryContext';


export default function MoreDetails() {


  // review rating by react 

  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };

  // Optional callback functions
  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value, index) => console.log(value, index);


  const handleReset = () => {
    // Set the initial value
    setRating(0)
  }

  // review rating ends 






  const context = useContext(PoetryContext);
  const { addReview, bookData, fetchOneBook, addBookCart } = context;

  const location = useLocation();
  // console.log('Location state:', location.state);
  const book = location.state.d;
  const Bid = book._id;

  const cart = useNavigate();
  const carty = () => {
    addBookCart(Bid);
    cart('/Cart');

  }

  const back = useNavigate();

  const backy = () => {
    back('/Shabdkosh');
  }

  const [review, setreview] = useState(false);
  const [button, setbutton] = useState(true);
  const [texty, settexty] = useState('');
  // const [ddata, setddata] = useState(Books);
  const [thank, setthank] = useState(false);

  const showreview = () => {
    setreview(!review);
    setbutton(!button);
  }


  const addreview = (texty) => {
    addReview(texty, rating, Bid);
    // const newData = [...ddata];
    // newData.push({ r: texty });
    // setddata(newData);
    // console.log(ddata);
    settexty('');
    setbutton(false);
    setreview(false);
    setthank(true);
    // setRender1(Bid);
    setTimeout(() => setthank(false), 1000);
  };

  // let [render1, setRender1] = useState(1)
  // useEffect(() => {
  //   fetchOneBook(Bid)
  //   console.log(bookData.reviews);

  // }, [render1]);

  useEffect(() => {
    fetchOneBook(Bid);
  }, [Bid, fetchOneBook]);

  useEffect(() => {
    if (bookData && bookData.reviews) {
      // console.log(bookData.reviews);
    }
  }, [bookData]);

  return (

    <div>


      <header className='text-center sticky top-0  flex items-center justify-between h-14 m-auto bg-yellow-700 border border-black'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1HVasfT-jTGxQ3HbknNgD4-COSX8EPCmrT68kFnGQyK-grSFMUj2AvXcJrPo37jEJqkM&usqp=CAU" onClick={backy} className='h-10   w-10 ml-5 cursor-pointer rounded-full' alt="" />

        <h1 className='text-3xl font-serif'>Book Details</h1>

        <div></div>


      </header>

      {thank &&

        <div className='text-center w-full  z-50 sticky top-14 rounded-3xl h-10 bg-yellow-200 border border-yellow-700'>
          <p>Thank you for your Review</p>
        </div>

      }


      <div className=' m-10 p-10  border  flex  flex-col items-center bg-amber-100  border-yellow-300 rounded-2xl h-full '>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpEuIIR7bDOLXwAEoJZB1icsMXif84PFeYk4cKZjERThvgOJl6SZym8VJwzxg7f__aThg&usqp=CAU" className='w-3/4 h-3/4  mt-10 rounded-3xl' alt="" />


        <h1 className='font-extrabold text-7xl font-serif mt-10'>{bookData.name}</h1>

        <h1 className='font-bold text-5xl font-mono mt-10'>Price : {bookData.price}</h1>

        <h1 className='font-bold text-5xl font-mono mt-10'>Language : {bookData.language}</h1>

        <div className='m-20'>
          <h1 className='font-bold  mb-16 text-3xl font-mono mt-10'>Description : </h1>

          <p className=' text-xl font-semibold '>{bookData.description}</p>
        </div>


        <div className=''>
          <h1 className='font-bold  mb-9 text-3xl text-left font-mono mt-10' >Reviews : </h1>
          <ul className=' space-y-10 list-disc'>

            {bookData.reviews?.map((d) => (

              <li>
                <h4 className='text-xl font-bold'>{d.userName}</h4>
                <p>{d.comment}</p>
                <p>{d.rating}</p>
              </li>
            ))}


          </ul>
        </div>

        <div>


          {button &&
            <div>
              <button onClick={showreview} className='h-14 w-52 bg-yellow-700 rounded-3xl font-medium text-lg  m-10 '> Want to Add Yours ?</button>
            </div>
          }


          {/* {review && (
            <div className='flex flex-col mt-20 space-y-5'>
              <div className='relative'>
                <button onClick={showreview} className='mr-5 text-yellow-900 text-2xl top-0 right-0'>
                  <i className="fa fa-close"></i>
                </button>
                <textarea value={texty} onChange={(e) => settexty(e.target.value)} className='text-center' placeholder='Add Your Review Here' name="" id="" cols="160" rows="10"></textarea>
              </div>
              <div className='flex justify-center'>
                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                  initialValue={3}
                  className='rotate-90'
                />
              </div>
              <button onClick={() => addreview(texty)} className=' bg-yellow-700 w-20 h-10 rounded-full m-auto'>Submit</button>
            </div>
          )} */}
          {review &&
            <div className='flex flex-col  mt-20  space-y-5'>
              <div className='flex justify-between'>
                <div></div>
                <button onClick={showreview} className='mr-5 text-yellow-900 text-2xl'><i class="fa fa-close"></i></button>
              </div>
              <textarea value={texty} onChange={(e) => settexty(e.target.value)} className='text-center ' placeholder='Add Your Review Here' name="" id="" cols="160" rows="5"></textarea>
              <div className="flex justify-center">

                <Rating
                  onClick={handleRating}
                  onPointerEnter={onPointerEnter}
                  onPointerLeave={onPointerLeave}
                  onPointerMove={onPointerMove}
                  initialValue={3}
                  className='rotate-90 -my-20'
                />
              </div>

              <button onClick={() => addreview(texty)} className=' bg-yellow-700 w-20 h-10 rounded-full m-auto'>Submit</button>
            </div>
          }



        </div>

      </div>





      <footer className=' flex sticky bottom-0 '>
        <div className=' text-center border font-serif  border-l-0 border-t-0 border-b-black text-2xl w-auto w-screen font-medium pb-3 bg-yellow-700  pt-3 '>
          <h3>Buy Now !</h3>
        </div>
        <div onClick={carty} className=' text-center border  font-serif border-r-0  border-t-0  border-b-black text-2xl w-auto w-screen font-medium pb-3  pt-3 bg-yellow-700 '>
          <h3>Add To Cart</h3>
        </div>
      </footer>
    </div>

  );
}
