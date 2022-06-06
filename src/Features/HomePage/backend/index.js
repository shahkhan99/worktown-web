import firebase from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const auth = getAuth();
const db = getDatabase();

const checkUserSession = (ctx) => {
  var result = null;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uEmail = user.email;
      if (uEmail) {
        const get_users = await ref(db, `users/jobs_employer`);
        onValue(get_users, (snapshot) => {
          if (snapshot.exists()) {
            let userObj = snapshot.val();
            const getObjs = (obj) => Object.values(userObj);
            let users = getObjs(userObj);
            let gotEmail = users.filter((e) => {
              return e.Email === uEmail;
            });
            result = gotEmail.find((obj) => {
              return obj.Email === uEmail;
            });
            // console.log(result);
            ctx.setState((prev) => ({
              uId: result.uid,
              loginSession: true,
              redux_data: result,
              name: result.Name,
              phone: result.Phone,
              email: result.Email,
              company: result.BusinessName ? result.BusinessName : result.Name,
              errorMessage: {
                ...prev.errorMessage,
                cityValid: true,
                companyValid: true,
                emailValid: true,
                nameValid: true,
                phoneValid: true,
              },
            }));
          } else {
            console.log("No data available");
          }
        });
      }
    } else {
      console.log("not logged in");
    }
  });

  //   console.log(redux_data);
};

export { checkUserSession };
