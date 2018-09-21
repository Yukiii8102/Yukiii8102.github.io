$(document).mousemove(function (e) { 
    // values: e.clientX, e.clientY, e.pageX, e.pageY
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var transLeft = (e.clientX-windowWidth/2)/1000*30;
    var transTop = (e.clientY-windowHeight/2)/1000*30;
    console.log(e.clientX-windowWidth/2)
    $('.scene li').css("transform", "translate("+ transLeft +"px, "+ transTop +"px)");
});