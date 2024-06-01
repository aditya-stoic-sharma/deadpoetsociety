import React, { useState } from 'react';
import Navbar from './Navbar';
import Slider_p from './Slider_p';
import Email from './Email';
import Footer from './Footer';
import Book_slide from './Book_slide';
import Slider from 'react-slick';
import DPS from './DPS';

export default function Homepage({ toggle, mode }) {

  const [mody, setmody] = useState(false);
  const dead = () => {
    setmody(!mody);
    if (mody === false)
      document.body.classList.add("overflow-hidden");

    else
      document.body.classList.remove("overflow-hidden");
  }
  return (
    <div>
      <Navbar toggle={toggle} dead={dead} mode={mode} />
      <Slider_p />
      <Book_slide />
      <Email />
      <Footer mode={mode} />
      {mody && <DPS dead={dead} />}
    </div>
  );
}
