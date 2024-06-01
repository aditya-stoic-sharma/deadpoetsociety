import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();

  const [credentail, setCredential] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setCredential({ ...credentail, [e.target.name]: e.target.value });
  }

  const handleRegister = async () => {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentail.name, email: credentail.email, password: credentail.password })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate('/Login')
    }
    else {
      console.log(json);
      alert(`invalid credentials`);
    }
  }
  return (
    <div className=' flex justify-center items-center h-screen'>
      <div className='flex justify-center items-center w-3/4 h-screen '>

        <div className=' space-y-10 leftbox w-2/3 flex flex-col justify-center items-center rounded-3xl bg-yellow-50 h-3/4 '>

          <div><h4 className='text-3xl font-bold'>Welcome</h4></div>

          <div className='space-y-5'>
            <div className='flex flex-col items-center space-y-3'>
              <label>Name</label>
              <input type="text" className='text-center' placeholder='Name' name='name' onChange={onChange} value={credentail.name} />
            </div>


            <div className=' flex flex-col items-center  space-y-3'>
              <label >E-mail Id</label>
              <input type="text" placeholder='E-mail Id' className='text-center' name='email' onChange={onChange} value={credentail.email} />
            </div>


            <div className='flex flex-col items-center space-y-3'>
              <label>Password</label>
              <input type="password" className='text-center' placeholder='Password' name='password' value={credentail.password} onChange={onChange} />
            </div>





          </div>

          <div className='flex justify-center'>
            <button className='border border-black bg-yellow-300 px-3 p-2 rounded-md transition-transform duration-300 ease-in-out hover:scale-125' onClick={handleRegister}>Sign-Up</button>
          </div>

        </div>

        <div className='rightbox bg-yellow-300 w-1/3 flex rounded-3xl justify-center items-center h-3/4 flex-col space-y-10'>

          <div><h3 className='text-2xl font-bold'>Want To Connect With Us!</h3></div>

          <div className='flex justify-center'>
            <p className='text-wrap w-3/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dicta quaerat accusamus, quo aperiam commodi molestiae ipsa laborum dignissimos doloribus tempore delectus incidunt nisi perferendis at? Sit molestiae odit accusamus?</p>
          </div>

          <Link to="/Login"><div><button className='border border-black bg-yellow-100 px-3 p-2 rounded-md transition-transform duration-300 ease-in-out hover:scale-125'>Sign In !</button></div></Link>

        </div>

      </div>
    </div>
  );
}
