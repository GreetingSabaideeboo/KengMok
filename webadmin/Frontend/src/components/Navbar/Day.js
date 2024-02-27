import "./navbar.css";
// function getDayColor(weekday) {
//     if (weekday === 1) {
//       return "rgb(250, 237, 203)"; // Monday
//     } else if (weekday === 2) {
//       return "rgb(242, 198, 222)"; // Tuesday
//     } else if (weekday === 3) {
//       return "rgb(201, 228, 222)"; // Wednesday
//     } else if (weekday === 4) {
//       return "rgb(247, 217, 196)"; // Thursday
//     } else if (weekday === 5) {
//       return "rgb(198, 222, 241)"; // Friday
//     } else if (weekday === 6) {
//       return "rgb(219, 205, 240)"; // Saturday
//     } else {
//       return "rgb(240, 105, 97)"; // Sunday
//     }
//   }
  
//   document.addEventListener("DOMContentLoaded", function() {
//     const element = document.querySelector(".header");
//     const today = new Date();
//     const weekday = today.getDay();
//     const color = getDayColor(weekday);
//     element.style.backgroundColor = color;
//   });

const header = document.querySelector('.header');
const dayOfWeek = new Date().getDay();
header.classList.add('header--day-color');
header.style.setProperty('--day-color', getDayColor(dayOfWeek));

function getDayColor(weekday) {
  if (weekday === 1) {
    return "rgb(250, 237, 203)"; // Monday
  } else if (weekday === 2) {
    return "rgb(242, 198, 222)"; // Tuesday
  } else if (weekday === 3) {
    return "rgb(201, 228, 222)"; // Wednesday
  } else if (weekday === 4) {
    return "rgb(247, 217, 196)"; // Thursday
  } else if (weekday === 5) {
    return "rgb(198, 222, 241)"; // Friday
  } else if (weekday === 6) {
    return "rgb(219, 205, 240)"; // Saturday
  } else {
    return "rgb(240, 105, 97)"; // Sunday
  }
}
  