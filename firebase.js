import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBIlhwJw67sgMqELYHc8govnqATLeo0fF8",
  authDomain: "bitbusters-63cbf.firebaseapp.com",
  projectId: "bitbusters-63cbf",
  storageBucket: "bitbusters-63cbf.firebasestorage.app",
  messagingSenderId: "360663646435",
  appId: "1:360663646435:web:c8d078f6747e963d7705d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function validateEmailPassword(email, password) {
  if (!email || !password) {
    alert("Email and password are required.");
    return false;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  return true;
}

async function signInWithGoogleFlow() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    alert(`Signed in as ${result.user.email}.`);
  } catch (error) {
    alert(error.message);
  }
}

window.signup = async function signup(email, password) {
  if (!validateEmailPassword(email, password)) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert(`Account created for ${userCredential.user.email}.`);
  } catch (error) {
    alert(error.message);
  }
};

window.login = async function login(email, password) {
  if (!validateEmailPassword(email, password)) {
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert(`Login successful for ${userCredential.user.email}.`);
  } catch (error) {
    alert(error.message);
  }
};

window.loginWithGoogle = async function loginWithGoogle() {
  await signInWithGoogleFlow();
};

window.signupWithGoogle = async function signupWithGoogle() {
  await signInWithGoogleFlow();
};

window.resetPassword = async function resetPassword(email) {
  if (!email) {
    alert("Enter your email address first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent.");
  } catch (error) {
    alert(error.message);
  }
};

window.logout = async function logout() {
  try {
    await signOut(auth);
    alert("Logged out.");
  } catch (error) {
    alert(error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User not logged in");
  }
});
