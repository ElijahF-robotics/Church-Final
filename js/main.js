// NavBar turns opaque after certain scroll amount
$(document).ready(function() {

    $(window).scroll(function() {

        let height = $('.imageContainer').height();
        let scrollTop = $(window).scrollTop();

        let navBar = $('.navBar')

        if (scrollTop >= height) {
            navBar.removeClass('redToDarkRedGradient');
            navBar.addClass('darkestRed');
        } else {
            navBar.removeClass('darkestRed');
            navBar.addClass('redToDarkRedGradient');

        }
    });
});


