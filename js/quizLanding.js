$(function () {
  ("use strict");

  $(".header__list").on("click", function (e) {
    if (e.target.classList.contains("add-material")) {
      $(".popup-main").text("غير متوفر الأن");
      $(".popup-main").fadeIn(150);
      setTimeout(function () {
        $(".popup-main").fadeOut(350);
      }, 1000);
    }
  });

  $.getJSON("../json/quizLanding.json", function (data) {
    if (
      data[localStorage.getItem("quizIndex")]["materialQuizes"].length === 0
    ) {
      $(".not-found").show(0);
    }

    $(document).prop(
      "title",
      "Test Bank | " +
        textTransformCapitalize(
          data[localStorage.getItem("quizIndex")]["materialName"]
        )
    );
    $(".load-circle").fadeOut(0);
    $(data[localStorage.getItem("quizIndex")]["materialQuizes"]).each(function (
      index,
      el
    ) {
      const quizBox = `
      <a href="quizArea.html" class="quiz-box">
        <h2 class="quiz-box__heading">${el["quizName"]}</h2>
        <p class="quiz-box__desc">${el["quizDesc"]}</p>
      </a>
      `;

      $(".section-quizes").append(quizBox);
    });

    setIndex();
  }).fail(function () {
    console.log("An Error occurred");
  });

  function setIndex() {
    $(".quiz-box").each(function (index, el) {
      $(el).on("click", function () {
        localStorage.setItem("quizNumber", index);
      });
    });
  }

  function textTransformCapitalize(text) {
    return text.toLowerCase()[0].toUpperCase() + text.toLowerCase().slice(1);
  }
});
