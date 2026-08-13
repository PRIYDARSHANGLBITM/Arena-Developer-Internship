const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navigationLinks = document.querySelectorAll(".nav-links a");

burger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    burger.setAttribute(
        "aria-expanded",
        isOpen
    );

});


navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        burger.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});