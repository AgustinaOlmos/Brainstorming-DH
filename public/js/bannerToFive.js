window.addEventListener('resize', changeScreen);
var img1 = document.querySelector('#logo-slider1');
var img2 = document.querySelector('#logo-slider2');
var img3 = document.querySelector('#logo-slider3');
var img4 = document.querySelector('#logo-slider4');

var bannerResponsive = function(){
    if(window.innerWidth > 319 && window.innerWidth < 426){
        img1.setAttribute('src', '../img/banner/banner_home_nov_640.jpg');
        img2.setAttribute('src', '../img/banner/slider_catalogo_home_640.jpg');
        img3.setAttribute('src', '../img/banner/banner_home_nov_3_640.jpg');
        img4.setAttribute('src', '../img/banner/bolsacarro.jpg');
    }
    if(window.innerWidth > 425){
        img1.setAttribute('src', '../img/banner/banner_home_nov_1.jpg');
        img2.setAttribute('src', '../img/banner/slider_catalogo_home2.jpg');
        img3.setAttribute('src', '../img/banner/banner_home_nov_3_1.jpg');
        img4.setAttribute('src', '../img/banner/banner_home_nov_2.jpg');
    }
}
bannerResponsive();  
function changeScreen(e){
    bannerResponsive();
}
