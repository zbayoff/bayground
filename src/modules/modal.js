const modalItems = document.querySelectorAll(".module-item");
const closeSpans = document.querySelectorAll(".close");
const body = document.querySelector("body");
// add click event listener to all modal items, and whichever is clicked will open THAT modal. 

// attach click event listeners to each modal to open
modalItems.forEach(function (elem) {
    elem.addEventListener("click", (Event) => {
        elem.nextElementSibling.style.display = "flex";
        body.classList.add("modal-open");
    });
});

// attach click event listeners to each modal to close
closeSpans.forEach(function (elem) {
    elem.addEventListener("click", (Event) => {
        elem.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        body.classList.remove("modal-open");
    });
});

// close modals on esc keyup event
document.addEventListener("keyup", (e) => {
    if (e.keyCode === 27) {
        closeSpans.forEach(function (elem) {
            elem.click();
        })
    }
});


// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
