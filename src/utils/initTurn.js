const largeMagazineWidth = () => 2214;

const loadSmallPage = (page, pageElement) => {
  const img = pageElement.find('img');
  img.css({
    width: '100%',
    height: '100%',
  });
  img.unbind('load');
  img.attr('src', 'pages/' + page + '.jpg');
};

const loadLargePage = (page, pageElement) => {
  const img = $('<img />');
  img.load(() => {
    const prevImg = pageElement.find('img');
    $(this).css({ width: '100%', height: '100%', });
    $(this).appendTo(pageElement);
    prevImg.remove();
  });
  img.attr('src', 'pages/' + page + '-large.jpg');
};

const resizeViewport = () => {
  const width = $(window).width();
  const height = $(window).height();
  const options = $('.flipbook').turn('options');

  $('.flipbook').removeClass('animated');

  $('.flipbook-viewport').css({
    width: width,
    height: height,
  }).zoom('resize');

  if ($('.flipbook').turn('zoom') === 1) {
    var bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height),
    });
    if (bound.width % 2 !== 0) { bound.width -= 1; }

    if (bound.width !== $('.flipbook').width() ||
      bound.height !== $('.flipbook').height()) {
      $('.flipbook').turn('size', bound.width, bound.height);

      if ($('.flipbook').turn('page') === 1) {
        $('.flipbook').turn('peel', 'br');
      }
    }

    $('.flipbook').css({ top: -bound.height / 2, left: -bound.width / 2, });
  }

  $('.flipbook').addClass('animated');
};

const calculateBound = (d) => {
  const bound = { width: d.width, height: d.height, };
  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
    const rel = bound.width / bound.height;
    if (d.boundWidth / rel > d.boundHeight && d.boundHeight * rel <= d.boundWidth) {
      bound.width = Math.round(d.boundHeight * rel);
      bound.height = d.boundHeight;
    } else {
      bound.width = d.boundWidth;
      bound.height = Math.round(d.boundWidth / rel);
    }
  }

  return bound;
};

// Setup
export default function () {
  const flipbook = $('.flipbook');
  flipbook.turn({
    width: '100%',
    height: '99vh',
    elevation: 50,
    gradients: true,
    autoCenter: true,
  });

  $('.flipbook-viewport').zoom({
    flipbook,
    max: () => largeMagazineWidth() / flipbook.width(),
    when: {
      swipeLeft: () => {
        $(this).zoom('flipbook').turn('next');
      },
      swipeRight: () => {
        $(this).zoom('flipbook').turn('previous');
      },
      resize: (event, scale, page, pageElement) => {
        if (scale === 1) {
          loadSmallPage(page, pageElement);
        } else {
          loadLargePage(page, pageElement);
        }
      },

      zoomIn: function () {
        $('#slider-bar').hide();
        $('.made').hide();
        $('.flipbook').removeClass('animated').addClass('zoom-in');
      },

      zoomOut: function () {
        $('#slider-bar').fadeIn();
        $('.made').fadeIn();
        $('.flipbook').addClass('animated').removeClass('zoom-in');

        setTimeout(function () {
          $('.magazine').addClass('animated').removeClass('zoom-in');
          resizeViewport();
        }, 0);
      },
    },
  });

  $(document).keydown(function (e) {
    const previous = 37;
    const next = 39;
    switch (e.keyCode) {
    case previous:
      $('.flipbook').turn('previous');
      e.preventDefault();
      break;
    case next:
      $('.flipbook').turn('next');
      e.preventDefault();
      break;
    }
  });

  $('.prev-button').click(function () {
    $('.flipbook').turn('previous');
  });
  $('.next-button').click(function () {
    $('.flipbook').turn('next');
  });
};
