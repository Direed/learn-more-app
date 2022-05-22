import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss'

export default function Carousel({children}: any) {
    const slider = useRef(null)
    let settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 3,
        speed: 500,
        arrows: false,
        variableWidth: false,
        rtl: false,
        initialSlide: 1,
    };
    return (
        <div>
            <Slider ref={slider} {...settings}>
                {children}
            </Slider>
            <div className='button-wrapper'>
                <div className='button-wrapper--prev' onClick={() => slider?.current.slickPrev()}><img src={process.env.PUBLIC_URL + '/images/NextArrow.svg'}/></div>
                <div className='button-wrapper--next' onClick={() => slider?.current.slickNext()}><img src={process.env.PUBLIC_URL + '/images/BackArrow.svg'}/></div>
            </div>
        </div>
    );
};
