import { getDatabase } from "firebase/database";
import { set, ref, push, child, update } from "@firebase/database";
import firebase from "../../../../config/firebase";

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
export { SaveUpdatedData };
