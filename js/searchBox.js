$(function () {
  ("use strict");

  // GLOBAL VARIABLES

  const sectionLanding = document.querySelector(".section-landing");

  const sectionMaterials = document.querySelector(".section-materials");

  const searchInput = document.querySelector(".search-box__input");

  const suggestionsBox = document.querySelector(".auto-complete");

  //////////
  // CLEAR SEARCH BOX WHEN CLICK CLOSE ICON
  $(".search-box__icon--close").on("click", function () {
    changeIcon(false);
    searchInput.value = "";
    returnPageToDefualt(0);
  });

  //////////////
  // CHANGE SEARCH INPUT ICON

  function changeIcon(cond) {
    // When Condition Is True Then Switch The Icon From UI To Close Icon Else Do The Opposite
    if (cond) {
      $(".search-box__icon--ui").removeClass("show");
      $(".search-box__icon--close").addClass("show");
    } else {
      $(".search-box__icon--ui").addClass("show");
      $(".search-box__icon--close").removeClass("show");
    }
  }

  /////////////
  // PUT SUGGESTIONS IN HTML DOCUMENT
  function showSuggestions(list) {
    let listData;
    if (!list.length) {
      inputValue = searchInput.value;
      listData = `<li class='auto-complete__list'>${inputValue}</li>`;
    } else {
      listData = list.join("");
    }
    $(suggestionsBox).html(listData);
  }

  // SHOW SEARCH RESULT WHEN CLICK ON THE AUTO COMPLETE ITEM
  function showSearchResult(speed) {
    // Declare Variable To Count Material Was Hidden
    let numberOfMaterialHide = 0;

    // Hide Landing Section And Suggestions Box
    $(suggestionsBox).hide(speed);
    $(sectionLanding).hide(0);

    // Hide The Material That Not Match The User Search
    $(".material__name").each(function (i, el) {
      if ($(this).text().toLocaleLowerCase().indexOf(inputValue) > -1) {
        $(this).parent().show(speed);
      } else {
        $(this).parent().hide(speed);
        numberOfMaterialHide += 1;
      }
    });

    // Check If All Material Are Hidden Then Show Not Found Message
    if (
      $(sectionMaterials).children().not("h2").length - 1 ==
      numberOfMaterialHide
    ) {
      $(".not-found").show(speed);
    }
  }

  ////////////////////////
  // ACTIVE SEARCH BOX
  let inputValue;

  $(searchInput).keyup(function (e) {
    if (e.keyCode == 13) return;
    returnPageToDefualt(150);
    changeIcon(false);
    $(suggestionsBox).hide(100);
    inputValue = e.target.value.trim().toLocaleLowerCase();

    let emptyArray = [];

    if (inputValue) {
      // showSearchResult(150);
      $(".not-found").hide(150);
      changeIcon(true);
      $(suggestionsBox).show(150);
      emptyArray = data.filter(
        (d) =>
          d.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) > -1
      );

      emptyArray = emptyArray.map(
        (d, i) => `<li class='auto-complete__list'>${d}</li>`
      );

      suggestionsBox.classList.add("active");

      showSuggestions(emptyArray);

      $(".auto-complete > li").each(function (i, el) {
        $(el).on("click", function () {
          inputValue = $(el).text();
          searchInput.value = $(el).text();
          $(suggestionsBox).hide(150);

          showSearchResult(150);
        });
      });
    } else {
      suggestionsBox.classList.remove("active");
    }
  });

  // PREVENT FORM HEADER SUBMIT WHEN CLICK ENTER IN THE SEARCH INPUT
  $(".header__search").submit(function (e) {
    e.preventDefault();
    showSearchResult(150);
  });

  // RETURN PAGE TO THE DEFAULT
  function returnPageToDefualt(speed) {
    // Show Landing Section
    $(".section-landing").show(speed);

    // Show Materials Boxes
    $(".material-box").show(speed);

    // Hide Not Found Text
    $(".not-found").hide(speed);
  }
});
