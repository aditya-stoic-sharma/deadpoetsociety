import React from 'react';

export default function Footer(props) {
  return (
    <div  style={{ backgroundColor : props.mode==='dark'?'#B87333':'black'}} className='footer   text-white flex flex-row justify-around -py-5  ' >

            <div className=' flex flex-col text-wrap w-1/3 m-5 my-20 '>
                <div className='flex  '>

                    <img src="https://static.vecteezy.com/system/resources/previews/008/909/270/non_2x/dps-logo-dps-letter-dps-letter-logo-design-initials-dps-logo-linked-with-circle-and-uppercase-monogram-logo-dps-typography-for-technology-business-and-real-estate-brand-vector.jpg" alt='' className='logo rounded-full m-5 h-14 w-14' /> 
                    <h2 className='font-extrabold mt-8 '>Dead Poet Society</h2>

                </div>
                <div><h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta nostrum minus repudiandae aperiam ad est amet vel inventore voluptas dicta.</h2></div>
            </div>

            <div className='my-24  '>

                <h3 className=' font-bold text-xl'>Important Links</h3>
                <p>Hoem</p>
                <p>About</p>
                <p>Contact</p>
                <p>Blog</p>
              

            </div>

            <div className='my-24'>

                <h3 className=' font-bold text-xl'>Important Links</h3>
                <p>Hoem</p>
                <p>About</p>
                <p>Contact</p>
                <p>Blog</p>

            </div>

            <div className='my-24'>
              <h3 className=' font-bold text-xl'>Links</h3>
              <p>Hoem</p>
              <p>About</p>
              <p>Contact</p>
              <p>Blog</p>
            </div>
            
      </div>

            
  );
}
