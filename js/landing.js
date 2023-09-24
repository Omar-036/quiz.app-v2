$(function () {
  ("use strict");

  // GLOBAL VARIABLES

  const sectionLanding = document.querySelector(".section-landing");

  const header = document.querySelector(".header");

  const headerHeight = $(header).outerHeight();

  const sectionMaterials = document.querySelector(".section-materials");

  const headerList = document.querySelectorAll(".header__list");

  $(".header__list").on("click", function (e) {
    if (e.target.classList.contains("add-material")) {
      $(".popup-main").text("غير متوفر الأن");
      $(".popup-main").fadeIn(150);
      setTimeout(function () {
        $(".popup-main").fadeOut(350);
      }, 1000);
    }
  });

  //////////////
  /// MAKE HEADER STIKY WHEN REACH IN THE BOTTOM OF THE LANDING SECTION
  const stickyHeader = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
      $(header).addClass("sticky");
    } else {
      $(header).removeClass("sticky");
    }
  };

  const landingObserver = new IntersectionObserver(stickyHeader, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
  });

  landingObserver.observe(sectionLanding);

  /////////////////
  //
  $("#scroll-to-material-section").click(function () {
    $("html, body").animate(
      {
        scrollTop: $(sectionMaterials).offset().top - headerHeight + 2,
      },
      400
    );
  });
});
