require('materialize-css');

// フッターメニューのアニメーション(PC)
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.js-footer-btn.is-pc');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});

// フッターメニューのアニメーション(スマホ)
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.js-footer-btn.is-sp');
  var instances = M.FloatingActionButton.init(elems, {
    hoverEnabled: false
  });
});

jQuery(document).ready(function () {
  // メニューボタン以外のボタンアニメーションをOFFにする
  // $('.btn-floating.js-off').off('_handleFABClick');
  // $('.btn-floating.js-off').get(0)._handleFABClick = "";

  // [SP]フッターのアイコン対応
  var $fotterBtnSp = $('.js-footer-btn.is-sp');
  $fotterBtnSp.on('click', function () {
    if ($(this).hasClass('animetion-down-fotterBtn')) {
      $(this).removeClass('animetion-down-fotterBtn');
      $(this).addClass('animetion-up-fotterBtn');
    } else {
      $(this).addClass('animetion-down-fotterBtn');
      $(this).removeClass('animetion-up-fotterBtn');
    }
  });

  // カードを押したときに文字を全て表示させる
  $('.js-clickCard').on('click', function () {
    $(this).find('.js-textAccordion').toggleClass('is-active');
  });

  // トップに戻る動作
  $('.js-top').on('click', function () {
    $('body, html').animate({
      scrollTop: 0
    }, 400);
  })
});