import firebase from "../../../config/firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
  onChildAdded,
} from "firebase/database";
import Swal from "sweetalert2";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const dbRef = ref(getDatabase());
const db = getDatabase();
const auth = getAuth();

// EMPLOYER BACKEND

const getUsers = async (setCheckUser) => {
  let users = [];
  let userObj = "";
  let userObj1 = "";
  let merged = "";
  // console.log("running ...");
  const get_users = await ref(db, `users/jobs_employer`);
  // console.log(starCountRef);
  onValue(get_users, (snapshot) => {
    if (snapshot.exists()) {
      userObj = snapshot.val();
      // console.log(userObj);
      setCheckUser(userObj);
    } else {
      // console.log("No data available");
    }
  });

  // await get(child(dbRef, `users/jobs_employer`))
  //   .then(async (snapshot) => {
  //     if (snapshot.exists()) {
  //       // console.log("running ...", snapshot.val());
  //       userObj = snapshot.val();
  //       console.log(userObj);
  //       // setCheckUser(userObj);
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // setCheckUser(userObj);
  // let allData = [];
  // const starCountRef = ref(db, `users/jobs_employer`);
  // await onChildAdded(starCountRef, (snapshot) => {
  //   allData.push(snapshot.val());
  // });
  // setCheckUser(allData);
  // console.log("running ... ", allData);

  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   setCheckUser(starCountRef.val());
  //   console.log("running ...", starCountRef.val());
  // });

  //
  // .then((snapshot) => {
  //   if (snapshot.exists()) {
  //     // console.log("running ...", snapshot.val());
  //     setCheckUser(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
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
      // if (result.isConfirmed) {
      //   window.location.replace("http://localhost:3000/");
      // }
    });
  }
  // console.log(gotEmail);
};
const handleRegister = async (email, password, cPassword) => {
  if (password === cPassword) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await sendEmailVerification(user);
        // ...
        Swal.fire({
          title: "Check your email address to verify your account.",
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.replace("http://localhost:3000/portal/login");
            window.location.replace("/portal");
          }
        });
        // console.log(auth.currentUser);
        await signOut(auth);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, "/////", errorMessage);
        Swal.fire({
          title:
            error.code === "auth/weak-password"
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
            // window.location.replace("http://localhost:3000/portal/login");
            window.location.replace("/portal/login");
          }
        });
      });
  } else {
    Swal.fire({
      title: "Passwords are not same.",
      timer: 2500,
    });
  }
};

const handleLogin = async (
  checkUser,
  email,
  emailVerify,
  setEmailVerify,
  password,
  set_data
) => {
  const getObjs = (obj) => Object.values(checkUser);
  let users = getObjs(checkUser);
  let gotEmail = users.filter((e) => {
    return e.Email === email;
  });
  if (!gotEmail.length) {
    Swal.fire({
      title:
        "Umm.. we can't seem to find your email in our database. Please double check the spelling or sign up to access the portal.",
      showCancelButton: true,
      confirmButtonText: "Sign Up",
    }).then((result) => {
      if (result.isConfirmed) {
        // window.open("http://localhost:3000/", "_blank");
        window.open("/", "_blank");
      }
    });
  } else {
    const auth = getAuth();
    // console.log("then =>", emailVerify);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (!user.emailVerified) {
          setEmailVerify(false);
          Swal.fire({
            title:
              "It seems like you haven't verify your email yet. We have sent a verification link to your email, kindly verify it to access the portal.",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
          // signOut(auth);
          sendEmailVerification(user).then(() => {
            // console.log("Sent");
          });
          // console.log("then =>", user);
        } else {
          setEmailVerify(true);
          set_data(user.uid);
          window.location.replace("/portal");
          // window.location.replace("http://localhost:3000/portal");
          // console.log("then =>", user);
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title:
            errorCode === "auth/user-not-found"
              ? "User not found or may be you haven't set your password yet."
              : errorCode === "auth/wrong-password" &&
                "Wrong email or password",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
        // console.log("Err =>", errorCode);
      });
  }
};

const ResetPassword = (email) => {
  if (email.length) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        Swal.fire({
          title: "Check your email address to reset password",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  } else {
    Swal.fire({
      title: "Enter Valid Email",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  }
};

// EMPLOYEE BACKEND

const getEmployees = async (setCheckUser) => {
  // console.log("running ...");
  await get(child(dbRef, `users/jobs_users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log("running ...", snapshot.val());
        setCheckUser(snapshot.val());
      } else {
        // console.log("No data available");
      }
    })
    .catch((error) => {
      // console.error(error);
    });
};

export {
  getUsers,
  handleEmail,
  handleRegister,
  handleLogin,
  ResetPassword,
  getEmployees,
};
