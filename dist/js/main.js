function trustSlider() {
    $(".trust-business__slider").slick({
        slidesToShow: 6,
        slidesToScroll: 3,
        rows: 4,
        dots: true,
        arrows: false,
        autoplay: true,
    });
}
trustSlider();

function feedback() {
    $(".feedback__slide").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
    });
}

feedback();
