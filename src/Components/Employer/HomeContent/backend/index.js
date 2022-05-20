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
      // console.log("stat=> ", snapshot.val());
    } else {
      console.log("No data available");
    }
  });
  //   console.log(data);
  setAppt(data);
};

const GetStats = async (redux_data, setStats) => {
  let data = [];
  const starCountRef = ref(db, `users/jobs_employer/${redux_data.uid}`);
  // console.log(starCountRef);

  onValue(starCountRef, (snapshot) => {
    if (snapshot.exists()) {
      data.push(snapshot.val());
      // console.log("stat=> ", snapshot.val());
    } else {
      console.log("No data available");
    }
  });
  //   console.log(data);
  setStats(data);
};

export { GetAppointments, GetStats };
