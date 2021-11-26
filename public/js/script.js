$(document).ready(function() {
    $('#autoWidth').lightSlider({
        autoWidth:true,
        auto:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        } 
    });  
    var autoplaySlider = $('#autoplay').lightSlider({
        adaptiveHeight:true,
        item:1,
        slideMargin:0,
        auto:true,
        loop:true,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        },
        pauseOnHover: true,
        onBeforeSlide: function (el) {
            $('#current').text(el.getCurrentSlideCount());
        } 
    });
    $('#total').text(autoplaySlider.getTotalSlideCount());
});