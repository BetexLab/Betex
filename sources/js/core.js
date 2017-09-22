( ($) => {

    const APP = {

        /********************************************************************************
         * Init tasks
         ********************************************************************************/
        init: () => {

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
                touchMove: false
            });


            let ctx = document.getElementById("myChart");
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
                    // events: ['hover'],
                    onHover: (e,item) =>{
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
                    }
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

    function functionName() {

    }

})(jQuery);
