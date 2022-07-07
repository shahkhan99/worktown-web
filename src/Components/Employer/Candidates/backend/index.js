import firebase from "../../../../config/firebase";
import React from "react";
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
import moment from "moment";

import { API_KEY_WT, CLIENT_ID_WT } from "./calenderAPI";

const db = getDatabase();

const dbRef = ref(getDatabase());
var allCandidates = "";
var cand = [];
var allJobs = "";
var allJobsArr = [];
var jobTypeFilterCand = [];

const checkUser = async (currentUser, filter) => {
  await get(child(dbRef, `users/jobs_employer`))
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        allCandidates = snapshot.val();
        var propertyNames = Object.entries(allCandidates);
        cand = [];
        for (let i = 0; i < propertyNames.length; i++) {
          let seperated = propertyNames[i][1];
          // console.log(allCandidates);
          cand.push(seperated);
        }
        // console.log(filter);
        await MatchingCandidates(currentUser, filter);
        // console.log(jobTypeFilterCand);
      } else {
        // console.log("No data available");
      }
    })
    .catch((error) => {
      // console.error(error);
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
      // console.log("No data available");
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
      // console.log("No data available");
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
      ...cand.filter((e) => {
        // console.log(e);
        if (e.Skills !== undefined) {
          return e.Skills.toLowerCase().includes(
            currentUserSkills[i].toLowerCase()
          );
        }
      })
    );

    // jobTypeFilterCand.push(
    //   ...cand.filter((e) => e.Skills.includes(currentUserSkills[i]))
    // );
  }

  // console.log(checking);

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
    // console.log(allJobs.length);
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
  setShortlistedCandidates,
  setEditingState,
  rejectionChange,
  dispatch
) => {
  setEditingState("");
  let role = filter.split("/");

  let new_data = {
    Achievement: e.Achievement,
    City: e.City,
    Education: e.Education,
    Email: e.Email,
    EnglishLevel: e.EnglishLevel,
    Experience: e.Experience,
    Gender: e.Gender,
    InterestedIn: e.InterestedIn,
    JobCategory: e.JobCategory,
    JobType: e.JobType,
    Name: e.Name,
    Phone: e.Phone,
    Skills: e.Skills,
    uid: e.uid,
    role: role[0],
  };
  let recjectionFeedback = { recjectionFeedback: rejectionChange };
  let data = { ...new_data, ...recjectionFeedback };
  // console.log(data);

  await update(
    ref(db, `users/jobs_employer/${redux_data.uid}/archive/${e.uid}`),
    data
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
      let alltimeRejDB = 0;
      const all_time_rec = ref(db, `users/jobs_employer/${redux_data.uid}`);
      onValue(all_time_rec, async (snapshot) => {
        if (snapshot.exists()) {
          let alltimeDB = snapshot.val();
          alltimeRejDB = alltimeDB?.all_time_stats.all_time_archive
            ? alltimeDB.all_time_stats.all_time_archive
            : 0;
        } else {
          // console.log("No Data");
        }
      });
      alltimeRejDB++;
      // console.log("if", alltimeJobDB);
      update(ref(db, `users/jobs_employer/${redux_data.uid}/all_time_stats`), {
        all_time_archive: alltimeRejDB,
      });
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
  let role = filter.split("/");
  const toSend = {
    from_name: redux_data.Name,
    to_name: e.Name,
    employer_name: redux_data.BusinessName,
    send_to: e.Email,
    send_by: "hello@worktown.co",
    cc_to: "worktown.co@gmail.com",
    role: role[0],
  };

  let new_data = {
    Achievement: e.Achievement,
    City: e.City,
    Education: e.Education,
    Email: e.Email,
    EnglishLevel: e.EnglishLevel,
    Experience: e.Experience,
    Gender: e.Gender,
    InterestedIn: e.InterestedIn,
    JobCategory: e.JobCategory,
    JobType: e.JobType,
    Name: e.Name,
    Phone: e.Phone,
    Skills: e.Skills,
    uid: e.uid,
    role: role[0],
  };
  await update(
    ref(db, `users/jobs_employer/${redux_data.uid}/scheduleInterview/${e.uid}`),
    new_data
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
      send("service_0kxx7l1", "template_5y7pfk5", toSend, "gdh_CSodanmGmK83y")
        .then((response) => {
          // console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          // console.log("FAILED...", err);
        });
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
      // console.log(arrResult);
      const appointment_cand = ref(
        db,
        `users/jobs_employer/${redux_data.uid}/appointments`
      );
      onValue(appointment_cand, (snapshot) => {
        if (snapshot.exists()) {
          let appResult = snapshot.val();
          let appArrResult = Object.values(appResult);
          // console.log(appArrResult);
          if (appArrResult.length) {
            let finalInterviewCandidate = arrResult.filter((e) => {
              return !appArrResult.some((v) => v.Email === e.Email);
            });
            // console.log(finalInterviewCandidate);
            setInterviewCandidates(finalInterviewCandidate);
          }
        } else {
          setInterviewCandidates(arrResult);
        }
      });
      // setInterviewCandidates(arrResult);
    } else {
      setInterviewCandidates([]);
    }
  });
};

const handleCross = async (redux_data, v, filter, setShortlistedCandidates) => {
  const toSend = {
    from_name: redux_data.Name,
    to_name: v.Name,
    employer_name: redux_data.BusinessName,
    send_to: v.Email,
    send_by: "hello@worktown.co",
    cc_to: "worktown.co@gmail.com",
    role: v.role,
  };

  // console.log(toSend);

  await set(
    ref(db, `users/jobs_employer/${redux_data.uid}/scheduleInterview/${v.uid}`),
    null
  )
    .then(() => {
      getJobTypeFilterCand(redux_data, setShortlistedCandidates, filter);
      send("service_0kxx7l1", "template_5yb7jp9", toSend, "gdh_CSodanmGmK83y")
        .then((response) => {
          // console.log("SUCCESS!", response.status, response.text);
        })
        .catch((err) => {
          // console.log("FAILED...", err);
        });
    })
    .catch(() => {
      alert("Something went wrong!");
    });
};

const gapi = window.gapi;
const DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";
const handleScheduleInterviewVirtualBtn = async (
  redux_data,
  Appdata,
  e,
  handleExit
) => {
  // console.log(redux_data, Appdata, e);

  const convertTime12to24 = async (time12h) => {
    // console.log(time12h);
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  let formattedDate = moment(Appdata.date).format("YYYY-MM-DD");
  let formattedTime = (await convertTime12to24(Appdata.time)) + ":00";
  let formattedendTime = parseInt(formattedTime) + 1;
  let endTime = formattedendTime.toString() + ":00:00";

  let finalStartDate = `${formattedDate}T${formattedTime}`;
  let finalEndDate = `${formattedDate}T${endTime}`;

  // console.log(finalStartDate, finalEndDate);

  gapi.load("client:auth2", () => {
    // console.log("loaded client", gapi);

    gapi.client.init({
      apiKey: API_KEY_WT,
      clientId: CLIENT_ID_WT,
      discoveryDocs: DISCOVERY_DOC,
      scope: SCOPES,
      plugin_name: "streamy",
    });
    // gapi.client.load("calendar", "v3", () => console.log("boom!!!"));
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        var event = {
          summary: "Google I/O 2015",
          location: "Karachi, Pakistan",
          description:
            "A chance to hear more about Google's developer products.",
          start: {
            dateTime: finalStartDate,
            timeZone: "Asia/Karachi",
          },
          end: {
            dateTime: finalEndDate,
            timeZone: "Asia/Karachi",
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
          attendees: [
            { email: e.Email },
            { email: redux_data.Email },
            { email: "worktown.co@gmail.com" },
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },
        };
        var request = gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
          conferenceDataVersion: 1,
          sendNotifications: true,
          sendUpdates: "all",
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: {
                type: "hangoutsMeet",
              },
              requestId: "any-random-string",
            },
          },
          end: {
            dateTime: finalEndDate,
            timeZone: "Asia/Karachi",
          },
          start: {
            dateTime: finalStartDate,
            timeZone: "Asia/Karachi",
          },
          attendees: [
            { email: e.Email },
            { email: redux_data.Email },
            { email: "worktown.co@gmail.com" },
          ],
          source: {
            title: "hey there!",
            url: "https://worktown.co/",
          },
          summary: `Worktown: Interview w/ ${redux_data.BusinessName}`,
        });

        request.execute(async function (event) {
          let employee_data = {
            BusinessName: redux_data.BusinessName,
            Name: redux_data.Name,
            Phone: redux_data.Phone,
            Email: redux_data.Email,
            Interview_Details: Appdata,
            eventID: event.id,
          };
          let employer_data = {
            ...e,
            eventID: event.id,
            Interview_Details: Appdata,
          };
          // console.log(employee_data, employer_data);
          await update(
            ref(
              db,
              `users/jobs_employer/${redux_data.uid}/appointments/${e.uid}`
            ),
            employer_data
          )
            .then(async () => {
              await update(
                ref(
                  db,
                  `users/jobs_employer/${e.uid}/employee_side_appointments/${redux_data.uid}`
                ),
                employee_data
              );
            })
            .then(async () => {
              let alltimeAppDB = 0;
              const all_time_rec = ref(
                db,
                `users/jobs_employer/${redux_data.uid}`
              );
              onValue(all_time_rec, async (snapshot) => {
                if (snapshot.exists()) {
                  let alltimeDB = snapshot.val();
                  alltimeAppDB = alltimeDB?.all_time_stats.all_time_appoitments
                    ? alltimeDB.all_time_stats.all_time_appoitments
                    : 0;
                } else {
                  // console.log("No Data");
                }
              });
              alltimeAppDB++;
              // console.log("if", alltimeJobDB);
              update(
                ref(db, `users/jobs_employer/${redux_data.uid}/all_time_stats`),
                {
                  all_time_appoitments: alltimeAppDB,
                }
              );

              window.open(event.htmlLink, "_blank");
            })
            .then(() => {
              handleExit();
            })
            .catch(() => {
              alert("An error occured while scheduling. Try again");
            });
        });
      });
  });
};

const handleScheduleInterviewBtn = async (
  redux_data,
  e,
  Appdata,
  handleExit
) => {
  const toSend = {
    from_name: redux_data.Name,
    to_name: e.Name,
    employer_name: redux_data.BusinessName,
    send_to: e.Email,
    send_by: "hello@worktown.co",
  };

  let employee_data = {
    BusinessName: redux_data.BusinessName,
    Name: redux_data.Name,
    Phone: redux_data.Phone,
    Email: redux_data.Email,
    Interview_Details: Appdata,
  };

  const convertTime12to24 = async (time12h) => {
    // console.log(time12h);
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "pm") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };
  let formattedDate = moment(Appdata.date).format("YYYY-MM-DD");
  let formattedTime = (await convertTime12to24(Appdata.time)) + ":00";
  let formattedendTime = parseInt(formattedTime) + 1;
  let endTime = formattedendTime.toString() + ":00:00";

  let finalStartDate = `${formattedDate}T${formattedTime}`;
  let finalEndDate = `${formattedDate}T${endTime}`;

  // console.log(employee_data);
  // console.log(finalStartDate, finalEndDate);

  gapi.load("client:auth2", () => {
    // console.log("loaded client", gapi);

    gapi.client.init({
      apiKey: API_KEY_WT,
      clientId: CLIENT_ID_WT,
      discoveryDocs: DISCOVERY_DOC,
      scope: SCOPES,
      plugin_name: "streamy",
    });
    gapi.client.load("calendar", "v3", () => {
      // console.log("boom!!!")
    });
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        var event = {
          summary: "Google I/O 2015",
          location: employee_data.Interview_Details.venuePin,
          description: `Location Name: ${employee_data.Interview_Details.venue}`,

          start: {
            dateTime: finalStartDate,
            timeZone: "Asia/Karachi",
          },
          end: {
            dateTime: finalEndDate,
            timeZone: "Asia/Karachi",
          },
          recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],

          attendees: [
            { email: e.Email },
            { email: redux_data.Email },
            { email: "worktown.co@gmail.com" },
          ],
          creator: {
            email: redux_data.Email,
            displayName: redux_data.BusinessName,
            self: true,
          },
          sendNotifications: true,
          sendUpdates: "all",
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 24 * 60 },
              { method: "popup", minutes: 10 },
            ],
          },

          source: {
            title: "from Worktown",
            url: "https://worktown.co/",
          },
          summary: `Worktown: Interview w/ ${redux_data.BusinessName}`,
        };
        var request = gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
          sendUpdates: "all",
          sendNotifications: true,
        });

        request.execute(async function (event) {
          let employee_data = {
            BusinessName: redux_data.BusinessName,
            Name: redux_data.Name,
            Phone: redux_data.Phone,
            Email: redux_data.Email,
            Interview_Details: Appdata,
            eventID: event.id,
          };
          let employer_data = {
            ...e,
            eventID: event.id,
            Interview_Details: Appdata,
          };

          // console.log(event);
          // console.log(employee_data, employer_data);
          await update(
            ref(
              db,
              `users/jobs_employer/${redux_data.uid}/appointments/${e.uid}`
            ),
            employer_data
          )
            .then(async () => {
              await update(
                ref(
                  db,
                  `users/jobs_employer/${e.uid}/employee_side_appointments/${redux_data.uid}`
                ),
                employee_data
              );
            })
            .then(async () => {
              let alltimeAppDB = 0;
              const all_time_rec = ref(
                db,
                `users/jobs_employer/${redux_data.uid}`
              );
              onValue(all_time_rec, async (snapshot) => {
                if (snapshot.exists()) {
                  let alltimeDB = snapshot.val();
                  alltimeAppDB = alltimeDB?.all_time_stats.all_time_appoitments
                    ? alltimeDB.all_time_stats.all_time_appoitments
                    : 0;
                } else {
                  // console.log("No Data");
                }
              });
              alltimeAppDB++;
              // console.log("if", alltimeJobDB);
              update(
                ref(db, `users/jobs_employer/${redux_data.uid}/all_time_stats`),
                {
                  all_time_appoitments: alltimeAppDB,
                }
              );
              // UseWhatsapp(e.Phone, "hello");
              window.open(event.htmlLink, "_blank");
            })
            .then(() => {
              handleExit();
            })
            .catch(() => {
              alert("An error occured while scheduling. Try again");
            });
        });
      });
  });
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
  handleScheduleInterviewVirtualBtn,
};
