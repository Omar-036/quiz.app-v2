$(function () {
  ("use strict");

  $.getJSON("../json/quizLanding.json", function (data) {
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
