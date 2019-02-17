require('materialize-css');

// フッターメニューのアニメーション(PC)
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn.is-pc');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left',
    hoverEnabled: false
  });
});

// フッターメニューのアニメーション(スマホ)
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.fixed-action-btn.is-sp');
  var instances = M.FloatingActionButton.init(elems, {
    hoverEnabled: false
  });
});

jQuery(document).ready(function () {
  // [SP]フッターのアイコン対応
  var $fotterBtnSp = $('.fixed-action-btn.is-sp');
  $fotterBtnSp.on('click', function() {
    $(this).toggleClass('animetion-down-fotterBtn');
  });

  // カードを押したときに文字を全て表示させる
  $('.js-clickCard').on('click', function () {
    $(this).find('.js-textAccordion').toggleClass('is-active');
  });
});

