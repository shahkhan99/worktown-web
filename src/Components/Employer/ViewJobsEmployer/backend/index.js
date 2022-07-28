import { getDatabase } from "firebase/database";
import { set, ref, push, child, update, remove } from "@firebase/database";
import firebase from "../../../../config/firebase";

const db = getDatabase();

const getJobsToView = (redux_data, setAllJobs) => {
  // console.log("current =>", redux_data);
  let jobObj = redux_data && Object.values(redux_data);

  setAllJobs(jobObj);
};
const deleteJob = async (editingdata, redux_data, setAllJobs, allJobs, i) => {
  let arr = [...allJobs];
  await set(
    ref(db, `users/jobs_employer/${redux_data.uid}/jobs/${editingdata.key}`),
    null
  )
    .then(() => {
      arr.splice(i, 1);
      setAllJobs(arr);
    })
    .catch(() => {
      alert("Something went wrong!");
    });
};

const SaveUpdatedJob = async (
  data,
  redux_data,
  exp_sal,
  setEditingData,
  setAllJobs,
  allJobs,
  i
) => {
  //   console.log(data.Phone);
  let arr = [...allJobs];
  data.ExpectedSalary = exp_sal;
  // console.log(setAllJobs, i);
  setTimeout(async () => {
    await update(
      ref(db, `users/jobs_employer/${redux_data.uid}/jobs/${data.key}`),
      data
    )
      .then(() => {
        arr[i] = data;
        setEditingData(data);
        setAllJobs(arr);
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  }, 1000);
  // fetching();
};
export { getJobsToView, SaveUpdatedJob, deleteJob };
