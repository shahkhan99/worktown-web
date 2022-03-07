import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const relatedArray = ["Java"];
const dbRef = ref(getDatabase());
var allCandidates = "";
var cand = [];
var jobTypeFilter = "";
var jobTypeFilterCand = [];

const checkUser = async (currentUser) => {
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
        // console.log(currentUser);
        await MatchingCandidates(currentUser);
        // console.log(jobTypeFilterCand);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
const getCurrentUserData = async (setCurrentUser) => {
  await get(child(dbRef, `users/jobs_employer/923332100584`))
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
const MatchingCandidates = async (currentUser) => {
  // jobTypeFilterCand = cand.filter(
  //   (e) => e.JobType === currentUser.JobType
  //   // console.log(cand, e.JobType)
  //   // empSkill = js, react, sql
  //   // empSkill === js || javascript || java script ? empSkillArr.push(Javascript)
  //   // empSkill === react js || react javascript || react ? empSkillArr.push(React)
  //   // e.skill.inckludes(empSkillArr)
  // );
  jobTypeFilterCand = [];
  var checking = [];
  var matchedSkilled = [];
  var matchedExp = [];
  var currentUserSkills = currentUser.Skills.split(",");
  var userExp = currentUser.Experience;

  // var userSkills = [...currentUser.Skills];
  // console.log(cand.filter((e) => e.Skills.includes("Reac")));
  for (let i = 0; i < currentUserSkills.length; i++) {
    checking.push(
      ...cand.filter((e) => e.Skills.includes(currentUserSkills[i]))
    );

    // jobTypeFilterCand.push(
    //   ...cand.filter((e) => e.Skills.includes(currentUserSkills[i]))
    // );
  }
  matchedSkilled = checking.reduce((acc, current) => {
    const x = acc.find((item) => item.Email === current.Email);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  jobTypeFilterCand.push(
    ...matchedSkilled.filter((e) => e.Experience.includes(userExp))
  );

  if (userExp === "Fresher") {
    jobTypeFilterCand.push(
      ...matchedSkilled.filter((e) => e.Experience.includes("0-1 years"))
    );
  }
  if (userExp === "0-1 years") {
    jobTypeFilterCand.push(
      ...matchedSkilled.filter((e) => e.Experience.includes("Fresher"))
    );
  }

  // console.log("Experience skill => ", matchedExp);

  console.log(jobTypeFilterCand);
};

const getJobTypeFilterCand = async (currentUser, setShortlistedCandidates) => {
  await checkUser(currentUser);
  // console.log(currentUser);
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
