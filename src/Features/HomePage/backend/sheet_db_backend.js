import { getDatabase } from "firebase/database";
import {
  set,
  ref,
  push,
  child,
  update,
  onValue,
  onChildAdded,
} from "@firebase/database";
import firebase from "../../../config/firebase";
import {
  SPREADSHEET_ID,
  EMPLOYER_SPREADSHEET_ID,
  SHEET_ID,
  SHEET_ID_EMP,
  CLIENT_EMAIL,
  PRIVATE_KEY,
} from "../confKeys/conf_keys";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { clearForm } from "../functions/homeFunctions";
import Swal from "sweetalert2";

const db = getDatabase();
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const emp_doc = new GoogleSpreadsheet(EMPLOYER_SPREADSHEET_ID);

const handleNext1 = async (fullpageApi, ctx) => {
  let gender =
    ctx.state.loggedInGender !== ""
      ? ctx.state.loggedInGender
      : ctx.state.male
      ? "Male"
      : ctx.state.female
      ? "Female"
      : "";

  if (
    ctx.state.name === "" ||
    (ctx.state.employee && gender === "") ||
    (ctx.state.employer && ctx.state.company === "") ||
    ctx.state.phone === "" ||
    ctx.state.JobCategory === "" ||
    ctx.state.email === "" ||
    ctx.state.phoneTErr ||
    !ctx.state.errorMessage.phoneValid
  ) {
    ctx.state.name === "" && ctx.setState({ nameTErr: true });
    ctx.state.phone === "" && ctx.setState({ phoneTErr: true });
    ctx.state.email === "" && ctx.setState({ emailTErr: true });
    !ctx.state.sw && fullpageApi.moveTo(2, 0);
    !ctx.state.sw && ctx.setState({ noCategory: true });
    if (ctx.state.employer) {
      ctx.state.company === "" && ctx.setState({ companyTErr: true });
    } else if (ctx.state.employee) {
      !ctx.state.male && !ctx.state.female && ctx.setState({ radTErr: true });
      console.log(ctx.state.male, ctx.state.female);
    }
  } else {
    let allEmployeesResult = {};
    let allEmployersResult = {};
    let allUsers = {};

    if (ctx.state.employer) {
      const allEmployers = ref(db, `users/jobs_employer`);

      onValue(allEmployers, (snapshot) => {
        if (snapshot.exists()) {
          allEmployersResult = snapshot.val();
          // console.log(allEmployersResult);
          let ObjVal = Object.values(allEmployersResult);
          let findSimilarE = ObjVal.filter((e) => e.Email === ctx.state.email);
          let findSimilar = ObjVal.filter((e) => e.Phone === ctx.state.phone);
          // ctx.setState({ allUsers: findSimilar });
          // console.log(findSimilar, findSimilarE);
          if (ctx.state.loginSession) {
            let gender =
              ctx.state.loggedInGender !== ""
                ? ctx.state.loggedInGender
                : ctx.state.male
                ? "Male"
                : ctx.state.female
                ? "Female"
                : "";
            appendSpreadsheet({
              Name: ctx.state.name,
              Phone: ctx.state.phone,
              City: ctx.state.city,
              Email: ctx.state.email,
              JobCategory: "",
              JobType: "",
              Experience: "",
              Skills: "",
              Education: "",
              InterestedIn: "",
              CurrentSalary: "",
              Gender: gender,
              EnglishLevel: "",
              Achievement: "",
            });
            fullpageApi.moveTo(4, 0);
          } else {
            if (findSimilar.length && !findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Email or Phone is registered to different accounts",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else if (!findSimilar.length && findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "It seems like you've not logged in. Make sure to logged in to post a new job",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else if (findSimilar.length && findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "It seems like you've not logged in. Make sure to logged in to post a new job",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else {
              let gender =
                ctx.state.loggedInGender !== ""
                  ? ctx.state.loggedInGender
                  : ctx.state.male
                  ? "Male"
                  : ctx.state.female
                  ? "Female"
                  : "";
              appendSpreadsheet({
                Name: ctx.state.name,
                Phone: ctx.state.phone,
                City: ctx.state.city,
                Email: ctx.state.email,
                JobCategory: "",
                JobType: "",
                Experience: "",
                Skills: "",
                Education: "",
                InterestedIn: "",
                CurrentSalary: "",
                Gender: gender,
                EnglishLevel: "",
                Achievement: "",
              });
              fullpageApi.moveTo(4, 0);
            }
          }
        } else {
          let gender =
            ctx.state.loggedInGender !== ""
              ? ctx.state.loggedInGender
              : ctx.state.male
              ? "Male"
              : ctx.state.female
              ? "Female"
              : "";
          appendSpreadsheet({
            Name: ctx.state.name,
            Phone: ctx.state.phone,
            City: ctx.state.city,
            Email: ctx.state.email,
            JobCategory: "",
            JobType: "",
            Experience: "",
            Skills: "",
            Education: "",
            InterestedIn: "",
            CurrentSalary: "",
            Gender: gender,
            EnglishLevel: "",
            Achievement: "",
          });
          fullpageApi.moveTo(4, 0);
        }
      });
    } else {
      const allEmployers = ref(db, `users/jobs_employer`);

      onValue(allEmployers, (snapshot) => {
        if (snapshot.exists()) {
          allEmployersResult = snapshot.val();
          // console.log(allEmployersResult);
          let ObjVal = Object.values(allEmployersResult);
          let findSimilarE = ObjVal.filter((e) => e.Email === ctx.state.email);
          let findSimilar = ObjVal.filter((e) => e.Phone === ctx.state.phone);
          // ctx.setState({ allUsers: findSimilar });
          console.log(ctx.state.loginSession);
          if (ctx.state.loginSession) {
            let gender =
              ctx.state.loggedInGender !== ""
                ? ctx.state.loggedInGender
                : ctx.state.male
                ? "Male"
                : ctx.state.female
                ? "Female"
                : "";
            appendSpreadsheet({
              Name: ctx.state.name,
              Phone: ctx.state.phone,
              City: ctx.state.city,
              Email: ctx.state.email,
              JobCategory: "",
              JobType: "",
              Experience: "",
              Skills: "",
              Education: "",
              InterestedIn: "",
              CurrentSalary: "",
              Gender: gender,
              EnglishLevel: "",
              Achievement: "",
            });
            fullpageApi.moveTo(4, 0);
          } else {
            if (findSimilar.length && !findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Email or Phone is registered to different accounts",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else if (!findSimilar.length && findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "It seems like you've not logged in. Make sure to logged in to post a new job",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else if (findSimilar.length && findSimilarE.length) {
              Swal.fire({
                position: "center",
                icon: "error",
                title:
                  "It seems like you've not logged in. Make sure to logged in to post a new job",
                showConfirmButton: true,
                // timer: 1500,
              });
            } else {
              let gender =
                ctx.state.loggedInGender !== ""
                  ? ctx.state.loggedInGender
                  : ctx.state.male
                  ? "Male"
                  : ctx.state.female
                  ? "Female"
                  : "";
              appendSpreadsheet({
                Name: ctx.state.name,
                Phone: ctx.state.phone,
                City: ctx.state.city,
                Email: ctx.state.email,
                JobCategory: "",
                JobType: "",
                Experience: "",
                Skills: "",
                Education: "",
                InterestedIn: "",
                CurrentSalary: "",
                Gender: gender,
                EnglishLevel: "",
                Achievement: "",
              });
              fullpageApi.moveTo(4, 0);
            }
          }
        } else {
        }
      });
    }
  }
};

const handleNext3 = async (
  fullpageApi,
  selectedCategories,
  selectedSalTime,
  ctx
) => {
  let interest = selectedCategories.toString() || "";
  let salarytime = selectedSalTime.toString() || [];
  if (
    (ctx.state.employer ? !salarytime.length : !ctx.state.achievement.length) ||
    (ctx.state.employer
      ? ctx.state.to === "" || ctx.state.from === ""
      : ctx.state.value === "0") ||
    (ctx.state.employer && ctx.state.jobDesc === "")
  ) {
    ctx.state.employer &&
      ctx.state.jobDesc === "" &&
      ctx.setState({ jobDescTErr: true });
    !salarytime.length && ctx.setState({ stTErr: true });
    !ctx.state.achievement.length && ctx.setState({ achievementTErr: true });
    ctx.state.employee
      ? ctx.state.value == 0 && ctx.setState({ valTErr: true })
      : (ctx.state.to == 0 || ctx.state.from == 0) &&
        ctx.setState({ expSalTErr: true });
  } else if (
    (ctx.state.name === "" ||
      ctx.state.selectedJobOption === "" ||
      (ctx.state.employee
        ? !ctx.state.female && !ctx.state.male
        : ctx.state.employer
        ? ctx.state.company === ""
        : "") ||
      (!ctx.state.csr && !ctx.state.sw) ||
      ctx.state.phone === "") &&
    (ctx.state.email === "" ||
      ctx.state.experience === "" ||
      !ctx.state.skills.length ||
      ctx.state.education === "" ||
      ctx.state.eng_lvl === "" ||
      ctx.state.city === "")
  ) {
    ctx.state.name === "" && ctx.setState({ nameTErr: true });
    ctx.state.phone === "" && ctx.setState({ phoneTErr: true });
    ctx.state.selectedJobOption === "" && ctx.setState({ jobErr: true });

    if (ctx.state.employer) {
      ctx.state.company === "" && ctx.setState({ companyTErr: true });
    } else {
      !ctx.state.male && !ctx.state.female && ctx.setState({ radTErr: true });
    }
    !ctx.state.skills.length && ctx.setState({ skillTErr: true });
    ctx.state.email === "" && ctx.setState({ emailTErr: true });
    ctx.state.city === "" && ctx.setState({ cityTErr: true });
    ctx.state.experience === "" && ctx.setState({ expTErr: true });
    ctx.state.education === "" && ctx.setState({ eduTErr: true });
    ctx.state.eng_lvl === "" && ctx.setState({ engTErr: true });

    interest === "" && ctx.setState({ intTErr: true });
    ctx.state.value === "0" && ctx.setState({ valTErr: true });

    fullpageApi.moveTo(3, 0);
  } else if (
    ctx.state.email === "" ||
    ctx.state.experience === "" ||
    ctx.state.education === "" ||
    ctx.state.eng_lvl === "" ||
    ctx.state.city === ""
  ) {
    ctx.state.email === "" && ctx.setState({ emailTErr: true });
    ctx.state.city === "" && ctx.setState({ cityTErr: true });
    ctx.state.experience === "" && ctx.setState({ expTErr: true });
    ctx.state.education === "" && ctx.setState({ eduTErr: true });
    ctx.state.eng_lvl === "" && ctx.setState({ engTErr: true });

    interest === "" && ctx.setState({ intTErr: true });
    ctx.state.value === "0" && ctx.setState({ valTErr: true });

    fullpageApi.moveTo(4, 0);
  } else if (ctx.state.skills.length === 0 || interest === "") {
    interest === "" && ctx.setState({ intTErr: true });
    ctx.state.skills.length === 0 && ctx.setState({ skillTErr: true });

    fullpageApi.moveTo(5, 0);
  } else {
    let allEmployersResult = {};
    let proceed = false;
    const allEmployers = ref(db, `users/jobs_employer`);

    onValue(allEmployers, (snapshot) => {
      if (snapshot.exists()) {
        allEmployersResult = snapshot.val();
        // console.log(allEmployersResult);
        let ObjVal = Object.values(allEmployersResult);
        let findSimilarE = ObjVal.filter((e) => e.Email === ctx.state.email);
        let findSimilar = ObjVal.filter((e) => e.Phone === ctx.state.phone);
        // ctx.setState({ allUsers: findSimilar });
        // console.log(findSimilar, findSimilarE);
        if (findSimilar.length && !findSimilarE.length) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email or Phone is registered to different accounts",
            showConfirmButton: true,
            // timer: 1500,
          });
        } else if (!findSimilar.length && findSimilarE.length) {
          Swal.fire({
            position: "center",
            icon: "error",
            title:
              "It seems like you've not logged in. Make sure to logged in to post a new job",
            showConfirmButton: true,
            // timer: 1500,
          });
        } else if (findSimilar.length && findSimilarE.length) {
          if (ctx.state.loginSession) {
            // ctx.
            proceed = true;

            // console.log("chal gya");
          } else {
            // console.log("chal gya else");
            Swal.fire({
              position: "center",
              icon: "error",
              title:
                "It seems like you've not logged in. Make sure to logged in to post a new job",
              showConfirmButton: true,
              // timer: 1500,
            });
          }
        } else {
          // console.log("New user", ctx.state);
          proceed = true;
        }
      } else {
        // console.log("No data available");
      }
    });
    if (proceed) {
      submitHandler(fullpageApi, selectedCategories, selectedSalTime, ctx);
      fullpageApi.moveTo(7, 0);
      proceed = false;
    }
  }
};

const submitHandler = (
  fullpageApi,
  selectedCategories,
  selectedSalTime,
  ctx
) => {
  const { nameValid, cityValid, emailValid, phoneValid, companyValid } =
    ctx.state.errorMessage;
  const { skills, achievement, from, to, loggedInGender } = ctx.state;
  const formIsValid = nameValid && emailValid && phoneValid;
  const formIsValidEmployer =
    nameValid && emailValid && phoneValid && companyValid;
  // console.log(nameValid, emailValid, phoneValid, companyValid);
  let gender = "";
  if (loggedInGender !== "") {
    gender = loggedInGender;
  } else {
    gender = ctx.state.male ? "Male" : ctx.state.female ? "Female" : "";
  }

  let interest = selectedCategories.toString() || "";
  let SalaryTime = selectedSalTime.toString() || "";
  let skillSet = skills.toString() || "";
  let achievementStr = achievement.toString() || "";
  var exp_sal = (ctx.state.employer && from + "-" + to) || "";
  if (ctx.state.employee) {
    if (!formIsValid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid input fields 1",
        showConfirmButton: true,
        // timer: 1500,
      });
      return;
    }
  } else {
    if (!formIsValidEmployer) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Invalid input fields 2",
        showConfirmButton: true,
        // timer: 1500,
      });
      return;
    }
  }
  if (
    ctx.state.name === "" ||
    ctx.state.phone === "" ||
    ctx.state.city === "" ||
    ctx.state.email === "" ||
    skillSet === "" ||
    ctx.state.JobCategory === "" ||
    ctx.state.experience === "" ||
    ctx.state.education === "" ||
    (ctx.state.employee && ctx.state.value === "0") ||
    ctx.state.eng_lvl === "" ||
    ctx.state.selectedJobOption === "" ||
    (ctx.state.employee ? gender === "" : ctx.state.company === "") ||
    (ctx.state.employee ? achievementStr === "" : exp_sal === "-") ||
    (ctx.state.employee ? interest === "" : SalaryTime === "") ||
    (ctx.state.employer && ctx.state.jobDesc === "")
  ) {
    interest === "" && ctx.setState({ intTErr: true });
    exp_sal === "" && ctx.setState({ expSTErr: true });
    ctx.state.value === "0" && ctx.setState({ valTErr: true });
    // console.log(gender);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Invalid input fields 3",
      showConfirmButton: true,
      timer: 1000,
    });
  } else {
    if (ctx.state.value === "490000 - 530000") {
      ctx.setState({ value: "300000+" });
    }
    if (ctx.state.value === "0") {
      ctx.setState({ value: "0" });
    }
    ctx.setState({ isSubmit: true });
    const showLoading = function () {
      Swal.fire({
        title: "Just a Sec...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        // timer: 1000,
        showConfirmButton: false,
      });
    };
    setTimeout(() => {
      if (ctx.state.isSubmit) {
        showLoading();
      }
      if (ctx.state.employer) {
        // console.log(ctx.state);

        emp_appendSpreadsheet({
          BusinessName: ctx.state.company,
          Name: ctx.state.name,
          Phone: ctx.state.phone,
          City: ctx.state.city,
          Email: ctx.state.email,
          JobCategory: ctx.state.JobCategory,
          JobType: ctx.state.selectedJobOption,
          JobDescription: ctx.state.jobDesc,
          Experience: ctx.state.experience,
          Skills: skillSet,
          Education: ctx.state.education,
          InterestedIn: interest,
          ExpectedSalary: exp_sal,
          EnglishLevel: ctx.state.eng_lvl,
          JobTime: SalaryTime,
        }).then(async () => {
          let uid =
            ctx.state.uId !== ""
              ? ctx.state.uId
              : push(child(ref(db), `users/jobs_employer/`)).key;
          // let uid = ctx.state.phone;

          await update(ref(db, `users/jobs_employer/${uid}/`), {
            BusinessName: ctx.state.company,
            Name: ctx.state.name,
            Phone: ctx.state.phone,
            City: ctx.state.city,
            Email: ctx.state.email,
            uid: uid,
          }).then(async () => {
            const key = push(
              child(ref(db), `users/jobs_employer/${uid}/jobs`)
            ).key;
            // ctx.state.experience + ctx.state.selectedJobOption;
            await update(ref(db, `users/jobs_employer/${uid}/jobs/${key}`), {
              JobCategory: ctx.state.JobCategory,
              City: ctx.state.city,
              JobType: ctx.state.selectedJobOption,
              JobDescription: ctx.state.jobDesc,
              Experience: ctx.state.experience,
              Skills: skillSet,
              Education: ctx.state.education,
              InterestedIn: interest,
              ExpectedSalary: exp_sal,
              EnglishLevel: ctx.state.eng_lvl,
              JobTime: SalaryTime,
              key: key,
            }).then(async () => {
              let alltimeJobDB = 0;
              const all_time_rec = ref(db, `users/jobs_employer/${uid}`);
              onValue(all_time_rec, async (snapshot) => {
                if (snapshot.exists()) {
                  let alltimeDB = snapshot.val();
                  alltimeJobDB =
                    alltimeDB?.all_time_stats !== undefined
                      ? alltimeDB.all_time_stats.all_time_jobs !== undefined
                        ? alltimeDB.all_time_stats.all_time_jobs
                        : 0
                      : 0;
                  // console.log(alltimeDB);
                } else {
                  // console.log("No Data");
                }
              });
              alltimeJobDB++;
              // console.log("if", alltimeJobDB);
              await update(
                ref(db, `users/jobs_employer/${uid}/all_time_stats`),
                { all_time_jobs: alltimeJobDB }
              );
            });
          });
          ctx.setState({ isSubmit: false });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Awesome, you have been added!",
            showConfirmButton: false,
            timer: 1500,
          });
          ctx.setState({ submitionSuccess: true });
          clearForm(selectedCategories, ctx, document);
        });
      } else {
        updateSpreadsheet(
          {
            Name: ctx.state.name,
            Phone: ctx.state.phone,
            City: ctx.state.city,
            Email: ctx.state.email,
            JobCategory: ctx.state.JobCategory,
            JobType: ctx.state.selectedJobOption,
            Experience: ctx.state.experience,
            Skills: skillSet,
            Education: ctx.state.education,
            InterestedIn: interest,
            CurrentSalary: ctx.state.value,
            Gender: gender,
            EnglishLevel: ctx.state.eng_lvl,
            Achievement: achievementStr,
          },
          selectedCategories,
          selectedSalTime,
          ctx
        ).then(() => {
          let uid =
            ctx.state.uId !== ""
              ? ctx.state.uId
              : push(child(ref(db), `users/jobs_employer/`)).key;
          // let uid = ctx.state.phone;
          update(ref(db, "users/jobs_employer/" + uid), {
            Name: ctx.state.name,
            Phone: ctx.state.phone,
            City: ctx.state.city,
            Email: ctx.state.email,
            JobCategory: ctx.state.JobCategory,
            Experience: ctx.state.experience,
            Skills: skillSet,
            Education: ctx.state.education,
            InterestedIn: interest,
            CurrentSalary: ctx.state.value,
            Gender: gender,
            EnglishLevel: ctx.state.eng_lvl,
            JobType: ctx.state.selectedJobOption,
            Achievement: achievementStr,
            uid: uid,
          });
          ctx.setState({ isSubmit: false });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Awesome, you have been added!",
            showConfirmButton: false,
            timer: 1500,
          });
          ctx.setState({ submitionSuccess: true });
          clearForm(selectedCategories, ctx, document);
        });
      }
    }, 100);
  }
};

const updateSpreadsheet = async (
  row,
  selectedCategories,
  selectedSalTime,
  ctx
) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    // const result = await sheet.addRow(row);

    const result = (await sheet.getRows()).filter((v) => {
      return v.Email === row.Email;
    });
    // console.log(result);
    const { skills, achievement, from, to } = ctx.state;
    let gender = ctx.state.male ? "Male" : ctx.state.female ? "Female" : "";
    let interest = selectedCategories.toString() || "";
    let SalaryTime = selectedSalTime.toString() || "";
    let skillSet = skills.toString() || "";
    let achievementStr = achievement.toString() || "";
    var exp_sal = (ctx.state.employer && from + "-" + to) || "";

    if (result.length) {
      let res1 = result.filter((e) => {
        return (
          e.Skills === skillSet &&
          e.CurrentSalary === ctx.state.value &&
          e.JobType === ctx.state.selectedJobOption
        );
      });
      let res2 = result.filter((e) => {
        return e.Skills === "";
      });
      // console.log("running", res2);
      if (res1.length) {
        res1.forEach((v) => {
          v.Name = ctx.state.name;
          v.Phone = ctx.state.phone;
          v.City = ctx.state.city;
          v.Email = ctx.state.email;
          v.JobCategory = ctx.state.JobCategory;
          v.JobType = ctx.state.selectedJobOption;
          v.Experience = ctx.state.experience;
          v.Skills = skillSet;
          v.Education = ctx.state.education;
          v.InterestedIn = interest;
          v.CurrentSalary = ctx.state.value;
          v.Gender = gender;
          v.EnglishLevel = ctx.state.eng_lvl;
          v.Achievement = achievementStr;
          v.save();
        });
      } else {
        if (res2.length) {
          res2.forEach((v) => {
            v.Name = ctx.state.name;
            v.Phone = ctx.state.phone;
            v.City = ctx.state.city;
            v.Email = ctx.state.email;
            v.JobCategory = ctx.state.JobCategory;
            v.JobType = ctx.state.selectedJobOption;
            v.Experience = ctx.state.experience;
            v.Skills = skillSet;
            v.Education = ctx.state.education;
            v.InterestedIn = interest;
            v.CurrentSalary = ctx.state.value;
            v.Gender = gender;
            v.EnglishLevel = ctx.state.eng_lvl;
            v.Achievement = achievementStr;
            v.save();
          });
        } else {
          appendNewSpreadsheet({
            Name: ctx.state.name,
            Phone: ctx.state.phone,
            City: ctx.state.city,
            Email: ctx.state.email,
            JobCategory: ctx.state.JobCategory,
            JobType: ctx.state.selectedJobOption,
            Experience: ctx.state.experience,
            Skills: skillSet,
            Education: ctx.state.education,
            InterestedIn: interest,
            CurrentSalary: ctx.state.value,
            Gender: gender,
            EnglishLevel: ctx.state.eng_lvl,
            Achievement: achievementStr,
          });
        }
      }
    } else {
      appendSpreadsheet({
        Name: ctx.state.name,
        Phone: ctx.state.phone,
        City: ctx.state.city,
        Email: ctx.state.email,
        JobCategory: ctx.state.JobCategory,
        JobType: ctx.state.selectedJobOption,
        Experience: ctx.state.experience,
        Skills: skillSet,
        Education: ctx.state.education,
        InterestedIn: interest,
        CurrentSalary: ctx.state.value,
        Gender: gender,
        EnglishLevel: ctx.state.eng_lvl,
        Achievement: achievementStr,
      });
    }
  } catch (e) {
    // console.error("Error: ", e);
  }
};

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    // console.log("else running", row);
    const check = (await sheet.getRows()).filter((v) => {
      return v.Email === row.Email;
    });
    if (!check.length) {
      const result = await sheet.addRow(row);
    }
  } catch (e) {
    // console.error("Error: ", e);
  }
};
const appendNewSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const result = await sheet.addRow(row);
  } catch (e) {
    // console.error("Error: ", e);
  }
};
const emp_appendSpreadsheet = async (row) => {
  try {
    await emp_doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await emp_doc.loadInfo();

    const sheet = emp_doc.sheetsById[SHEET_ID_EMP];
    const result = await sheet.addRow(row);
  } catch (e) {
    // console.error("Error: ", e);
  }
};
const readRows = async () => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    const rows = (await sheet.getRows()).length + 1;

    // ctx.setState({ count: rows }, () => {
    //   document.querySelector(".value").innerText = ctx.state.count;
    // });
  } catch (e) {}
};
const emp_readRows = async () => {
  try {
    await emp_doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await emp_doc.loadInfo();

    const sheet = emp_doc.sheetsById[SHEET_ID];
    const rows = (await sheet.getRows()).length + 1;

    // ctx.setState({ count: rows }, () => {
    //   document.querySelector(".value").innerText = ctx.state.count;
    // });
  } catch (e) {}
};

export {
  emp_readRows,
  readRows,
  emp_appendSpreadsheet,
  appendNewSpreadsheet,
  appendSpreadsheet,
  updateSpreadsheet,
  submitHandler,
  handleNext3,
  handleNext1,
};
