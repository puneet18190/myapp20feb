

$(window).on("scroll", function(){



    scroll = $(window).scrollTop();

    if(scroll > 10){
        $(".logo-img").css({
            opacity: "1"
        });
    } else {
        $(".logo-img").css({
            opacity: "0"
        });
    }
});