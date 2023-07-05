const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  var email = form.elements.email.value;
  var password = form.elements.password.value;

  console.log("email:", email);
  console.log("password:", password);
});
