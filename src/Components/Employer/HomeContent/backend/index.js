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
import { API_KEY_WT, CLIENT_ID_WT } from "../../Candidates/backend/calenderAPI";

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

const gapi = window.gapi;
const DISCOVERY_DOC = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar";

const CancelAppointment = (redux_data, candidate) => {
  console.log(redux_data, candidate);

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
      .then(async () => {
        var request = await gapi.client.calendar.events.list({
          calendarId: "primary",
        });
        let allEvents = request.result.items.filter((e) => {
          return candidate.eventID === e.id;
          // console.log(candidate.eventID, e.id);
        });
        let activeID = allEvents[0].id;
        if (allEvents.length) {
          try {
            let response = await gapi.client.calendar.events.delete({
              calendarId: "primary",
              eventId: activeID,
            });
            // console.log();
            if (response.data === "") {
              console.log("delete at delete event ", response);
            } else {
              console.log("else at delete event ", response);
            }
          } catch (error) {
            console.log("Error at delete event ", error);
          }
        }
      })
      .then(() => {
        console.log("1st");
        set(
          ref(
            db,
            `users/jobs_employer/${redux_data.uid}/appointments/${candidate.uid}`
          ),
          null
        ).then(() => {
          console.log("2nd");
          set(
            ref(
              db,
              `users/jobs_employer/${candidate.uid}/employee_side_appointments/${redux_data.uid}`
            ),
            null
          );
        });
      });
  });
};

export { GetAppointments, GetStats, CancelAppointment };