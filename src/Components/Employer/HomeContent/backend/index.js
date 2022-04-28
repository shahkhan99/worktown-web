import firebase from "../../../../config/firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  onValue,
  onChildAdded,
} from "firebase/database";

const db = getDatabase();

const GetAppointments = async (redux_data, setAppt) => {
  let data = [];
  const starCountRef = ref(
    db,
    `users/jobs_employer/${redux_data.uid}/appointments`
  );
  // console.log(starCountRef);

  onChildAdded(starCountRef, (snapshot) => {
    if (snapshot.exists()) {
      data.push(snapshot.val());
    } else {
      console.log("No data available");
    }
  });
  //   console.log(data);
  setAppt(data);
};

export { GetAppointments };
