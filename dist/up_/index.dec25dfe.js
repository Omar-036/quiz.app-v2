$(function() {
    "use strict";
    // GLOBAL VARIABLES
    const sectionLanding = document.querySelector(".section-landing");
    const sectionMaterials = document.querySelector(".section-materials");
    const searchInput = document.querySelector(".search-box__input");
    const suggestionsBox = document.querySelector(".auto-complete");
    //////////
    // CLOSE SUGGESTIONS BOX WHEN CLICK ANYWHERE OUTSIDE
    $(document).on("click", function(e) {
        if (e.target.classList.value === "auto-complete" || e.target.classList.value === "auto-complete__list" || e.target.classList.value === "search-box__input") return;
        $(suggestionsBox).hide(150);
    });
});

//# sourceMappingURL=index.dec25dfe.js.map
