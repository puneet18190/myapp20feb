$(".menu-trigger").click(function () {
    $(".nav3").css({
        width: "300px",
        opacity: "1"
    });

    $(".menu-trigger").css({
        opacity: "0"
    })
});

$(".x").click(function () {
    $(".nav3").css({
        width: "0px",
        opacity: "0"
    });
    $(".menu-trigger").css({
        opacity: "1"
    })
});