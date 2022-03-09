import React, { useState } from "react";

function Carousel(props) {
  const [imgIndex, setImgIndex] = useState(0);
  const imgLength = props.images.length - 1;

  const prevImg = () => {
    setImgIndex(imgIndex === 0 ? imgLength : imgIndex - 1);
  };
  const nextImg = () => {
    setImgIndex(imgIndex === imgLength ? 0 : imgIndex + 1);
  };

  return (
    <div className="carousel">
      <div className="prev_btn_div">
        <img
          className="prev_btn"
          onClick={prevImg}
          src="https://img.icons8.com/ios-glyphs/35/ffffff/chevron-left.png"
          alt=""
        />
      </div>
      <div className="caro_img_div">
        <img className="caro_img" src={props.images[imgIndex]} alt="" />
      </div>

      <div className="next_btn_div">
        <img
          className="next_btn"
          onClick={nextImg}
          src="https://img.icons8.com/ios-glyphs/35/ffffff/chevron-right.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Carousel;
