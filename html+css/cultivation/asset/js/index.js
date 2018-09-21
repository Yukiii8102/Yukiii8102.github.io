$(document).click(function() {
    // $('.nav .breadcrumb').slideToggle(800);
})
$('.nav .glyphicon-menu-hamburger').click(function(e) {
    $('.nav .breadcrumb').slideToggle(800);
    // e.stopPropagation();
});