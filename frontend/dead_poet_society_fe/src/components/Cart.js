import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PoetryContext from '../Context/poetry/PoetryContext';
import axios from "axios";

export default function Cart() {
  const currency = "INR";
  const Navigate = useNavigate();
  const context = useContext(PoetryContext);
  const { fetchCartBooks, cartBooks } = context;

  const [selectedBooks, setSelectedBooks] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const backy = useNavigate();


  const fetchDataFromBC = async () => {
    if (localStorage.getItem('token')) {
      await fetchCartBooks();
    } else {
      Navigate("/login");
    }
  }

  useEffect(() => {
    fetchDataFromBC();
  }, []);

  const [priceG, setPriceG] = useState(0);
  const [BookIds, setBookIds] = useState([]);
  // useEffect(() => {
  //   // Calculate total price when selectedBooks or cartBooks change
  //   let total = 0;
  //   selectedBooks.forEach(bookId => {
  //     const book = cartBooks.find(b => b.id === bookId);
  //     if (book) {
  //       total += book.price;
  //     }
  //   });
  // }, [priceG]);


  const handleCheckboxChange = (event, book) => {
    console.log(book);
    const bookId = book._id;
    const price = book.price;
    if (event.target.checked) {
      console.log(bookId);
      setBookIds(prevState => [...prevState, bookId]);
      const pB = price + priceG;
      setPriceG(pB);
    } else {
      const pB = priceG - price;
      setPriceG(pB);
      setBookIds(prevState => prevState.filter(id => id !== bookId));
    }
  };

  const back = () => {
    backy('/ShabdKosh');
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_wuYKr643pfuMVV",
      amount: priceG,
      currency: currency,
      name: "it ends with us",
      description: "Test Transaction",
      image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:5000/api/book/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    try {
      const orderUrl = `http://localhost:5000/api/book/orders`;
      const { data } = await axios.post(orderUrl, { amount: priceG });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className='text-center sticky top-0 flex items-center justify-between h-14 m-auto bg-yellow-700 border border-black'>
        <img onClick={back} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1HVasfT-jTGxQ3HbknNgD4-COSX8EPCmrT68kFnGQyK-grSFMUj2AvXcJrPo37jEJqkM&usqp=CAU" className='h-10 w-10 ml-5 cursor-pointer rounded-full' alt="" />
        <h1 className='text-3xl font-serif'>The Cart</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVoSui3gOAhWucHNkFj_0h9SMgNFccA5L36H0CpISdqiI78wDEWb8GYejN22Ksgt5pJw&usqp=CAU" alt="" className='h-10 w-10 mr-5 rounded-full' />
      </header>


      <div className='grid grid-cols-2 h-screen'>
        {cartBooks.map((d) => (
          <div key={d.id} className='border border-yellow-300 bg-yellow-100 ml-7 rounded-3xl w-[700px] m-10 h-60'>
            <div className='flex justify-between'>
              <div className='flex space-x-4 m-10'>
                <input className='m-3 cursor-pointer h-5 w-5' type="checkbox" onChange={(event) => handleCheckboxChange(event, d)} />
                <img className='h-40 w-40' src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
              <div className='m-10 space-y-5'>
                <p className='text-3xl font-bold'>{d.name}</p>
                <p className='text-xl font-semibold'>{d.language}</p>
                <p className='text-xl font-semibold'>{d.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className='flex fixed bottom-0 w-full'>
        <div className='text-center border font-serif border-l-0 border-t-0 border-b-black text-2xl w-auto w-screen font-medium pb-3 bg-yellow-700 pt-3'>
          <h3>GrandTotal&nbsp;&nbsp;: {priceG}</h3>
        </div>
        <div className='text-center border font-serif border-r-0 border-t-0 border-b-black text-2xl w-auto w-screen font-medium pb-3 pt-3 bg-yellow-700' onClick={handlePayment}>
          <h3>Continue</h3>
        </div>
      </footer>
    </div>
  );
}
