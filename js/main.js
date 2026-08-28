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

  // Monta o índice lateral das páginas de case a partir dos <h2> das seções.
  // Como é gerado a partir do próprio HTML, cases novos ganham o índice
  // sozinhos, sem precisar manter uma lista à parte.
  function initCaseToc() {
    var titulos = Array.prototype.slice.call(
      document.querySelectorAll(".case-section > h2")
    );
    if (titulos.length < 3) return;

    var nav = document.createElement("nav");
    nav.className = "case-toc";
    nav.setAttribute("aria-label", "Seções do case");

    var lista = document.createElement("ol");
    var itens = [];

    titulos.forEach(function (titulo, i) {
      var secao = titulo.parentElement;
      if (!secao.id) secao.id = "secao-" + (i + 1);

      var link = document.createElement("a");
      link.href = "#" + secao.id;

      // Copia o conteúdo do título (incluindo os spans PT/EN) para o link,
      // assim a troca de idioma também vale para o índice.
      Array.prototype.forEach.call(titulo.childNodes, function (no) {
        link.appendChild(no.cloneNode(true));
      });

      var item = document.createElement("li");
      item.appendChild(link);
      lista.appendChild(item);
      itens.push({ secao: secao, link: link });
    });

    nav.appendChild(lista);
    document.body.appendChild(nav);

    // Marca como ativa a última seção cujo topo já passou de 35% da tela.
    // No topo da página nenhuma passou ainda, então a primeira fica ativa.
    function atualizarAtivo() {
      var atual = null;
      itens.forEach(function (item) {
        if (item.secao.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          atual = item;
        }
      });
      if (!atual) atual = itens[0];

      // No fim da página a última seção pode nunca cruzar o limiar, porque
      // não sobra rolagem — então ela assume quando chegamos ao fim.
      var fimDaPagina =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 8;
      if (fimDaPagina) atual = itens[itens.length - 1];

      itens.forEach(function (item) {
        item.link.classList.toggle("is-active", item === atual);
      });
    }

    atualizarAtivo();
    window.addEventListener("scroll", atualizarAtivo, { passive: true });
    window.addEventListener("resize", atualizarAtivo);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // O índice é montado antes da troca de idioma para que os textos
    // copiados dos títulos já entrem no idioma certo.
    initCaseToc();
    initLanguage();
    initScrollHint();
    initYear();
    initNavBlur();
  });
})();
