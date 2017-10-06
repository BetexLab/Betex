( ($) => {

    const APP = {

        /********************************************************************************
         * Init tasks
         ********************************************************************************/
        init: () => {
            let isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };

            //timer
            let countDownDate = new Date("Dec 5, 2017 15:37:25").getTime();
            let x = setInterval(() => {
                let now = new Date().getTime();

                let distance = countDownDate - now;

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("timer").innerHTML = '<div class="timer__item">'+ days + '<span>Days</span>' +'</div>' +
                    '<div class="timer__item">'+ hours + '<span>HRS</span>' +'</div>' +
                    '<div class="timer__item">'+ minutes + '<span>MIN</span>' +'</div>' +
                    '<div class="timer__item">'+ seconds + '<span>SEC</span>' +'</div>';

                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("timer").innerHTML = "EXPIRED";
                }
            }, 1000);

            //tabs
            $('.tabgroup > div').hide();
            $('.tabgroup > div.active').show();
            $('.tabs a').click(function(e){
                e.preventDefault();
                var $this = $(this),
                    tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
                    others = $this.closest('li').siblings().children('a'),
                    target = $this.attr('href');
                others.parent().removeClass('active');
                $this.parent().addClass('active');
                $(tabgroup).children('div').hide();
                $(target).show();

            })

            //roadmap
            $('.roadmap-slider').slick({
                dots: false,
                arrows: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                infinite: false,
                touchMove: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false,
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: true,
                            arrows: false,
                        }
                    }
                ]
            });


            /**********************************************************/
            //******************money line*****************************/
            /**********************************************************/
            let moneyLineInterval;
            let prevActive = 0;
            function changeMoneyLine(prevActive, afterOver) {
                moneyLineInterval = setInterval(()=>{
                    $('.money-line').find('.money-line__dot').each(function(i, item){
                        if(prevActive == i || prevActive > 10){
                            if(i >= 10 || prevActive > 10){
                                $(item).removeClass('active');
                                $('.money-line__dot').eq(0).addClass('active');
                                $('.money-line__dot').eq(0).trigger('click');
                                prevActive = 0;
                            }else if(afterOver){
                                $(item).addClass('active');
                                $(item).trigger('click');
                                afterOver = false;
                            }else{
                                $(item).removeClass('active').next().addClass('active');
                                $(item).next().trigger('click');
                                prevActive++;
                            }
                            return false;
                        }
                    });
                },2500)
            }
            $('.money-line').on('inview', (event, isInView)=> {
                if (isInView) {
                    prevActive = 0;
                    changeMoneyLine(prevActive, true);
                }else{
                    $('.money-line__dot').removeClass('active');
                    clearInterval(moneyLineInterval);
                }
            }).on('mouseover', function (){
                $('.money-line__dot').removeClass('active');
                clearInterval(moneyLineInterval);
            })
            $('.money-line__dot').on('mouseout', function(){
                prevActive = $(this).index() + 1;
                changeMoneyLine(prevActive, true);
            });

            $('.money-line__dot').on('click', function () {
                $('.money-line__dot').removeClass('active');
                $(this).addClass('active');
                if($(window).innerWidth() < 1024){
                    $('.money-line__dot').each(function (i ,item) {
                        if($(item).hasClass('active')){
                            let itemIndex = $(item).index();
                            $('.money-line-wrap').mCustomScrollbar("scrollTo", "-" + 86*itemIndex);
                        }
                    })
                }
            });
            /*if($(window).innerWidth() >= 1024){
                $('.money-line').on('inview', (event, isInView)=> {
                    if (isInView) {
                        prevActive = 0;
                        changeMoneyLine(prevActive, true);
                    }else{
                        $('.money-line__dot').removeClass('active');
                        clearInterval(moneyLineInterval);
                    }
                }).on('mouseover', function (){
                    $('.money-line__dot').removeClass('active');
                    clearInterval(moneyLineInterval);
                })
                $('.money-line__dot').on('mouseout', function(){
                    prevActive = $(this).index() + 1;
                    changeMoneyLine(prevActive, true);
                });

                $('.money-line__dot').on('click', function () {
                    $('.money-line__dot').removeClass('active');
                    $(this).addClass('active')
                    $('.money-line__dot').each(function (i ,item) {
                        if($(item).hasClass('active')){
                            let itemIndex = $(item).index();
                            $('.money-line-wrap').mCustomScrollbar("scrollTo", "-" + 85*itemIndex);
                        }
                    })
                })
            }else{
                changeMoneyLine(0, true);
                $('.money-line__dot').on('click', function () {
                    $('.money-line__dot').removeClass('active');
                    $(this).addClass('active')
                    $('.money-line__dot').each(function (i ,item) {
                        if($(item).hasClass('active')){
                            let itemIndex = $(item).index();
                            $('.money-line-wrap').mCustomScrollbar("scrollTo", "-" + 85*itemIndex);
                        }
                    })
                })
            }*/


            /**********************************************************/
            //******************charts*********************************/
            /**********************************************************/
            let donutcharInit = false;
            $('.tokens-distribution').on('inview', function(event, isInView) {
                if (isInView && !donutcharInit) {
                    donutcharInit = true;
                    // Build the chart
                    Highcharts.chart('donutchart', {
                        chart: {
                            backgroundColor: false,
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie',
                        },
                        legend: {
                            enabled: false,
                        },
                        title: false,
                        subtitle: false,
                        tooltip: false,
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            },
                            series: {
                                cursor: 'pointer',
                                point: {
                                    events: {
                                        select: function () {
                                            let thisVal = this.y;
                                            $('.tokens-distribution__list-item').each(function(i, item){
                                                if($(item).attr('data-doughnut-index') == thisVal){
                                                    $('.tokens-distribution__list-item').removeClass('active')
                                                    $(item).addClass('active')
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'Betex tokens distribution',
                            innerSize: '50%',
                            colorByPoint: true,
                            data: [{
                                name: 'For founders and team are locked on smart contracts',
                                y: 30
                            }, {
                                name: 'Bounty campaign',
                                y: 3
                            }, {
                                name: 'Tokens pre-sale',
                                y: 5
                            }, {
                                name: 'Reserve for development and strategic aliances',
                                y: 12
                            }, {
                                name: 'Reserve for development and strategic aliances',
                                y: 50
                            }],
                            colors: ['#eef1f5','#32abef','#ffdd00','#ff505a','#3f4fc9'],
                        }]
                    });

                    $('.tokens-distribution').removeClass('animate')

                    //locked img
                    var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
                    svgimg.setAttributeNS(null,'height','27');
                    svgimg.setAttributeNS(null,'width','21');
                    svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/home-page/locked.svg');
                    // svgimg.setAttributeNS(null,'x','300');
                    // svgimg.setAttributeNS(null,'y','70');
                    svgimg.setAttributeNS(null, 'visibility', 'visible');
                    svgimg.classList.add("locked-icon");
                    $('.highcharts-point.highcharts-color-0 ').after(svgimg);

                    /*$('.highcharts-point').on('mouseover',function(e){
                        $(this).trigger('plotOptions.series.point.events.select')
                    })*/
                }
            });

            ///////////////////////////////////////////
            let fundsDisributionInit = false;
            $('.funds-disribution__wrap').on('inview', function(event, isInView) {
                if (isInView && !fundsDisributionInit) {
                    fundsDisributionInit = true;
                    Highcharts.chart('funds-disribution', {
                        chart: {
                            backgroundColor: false,
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        legend: {
                            enabled: false,
                        },
                        title: false,
                        subtitle: false,
                        tooltip: false,
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            },
                            series: {
                                cursor: 'pointer',
                                point: {
                                    events: {
                                        select: function () {
                                            let thisIndex = this.index;
                                            $('.funds-disribution__list-item').each(function(i, item){
                                                if($(item).attr('data-index') == thisIndex){
                                                    $('.funds-disribution__list-item').removeClass('active')
                                                    $(item).addClass('active')
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'Betex tokens distribution',
                            innerSize: '50%',
                            colorByPoint: true,
                            data: [{
                                name: 'Reserve',
                                y: 10
                            }, {
                                name: 'R&D',
                                y: 10
                            }, {
                                name: 'Marketing',
                                y: 20
                            }, {
                                name: 'Operational costsOperational costs',
                                y: 20
                            }, {
                                name: 'Product development',
                                y: 40
                            }],
                            colors: ['#eef1f5','#32abef','#ffdd00','#ff505a','#3f4fc9']

                        }]
                    });

                }
            });

            $('.nav__list').on('click', '.nav__list-item', function (e) {
                e.preventDefault();
                let _this = e.target;
                if(!$(this).hasClass('active')){
                    let top = 0;
                    $('.nav__list-item').removeClass('active');
                    $(this).addClass('active');
                    let id = $(this).children().attr('href');
                    if(id == '#roadmap'){
                        top = 30;
                    }
                    $('html, body').animate({
                        scrollTop: $(id).offset().top - top
                    }, 1000);
                }
            });

            $('.mob-menu__nav').on('click', '.mob-menu__nav-item', function (e) {
                e.preventDefault();
                $('body').removeClass('menu-open');
                let id = $(this).children().attr('href');

                $('html, body').animate({
                    scrollTop: $(id).offset().top - 30
                }, 1000);
            });

            $('.header__burger').on('click', (e)=>{
                e.preventDefault();
                $('body').removeClass('contribute-popup-open').toggleClass('menu-open')
            });

            $('.contribute-open').on('click', (e)=>{
                e.preventDefault();
                $('body').removeClass('menu-open').addClass('contribute-popup-open');
            });

            $('.contribute-popup__close').on('click', ()=> {
                $('body').removeClass('contribute-popup-open')
            });

            $('.betex-mvp__link').on('mouseover', (e)=> {
                e.preventDefault();
                let _this = e.target;
                let thisData = $(_this).attr('data-mon');
                if(!$(_this).hasClass('active')){
                    $(_this).addClass('active').siblings('.betex-mvp__link').removeClass('active');
                    // $('.betex-mvp__link').addClass('not-active');
                    setTimeout(()=>{
                        // $('.betex-mvp__link').removeClass('not-active');
                    },800);

                    $('.betex-mvp__img').removeClass('active');
                    $('.betex-mvp__img').each(function (i, item) {
                        $('.betex-mvp__img-wrap').addClass('change');
                        if(thisData == $(item).attr('data-img-mon')){
                            $(item)
                                .removeClass('disactive')
                                .addClass('active');
                        }else{
                            $(item)
                                .removeClass('active')
                                .addClass('disactive');
                        }
                    })
                }
            });

            //single accordion
            $('.betex-token__more').on('click', function() {
                $(this).toggleClass('open').siblings('.row').slideToggle()
            })

            $('.accordion-caption').on('click', function(){
                $(this).toggleClass('open').next('div').toggleClass('open').slideToggle()
            })



            /**********************************************************/
            //******************Business model*************************/
            /**********************************************************/
            $('.step-1').on('click', function() {
                $(this).toggleClass('pressed');
                $('.payouts__wrap').toggleClass('step-1');
            });
            $('.step-2').on('click', function() {
                $(this).toggleClass('pressed');
                $('.payouts__wrap').toggleClass('step-2');
            });
            $('.step-3').on('click', function() {
                $(this).toggleClass('pressed');
                $('.payouts__wrap').toggleClass('step-3');
            });
            $('.step-4').on('click', function() {
                $(this).toggleClass('pressed');
                $('.payouts__wrap').toggleClass('step-4');
            });

            $('.payouts').on('inview', function(event, isInView) {
                if (isInView && !donutcharInit) {
                    setTimeout(()=>{
                        $('.payouts').addClass('visible');
                    },1000)
                }
            });

            // создадим элемент с прокруткой
            var div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            // при display:none размеры нельзя узнать
            // нужно, чтобы элемент был видим,
            // visibility:hidden - можно, т.к. сохраняет геометрию
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            var scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);

            var animated = false;

            function modelAnimation () {
                if($('.business-model').offset().top <= $(window).scrollTop() + 100
                    && $('.business-model').offset().top + $('.business-model').height() >= $(window).scrollTop()
                    && !animated
                    && $(window).innerWidth() >= 1024){
                    animated = true;

                    if($(window).height() <= 700){
                        $('html, body').animate({
                            scrollTop: $('.payouts').offset().top
                        }, 500);
                    }else {
                        $('html, body').animate({
                            scrollTop: $('.business-model').offset().top + 100
                        }, 500);
                    }

                    $('.payouts').addClass('visible');

                    $('html').addClass('over-hidden').find('body').css({'marginRight':scrollWidth + "px"}); // remove scroll

                    $('.payouts').attr({'data-animated':'false'}); // replay button hidden on scroll if data false

                    // add steps
                    setTimeout(()=>{
                        $('.payouts__wrap').addClass('step-1'); //6s
                    },1000);
                    setTimeout(()=>{
                        $('.payouts__wrap').addClass('step-2')
                    },8000);
                    setTimeout(()=>{
                        if($(window).height() <= 830){
                            $('html, body').animate({
                                scrollTop: $('.payouts').offset().top + 200
                            }, 500);
                        }
                        $('.payouts__wrap').addClass('step-3')
                    },13000);
                    setTimeout(()=>{
                        if($(window).height() > 830){
                            $('html, body').animate({
                                scrollTop: $('.payouts').offset().top
                            }, 500);
                        }

                        $('.payouts__wrap').addClass('step-4')
                    },15000);

                    setTimeout(()=>{
                        $('html').removeClass('over-hidden').find('body').attr('style','');  // add scroll
                        $('.payouts').attr({'data-animated':'true'})
                    },17000)
                }
            }

            $('.payouts__replay').on('click', function (e) {
                e.preventDefault();
                $('.payouts').removeClass('visible');
                $(this).addClass('hidden');
                $('.payouts__wrap').removeClass('step-1 step-2 step-3 step-4');
                setTimeout(()=>{
                    animated = false;
                    modelAnimation();
                }, 1500)

            });

            $(window).on('scroll', () => {
                modelAnimation();
                if($('.payouts').is('.visible')){
                    if($(window).scrollTop() + $(window).innerHeight()/2 >= $('.payouts').offset().top
                        && !($(window).scrollTop() + $(window).innerHeight()/2 >= $('.payouts').offset().top + $(window).innerHeight() - 200)
                        && $('.payouts').attr('data-animated') == "true"){

                        $('.payouts__replay').removeClass('hidden');

                    }else if($(window).scrollTop() + $(window).innerHeight()/2 >= $('.payouts').offset().top + $(window).innerHeight()/2){

                        $('.payouts__replay').addClass('hidden');

                    }else{
                        $('.payouts__replay').addClass('hidden');
                    }
                }
            });
        },

        /********************************************************************************
         * Load tasks
         ********************************************************************************/
        load: () => {
            let isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            };

            $('.main-block__img-wrap').removeClass('loading');
            $('.main-block__descript').removeClass('loading');

            if($(window).innerHeight() <= $('.main-info').offset().top + 80
                || $(window).innerHeight() + $('.main-info').offset().top <= $(window).scrollTop()){
                $('.main-info__title').css({
                    'transition': '2s .5s'
                })
                $('.main-info__text').css({
                    'transition': '2s .5s'
                })
            }
            $('.main-info').on('inview', function(event, isInView) {
                if (isInView) {
                    $('.main-info').removeClass('loading');
                }
            });

            setTimeout(()=>{
                if(!isMobile.any()){
                    var s = skrollr.init({
                        forceHeight: false,
                        smoothScrollingDuration: 10,
                        easing: 'ease'
                    });
                }
            },2500);
            setTimeout(()=>{
                $('.main-block__img-wrap').addClass('skrollable-active')
            },3500)

        },
        /********************************************************************************
         * Click, hover, misc event bindings
         ********************************************************************************/
        interactive: () => {

        },

        /********************************************************************************
         * Resize bindings
         ********************************************************************************/
        resizeEvents: () => {

        },

        /********************************************************************************
         * Scroll bindings
         ********************************************************************************/
        scrollEvents: () => {

            /*// создадим элемент с прокруткой
            var div = document.createElement('div');
            div.style.overflowY = 'scroll';
            div.style.width = '50px';
            div.style.height = '50px';
            // при display:none размеры нельзя узнать
            // нужно, чтобы элемент был видим,
            // visibility:hidden - можно, т.к. сохраняет геометрию
            div.style.visibility = 'hidden';

            document.body.appendChild(div);
            var scrollWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);

            if($('.payouts').offset().top >= $(window).scrollTop()){
                $('html').addClass('over-hidden').find('body').removeClass('nav-open').css({'marginRight':scrollWidth + "px"}).find('.rngst_phone_button').css({'marginRight':scrollWidth + 25 + "px"});
            }else{
                $('html').removeClass('over-hidden').find('body').attr('style','').find('.rngst_phone_button').css({'marginRight':25 + "px"});
            }*/
        },

        /********************************************************************************
         * WP CLEAN
         *
         * run various functions over content that comes
         * from WYSIWYGs
         ********************************************************************************/
        wpClean: () => {

            /*
             // makes it easier to tell where images are in WYSIWYG content
             $('p:has(img:not(".wp-smiley"):not(".emoji"))').addClass('has-img');
             $('.wp-caption').addClass('has-img');

             // wraps embeds
             $('p:has(iframe)').addClass('has-embed');
             */
        },

        /********************************************************************************
         * SOCIAL SHARE POPUP
         *
         * Creates a popup of the passed url, used for social sharing
         * @param url
         ********************************************************************************/
        socialClick: (url) => {

            /*
             var leftPosition, topPosition, width, height;
             width = 550;
             height = 450;
             leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
             topPosition = (window.screen.height / 2) - ((height / 2) + 50);

             var windowFeatures = "status=no,height=" + height + ",width=" + width + ",resizable=no,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no";
             window.open(url, 'sharer', windowFeatures);
             return false;
             */

        },

        /********************************************************************************
         * SCROLL ANIMATION
         *
         * Animates scroll to a given offset
         * @param (int) newscroll
         ********************************************************************************/
        scrollAnim: (newscroll) => {

        }

    };

    /********************************************************************************
     * Initialize the app
     ********************************************************************************/
    $(document).on('ready', () => {
        APP.init();
    });

    $(window).on('load', () => {
        APP.load();
    });

    $(window).on('scroll', () => {
        APP.scrollEvents();
    });


    /********************************************************************************
     * All custom function
     ********************************************************************************/

    var myEfficientFn = debounce(function () {
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };
        if(window.innerWidth < 1024){
            $(".benefits-line-wrap, .money-line-wrap").mCustomScrollbar({
                axis:"x",
                mouseWheel:{
                    enable: true,
                    axis: "y" },
            });
        }

    }, 250);

    myEfficientFn();
    window.addEventListener('resize DOMContentLoaded', myEfficientFn);

})(jQuery);
