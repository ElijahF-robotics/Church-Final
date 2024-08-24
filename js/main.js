// NavBar turns opaque after certain scroll amount
$(document).ready(function() {

    $(window).scroll(function() {

        var height = $('.imageContainer').height();
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= height) {
            $('.navBar').removeClass('redToDarkRedGradient');
            $('.navBar').addClass('darkestRed');
        } else {
            $('.navBar').removeClass('darketRed');
            $('.navBar').addClass('redToDarkRedGradient');
        }

        console.log(scrollTop)

    });
});

