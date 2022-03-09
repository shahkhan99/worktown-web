import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";
import Swal from "sweetalert2";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const dbRef = ref(getDatabase());
const auth = getAuth();

const getUsers = async (setCheckUser) => {
  // console.log("running ...");
  await get(child(dbRef, `users/jobs_employer`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log("running ...", snapshot.val());
        setCheckUser(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const handleEmail = async (email, checkUser, setShowPass, setEmailCheck) => {
  const getObjs = (obj) => Object.values(checkUser);
  let users = getObjs(checkUser);
  let gotEmail = users.filter((e) => {
    return e.Email === email;
  });
  gotEmail.length && setShowPass(true);
  gotEmail.length && setEmailCheck(true);
  if (!gotEmail.length) {
    Swal.fire({
      title:
        "Umm.. we can't seem to find your email in our database. Please double check the spelling or sign up to access the portal.",
      showCancelButton: true,
      confirmButtonText: "Sign Up",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace("http://localhost:3000/");
      }
    });
  }
  console.log(gotEmail);
};
const handleRegister = async (email, password, cPassword) => {
  if (password === cPassword) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await sendEmailVerification(user);
        // ...
        // console.log(auth.currentUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, "/////", errorMessage);
        Swal.fire({
          title:
            error.message ===
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
              ? "Password should be at least 6 characters"
              : error.message === "Firebase: Error (auth/email-already-in-use)."
              ? "Entered email is already in use by another account. Go to login page."
              : error.message === "Firebase: Error (auth/invalid-email)."
              ? "Invalid Email address"
              : error.message,
          timer: 5000,
          showConfirmButton:
            error.message === "Firebase: Error (auth/email-already-in-use)." &&
            true,
          confirmButtonText: "Login",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace(
              "http://localhost:3000/employer_dashboard/login"
            );
          }
        });
      });
    Swal.fire({
      title: "Check your email address to verify your account.",
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace(
          "http://localhost:3000/employer_dashboard/login"
        );
      }
    });
  } else {
    Swal.fire({
      title: "Passwords are not same.",
      timer: 2500,
    });
  }
};
export { getUsers, handleEmail, handleRegister };
