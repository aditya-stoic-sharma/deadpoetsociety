import React, { useState } from 'react';
import { Link, json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const handleLogin = async () => {

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credential.email, password: credential.password })
    })

    const json = await response.json();
    if (json.success) {
      console.log(json);
      console.log(json.authToken);
      localStorage.setItem('token', json.authToken);
      navigate('/Homepage')
    }

    else {
      console.log(json);
    }

  }
  return (
    <div className=' flex justify-center items-center h-screen'>
      <div className='flex   justify-center items-center w-3/4 h-screen '>
        <div className=' space-y-10 leftbox w-1/3 flex flex-col justify-center items-center rounded-3xl bg-yellow-300 h-3/4 '>

          <div><h3 className='text-2xl font-bold'>Want To Connect With Us!</h3></div>

          <div className='flex justify-center '><p className='text-wrap w-3/4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dicta quaerat accusamus, quo aperiam commodi molestiae ipsa laborum dignissimos doloribus tempore delectus incidunt nisi perferendis at? Sit molestiae odit accusamus?</p>
          </div>

          <Link to="/Signup"><div><button className='border border-black bg-yellow-100 px-3 p-2 rounded-md transition-transform duration-300 ease-in-out hover:scale-125 '>Sign Up !</button></div></Link>

        </div>
        <div className='rightbox bg-yellow-50 w-2/3 flex rounded-3xl  justify-center items-center h-3/4 flex-col space-y-10'>

          <div><h4 className='text-3xl font-bold '>Welcome</h4></div>

          <div className='space-y-5'>
            <div className='flex flex-col items-center space-y-3'>
              <label className=''> E-mail Id</label>
              <input type="text" className='text-center' placeholder='E-mail Id' name='email' onChange={onChange} value={credential.email} />
            </div>

            <div className='flex flex-col items-center space-y-3'>
              <label>Password</label>
              <input type="password" className='text-center' placeholder='Password' name='password' onChange={onChange} value={credential.password} />
            </div>

            <div className=' flex justify-center space-y-3'>
              <p>Forget Password ?</p>
            </div>

            <div className='flex justify-center'><button className='border border-black bg-yellow-300 px-3 p-2 rounded-md transition-transform duration-300 ease-in-out hover:scale-125 my-9 ' onClick={handleLogin}>Log-In</button></div>
          </div>

        </div>
      </div>
    </div>

  );
}
