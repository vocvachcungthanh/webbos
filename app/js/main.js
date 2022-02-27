$(document).ready(function () {
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

    function omeGa() {
        $(".omega__menu--container").slick({
            slidesToShow: 3,
            rows: 2,
            slidesToScroll: 3,
            autoplay: false,
            infinite: false,
            arrows: true,
            dots: false,
        });
    }
    omeGa();

    function menuSlide() {
        $(".global__menu--slide").slick({
            dost: false,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            variableWidth: true,
        });
    }
    menuSlide();

    function question() {
        $(".question__header").on("click", function () {
            var remove = $(this)
                .parent(".question__item")
                .children(".question__body");

            $(".question__body").not(remove).slideUp();
            $(".question__header").not($(this)).removeClass("active");
            $(this).toggleClass("active");

            $(this)
                .parent(".question__item")
                .children(".question__body")
                .slideToggle();
        });
    }
    question();

    function modal() {
        $("[modal-show='show']").click(function () {
            $($(this).attr("modal-data")).addClass("show-modal");
            $($(this).attr("modal-data"))
                .find(".content-modal")
                .addClass("show-modal");
            $("body").addClass("active-modal");
        });
        $("[modal-show='close']").click(function () {
            setTimeout(function () {
                $(".bs-modal").removeClass("show-modal");
                $("body").removeClass("active-modal");
            }, 500);
            $(this)
                .parents(".bs-modal")
                .find(".content-modal")
                .removeClass("show-modal");
        });
        let showModal = $(".modal__container");
        $(".modal-frame").on("click", function (e) {
            if (
                !showModal.is(e.target) &&
                showModal.has(e.target).length === 0
            ) {
                $("body").removeClass("active-modal");
                $(".bs-modal").removeClass("show-modal");
            }
        });
    }

    modal();
});
