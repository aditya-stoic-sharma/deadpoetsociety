import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

function Book_slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  const transfer = () => {

  }

  return (
    <div className='w-3/4 m-auto'>
      <div className="my-20  ">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className="bg-white  h-[450px] text-black  rounded-xl">
              <div className='h-56 bg-yellow-300 flex justify-center items-center rounded-t-xl'>
                <img src={d.img} alt="" className="h-44 w-44 rounded-full" />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 p-4">
                <p className="text-xl font-semibold">{d.name}</p>
                <p className="text-center">{d.review}</p>
                <Link to={d.link}><button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button></Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
}

const data = [
  {
    name: `Jaun Elia`,
    img: `data:image/jpeg;base64,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`,
    review: `One of the most prominent modern Urdu poets, popular for his unconventional ways, he "acquired knowledge of philosophy, logic, Islamic history"`,

    link: `https://en.wikipedia.org/wiki/Jaun_Elia`

  },
  {
    name: `Mirza Ghalib`,
    img: `https://images.indianexpress.com/2019/07/ghalib_1_759.jpg?w=414`,
    review: `Mirza Beg Asadullah Khan (1797–1869), also known as Mirza Ghalib,[1] was an Indian poet.[2] He was popularly known by the pen names Ghalib and Asad`,
    link: `https://en.wikipedia.org/wiki/Ghalib`
  },
  {
    name: `Tahzeeb Hafi`,
    img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALhhYwWpsRDAgPIu1B1BMysOPkW04Bm3OXw&usqp=CAU`,
    review: `Tahzeeb Hafi, a poet with a new style and beautiful accent, was born on December 5, 1989. in Retra, Tehsil Taunsa Sharif (Dera Ghazi Khan District). `,

    link: `https://www.rekhta.org/poets/tahzeeb-hafi/profile`
  },
  {
    name: `Kumar Vishwas`,
    img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7DJOAk24OZ2QDxfKN8lqlgutQot74yZqD9MIEh_G1QoGTbU1tekmLTidxUVldn8A1Wy4&usqp=CAU`,
    review: `Kumar Vishwas (born Vishwas Kumar Sharma; 10 February 1970) is an Indian Hindi poet, politician, and a lecturer`,
    link: `https://en.wikipedia.org/wiki/Kumar_Vishwas`
  },


];

export default Book_slide;