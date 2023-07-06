// Import the functions you need from the SDKs you need
import {
  getAnalytics,
  logEvent,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDpQUYNVigxpMg6_g5AjzF2pN-2euYvZY",
  authDomain: "learn-app-17db8.firebaseapp.com",
  projectId: "learn-app-17db8",
  storageBucket: "learn-app-17db8.appspot.com",
  messagingSenderId: "961019440761",
  appId: "1:961019440761:web:cd31d9a2bdbaf72cb16ea8",
  measurementId: "G-YG5HK0JL9F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

logEvent(analytics, "notification_received");

const form = document.getElementById("form");
const btnLogin = document.getElementById("btn-signin");
const btnRegister = document.getElementById("btn-register");
const txtNotMember = document.getElementById("txt-not-member");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  btnLogin.disabled = true;
  btnLogin.innerHTML = "Loading...";

  const { email, password } = form.elements;

  if (btnRegister.innerHTML === "Register") {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const checkUserExist = userCredential.user;

        email.value = "";
        password.value = "";

        btnLogin.disabled = false;
        btnLogin.innerHTML = "Sign in";
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);

        email.value = "";
        password.value = "";

        btnLogin.disabled = false;
        btnLogin.innerHTML = "Sign in";
      });
  } else {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;

        email.value = "";
        password.value = "";

        btnLogin.disabled = false;
        btnLogin.innerHTML = "Register";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);

        email.value = "";
        password.value = "";

        btnLogin.disabled = false;
        btnLogin.innerHTML = "Register";
      });
  }
});

btnRegister.onclick = () => {
  if (btnRegister.innerHTML === "Register") {
    btnLogin.innerHTML = "Register";
    txtNotMember.textContent = "Have you registered";
    btnRegister.textContent = "Login";
  } else {
    btnLogin.innerHTML = "Sign in";
    txtNotMember.textContent = "Not a member?";
    btnRegister.textContent = "Register";
  }
};
