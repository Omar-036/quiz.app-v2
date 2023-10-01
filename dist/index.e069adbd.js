$(function() {
    "use strict";
    // GLOBAL VARIABLES
    const navIcon = document.querySelector(".nav-icon");
    const headerList = document.querySelector(".header__list");
    ///////////
    // OPEN NAVIGATION LIST WHEN CLICK THE NAVIGATION ICON
    $(navIcon).click(function() {
        $(navIcon).toggleClass("open");
        $(headerList).toggleClass("show");
    });
    ///////////
    // CLOSE THE  NAVIGATION LIST WHEN CLICK ANYWHERE OUTSIDE
    $(document).click(function(e) {
        if (e.target.classList.value === "header__list" || e.target.classList.value === "header__list show" || e.target.classList.value === "nav-icon" || e.target.classList.value === "nav-icon open" || e.target.classList.value === "nav-icon-span" || e.target.classList.value === "header__link" || e.target.classList.value === "header__link add-material" || e.target.classList.value === "copyright") return;
        $(headerList).removeClass("show");
        $(navIcon).removeClass("open");
    });
});

//# sourceMappingURL=index.e069adbd.js.map
