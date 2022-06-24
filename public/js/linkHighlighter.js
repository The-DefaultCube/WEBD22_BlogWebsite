const currPath = window.location.pathname;
let highlightedLink;
if (currPath === "/") {
	highlightedLink = document.getElementById("home");
} else if (currPath === "/about") {
	highlightedLink = document.getElementById("about");
} else if (currPath === "/contact") {
	highlightedLink = document.getElementById("contact");
} else {
	highlightedLink = null;
}
highlightedLink.childNodes[0].classList.add("active-navbar-link");
