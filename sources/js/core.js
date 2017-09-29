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

            //single accordion
            $('.betex-token__more').on('click', function() {
                $(this).toggleClass('open').siblings('.row').slideToggle()
            })

            $('.accordion-caption').on('click', function(){
                $(this).toggleClass('open').next('div').toggleClass('open').slideToggle()
            })

            // money-line cloud
            $('.money-line').on('mouseover', '.money-line__dot:not(.active)', function () {
                $('.money-line__dot').removeClass('active');
                $(this).addClass('active')
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

            /*let ctx = document.getElementById("myChart");
            let myChart = new Chart(ctx,{
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [30, 3, 5, 12, 50],
                        borderWidth: 0,
                        backgroundColor: [
                            '#eef1f5',
                            '#32abef',
                            '#ffdd00',
                            '#ff505a',
                            '#3f4fc9'
                        ]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Locked',
                        'Reserve',
                        'Tokens pre-sale',
                        'Bounty campaign',
                        'Tokens sale'
                    ]
                    // labels: false
                },
                options: {
                    enabled:{
                        enabled: false
                    },
                    legend: {
                        display: false
                    },

                    tooltips: {
                        enabled: false,
                        custom: function(tooltipModel) {

                            try {
                                if (tooltipModel.body && !isMobile.any()){
                                    function getBody(bodyItem) {
                                        return bodyItem.lines;
                                    }
                                    let bodyLines = tooltipModel.body.map(getBody);

                                    let innerHtml = '';

                                    bodyLines.forEach((body, i)=>{
                                        let colors = tooltipModel.labelColors[i];
                                        let style = 'background:' + colors.backgroundColor;
                                        style += '; border-color:' + colors.borderColor;
                                        style += '; border-width: 2px';
                                        /!*if(tooltipModel.dataPoints[0].index == 4){
                                        }*!/
                                        style += '; color: #fff';
                                        let span = '<span class="chartjs-tooltip-key" style="' + style + '">';
                                        innerHtml += span + body + '</span>';
                                    });

                                    let tableRoot = document.getElementById('tooltip');
                                    tableRoot.innerHTML = innerHtml;

                                    // Set caret Position
                                    tableRoot.classList.remove('above', 'below', 'no-transform');
                                    if (tooltipModel.yAlign) {
                                        tableRoot.classList.add(tooltipModel.yAlign);
                                    } else {
                                        tableRoot.classList.add('no-transform');
                                    }

                                    // Display, position, and set styles for font
                                    tableRoot.style.left = tooltipModel.caretX + 180 + 'px';
                                    tableRoot.style.top = tooltipModel.caretY - 50 + 'px';
                                    tableRoot.style.fontSize = tooltipModel.fontSize;
                                    tableRoot.style.fontStyle = tooltipModel._fontStyle;
                                    tableRoot.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
                                }else{
                                    timeoutID = setTimeout(()=>{
                                        document.querySelector(".chartjs-tooltip-key").remove();
                                        return
                                    },2000)
                                    clearTimeout(timeoutID)
                                }

                            } catch (err) {
                                if(err.message == 'timeoutID is not defined'){
                                    // console.log('clear chart');
                                }
                            }


                        }
                    },
                    // events: ['mouseout'],
                    onHover: (e,item) =>{
                        console.log('h');
                        if(item[0] != undefined){
                        }

                        let listItemRemove = document.querySelectorAll('.betex-tokens__list-item');
                        for(let i = 0; i < listItemRemove.length; i++){
                            listItemRemove[i].classList.remove('active');
                        }

                        let listItem = document.getElementsByClassName('betex-tokens__list-item');
                        Object.keys(listItem).map(function(key, i) {
                            if(item[0]._index == listItem[key].getAttribute('data-doughnut-index')){
                                let elem = document.querySelector('.'+listItem[key].className.split(' ')[0]+'.'+listItem[key].className.split(' ')[1])
                                elem.classList.add("active");
                            }
                        });
                    },

                }
            });*/

            google.charts.load("current", {packages:["corechart"]});
            google.charts.setOnLoadCallback(drawChart);
            function drawChart() {
                var data = google.visualization.arrayToDataTable([
                    ['Title', 'Percent'],
                    ['For founders and team are locked on smart contracts:',30],
                    ['Bounty campaign',3],
                    ['Tokens pre-sale',5],
                    ['Reserve for development and strategic aliances',12],
                    ['Tokens sale',50]
                ]);

                var options = {
                    title: '',
                    pieHole: 0.5,
                    pieSliceText: 'none',
                    height: 400,
                    backgroundColor: 'transparent',
                    legend: {position: 'none'},
                    colors: ['#eef1f5','#32abef','#ffdd00','#ff505a','#3f4fc9'],
                    slices: {
                        // 1: {offset: 0.1},
                    },
                    // chartArea:{left:20,top:0,width:'50%',height:'75%'}
                };

                var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                chart.draw(data, options);

                google.visualization.events.addListener(chart, 'select', selectHandler);
                function selectHandler(id) {
                    id = chart.getSelection()[0].row;

                    let listItem = document.getElementsByClassName('tokens-distribution__list-item');
                    Object.keys(listItem).map(function (key, i) {
                        let elem = document.querySelector('.' + listItem[key].className.split(' ')[0]+'.'+listItem[key].className.split(' ')[1])
                        elem.classList.remove("active");
                        if(id == listItem[key].getAttribute('data-doughnut-index')){
                            elem.classList.add("active");
                        }
                    });

                    // console.log(id);
                    options.slices = options.slices || {};
                    for (var x in options.slices) {
                        options.slices[x].offset = 0;
                    }
                    options.slices[id] = options.slices[id] || {};
                    options.slices[id].offset = 0.1;
                    chart.draw(data, options);


                }
            }

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

            $('.betex-mvp__link').on('click', (e)=> {
                e.preventDefault();
                let _this = e.target;
                let thisData = $(_this).attr('data-mon');
                if(!$(_this).hasClass('active')){
                    $(_this).addClass('active').siblings('.betex-mvp__link').removeClass('active');
                    $('.betex-mvp__link').addClass('not-active');
                    setTimeout(()=>{
                        $('.betex-mvp__link').removeClass('not-active');
                    },2000);

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

            if(!isMobile.any()){
                var s = skrollr.init({
                    forceHeight: false,
                    smoothScrollingDuration: 10,
                    easing: 'ease'
                });
            }
            $('.title-line__line').on('inview', function(event, isInView) {
                if (isInView) {
                    $(this).css({'width':'118px'})
                } else {

                }
            });
        },


        /********************************************************************************
         * Load tasks
         ********************************************************************************/
        load: () => {

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
