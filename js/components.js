document.addEventListener("DOMContentLoaded", function () {
  // Cargar el header
  fetch("./components/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Marcar el enlace activo según la página actual
      const currentPage = window.location.pathname.split("/").pop();
      if (currentPage === "index.html" || currentPage === "") {
        document.getElementById("nav-index").classList.add("active", "fw-bold");
      } else if (currentPage === "temperatura.html") {
        document
          .getElementById("nav-temperatura")
          .classList.add("active", "fw-bold");
      } else if (
        currentPage === "tests/test-runner.html" ||
        currentPage.includes("test-runner")
      ) {
        document.getElementById("nav-tests").classList.add("active", "fw-bold");
      }
    });

  // Cargar el footer
  fetch("./components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });
});
