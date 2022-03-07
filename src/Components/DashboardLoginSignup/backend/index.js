import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";
const dbRef = ref(getDatabase());

const getUsers = async (setCheckUser) => {
  console.log("running ...");
  await get(child(dbRef, `users/jobs_employer`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setCheckUser(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
export { getUsers };
