/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
const toggle = () => {
    const nav = document.getElementById("myTopnav");
    if (nav.className === "topnav") {
        nav.className += " responsive";
    } else {
        nav.className = "topnav";
    }
}
