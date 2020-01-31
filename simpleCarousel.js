/**
 * @param {JQuery} target 
 * @param {boolean} displayErrors
 * @returns {JQuery} target || false
 */
function simpleCarousel(target,displayErrors = false) {
    if(!$) return console.log("jQuery not loaded");
    if(!target.length && target.data('carousel')){
        displayErrors ? console.log("Target not found finding by '[data-carousel]'") : null;
        target = $("[data-carousel]");
        if(!target.length){
            displayErrors ? console.log("'[data-carousel]' not found ERROR") : null;
            return false;
        }
    } 
    var $carouselCtx = target;
    var $scrollSpeed = $carouselCtx.data('carousel-scroll-speed');
    if(!$scrollSpeed){
        displayErrors ? console.log("target [data-carousel-scroll-speed] not found using 400") : null;
        $scrollSpeed = 400;
    }
    var $carouselMain = $carouselCtx.find("[data-carousel-main]");
    if(!$carouselMain.length){
        displayErrors ? console.log("'[data-carousel-main]' not found ERROR"): null;
        return false;
    }
    var $carouselItens = $carouselMain.find(">div");
    if(!$carouselItens.length){
        displayErrors ? console.log("'[data-carousel-main]>div' not found ERROR") : null;
        return false;
    }
    var $carouselCtrl = $carouselCtx.find("[data-carousel-control]");
    if(!$carouselCtrl.length){
        displayErrors ? console.log("'[data-carousel-control]' not found using swipe mobile") : null;
    }
    var $witdh = $carouselMain.width();
    var qtdItens = Math.floor($witdh / $carouselItens.eq(0).width());
    var distanceScroll =  ($carouselItens.width() * qtdItens);
    var currentPage = 0;
    $carouselMain.scroll(function() {
        currentPage = Math.ceil($carouselMain.scrollLeft() / distanceScroll);
    });
    $carouselCtrl.click(function() {
        $scrollSpeed = $carouselCtx.data('carousel-scroll-speed')
        var $this = $(this);
        var direction = 0;
        $this.data('carousel-control') == 'right' ? direction = 1 : direction = - 1;            
        if(displayErrors){
            console.log("Direction => " + direction);
            console.log("Scroll Speed => " +  $scrollSpeed);            
        }
        $carouselMain.animate({scrollLeft: distanceScroll * (currentPage + direction )}, $scrollSpeed);
    });
    return target;
}
module.exports = simpleCarousel;