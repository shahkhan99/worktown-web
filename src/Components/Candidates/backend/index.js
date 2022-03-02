import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
var allCandidates = "";
var cand = [];
var jobTypeFilter = "";
var jobTypeFilterCand = "";

const checkUser = async () => {
  await get(child(dbRef, `users/jobs_users`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        allCandidates = snapshot.val();
        var propertyNames = Object.entries(allCandidates);
        cand = [];
        for (let i = 0; i < propertyNames.length; i++) {
          let seperated = propertyNames[i][1];
          cand.push(seperated);
        }
        // console.log(cand);
        await MatchingCandidates();
        // console.log(jobTypeFilterCand);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const getCurrentUserData = (setCurrentUser) => {
  get(child(dbRef, `users/jobs_employer/923332100584`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setCurrentUser(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const MatchingCandidates = async () => {
  jobTypeFilterCand = cand.filter(
    (e) => e.JobType === "Applications Engineer"
    // console.log(cand, e.JobType)
  );
  // console.log(cand, jobTypeFilterCand);
};

const getJobTypeFilterCand = async (setShortlistedCandidates) => {
  await checkUser();
  // console.log(jobTypeFilterCand);
  setShortlistedCandidates(jobTypeFilterCand);
};
const getShortlisted = async () => {
  // return jobTypeFilterCand
};
export {
  checkUser,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getShortlisted,
};
