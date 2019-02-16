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
  $('.js-clickCard').on('click', function () {
    $(this).find('.js-textAccordion').toggleClass('is-active');
  });
});