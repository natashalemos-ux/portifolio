// Troca de idioma (PT/EN), scroll suave e pequenos comportamentos de interface.
// Sem dependências externas.

(function () {
  var STORAGE_KEY = "portfolio-lang";

  function setLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll(".i18n").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang") !== lang;
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage indisponível (ex: modo privado) — sem problema, só não salva a preferência.
    }
  }

  function initLanguage() {
    var saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {}

    setLanguage(saved === "en" ? "en" : "pt");

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  function initScrollHint() {
    document.querySelectorAll("[data-scroll-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-scroll-target"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  function initNavBlur() {
    var nav = document.querySelector(".site-nav");
    if (!nav) return;

    function updateNav() {
      nav.classList.toggle("is-scrolled", window.scrollY > 10);
    }

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLanguage();
    initScrollHint();
    initYear();
    initNavBlur();
  });
})();
