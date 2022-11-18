$(window).on('load', function(){
  mainScript.swiperFnc();
  mainScript.clickFnc();
  mainScript.scrollFnc();
  mainScript.mouseFnc();
  mainScript.gsapFnc();
})




var bullet = ['군상(1998)', '누드 남자(1926)', '평화(1980)' ,'자화상(1973)' ,'노란 저고리(1929)' ,'환희(1970)' ,'영산홍(1967)'];

const mainScript = {
  swiperFnc: function(){
    // thumb bg슬라이드
    var swiper = new Swiper(".thumb-slide", {
      loop: true,
      speed: 1000,
      spaceBetween: 10,
      effect: "fade",
      freeMode: true,
      watchSlidesProgress: true,
      pagination: {
        el: ".fraction",
        type: "fraction",
      },
    });
    // 메인 슬라이드
    var mainSwiper = new Swiper(".main-slide", {
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      touchRatio: 0,
      speed: 1500,
      pagination: {
        el: ".pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<div class="' + className + '"><span>' + (bullet[index]) + '</span></div>';
        }
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
    // news슬라이드
    var newsSwiper = new Swiper(".news-slide", {
      spaceBetween: 80,
      slidesPerView: 'auto',
      speed: 1000,
      pagination: {
        el: ".fraction",
        type: "fraction",
      },
      navigation: {
        nextEl: ".next",
        prevEl: ".prev",
      },
    });
    // news 프로그래스바
    var progressbar = new Swiper(".news-slide", {
      spaceBetween: 80,
      slidesPerView: 'auto',
      speed: 1000,
      pagination: {
        el: ".prograssbar",
        type: "progressbar",
      },
    });
    newsSwiper.controller.control = progressbar;
  },
  clickFnc: function(){
    // 클릭시 텍스트 애니메이션처리
    $('.sc-newsletter .input-box .placeholder').click(function(){
      $(this).addClass('on').siblings('.input-email').focus();
    })
    $('.footer .newsletter-area .input-box .placeholder').click(function(){
      $(this).addClass('on').siblings('.input-email').focus();
    })
    // 상단으로
    // btn-top
    $('.footer .addr-area .btn-top').click(function(){
      $('html, body').animate({scrollTop: 0}, 400);
    })
  },
  scrollFnc: function(){
    // header
    lastScroll = 0;

    gsap.set('.gnb .gnb-item', {
      opacity: 0,
      yPercent: -100,
    })

    const gnbActive = gsap.to('.gnb .gnb-item', {
      opacity: 1,
      yPercent: 0,
      stagger: 0.15,
    })

    gnbFlag = false;
    $(window).scroll(function(){
      curr = $(this).scrollTop();
      if(curr >= 50) {
        if(curr > lastScroll) {
          $('.header').addClass('hide');
          gnbFlag = true;
        } else {
          $('.header').removeClass('hide');
          if(!$('.header').hasClass('hide') && gnbFlag) {
            gnbActive.restart();
            gnbFlag = false;
          }
        }
        lastScroll = curr;
      }
    })
  },
  mouseFnc: function(){
    // 미우스 움직일시 메인슬라이드 버튼화살표 보이게처리
    $('[data-mouse]').mousemove(function(e){
      x = e.offsetX;
      y = e.offsetY;
      child = $(this).find('svg');
      gsap.to(child, {
        opacity: 1,
        x:x,
        y:y
      })
    })
    $('[data-mouse]').mouseout(function(){
      child = $(this).find('svg');
      gsap.to(child, {
        opacity: 0,
      })
    })

    // 마우스 오버시 이미지 보이게처리
    $('.reference-item').addClass('active');
    $('.reference-item').mouseover(function(){
      if($(this).hasClass('active')){
        $(this).siblings('.reference-item').removeClass('active');
      } else {
        $(this).addClass('active').siblings('.reference-item').removeClass('active');
      }
    })
    $('.reference-item').mouseout(function(){
      $('.reference-item').addClass('active');
    })

    $('.reference-item').mouseover(function(){
      target = $(this).data('target');
      $(target).addClass('active').siblings().removeClass('active');
    })
  },
  gsapFnc: function(){
    // sc-visual
    $('.sc-visual .headline').each(function(i, el){
      child = $(this).find('.title');
      gsap.to(child,{
        scrollTrigger:{
          trigger: el,
          start: "top 90%",
          end: "bottom 70%",
          // markers: true,
          scrub: 3,
        },
        stagger: 0.1,
        opacity: 1,
        xPercent: 100,
      })
    })
    gsap.to('.sc-visual .thumb-slide', {
      scrollTrigger:{
        trigger: '.sc-visual',
        start: "top top",
        end: "bottom bottom",
        scrub:1,
        // markers: true,
      },
      clipPath: 'inset(0% 0% 0%)'
    })
    gsap.to('.sc-visual .thumb-slide .swiper-slide img', {
      scrollTrigger:{
        trigger: '.sc-visual',
        start: "top top",
        end: "bottom bottom",
        scrub:1,
        // markers: true,
      },
      yPercent:-10
    })
    gsap.to('.sc-visual .thumb-slide .fraction', {
      scrollTrigger:{
        trigger: '.sc-visual',
        start: "top top",
        end: "80% bottom",
        scrub:1,
        // markers: true,
      },
      opacity: 0,
    })
    gsap.to('.sc-visual .main-slide .pagination', {
      scrollTrigger:{
        trigger: '.sc-visual',
        start: "top top",
        end: "80% bottom",
        scrub:1,
        // markers: true,
      },
      opacity: 0,
      yPercent: -100,
    })

    // sc-about
    const aboutAni = gsap.timeline({
      scrollTrigger: {
        trigger: '.sc-about',
        start: 'top top',
        end: '90% bottom',
        // markers :true,
      },
    })
    aboutAni
    .addLabel('a')
    .to('.sc-about .sub-title', {opacity: 1, yPercent: -20, duration: 1}, 'a')
    .to('.sc-about .btn-more', {opacity: 1, yPercent: -20, duration: 1}, 'a+=0.2')
    .to('.sc-about .desc', {opacity: 1, yPercent: -20, duration: 1}, 'a+=0.4')

    //sc-reference
    gsap.to('.sc-references .reference-item a', {
      scrollTrigger:{
        trigger: '.sc-references',
        start: "top 80%",
        end: "bottom bottom",
        // markers: true,
      },
      stagger: 0.2,
      opacity: 1,
      yPercent:-100,
    })
    gsap.to('.sc-references .inner2 .img-box', {
      scrollTrigger:{
        trigger: '.sc-about',
        start: "top 80%",
        end: "bottom 60%",
        scrub:2,
        // markers: true,
      },
      yPercent:100,
    })
    gsap.to('.sc-references .inner2 .img-box img', {
      scrollTrigger:{
        trigger: '.sc-about',
        start: "top top",
        end: "bottom bottom",
        scrub:3,
        // markers: true,
      },
      scale:1,
    })

    // sc-catalogue
    gsap.to('.sc-catalogue', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top bottom",
        end: "70% bottom",
        scrub: 1,
        // markers: true,
      },
      clipPath: 'inset(0% 0% 0%)'
    })
    gsap.to('.sc-catalogue .headline', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top bottom",
        end: "70% bottom",
        scrub: 1,
      },
      opacity: 1,
      yPercent: -100,
    })
    const catalogueAni = gsap.timeline({
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: 'top top',
        end: '80% bottom',
        // markers :true,
      },
    })
    catalogueAni
    .addLabel('a')
    .to('.sc-catalogue .sub-title', {opacity: 1, yPercent: -20, duration: 1}, 'a')
    .to('.sc-catalogue .btn-more', {opacity: 1, yPercent: -20, duration: 1}, 'a+=0.2')
    .to('.sc-catalogue .desc', {opacity: 1,yPercent: -20, duration: 1}, 'a+=0.4')
    gsap.to('.sc-catalogue .inner4 .img-box .img1', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      yPercent: -20,
    })
    gsap.to('.sc-catalogue .inner4 .img-box .img1 img', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      yPercent: -10,
    })
    gsap.to('.sc-catalogue .inner4 .img-box .img2', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      yPercent: 40,
    })
    gsap.to('.sc-catalogue .inner4g-box .img2 img', {
      scrollTrigger: {
        trigger: '.sc-catalogue',
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
      yPercent: -10,
    })
    
    // sc-news
    gsap.from('.sc-news .news-slide', {
      scrollTrigger: {
        trigger: '.sc-news',
        start: 'top 80%',
        end: 'bottom bottom',
        // markers: true,
      },
      xPercent: 20,
      duration: 0.5,
      ease: "linear", 
    })

    // sc-newsletter
    gsap.to('.sc-newsletter .input-box .placeholder', {
      scrollTrigger: {
        trigger: '.sc-newsletter',
        start: 'top 30%',
        end: '80% bottom',
        // markers: true,
        scrub: 1,
      },
      opacity: 1,
      duration: 2,
    })
    const newsletterAni = gsap.timeline({
      scrollTrigger: {
        trigger: '.sc-newsletter',
        start: 'top 80%',
        end: 'bottom bottom',
        // markers: true,
      },
    })
    newsletterAni
    .addLabel('a')
    .to('.sc-newsletter .txt-box .sub-title', {opacity: 1, yPercent: -20, duration: 1}, 'a') 
    .to('.sc-newsletter .txt-box .desc', {opacity: 1, yPercent: -20, duration: 1}, 'a+=0.2')

    // footer
    const footerAni = gsap.timeline({
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 50%',
        end: 'bottom bottom',
        scrub: 3,
        // markers: true,
      }
    })
    footerAni
    .addLabel('a')
    .to('.footer .newsletter-area .headline', {opacity: 1}, 'a')
    .to('.footer .newsletter-area .line1', {width: '100%', duration: 2}, 'a+=1')
    .to('.footer .newsletter-area .input-box', {opacity: 1, duration: 2}, 'a+=1')
    .to('.footer .newsletter-area .line2', {width: '100%', duration: 2}, 'a+=1.3')
    
    gsap.from('.footer .addr-area .inner', {
      scrollTrigger: {
        trigger: '.footer .addr-area',
        start: 'top 100%',
        end: 'bottom 100%',
        scrub: 0,
        // markers: true,
      },
      ease: 'none',
      opacity: 0,
      yPercent: -50,
    })
  }
}