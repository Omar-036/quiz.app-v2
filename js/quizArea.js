$(function () {
  "use strict";

  $(".header__list").on("click", function (e) {
    if (e.target.classList.contains("add-material")) {
      $(".popup-main").text("غير متوفر الأن");
      $(".popup-main").fadeIn(150);
      setTimeout(function () {
        $(".popup-main").fadeOut(350);
      }, 1000);
    }
  });

  let rightAnswers = 0;
  let wrongAnswers = 0;

  $.getJSON("../json/quiz-data.json", function (data) {
    const quizMaterial =
      data[localStorage.getItem("quizIndex")][
        localStorage.getItem("quizNumber")
      ];

    let numberOfQuestions = quizMaterial["quiz-data"].length;

    $(document).prop(
      "title",
      "Test Bank | " + textCapitalizeFormat(quizMaterial["quizName"])
    );

    $(".load-circle").fadeOut(0);

    // QUIZ AREA
    const quizArea = `<div class="quiz-area quiz-area--${quizMaterial["quiz-type"]}-quiz"></div>`;
    $("main").append(quizArea);

    let alert = quizMaterial.alert;

    if (alert.length) {
      $(alert)?.each(function (i, mes) {
        const alertBox = `
      <div class="alert">
      <h3 class="alert--${mes.type}">
        ${mes.text}
      </h3>
      </div>
      `;

        $(".quiz-area").append(alertBox);
        $(".alert").on("click", (mes) => $(mes.target).fadeOut(100));
      });
    }

    // APPEND THE NAME OF QUIZ TO QUIZ AREA
    const quizName = `<h2 class="quiz-area__title u-text-center u-text-capitalize u-margin-top-small u-margin-bottom-medium">${quizMaterial["quizName"]}</h2>`;
    $(".quiz-area").append(quizName);

    // LOOP OVER QUISTIONS DATA QUESTION
    let curIndex = 0;
    let arrayOfQuestions = [];
    $(quizMaterial["quiz-data"])?.each(function (index, question) {
      arrayOfQuestions.push(question);
    });

    const shuffledQuestions = quizMaterial.shuffleQuestions
      ? arrayOfQuestions.slice().sort((a, b) => 0.5 - Math.random())
      : arrayOfQuestions;
    $(shuffledQuestions)?.each(function (index, question) {
      // APPEND QUIZ DATA BOX TO QUIZ AREA
      const quizData = `<div class="quiz-data"></div>`;
      $(".quiz-area").append(quizData);

      // APPEND QUESTION TITLE TO QUIZ DATA
      const quizDataQuestion = `<div class="quiz-data__question"></div>`;
      $(".quiz-data").last().append(quizDataQuestion);

      const questionTitle = `<div class="quiz-data__title"></div>`;
      $(".quiz-data__question").last().append(questionTitle);

      const questionTitleText = `<h3 class="quiz-data__title--text"><span>${
        question["answers"].length !== 0
          ? String(curIndex + 1).length > 1
            ? (curIndex += 1)
            : "0" + (curIndex += 1) + " - "
          : ""
      } </span>${textCapitalizeFormat(question["titleText"])}</h3>`;
      $(".quiz-data__title").last().append(questionTitleText);

      if (question.titleImage) {
        const questionTitleImage = `<img src="../img/${question.titleImage}" alt="Title Image" class="quiz-data__title--image" />`;
        $(".quiz-data__title").last().append(questionTitleImage);
      }

      // APPEND ANSWERS BOX TO QUIZ DATA QUESTION
      const answers = `<ul class="quiz-data__answers"></ul>`;
      $(".quiz-data__question").last().append(answers);

      const action = `<span class="quiz-data__action"></span>`;
      $(".quiz-data__question").last().append(action);

      // APPEND ANSWERS IN QUESTION DATA

      if (question["answers"].length === 0) numberOfQuestions -= 1;
      let arrayOfAnswers = [];
      $(question["answers"]).each(function (index, answer) {
        arrayOfAnswers.push(answer);
      });

      const shuffledAnswers = quizMaterial.shuffleAnswers
        ? arrayOfAnswers.slice().sort((a, b) => 0.5 - Math.random())
        : arrayOfAnswers;
      $(shuffledAnswers).each(function (index, answer) {
        let answerLi;

        answerLi = `<li class="quiz-data__answer  quiz-data__answer--${
          index + 1
        }">${answer}</li>`;

        $(".quiz-data__answers").last().append(answerLi);
        $(".quiz-data__answer")
          .last()
          .on("click", function (a) {
            if (answer === question.rightAnswer[0]) {
              $(a.target).addClass("true");

              $(a.target).parent().css("pointer-events", "none");

              $(a.target)
                .parent()
                .siblings(".quiz-data__action")
                .text(
                  `${
                    quizMaterial["quiz-type"] === "english"
                      ? "🔥 Perfect 🔥"
                      : "🔥 ممتاز 🔥"
                  }`
                );
              // $(a.target)
              //   .parent()
              //   .siblings(".quiz-data__action")
              //   .css("color", "#b338d8");
              $(a.target).parent().siblings(".quiz-data__action").show(0);

              rightAnswers += 1;
            } else {
              $(a.target).addClass("false");
              $(a.target)
                .parent()
                .siblings(".quiz-data__action")
                .text(
                  `${
                    quizMaterial["quiz-type"] === "english"
                      ? `The Right Answer Is ${
                          question.rightAnswer[1] || question.rightAnswer[0]
                        }`
                      : `الأجابة الصحيحة هي ${
                          question.rightAnswer[1] || question.rightAnswer[0]
                        }`
                  } 😔`
                );
              $(a.target)
                .parent()
                .siblings(".quiz-data__action")
                .css("color", "green");
              $(a.target).parent().siblings(".quiz-data__action").show(0);
              $(a.target)
                .siblings("")
                .each(function (i, sib) {
                  if (
                    $(sib).text() ===
                    (question.rightAnswer[1] || question.rightAnswer[0])
                  ) {
                    $(sib).addClass("true");
                  }
                });

              $(a.target).parent().css("pointer-events", "none");

              wrongAnswers += 1;
            }

            $(a.target)
              .parent()
              .parent()
              .siblings(".quiz-data__desc")
              .children(".show-more")
              .css("display", "flex");

            // SHOW QUIZ RESULT WHEN THE QUIZ IS END

            if (numberOfQuestions === rightAnswers + wrongAnswers) {
              appendQuizResult();
              $(".quiz__quiz-result").fadeIn(150);

              $(".quiz__next-step a").on("click", function () {
                if (this.classList.contains("pre")) {
                  if (localStorage.getItem("quizNumber") > 0) {
                    localStorage.setItem(
                      "quizNumber",
                      Number(localStorage.getItem("quizNumber")) - 1
                    );
                  } else {
                    $(this).removeAttr("href");
                    setPopupText(
                      quizMaterial["quiz-type"],
                      "There is no previous exam",
                      "لا يوجد أمتحان سابق"
                    );

                    $(".popup-main").fadeIn(150);
                    setTimeout(function () {
                      $(".popup-main").fadeOut(350);
                    }, 1000);

                    // $(this).css("pointer-events", "none");
                  }
                } else if (this.classList.contains("next")) {
                  if (
                    +localStorage.getItem("quizNumber") <
                    +data[localStorage.getItem("quizIndex")].length - 1
                  ) {
                    localStorage.setItem(
                      "quizNumber",
                      Number(localStorage.getItem("quizNumber")) + 1
                    );
                  } else {
                    $(this).removeAttr("href");
                    setPopupText(
                      quizMaterial["quiz-type"],
                      "Sorry, this was the last exam",
                      "عذراََ, كان هذا الأمتحان الأخير"
                    );

                    $(".popup-main").fadeIn(150);
                    setTimeout(function () {
                      $(".popup-main").fadeOut(350);
                    }, 1000);
                  }
                }
              });
            }
          });
      });

      if (question.hasDescription) {
        const dataDesc = `<div class="quiz-data__desc"></div>`;
        $(".quiz-data").last().append(dataDesc);

        const descButton = `<button class="show-more">
             <span><i class="fa-solid fa-arrow-right"></i></span>
          </button>`;
        $(".quiz-data__desc").last().append(descButton);
        if (quizMaterial["quiz-type"] === "english") {
          $(".show-more")
            .last()
            .html(
              "Read Description<span class='show-more--english'><i class='fa-solid fa-arrow-right'></i></span>"
            );
        } else {
          $(".show-more")
            .last()
            .html(
              "قراءة الوصف<span class='show-more--arabic'><i class='fa-solid fa-arrow-left'></i></span>"
            );
        }

        if (question?.video?.length > 0) {
          $(question.video).each(function (index, video) {
            const descVideo = `<video class="quiz-data__video" width="100%" ${
              video.autoplay ? "autoplay" : ""
            } ${video.muted ? "muted" : ""} ${video.control ? "control" : ""} ${
              video.loop ? "loop" : ""
            }>
        <source src="../video/${video.src}" type="video/mp4">
  
        Your browser does not support the video tag.
        </video>`;

            $(".quiz-data__desc").last().append(descVideo);
          });
        }

        if (question.image.length > 0) {
          $(question.image).each(function (index, image) {
            const descImage = `<img src="../img/${question.image[index]}" alt="image" class="quiz-data__image" width="100%"/>`;
            $(".quiz-data__desc").last().append(descImage);
          });
        }

        if (question.text.length > 0) {
          $(question.text).each(function (index, image) {
            const descText = `<p class="quiz-data__text"><span><i class="fa-solid fa-minus"></i></span> ${question.text[index]}</p>`;
            $(".quiz-data__desc").last().append(descText);
          });
        }
      }
    });

    // FUNCTION TO APPEND QUIZ RESULT AND NEXT STEP BUTTONS TO QUIZ AREA
    function appendQuizResult() {
      //

      let nextStep = "";
      if (quizMaterial["quiz-type"] === "english") {
        nextStep = `

        
    <div class="quiz__next-step">
          <a href="quizArea.html"  class="quiz__next-step--previous pre">previous exam</a>
          <a href="quizArea.html" class="quiz__next-step--re re">Re-examination</a>
          <a href="quizArea.html" class="quiz__next-step--next next">next exam</a>
        </div>
    `;
      } else {
        nextStep = `
    <div class="quiz__next-step">
          <a href="quizArea.html" class="quiz__next-step--previous pre">الأمتحان السابق</a>
          <a href="quizArea.html" class="quiz__next-step--re re">أعادة الأمتحان</a>
          <a href="quizArea.html" class="quiz__next-step--next next">الأمتحان التالي</a>
        </div>
    `;
      }

      let quizResult = "";
      if (quizMaterial["quiz-type"] === "english") {
        quizResult = `
    <div class="quiz__quiz-result">
          <h3 class="quiz__quiz-result--correct-answers">
            correct answers<span> { ${rightAnswers} } </span>
          </h3>
          <h3 class="quiz__quiz-result--incorrect-answers">
            wrong answers<span> { ${wrongAnswers} } </span>
          </h3>
          <h3 class="quiz__quiz-result--greeter">
            ${greeterText("english", rightAnswers, rightAnswers + wrongAnswers)}
          </h3>
        </div>
    `;
      } else {
        quizResult = `
    <div class="quiz__quiz-result">
          <h3 class="quiz__quiz-result--correct-answers">
            الأجابات الصحيحة<span>  { ${rightAnswers} } </span>
          </h3>
          <h3 class="quiz__quiz-result--incorrect-answers">
            الأجابات الخاطئة<span>  { ${wrongAnswers} } </span>
          </h3>
          <h3 class="quiz__quiz-result--greeter">
            ${greeterText("arabic", rightAnswers, rightAnswers + wrongAnswers)}
          </h3>
        </div>
    `;
      }
      $(".quiz-area").append(quizResult);
      $(".quiz-area").append(nextStep);
    }

    // ON CLICK ON IMAGE FOCUS THE IMAGE IN CENTER OF THE SCREEN AND MAKE OVERLAY BACKGROUND
    $("img").on("click", function () {
      $(this).toggleClass("active");
      $(".overlay").fadeToggle(50);
    });

    $(".overlay").on("click", function () {
      $("img.active").removeClass("active");
      $(this).fadeOut(50);
    });

    showQuestionDescription();
  });

  function greeterText(typeOfQuiz, rightAnswers, totalMarks) {
    if (typeOfQuiz === "english") {
      if (rightAnswers === totalMarks) {
        return `Perfect<span> 👏 </span>`;
      } else if (rightAnswers >= totalMarks / 2) {
        return `Good!<span> 🙄 </span>`;
      } else if (rightAnswers < totalMarks) {
        setTimeout(function () {
          $(".re").addClass("active");
        }, 2000);

        return `Your score is bad, I advise you to retake the exam<span> 😞 </span>`;
      }
    } else {
      if (rightAnswers === totalMarks) {
        return `ما شاء الله عليك<span> 👏 </span>`;
      } else if (rightAnswers >= totalMarks / 2) {
        return `علامتك جيدة<span> 🙄 </span>`;
      } else if (rightAnswers < totalMarks) {
        setTimeout(function () {
          $(".re").addClass("active");
        }, 2000);
        return `علامتك سيئة أنصحك تعيد الأمتحان<span> 😞 </span>`;
      }
    }
  }

  function setPopupText(typeOfQuiz, englishText, arabicText) {
    if (typeOfQuiz === "english") {
      $(".popup-main").addClass("english");
      $(".popup-main").text(englishText);
    } else {
      $(".popup-main").addClass("arabic");
      $(".popup-main").text(arabicText);
    }
  }

  // FORMAT QUESTION TITLE TO (01 + CAPITALIZE TEXT)
  function textCapitalizeFormat(text) {
    return text.toLowerCase()[0].toUpperCase() + text.toLowerCase().slice(1);
  }

  function showQuestionDescription() {
    $(".show-more").each(function (index, button) {
      $(button).on("click", function () {
        $(button).parent().children(":not(.show-more)").slideToggle(100);
        $(button).toggleClass("active");
      });
    });
  }
});
