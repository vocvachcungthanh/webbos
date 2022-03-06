$(document).ready(function () {
    function omeGa() {
        $(".omega__menu--container").slick({
            slidesToShow: 3,
            rows: 2,
            slidesToScroll: 3,
            autoplay: false,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 767.98,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575.98,
                    settings: {
                        slidesToShow: 1,
                        rows: 4,
                    },
                },
            ],
        });
    }
    omeGa();
    // menu
    function appButton() {
        var has = $('.menu li:has("ul")');
        return has
            ? has.append('<button class="btn btn__toggle"></button>')
            : "";
    }

    appButton();

    function onMenu() {
        var button = $(".btn__toggle");
        var hasMenu = $(".menu .menu__list  ul");
        button.on("click", function () {
            var __ = $(this).parent(".menu__list").children("ul");
            hasMenu.not(__).slideUp();
            button.not($(this)).removeClass("active");
            __.slideToggle();
            $(this).toggleClass("active");
            $(".omega__menu--container").slick("setPosition").slick();
        });
    }
    onMenu();

    function openMenu() {
        $(".btn__menu").on("click", function () {
            $("body").addClass("body__hidden");
            $(".addon__menu").toggleClass("active");
        });
    }
    openMenu();

    function closeMenu() {
        var menusClass = $(".menu");
        $(".box__menu").on("click", function (e) {
            console.log(menusClass.has(e.target).length);
            if (
                !menusClass.is(e.target) &&
                menusClass.has(e.target).length === 0
            ) {
                $("body").removeClass("body__hidden");
                $(".addon__menu").removeClass("active");
            }
        });
    }
    closeMenu();

    $(window).on("scroll", function () {
        var height = $("#header").height();
        if ($(this).scrollTop() > height) {
            $(".back-top").addClass("active");
        } else {
            $(".back-top").removeClass("active");
        }
    });
    $(".back-top").on("click", function () {
        $(".back-top").removeClass("active");
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            1000
        );
    });

    //end menu

    function trustSlider() {
        $(".trust-business__slider").slick({
            slidesToShow: 6,
            slidesToScroll: 3,
            rows: 4,
            dots: true,
            arrows: false,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 767.98,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 575.98,
                    settings: {
                        slidesToShow: 3,
                    },
                },
            ],
        });
    }
    trustSlider();

    function feedback() {
        $(".feedback__slide").slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 767.98,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        });
    }

    feedback();

    function menuSlide() {
        $(".global__menu--slide").slick({
            dost: false,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            variableWidth: true,
            swipe: true,
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
        let showModal = $(".content-modal");
        $(".bs-modal").on("click", function (e) {
            if (
                !showModal.is(e.target) &&
                showModal.has(e.target).length === 0
            ) {
                console.log("thanh");
                $("body").removeClass("active-modal");
                $(".bs-modal").removeClass("show-modal");
            }
        });
    }

    modal();
});
