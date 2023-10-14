$(function () {
  ("use strict");

  // GLOBAL VARIABLES

  $.holdReady(true);

  const sectionMaterials = document.querySelector(".section-materials");

  $.getJSON("../json/materials.json", function (data) {
    $(data.materials).each(function (index, materialInfo) {
      const material = `
      <div class="material-box material-box--${index + 1} " data-names="${
        materialInfo["data-names"]
      }"
      style="background-image:linear-gradient(to left, rgba(#000, 0.6), rgba(#000, 0.4)), url(img/${
        materialInfo.img
      })">
        <h2 class="material__name">${materialInfo.arabicName}<br>${
        materialInfo.englishName
      }</h2>
        <p class="material__date">أخر تعديل <span> ${
          materialInfo.date
        }</span></p>
        <p class="material__author">الاسم <span>${
          materialInfo.author
        }</span></p>

        <a href = "html/quizLanding.html" class="btn btn--purple" id="material-button ">قائمة الأختبارات</a>
      </div>
      `;

      // ;

      $(".load-circle").fadeOut(0);

      $(sectionMaterials).append(material);

      // $(material).show();
      $(`.material-box--${index + 1}`).css(
        "background-image",
        `url(../img/${materialInfo.img}`
      );
    });

    materialObserver();
  }).fail(function () {
    console.log("An error has occurred.");
  });

  /////////////////
  /// SHOW MATERIALS WHEN REACH 15% FROM THE MATERIAL JUST WHEN VIEW WIDTH LESS THAN 1000PX

  function materialObserver() {
    if ($(window).width() <= 1000) {
      const allMaterials = document.querySelectorAll(".material-box");

      const revialMaterial = function (entries, observer) {
        const [entry] = entries;

        $(entries).each(function (index, entry) {
          if (entry.isIntersecting) {
            $(entry.target).removeClass("material-box--hidden");
          }
        });

        // $(entry.target).removeClass("material-box--hidden");

        observer.unobserve(entry.target);
      };

      const materialObserver = new IntersectionObserver(revialMaterial, {
        root: null,
        threshold: 0.12,
      });

      $(allMaterials).each((i, material) => {
        $(material)
          ?.not(".material-box--1")
          ?.not(".material-box--2")
          .addClass("material-box--hidden");

        materialObserver.observe(material);
      });
    }
    $(".material-box").each(function (index, el) {
      $(el)
        .children("a")
        .on("click", function () {
          localStorage.setItem("quizIndex", index);
        });
    });
  }
});
