const modalItems = document.querySelectorAll(".module-item");
const closeSpans = document.querySelectorAll(".close");
const whatILearnedBody = document.querySelectorAll(".what-i-learned__body");
const whatILearnedLink = document.querySelectorAll(".what-i-learned__link");
const body = document.querySelector("body");
// add click event listener to all modal items, and whichever is clocked will open THAT modal. 

modalItems.forEach(function (elem) {
    elem.addEventListener("click", (Event) => {
        elem.nextElementSibling.style.display = "flex";
        body.classList.add("modal-open");
    });
});

closeSpans.forEach(function (elem) {
    elem.addEventListener("click", (Event) => {
        elem.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        body.classList.remove("modal-open");
    });
});

whatILearnedLink.forEach(function (elem) {
    elem.addEventListener("click", (Event) => {
        if (getComputedStyle(elem.nextElementSibling).display == "flex") {
            elem.nextElementSibling.style.display = "none";
        } else {
            elem.nextElementSibling.style.display = "flex";
        }
    });
});

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
