import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default React.memo(function Carousel({children}) {
    let settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 3,
        speed: 500,
        arrows: false,
        variableWidth: false,
        rows: 1,
        rtl: true,
    };
    return (
        <Slider {...settings}>
            {children}
        </Slider>
    );
});
