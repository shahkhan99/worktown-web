import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());
var allCandidates = "";
var cand = [];
var jobTypeFilter = "";
var jobTypeFilterCand = "";
const checkUser = async () => {
  await get(child(dbRef, `users/jobs_users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        allCandidates = snapshot.val();
        var propertyNames = Object.entries(allCandidates);
        cand = [];
        for (let i = 0; i < propertyNames.length; i++) {
          let seperated = propertyNames[i][1];
          cand.push(seperated);
        }
        // console.log(cand);
        MatchingCandidates().then((e) => {
          jobTypeFilterCand = e;
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return jobTypeFilterCand;
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
  var jobTypeFilterCand = cand.filter((e) => e.JobType === jobTypeFilter);
  return jobTypeFilterCand;
};

const getJobTypeFilterCand = async (currentUser) => {
  jobTypeFilter = currentUser && currentUser.JobType;
  await checkUser();
};
const getShortlisted = async () => {
  jobTypeFilterCand.length && console.log(jobTypeFilterCand);
};
export {
  checkUser,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getShortlisted,
};
