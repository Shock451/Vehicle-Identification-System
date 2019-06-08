$(function () {

    var navBarToggle = document.getElementById('hamburger');
    var navMenu = document.getElementById('nav-menu');

    navBarToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

});