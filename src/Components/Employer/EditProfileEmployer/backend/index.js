import { getDatabase } from "firebase/database";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { set, ref, push, child, update } from "@firebase/database";
import firebase from "../../../../config/firebase";
import Swal from "sweetalert2";

const auth = getAuth();
const user = auth.currentUser;
const db = getDatabase();

const SaveUpdatedData = async (data, dispatch, set_current_user_data) => {
  //   console.log(data.Phone);
  await update(ref(db, `users/jobs_employer/${data.uid}/`), data)
    .then(() => {
      dispatch(set_current_user_data(data));
    })
    .catch(() => {
      alert("Something went wrong.");
    });
  data = "";

  // fetching();
};

const UpdatePassword = async (newPassword) => {
  let userProvidedPassword = prompt("Enter your current password");
  // console.log(userProvidedPassword);

  // Reauthenticating User to change password

  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    userProvidedPassword
  );
  await reauthenticateWithCredential(auth.currentUser, credential)
    .then(() => {
      // User re-authenticated.
    })
    .catch((error) => {
      // An error ocurred
      Swal.fire({
        title:
          error.code === "auth/weak-password"
            ? "Password should be at least 6 characters"
            : error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "Entered email is already in use by another account. Go to login page."
            : error.message === "Firebase: Error (auth/invalid-email)."
            ? "Invalid Email address"
            : error.message,
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
      // ...
    });
  await updatePassword(auth.currentUser, newPassword)
    .then(() => {
      // Update successful.
      Swal.fire({
        title: "Your password was changed",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    })
    .catch((error) => {
      // An error happened.
      Swal.fire({
        title:
          error.code === "auth/weak-password"
            ? "Password should be at least 6 characters"
            : error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "Entered email is already in use by another account. Go to login page."
            : error.message === "Firebase: Error (auth/invalid-email)."
            ? "Invalid Email address"
            : error.message,
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    });
};
export { SaveUpdatedData, UpdatePassword };
