let datat = [];

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
    if (!localStorage.getItem("grads")) {
      for (let i = 0; i < data.length; i++) {
        datat[i] = [];
        for (let j = 0; j < data[i]["materialQuizes"].length; j++) {
          datat[i][j] = null;
        }
      }
      localStorage.setItem("grads", JSON.stringify(datat));
    }

    // Check If The material have exams
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

    $(".section-quizes").addClass(
      `section-quizes--${
        data[localStorage.getItem("quizIndex")].quizType || "english-quiz"
      }`
    );

    let alert = data[localStorage.getItem("quizIndex")].alert;

    if (alert?.length) {
      $(alert)?.each(function (i, mes) {
        const alertBox = `
      <div class="alert">
      <h3 class="alert--${mes.type}">
        ${mes.text}
      </h3>
      </div>
      `;

        $(".section-quizes").append(alertBox);
        $(".alert").on("click", (mes) => $(mes.target).fadeOut(100));
      });
    }

    $(data[localStorage.getItem("quizIndex")]["materialQuizes"]).each(function (
      index,
      el
    ) {
      let quizInfo = JSON.parse(localStorage.getItem("grads"))[
        localStorage.getItem("quizIndex")
      ][index];

      const quizBox = `
      <a href="quizArea.html" class="quiz-box" >
      ${
        quizInfo
          ? `
          <span class="quiz-box__grade">
          
          <sup>${quizInfo?.grade}</sup>/<sub>${quizInfo?.numberOfQuestions}</sub>
            
            
          </span>`
          : ""
      }
        <h2 class="quiz-box__heading">${el["quizName"]}</h2>
        <p class="quiz-box__desc">${el["quizDesc"]}</p>
      </a>
      `;

      let BC;

      if (quizInfo?.grade / quizInfo?.numberOfQuestions == 1) {
        BC = "#1E90ff";
      } else if (
        quizInfo?.grade / quizInfo?.numberOfQuestions < 1 &&
        quizInfo?.grade / quizInfo?.numberOfQuestions >= 0.7
      ) {
        BC = "#006400";
      } else if (
        quizInfo?.grade / quizInfo?.numberOfQuestions < 0.7 &&
        quizInfo?.grade / quizInfo?.numberOfQuestions >= 0.4
      ) {
        BC = "#FFA500";
      } else {
        BC = "#FF0000";
      }
      $(".section-quizes").append(quizBox);

      if (quizInfo) {
        $(".quiz-box").last().css("backgroundColor", BC);
        $(".quiz-box").last().css("backgroundImage", "none");
        $(".quiz-box").last().css("boxShadow", `0px 5px 15px ${BC}`);

        $(".quiz-box")
          .last()
          .children(".quiz-box__grade")
          .css("backgroundColor", BC);

        $(".quiz-box")
          .last()
          .children(".quiz-box__grade")
          .css("backgroundImage", "none");
      }
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
