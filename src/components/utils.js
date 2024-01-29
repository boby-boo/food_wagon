export const bannerAnimationSettings = {
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

export const deliveryBannerAnimationTextSettings = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: custom => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

export const deliveryBannerAnimationFormSettings = {
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

export const orderAnimationSettings = {
    hidden: {
        y: -20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    titleHidden: {
        y: 40,
        opacity: 0,
    },
    titleVisible: {
        y: 0,
        opacity: 1,
    },
};

export const page404AnimationSettings = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

export const popularItemsSliderSettings = {
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 800,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 1824,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                arrows: false,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3.6,
                slidesToScroll: 2,
                arrows: false,
            },
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3.1,
                slidesToScroll: 2,
                arrows: false,
            },
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 2,
                arrows: false,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1.22,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '120px',
                arrows: false,
            },
        },
        {
            breakpoint: 670,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '150px',
                slidesToScroll: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 1.12,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '20px',
                slidesToScroll: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '10px',
                slidesToScroll: 1,
                arrows: false,
            },
        },
    ],
};

export const foodCategorySliderSettings = {
    autoplay: false,
    infinite: true,
    autoplaySpeed: 3000,
    speed: 900,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1824,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false,
            },
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 670,
            settings: {
                slidesToShow: 1.8,
                centerMode: true,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1.55,
                centerMode: true,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 1.14,
                centerMode: true,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '45px',
                slidesToScroll: 1,
            },
        },
    ],
};

export const productItemSliderSettings = {
    autoplay: false,
    infinite: true,
    arrows: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1218,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                className: 'center',
                centerMode: true,
                centerPadding: '0px',
                arrows: false,
            },
        },
    ],
};
