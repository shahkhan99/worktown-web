import firebase from "../../../../config/firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";

const db = getDatabase();

const getArchiveCand = async (redux_data, setInterviewCandidates) => {
  const starCountRef = await ref(
    db,
    `users/jobs_employer/${redux_data.uid}/archive`
  );
  // console.log(redux_data.uid);

  onValue(starCountRef, (snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      let arrResult = Object.values(result);
      // console.log(arrResult);
      setInterviewCandidates(arrResult);
    } else {
      setInterviewCandidates([]);
    }
  });
};
const handleCross = async (redux_data, v) => {
  // console.log(redux_data, v.Phone);
  await set(
    ref(db, `users/jobs_employer/${redux_data.uid}/archive/${v.uid}`),
    null
  );
};
export { getArchiveCand, handleCross };
