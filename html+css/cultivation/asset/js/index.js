// 刷新返回顶部
window.onload = function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    });
}

// 滑动返回顶部
$(document).click(function () {
    // $('.nav .breadcrumb').slideToggle(800);
})

// 移动端页面 点击左上角弹出菜单
$('.nav .glyphicon-menu-hamburger').click(function (e) {
    $('.nav .breadcrumb').slideToggle(800);
    // e.stopPropagation();
});

// 窗口底部
var winNearBottom;
$(window).scroll(function () { 
    winNearBottom = $(document).scrollTop() + $(window).height();
    if (winNearBottom > $('.ani_about').offset().top) {
        ani('.ani_about');
    }
    if (winNearBottom > $('.ani_service').offset().top) {
        ani('.ani_service');
    }
    if (winNearBottom > $('.ani_work').offset().top) {
        $('.ani_work').css({
            'transform': 'scale(1)',
            'opacity': 1
        });
    }
    if (winNearBottom > $('.ani_news').offset().top) {
        ani('.ani_news');
    }
    if (winNearBottom > $('.ani_other').offset().top) {
        ani('.ani_other');
        $('.ani_other>div:nth-of-type(2)').css({
            'transform': 'scale(1)'
        })
    }
    if ($(window).width() >= 768) {
        if (winNearBottom > $('.ani_foot').offset().top) {
            ani('.ani_foot');
        }
    }
});

if ($(window).width() < 768) {
    $('.ani_foot').children().css({
        'top': 0,
        'left': 0,
        'opacity': 1
    });
}

$(document).ready(function () {
    ani('.ani_grids');
});

function ani(param) {
    $(param).children().animate({
        top: 0,
        left: 0,
        opacity: 1
    }, 750);
}