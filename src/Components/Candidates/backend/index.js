import firebase from "../../../config/firebase";
import { getDatabase, ref, child, get } from "firebase/database";

const db = getDatabase();
const relatedArray = ["Java"];
const dbRef = ref(getDatabase());
var allCandidates = "";
var cand = [];
var allJobs = "";
var allJobsArr = [];
var jobTypeFilterCand = [];

const checkUser = async (currentUser, filter) => {
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
        // console.log(filter);
        await MatchingCandidates(currentUser, filter);
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
  await get(child(dbRef, `users/jobs_employer/03461234567`))
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
const MatchingCandidates = async (currentUser, filter) => {
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

  allJobs = Object.values(currentUser.jobs) || "";

  // console.log(allJobs);
  // allJobs.forEach((e) => {
  //   allJobsArr.push(e.JobType);
  // });
  let splitFilter = filter.split("/");
  let allJobsFilterGet = allJobs.filter((e) => {
    // return e.JobType === filter;
    return e.JobType + e.Experience === splitFilter[0] + splitFilter[1];
  });
  const specificJob = allJobsFilterGet.find(
    (e) => e.JobType === splitFilter[0]
  );
  console.log(specificJob);

  var currentUserSkills = specificJob.Skills.split(",");
  var userExp = specificJob.Experience;

  // console.log(allJobsFilterGet);
  // var userSkills = [...currentUser.Skills];
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

  // console.log(userExp);
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
  //  push(
  //       ref(db, `users/jobs_employer/${this.state.phone}/jobs`),
  //       {
  //         JobCategory: this.state.JobCategory,
  //         JobType: this.state.selectedJobOption,
  //         JobDescription: this.state.jobDesc,
  //         Experience: this.state.experience,
  //         Skills: skillSet,
  //         Education: this.state.education,
  //         InterestedIn: interest,
  //         ExpectedSalary: exp_sal,
  //         EnglishLevel: this.state.eng_lvl,
  //         JobTime: SalaryTime,
  //       }
  //     );

  // console.log("Experience skill => ", matchedExp);

  // console.log(jobTypeFilterCand);
};

const getJobTypeFilterCand = async (
  currentUser,
  setShortlistedCandidates,
  filterType
) => {
  // console.log(filterType);
  await checkUser(currentUser, filterType);
  await setShortlistedCandidates(jobTypeFilterCand);
};
const getJobTitleFilters = async (SetJob_options) => {
  // SetJob_options([]);
  await SetJob_options(allJobsArr);
};
const setFilterType = async (setFilter, currentUser, filterType) => {
  if (filterType === "") {
    allJobsArr = [];
    allJobs = Object.values(currentUser.jobs) || "";
    allJobs.forEach((e) => {
      allJobsArr.push(e.JobType + "/" + e.Experience);
    });
    console.log(allJobsArr);
    setFilter(allJobsArr[0]);
  }
};

const handleArchive = () => {};
export {
  checkUser,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getJobTitleFilters,
  setFilterType,
};
