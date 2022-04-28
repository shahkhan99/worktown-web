import firebase from "../../../../config/firebase";
import {
  getDatabase,
  ref,
  child,
  get,
  update,
  set,
  onValue,
} from "firebase/database";

const db = getDatabase();

const Get_all_users_jobs = async () => {
  console.log("running");
  const jobs_getting = ref(db, `users/jobs_employer/`);

  onValue(jobs_getting, (snapshot) => {
    if (snapshot.exists()) {
      let objVals = Object.values(snapshot.val());
      let jobsArr = objVals.map((v) => {
        return v.jobs ? v.jobs : "";
      });
      console.log(objVals);
    } else {
      console.log("No data available");
    }
  });
};

export { Get_all_users_jobs };
