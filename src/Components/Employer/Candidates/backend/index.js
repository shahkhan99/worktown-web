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
import UseWhatsapp from "whatsapp-react-component";
import { send } from "emailjs-com";

const db = getDatabase();

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
  // const starCountRef = await ref(db, `users/jobs_employer/034612345671`);
  // onValue(starCountRef, async (snapshot) => {
  //   if (snapshot.exists()) {
  //     setCurrentUser(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // });
  // await get(child(dbRef, `users/jobs_employer/03461234567`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       setCurrentUser(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
};
const MatchingCandidates = async (currentUser, filter) => {
  // jobTypeFilterCand = cand.filter(
  //   (e) => e.JobType === currentUser.JobType
  // console.log(currentUser);
  //   // empSkill = js, react, sql
  //   // empSkill === js || javascript || java script ? empSkillArr.push(Javascript)
  //   // empSkill === react js || react javascript || react ? empSkillArr.push(React)
  //   // e.skill.inckludes(empSkillArr)
  // );
  let SchIntResult = "";
  let arrSchIntResult = [];
  let ArchResult = "";
  let arrArchResult = [];
  const starCountRef = await ref(
    db,
    `users/jobs_employer/${currentUser.uid}/scheduleInterview`
  );
  // console.log(starCountRef);

  onValue(starCountRef, (snapshot) => {
    if (snapshot.exists()) {
      SchIntResult = snapshot.val();
      arrSchIntResult = Object.values(SchIntResult);
      // console.log(arrSchIntResult);
    } else {
      console.log("No data available");
    }
  });
  const starCountRefArch = await ref(
    db,
    `users/jobs_employer/${currentUser.uid}/archive`
  );
  // console.log(starCountRef);

  onValue(starCountRefArch, (snapshot) => {
    if (snapshot.exists()) {
      ArchResult = snapshot.val();
      arrArchResult = Object.values(ArchResult);
      // console.log(arrResult);
    } else {
      console.log("No data available");
    }
  });
  jobTypeFilterCand = [];
  var checking = [];
  var matchedSkilled = [];
  var matchedSkilled1 = [];
  var matchedSkilled2 = [];
  var finalMatch = [];

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
  // console.log(specificJob.Skills.split(","));

  var currentUserSkills = specificJob.Skills.split(",");
  var userExp = specificJob.Experience;

  // console.log(allJobsFilterGet);
  // var userSkills = [...currentUser.Skills];
  for (let i = 0; i < currentUserSkills.length; i++) {
    checking.push(
      ...cand.filter((e) =>
        e.Skills.toLowerCase().includes(currentUserSkills[i].toLowerCase())
      )
    );

    // jobTypeFilterCand.push(
    //   ...cand.filter((e) => e.Skills.includes(currentUserSkills[i]))
    // );
  }

  matchedSkilled = await checking.reduce((acc, current) => {
    const x = acc.find((item) => item.Email === current.Email);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  if (arrArchResult.length || arrSchIntResult.length) {
    finalMatch = arrArchResult.concat(arrSchIntResult);
    matchedSkilled2 = matchedSkilled.filter((e) => {
      return !finalMatch.some((v) => v.Email === e.Email);
    });
    console.log(159);

    jobTypeFilterCand.push(
      ...matchedSkilled2.filter((e) => e.Experience.includes(userExp))
    );

    if (userExp === "Fresher") {
      jobTypeFilterCand.push(
        ...matchedSkilled2.filter((e) => e.Experience.includes("0-1 years"))
      );
    }
    if (userExp === "0-1 years") {
      jobTypeFilterCand.push(
        ...matchedSkilled2.filter((e) => e.Experience.includes("Fresher"))
      );
    }
  } else {
    console.log(177);
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
  }
  // console.log(arrSchIntResult);
};

const getJobTypeFilterCand = async (
  currentUser,
  setShortlistedCandidates,
  filterType
) => {
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
    allJobs = (currentUser.jobs && Object.values(currentUser.jobs)) || "";
    console.log(allJobs.length);
    allJobs.length &&
      allJobs.forEach((e) => {
        allJobsArr.push(e.JobType + "/" + e.Experience);
      });
    setFilter(allJobsArr[0]);
  }
};
const handleReject = async (
  e,
  redux_data,
  filter,
  setShortlistedCandidates
) => {
  await update(
    ref(db, `users/jobs_employer/${redux_data.uid}/archive/${e.Phone}`),
    e
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
    })
    .catch(() => {
      alert("Something went wrong!");
    });
  // console.log(e, redux_data);
};

// INTERVIEW SIDE BACKEND

const handleAccept = async (
  e,
  redux_data,
  filter,
  setShortlistedCandidates
) => {
  // console.log()
  await update(
    ref(
      db,
      `users/jobs_employer/${redux_data.uid}/scheduleInterview/${e.Phone}`
    ),
    e
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
    })
    .catch(() => {
      alert("Something went wrong!");
    });
  // console.log(e, redux_data);
  // console.log(redux_data);
};

const getInterviewCandidates = async (redux_data, setInterviewCandidates) => {
  const starCountRef = await ref(
    db,
    `users/jobs_employer/${redux_data.uid}/scheduleInterview`
  );
  // console.log(starCountRef);

  onValue(starCountRef, (snapshot) => {
    if (snapshot.exists()) {
      let result = snapshot.val();
      let arrResult = Object.values(result);
      console.log(arrResult);
      setInterviewCandidates(arrResult);
    } else {
      setInterviewCandidates([]);
    }
  });
};

const handleCross = async (redux_data, v, filter, setShortlistedCandidates) => {
  // console.log(redux_data, v.Phone);
  await set(
    ref(
      db,
      `users/jobs_employer/${redux_data.uid}/scheduleInterview/${v.Phone}`
    ),
    null
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
    })
    .catch(() => {
      alert("Something went wrong!");
    });
};

const handleScheduleInterviewBtn = async (redux_data, e) => {
  console.log(redux_data, e);
  await update(
    ref(db, `users/jobs_employer/${redux_data.uid}/appointments/${e.uid}`),
    e
  ).then(async () => {
    await update(
      ref(
        db,
        `users/jobs_employer/${e.uid}/employee_side_appointments/${redux_data.uid}`
      ),
      e
    );
  });
  // send("service_0kxx7l1", "template_5y7pfk5", toSend, "gdh_CSodanmGmK83y")
  //   .then((response) => {
  //     console.log("SUCCESS!", response.status, response.text);
  //   })
  //   .catch((err) => {
  //     console.log("FAILED...", err);
  //   });
  // UseWhatsapp("3020217792", "hello");
};

export {
  checkUser,
  getCurrentUserData,
  MatchingCandidates,
  getJobTypeFilterCand,
  getJobTitleFilters,
  setFilterType,
  handleAccept,
  getInterviewCandidates,
  handleReject,
  handleCross,
  handleScheduleInterviewBtn,
};
