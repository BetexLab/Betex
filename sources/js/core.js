( ($) => {

    const APP = {

        /********************************************************************************
         * Init tasks
         ********************************************************************************/
        init: () => {

            /*try {
                history.pushState(null, null, curLoc);
                return;
            } catch(e) {}
            location.hash*/
            // console.log(location.hash);

            // if($('body').hasClass('contribute-full-popup-open')) {
            //     setLocation('#contribute')
            // }
            let locationHash = window.location.hash;


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
            let countDownDate = new Date("Dec 20, 2017 16:00:00").getTime();

            let x = setInterval(() => {
                let now = new Date().getTime();

                let distance = countDownDate - now;

                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                let timerHtml = '<div class="timer__item">'+ days + '<span>Days</span>' +'</div>' +
                    '<div class="timer__item">'+ hours + '<span>HRS</span>' +'</div>' +
                    '<div class="timer__item">'+ minutes + '<span>MIN</span>' +'</div>' +
                    '<div class="timer__item">'+ seconds + '<span>SEC</span>' +'</div>';
                document.getElementById("timer").innerHTML = timerHtml;
                document.getElementById("timer2").innerHTML = timerHtml;

                if (distance < 0) {
                    clearInterval(x);
                    document.getElementById("timer").innerHTML = "Time is over";
                    document.getElementById("timer2").innerHTML = "Time is over";
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
            /*$('.roadmap-slider').slick({
                dots: false,
                arrows: true,
                initialSlide: 4,
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                touchMove: false,
            });*/
            $('.roadmap-slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 4,
                vertical: true,
                // verticalSwiping: true,
                swipe: false,
                focusOnSelect: true,
                centerMode: true,
                centerPadding: '0',
                asNavFor: '.roadmap-slider-nav',
                arrows: false,
                dots: false,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            centerMode: false,
                            vertical: false,
                            swipe: true,
                            adaptiveHeight: true,
                            dots: false,
                            // variableWidth: true
                        }
                    },
                ]
            });
            $('.roadmap-slider-nav').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 4,
                focusOnSelect: true,
                centerMode: true,
                vertical: true,
                centerPadding: 0,
                // verticalSwiping: true,
                swipe: false,
                asNavFor: '.roadmap-slider-for',
                arrows: true,
                dots: true,
                infinite: false,
                dotsClass: 'custom_paging',
                customPaging: function (slider, i) {
                    // console.log(slider);
                    var slideNumber = (i + 1),
                        totalSlides = slider.slideCount;
                    return '<a class="custom-dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '">' +
                        '<span class="slide-number">' + slideNumber + '</span>' + '/' + totalSlides + '</a>';
                },
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            centerMode: false,
                            vertical: false,
                            swipe: true,
                            arrows: false,
                            // variableWidth: true
                        }
                    },
                ]

            });
            if($(window).width() >= 1024){
                var maxHeight = -1;
                $('.roadmap-slider-for__item').each(function() {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                });
                $('.roadmap-slider-for__item').each(function() {
                    if ($(this).height() < maxHeight) {
                        $(this).css('margin', Math.ceil((maxHeight-$(this).height())/2) + 'px 0');
                    }
                });
            }

            // console.log($(".roadmap-slider-nav").slick("getSlick").slideCount);


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
                                            let thisIndex = this.index;
                                            $('.tokens-distribution__list-item').each(function(i, item){
                                                if($(item).attr('data-index') == thisIndex){
                                                    $(item).addClass('active')
                                                }
                                            })
                                        },
                                        unselect: function () {
                                            let thisIndex = this.index;
                                            $('.tokens-distribution__list-item').each(function(i, item){
                                                if($(item).attr('data-index') == thisIndex){
                                                    $(item).removeClass('active');
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        },
                        series: [{
                            type: 'pie',
                            name: 'Betex token distribution',
                            innerSize: '50%',
                            colorByPoint: true,
                            data: [{
                                name: 'Token Pre-Sale Round 1',
                                y: 5
                            }, {
                                name: 'Token Pre-Sale Round 1',
                                y: 15
                            }, {
                                name: 'Token Sale',
                                y: 40
                            }, {
                                name: 'Bounty',
                                y: 2
                            }, {
                                name: 'Reserve',
                                y: 8
                            }, {
                                name: 'Founders & Team',
                                y: 30
                            }
                            ],
                            colors: [
                                '#FFDD00',
                                '#FF505A',
                                '#3F4FC9',
                                '#6B6B6B',
                                '#A9F5FE',
                                '#2CD498'
                            ]
                        }]
                    });

                    $('.tokens-distribution').removeClass('animate')

                    //locked img
                    /*var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
                     svgimg.setAttributeNS(null,'height','27');
                     svgimg.setAttributeNS(null,'width','21');
                     svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/home-page/locked.svg');
                     svgimg.setAttributeNS(null,'x','300');
                     svgimg.setAttributeNS(null,'y','70');
                     svgimg.setAttributeNS(null, 'visibility', 'visible');
                     svgimg.classList.add("locked-icon");
                     $('.highcharts-point.highcharts-color-0 ').after(svgimg);*/

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
                                            $('.funds-item').each(function(i, item){
                                                if($(item).attr('data-index') == thisIndex){
                                                    $(item).addClass('active')
                                                }
                                            })
                                        },
                                        unselect: function () {
                                            let thisIndex = this.index;
                                            $('.funds-item').each(function(i, item){
                                                if($(item).attr('data-index') == thisIndex){
                                                    $(item).removeClass('active');
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
                                name: 'Platform Development',
                                y: 40
                            }, {
                                name: 'Marketing',
                                y: 15
                            }, {
                                name: 'Legal Support',
                                y: 15
                            }, {
                                name: 'Operational Costs',
                                y: 15
                            }, {
                                name: 'Research',
                                y: 5
                            }, {
                                name: 'Reserve',
                                y: 10
                            }
                            ],
                            colors: [
                                '#FFDD00',
                                '#FF505A',
                                '#3F4FC9',
                                '#6B6B6B',
                                '#A9F5FE',
                                '#2CD498'
                            ],

                        }]
                    });

                }
            });

            $('.nav__list').on('click', '.nav__list-item', function (e) {
                e.preventDefault();
                let _this = e.target;
                /*if(!$('.payouts').is('.visible')){
                    $('.payouts').attr({'data-animated':'true'});
                    animated = true;
                    setTimeout(function () {
                        $('.payouts').attr({'data-animated':'false'});
                        animated = false;
                    },1500)
                    // console.log(animated, $('.payouts').attr('data-animated'));
                }*/

                let top = 0;
                $('.nav__list-item').removeClass('active');
                $(this).addClass('active');
                let id = $(this).children().attr('href');
                setLocation(id);
                if(id == '#roadmap'){
                    top = 100;
                }else if(id == '#team'){
                    top = 70;
                }
                $('html, body').animate({
                    scrollTop: $(id).offset().top - top
                }, 1000);

            });

            $('.mob-menu__nav').on('click', '.mob-menu__nav-item', function (e) {
                e.preventDefault();
                $('body').removeClass('menu-open');
                let id = $(this).children().attr('href');

                $('html, body').animate({
                    scrollTop: $(id).offset().top - 30
                }, 1000);
            });

            $('#go-subscribe').on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $('#contacts').offset().top
                }, 1000);
            })

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

            $('.mob-menu__close').on('click', ()=> {

                $('body').removeClass('menu-open')
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
            });

            $('.accordion__wrap:not(.open)').find('.accordion__content').hide();
            $('.accordion__wrap').on('click',function (e) {
                e.preventDefault();
                if($(this).hasClass('open')){
                    $(this).removeClass('open').find('.accordion__content').slideUp();
                }else{
                    $(this).addClass('open').find('.accordion__content').slideDown();
                    $(this).siblings().removeClass('open').find('.accordion__content').slideUp()
                }
            });

            // currency select
            $('.currency-list__item').on('click', function() {
                $('.currency-list__item').removeClass('current');
                $(this).addClass('current');
            });
            $(document).on('click', function(e){
                if (!$(e.target).closest(".currency-list.open").length) {
                    $('.currency-list').removeClass('open');
                }
            });
            $('.contribute-form__currency').on('click', function() {
                $(this).find('.currency-list').toggleClass('open')
            });

            // auto complete country
            let numberOfCountries = 6;
            if(isMobile.any()){
                numberOfCountries = 3;
            }
            $("#country").easyAutocomplete({
                url: "./countries.json",
                getValue: "name",
                list: {
                    onShowListEvent: function() {
                        $("#country").parent('.easy-autocomplete').addClass('open')
                    },
                    onHideListEvent: function() {
                        $("#country").parent('.easy-autocomplete').removeClass('open')
                    },
                    maxNumberOfElements: numberOfCountries,
                    match: {
                        enabled: true
                    },
                    sort: {
                        enabled: true
                    },
                    showAnimation: {
                        type: "fade", //normal|slide|fade
                        time: 300,
                        callback: function() {}
                    },
                    hideAnimation: {
                        type: "fade", //normal|slide|fade
                        time: 300,
                        callback: function() {}
                    }
                }
            });

            $('#contribute-full-popup').popup({
                color: 'white',
                opacity: 1,
                transition: '0.3s',
                scrolllock: true,
                vertical: 'top',
                onopen: function() {
                    setLocation('#contribute');
                    $('html').find('body').css({'marginRight':scrollWidth + "px"}).find('.header').css({'paddingRight':scrollWidth + 10 + "px"}); // remove scroll
                },
                onclose: function() {
                    history.pushState("", document.title, window.location.pathname);
                    $('html').find('body').attr('style','').find('.header').attr('style','');  // add scroll
                }
            });
            if(locationHash == '#contribute') {
                $('#contribute-full-popup').popup('show');
            }
            // .unbind()
            $('.contribute-form__input#name, .contribute-form__input#email, .contribute-form__input#invested_amount, .contribute-form__input#country').blur( function(){
                var id = $(this).attr('id'),
                    val = $(this).val(),
                    count = 0;

                switch(id){
                    case 'name':
                        var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                        if(val.length > 2 && val != '' && rv_name.test(val)){
                            $(this).closest('.contribute-form__field').addClass('not_error').removeClass('error');
                        }else
                        {
                            $(this).closest('.contribute-form__field').removeClass('not_error').addClass('error');
                        }
                        break;
                    case 'email':
                        var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                        if(val != '' && rv_email.test(val)){
                            $(this).closest('.contribute-form__field').addClass('not_error').removeClass('error');
                        }else
                        {
                            $(this).closest('.contribute-form__field').removeClass('not_error').addClass('error');
                        }
                        break;
                    case 'invested_amount':
                        var rv_amount = /^[0-9]+/;
                        if(val.length > 0 && val != '' && rv_amount.test(val)){
                            $(this).closest('.contribute-form__field').addClass('not_error').removeClass('error');
                        }else
                        {
                            $(this).closest('.contribute-form__field').removeClass('not_error').addClass('error');
                        }
                        break;
                    case 'country':
                        var rv_country = /^[a-zA-Zа-яА-Я]+$/;
                        if(val != '' && rv_country.test(val)){
                            $(this).closest('.contribute-form__field').addClass('not_error').removeClass('error');
                        }else
                        {
                            $(this).closest('.contribute-form__field').removeClass('not_error').addClass('error');
                        }
                        break;
                }
            });
            $('form#contribute-form').submit(function(e){
                e.preventDefault();

                var $form = $(this);
                var formResponse = JSON.stringify({
                    'name': $($form).find('#name').val(),
                    'email': $($form).find('#email').val(),
                    'invested_amount': $($form).find('#invested_amount').val(),
                    'country': $($form).find('#country').val()
                });
                if($('.not_error').length == 4) {
                    $.ajax({
                        url: 'https://betexlab.com/sendmail',
                        type: 'post',
                        contentType: "application/json",
                        dataType: "json",
                        data: formResponse,
                        beforeSend: function(xhr, textStatus){

                        },
                        success: function(response){
                            // $form.find('[type="text"], textarea').val('');
                            // $form.find('[type="submit"]').removeAttr('disabled');
                            // $form.append('<span class="response-text">' + response + '</span>');
                            // $('label').removeClass('focus');
                        }
                    });
                    return true;
                } else {
                    e.preventDefault();
                    $('.contribute-form__input.required').closest('.contribute-form__field').not($('.not_error')).addClass('error');
                    console.log('false');
                    return false;
                }
            });


            /**********************************************************/
            //******************Business model*************************/
            /**********************************************************/
            // buttons
            /*$('.step-1').on('click', function() {
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
            });*/

            $('.payouts').on('inview', function(event, isInView) {
                if (isInView) {
                    // && !donutcharInit
                    $('.payouts').addClass('visible');
                    /*setTimeout(()=>{

                    },1000)*/
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
            var playButtonVisible = true;
            var headerVisible = true;

            function modelAnimation () {
                /*if($('.business-model').offset().top <= $(window).scrollTop() + 100
                    && $('.business-model').offset().top + $('.business-model').height() >= $(window).scrollTop()
                    && !animated
                    && $(window).innerWidth() >= 1024)*/
                if(!animated && $(window).innerWidth() >= 1024){

                    playButtonVisible = false;
                    headerVisible = false;
                    animated = true;
                    $('.header').addClass('up');
                    $('.payouts__replay').addClass('hidden');

                    if($(window).height() <= 700){
                        $('html, body').animate({
                            scrollTop: $('.payouts').offset().top
                        }, 500);
                    }else {
                        $('html, body').animate({
                            scrollTop: $('.business-model').offset().top + 100
                        }, 500);
                    }

                    setTimeout(() => {
                        $('.payouts').addClass('visible animate');
                    },1500);

                    $('html').addClass('over-hidden').find('body').css({'marginRight':scrollWidth + "px"})
                        .find('.header').css({'paddingRight':scrollWidth + 10 + "px"}); // remove scroll

                    // $('.payouts').attr({'data-animated':'false'}); // replay button hidden on scroll if data false

                    // add steps
                    setTimeout(()=>{
                        $('.payouts__wrap').addClass('step-1');
                    },3000);
                    setTimeout(()=>{
                        $('.payouts__wrap').addClass('step-2')
                    },10000);
                    setTimeout(()=>{
                        if($(window).height() <= 830){
                            $('html, body').animate({
                                scrollTop: $('.payouts').offset().top + 200
                            }, 500);
                        }
                        $('.payouts__wrap').addClass('step-3')
                    },15000);
                    setTimeout(()=>{
                        if($(window).height() > 830){
                            $('html, body').animate({
                                scrollTop: $('.payouts').offset().top
                            }, 500);
                        }

                        $('.payouts__wrap').addClass('step-4')
                    },17000);

                    setTimeout(()=>{
                        $('html').removeClass('over-hidden').find('body').attr('style','')
                            .find('.header').attr('style','');  // add scroll
                        $('.payouts').attr({'data-animated':'true'});
                        $('.payouts__replay').removeClass('hidden');
                        headerVisible = true;
                    },19000)
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
            $('.payouts__play').on('click', function (e) {
                e.preventDefault();
                $('.payouts').removeClass('visible');
                $(this).addClass('hidden');
                $('.payouts__wrap').removeClass('step-1 step-2 step-3 step-4');
                setTimeout(()=>{
                    animated = false;
                    modelAnimation();
                }, 1500)

            });

            // hidden/show play/restart buttons on scroll
            /*$(window).on('scroll', () => {
                // modelAnimation();
                if($('.payouts').is('.visible')){
                    if($(window).scrollTop() + $(window).innerHeight() >= $('.payouts').offset().top
                        && !($(window).scrollTop() + $(window).innerHeight() >= $('.payouts').offset().top + $(window).innerHeight() - 100)){

                        if($('.payouts').attr('data-animated') == "true"){
                            $('.payouts__replay').removeClass('hidden');
                        }else if(playButtonVisible){
                            $('.payouts__play').removeClass('hidden');
                        }

                    }else if($(window).scrollTop() + $(window).innerHeight() >= $('.payouts').offset().top + $(window).innerHeight()){

                        $('.payouts__replay').addClass('hidden');
                        $('.payouts__play').addClass('hidden');

                    }else{
                        $('.payouts__replay').addClass('hidden');
                        $('.payouts__play').addClass('hidden');
                    }
                }
            });*/

            var navLinks = [];
            $('.nav__list-item').each(function (i, item) {
                navLinks.push($(item).find('a').attr('href'))
            });

            let previousScroll = 0;
            $(window).on('scroll', function() {
                for(var i = 0; i < navLinks.length; i++){
                    var elem = document.getElementById(navLinks[i].slice(1)),
                        elemTop = elem.getBoundingClientRect().top;
                    if($(window).scrollTop() < 300) {
                        history.pushState("", document.title, window.location.pathname);
                    } else if(elemTop <= 250 && elemTop >= 0){
                        setLocation(navLinks[i]);
                    }
                }

                // show/hide header on scroll up/down
                /*let currentScroll = $(this).scrollTop();
                if (currentScroll > previousScroll &&
                    currentScroll > 80 &&
                    headerVisible){
                    $('.header').addClass('up white');
                } else if(headerVisible) {
                    $('.header').removeClass('up');
                }
                if($(window).scrollTop() < 80) {
                    $('.header').removeClass('white');
                }
                previousScroll = currentScroll;*/
                let currentScroll = $(this).scrollTop();
                if (currentScroll > previousScroll &&
                    currentScroll > 80 &&
                    headerVisible){
                    $('.header').addClass('up white');
                } else if(headerVisible) {
                    $('.header').removeClass('up');
                }
                if($(window).scrollTop() < 80) {
                    $('.header').removeClass('white');
                }
                previousScroll = currentScroll;
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
        scrollEvents: () => {},

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

    function setLocation(curLoc){
        try {
            history.pushState(null, null, curLoc);
            return;
        } catch(e) {}
        return window.location.pathname + window.location.search + window.location.hash;
        // location.hash = '#' + curLoc;
    }

})(jQuery);
