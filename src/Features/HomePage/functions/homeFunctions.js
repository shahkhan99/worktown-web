import $ from "jquery";

function handleModeChange(mode, fullpage, ctx) {
  fullpage.moveTo(2, 0);
  ctx.setState({
    wantedCategorySelectionErr: false,
    wantedCategorySelection: true,
  });
  mode === "Employer"
    ? ctx.setState({ employee: false, employer: true })
    : ctx.setState({ employer: false, employee: true });
  // console.log("e");
  fullpage.moveTo(2, 0);
}
function onLeave(origin, destination, direction) {
  //   console.log("Leaving section ", origin);
  //   if (origin.index == 1) {
  //     clearInterval(this.intervalId);
  //   }
}
function afterLoad(origin, destination, direction) {
  //   console.log("After load: ", origin);
  //   if (destination.index == 1) {
  //     this.intervalId = setInterval(
  //       () => {
  //         this.setState({ index: this.state.index + 1 });
  //       },
  //       1300
  //       // every 1.5 seconds
  //     );
  //   }
}
const handleSW = (ctx) => {
  if (ctx.state.csr) {
    ctx.setState({ csr: false });
  }
  if (ctx.state.dm) {
    ctx.setState({ dm: false });
  }
  if (ctx.state.gd) {
    ctx.setState({ gd: false });
  }
  ctx.state.sw
    ? ctx.setState({ sw: false, JobCategory: "" })
    : ctx.setState({ sw: true });
  ctx.setState({ jobErr: false });
};
const handleDM = (ctx) => {
  if (ctx.state.csr) {
    ctx.setState({ csr: false });
  }
  if (ctx.state.sw) {
    ctx.setState({ sw: false });
  }
  if (ctx.state.gd) {
    ctx.setState({ gd: false });
  }
  ctx.state.dm
    ? ctx.setState({ dm: false, JobCategory: "" })
    : ctx.setState({ dm: true });
  ctx.setState({ jobErr: false });
};
const handleGD = (ctx) => {
  if (ctx.state.csr) {
    ctx.setState({ csr: false });
  }
  if (ctx.state.sw) {
    ctx.setState({ sw: false });
  }
  if (ctx.state.dm) {
    ctx.setState({ dm: false });
  }
  ctx.state.gd
    ? ctx.setState({ JobCategory: "", gd: false })
    : ctx.setState({ gd: true });
  ctx.setState({ jobErr: false });
};

const handleCard = (fullpageApi, val, ctx) => {
  if (ctx.state.wantedCategorySelection) {
    ctx.setState({ JobCategory: val.name, skills: [] });
    if (val.name === "Software & IT Jobs") {
      handleSW(ctx);
      ctx.setState({ noCategory: false });
    } else if (val.name === "Digital Marketing Jobs") {
      handleDM(ctx);
      ctx.setState({ noCategory: false });
    } else if (val.name === "Graphics & Design Jobs") {
      handleGD(ctx);
      ctx.setState({ noCategory: false });
    }
    fullpageApi.moveTo(3, 0);
  } else {
    ctx.setState({ wantedCategorySelectionErr: true });
    // console.log(fullpageApi.getActiveSection());
    // fullpageApi.moveTo(1, 0);
    $("html, body").animate({ scrollTop: 0 }, "normal");
  }
};

const handleSelect = (name, value, ctx) => {
  ctx.setState({ [name]: value.target.value });
  name === "experience" && value.target.value === ""
    ? ctx.setState({ expTErr: true })
    : ctx.setState({ expTErr: false });
  name === "education" && value.target.value === ""
    ? ctx.setState({ eduTErr: true })
    : ctx.setState({ eduTErr: false });
  name === "eng_lvl" && value.target.value === ""
    ? ctx.setState({ engTErr: true })
    : ctx.setState({ engTErr: false });

  //   console.log(ctx.state);
};

function handleSalaryChange(target, value, ctx) {
  ctx.setState({
    [target]: value,
  });

  ctx.state.from === "" || ctx.state.to === ""
    ? ctx.setState({ expSalTErr: true })
    : ctx.setState({ expSalTErr: false });
}

function handleNoCategory(e, ctx) {
  e.moveTo(2, 0);
  ctx.setState({ noCategory: true });
}
function selectChange(e, ctx) {
  // console.log(e);
  ctx.setState({
    selectedJobOption: e,
    jobErr: false,
  });
}
const back = (fullpageApi) => {
  // this.setState({ part1: true, part2: false });
  fullpageApi.moveTo(3, 0);
};
const back1 = (fullpageApi) => {
  // this.setState({ part1: true, part2: false });
  fullpageApi.moveTo(5, 0);
};
const back2 = (fullpageApi) => {
  // this.setState({ part1: true, part2: false });
  fullpageApi.moveTo(4, 0);
};

const handleCheck = (val, ctx) => {
  if (val === "Part-time") {
    if (ctx.state.parttime) {
      ctx.setState({ parttime: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ parttime: true });
      ctx.state.interestedIn.push(val);
    }
  }
  if (val === "Full-time") {
    if (ctx.state.fulltime) {
      ctx.setState({ fulltime: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ fulltime: true });
      ctx.state.interestedIn.push(val);
    }
  }
  if (val === "Freelance") {
    if (ctx.state.freelance) {
      ctx.setState({ freelance: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ freelance: true });
      ctx.state.interestedIn.push(val);
    }
  }
  if (val === "Remote") {
    if (ctx.state.remote) {
      ctx.setState({ remote: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ remote: true });
      ctx.state.interestedIn.push(val);
    }
  }
  if (val === "Work from Home") {
    if (ctx.state.workFromHome) {
      ctx.setState({ workFromHome: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ workFromHome: true });
      ctx.state.interestedIn.push(val);
    }
  }
  if (val === "Night Shift") {
    if (ctx.state.nightShift) {
      ctx.setState({ nightShift: false });
      const index = ctx.state.interestedIn.indexOf(val);
      if (index > -1) {
        ctx.state.interestedIn.splice(index, 1);
      }
    } else {
      ctx.setState({ nightShift: true });
      ctx.state.interestedIn.push(val);
    }
  }
};

const handleMale = (ctx) => {
  if (ctx.state.female) {
    ctx.setState({ female: false });
  }
  ctx.state.male ? ctx.setState({ male: false }) : ctx.setState({ male: true });
  ctx.setState({ radTErr: false });
};
const handleFemale = (ctx) => {
  if (ctx.state.male) {
    ctx.setState({ male: false });
  }
  ctx.state.female
    ? ctx.setState({ female: false })
    : ctx.setState({ female: true });
  ctx.setState({ radTErr: false });
};

const handleSkillAdd = (item, ctx) => {
  let { defSkills, defSkillsDM, defSkillsGD, JobCategory } = ctx.state;
  if (ctx.state.skills.length === 10) {
    alert("You can add max 10 skills");
  } else {
    let strItem = item.toString();
    let strItemUp = strItem.charAt(0).toUpperCase() + strItem.slice(1);
    if (JobCategory === "Digital Marketing Jobs") {
      if (defSkillsDM.includes(strItemUp)) {
        ctx.state.skills.push(strItemUp);
        ctx.setState({ defSkillsDM: ctx.state.defSkillsDM });
      } else {
        ctx.state.skills.push(strItemUp);
        ctx.state.defSkillsDM.push(strItemUp);
        ctx.setState({ defSkillsDM: ctx.state.defSkillsDM });
        ctx.state.skills.length && ctx.setState({ skillTErr: false });
      }
    } else if (JobCategory === "Graphics & Design Jobs") {
      if (defSkillsGD.includes(strItemUp)) {
        ctx.state.skills.push(strItemUp);
        ctx.setState({ defSkills: ctx.state.defSkillsGD });
      } else {
        ctx.state.skills.push(strItemUp);
        ctx.state.defSkillsGD.push(strItemUp);
        ctx.setState({ defSkillsGD: ctx.state.defSkillsGD });
        ctx.state.skills.length && ctx.setState({ skillTErr: false });
      }
    } else {
      if (defSkills.includes(strItemUp)) {
        ctx.state.skills.push(strItemUp);
        ctx.setState({ defSkills: ctx.state.defSkills });
      } else {
        ctx.state.skills.push(strItemUp);
        ctx.state.defSkills.push(strItemUp);
        ctx.setState({ defSkills: ctx.state.defSkills });
        ctx.state.skills.length && ctx.setState({ skillTErr: false });
      }
    }
  }
};

const handleSkillDefault = (e, ctx) => {
  const index = ctx.state.skills.indexOf(e);
  index > -1
    ? ctx.state.skills.splice(index, 1)
    : ctx.state.skills.length === 10
    ? alert("You can add max 10 skills")
    : ctx.state.skills.push(e);

  // console.log(this.state.JobCategory);
  ctx.state.skills.length && ctx.setState({ skillTErr: false });
  ctx.state.JobCategory === "Digital Marketing Jobs"
    ? ctx.setState({ defSkillsDM: ctx.state.defSkillsDM })
    : ctx.state.JobCategory === "Graphics & Design Jobs"
    ? ctx.setState({ defSkillsGD: ctx.state.defSkillsGD })
    : ctx.setState({ defSkills: ctx.state.defSkills });
};

const handleAchievementAdd = (item, ctx) => {
  let { achievement } = ctx.state;

  ctx.setState({ achievement: item, achievementLen: item.length });
  achievement.length && ctx.setState({ achievementTErr: false });
};

const handleChange = (e, ctx) => {
  ctx.setState({ valTErr: false });
  ctx.setState({ range_cond: e });
  if (ctx.state.range_cond < 100000) {
    let val = `${e - 10000} - ${e}`;
    ctx.setState({ value: val });
  } else if (ctx.state.range_cond < 310000) {
    let val = `${e - 20000} - ${e}`;
    ctx.setState({ value: val });
  } else {
    let val = `${e - 40000} - ${e}`;
    ctx.setState({ value: val });
  }
};

const toUpperCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const _handleChange = (
  checkValidation,
  validationCheck,
  stateKey,
  value,
  ctx
) => {
  const { error, isValid } = checkValidation(value);
  // console.log(value);
  if (stateKey === "phone") {
    // let formatted = value.replace(/(\d{4,4})/, "$1-");
    // let formatted = `${value.slice(0, 4)} ${value.slice(4, 10)}`;
    // const formatted = this.formatPhoneNumber(value);
    ctx.setState({
      [stateKey]: value,
      errorMessage: {
        ...ctx.state.errorMessage,
        [stateKey]: "",
        [validationCheck]: true,
      },
    });
    setTimeout(
      () => ctx.state.phone !== " " && ctx.setState({ phoneTErr: false }),
      10
    );
  }
  if (isValid) {
    if (stateKey === "name") {
      let result = toUpperCase(value);
      ctx.setState({
        [stateKey]: result,
        errorMessage: {
          ...ctx.state.errorMessage,
          [stateKey]: "",
          [validationCheck]: true,
        },
      });
      setTimeout(
        () => ctx.state.name !== "" && ctx.setState({ nameTErr: false }),
        10
      );
      ctx.setState({ company: ctx.state.company });
    } else {
      setTimeout(() => {
        ctx.setState({
          [stateKey]: value,
          errorMessage: {
            ...ctx.state.errorMessage,
            [stateKey]: "",
            [validationCheck]: true,
          },
        });
        ctx.state.employer &&
          ctx.state.company !== "" &&
          ctx.setState({ companyTErr: false });
        ctx.state.jobDesc !== "" && ctx.setState({ jobDescTErr: false });
      }, 10);
      setTimeout(() => {
        ctx.state.city !== "" && ctx.setState({ cityTErr: false });
        ctx.state.email !== "" && ctx.setState({ emailTErr: false });
      }, 10);
    }
  } else {
    ctx.setState({
      errorMessage: {
        ...ctx.state.errorMessage,
        [stateKey]: error,
        [validationCheck]: false,
      },
    });

    ctx.state.errorMessage.email === "Please enter a valid Email" &&
      ctx.setState({ emailTErr: true });
  }
  if (stateKey === "jobDesc") {
    ctx.setState({ achievementLen: value.length });
  }
};

const clearForm = (selectedCategories, ctx, document) => {
  selectedCategories = [];
  document.getElementById("company").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  // document.getElementById("city").value = "Karachi";
  document.getElementById("select").value = "";
  ctx.setState({
    company: "",
    name: "",
    phone: "",
    // email: "",
    city: "Karachi",
    value: "0",
    range_cond: 0,
    csr: false,
    sw: false,
    experience: "",
    education: "",
    eng_lvl: "",
    male: false,
    female: false,
    selected: [],
    achievement: [],
    skills: [],
    selectedJobOption: "",
  });
};

const onSelect = (item, ele, ctx) => {
  const { selected } = ctx.state;
  let index = selected.indexOf(item);
  let newList = [...selected];
  if (item === 0 && selected.includes(1)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (item === 1 && selected.includes(0)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (item === 1 && selected.includes(2)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (item === 0 && selected.includes(2)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (item === 2 && selected.includes(0)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (item === 2 && selected.includes(1)) {
    ele.target.classList.remove("quadrat");
    setTimeout(() => {
      ele.target.classList.add("quadrat");
    }, 0);
  } else if (index > -1) {
    newList.splice(index, 1);
  } else {
    newList.push(item);
    ctx.setState({ intTErr: false });
  }
  // console.log(ele);
  ctx.setState({
    selected: newList,
    active: item,
  });
};

const onSelectSalary = (item, ctx) => {
  const { selectedSal } = ctx.state;
  let index = selectedSal.indexOf(item);
  let newList = [];
  if (index > -1) {
    newList.splice(index, 1);
  } else {
    newList.push(item);
    ctx.setState({ stTErr: false });
  }
  ctx.setState({
    selectedSal: newList,
    activeSal: item,
    to: item === 2 ? "-" : "",
  });
};

const handleLoginChangeBtn = (window) => {
  window.open("/portal", "_blank");
};

const handleNext2 = (fullpageApi, ctx) => {
  if (
    ctx.state.name === "" ||
    (ctx.state.employee
      ? !ctx.state.female && !ctx.state.male
      : ctx.state.employer
      ? ctx.state.company === ""
      : "") ||
    ctx.state.email === "" ||
    ctx.state.phone === ""
  ) {
    ctx.state.name === "" && ctx.setState({ nameTErr: true });
    ctx.state.phone === "" && ctx.setState({ phoneTErr: true });
    ctx.state.email === "" && ctx.setState({ emailTErr: true });

    if (ctx.state.employer) {
      ctx.state.company === "" && ctx.setState({ companyTErr: true });
    } else if (ctx.state.employee) {
      !ctx.state.male && !ctx.state.female && ctx.setState({ radTErr: true });
    }
    fullpageApi.moveTo(3, 0);
  }
  if (
    ctx.state.selectedJobOption === "" ||
    (!ctx.state.csr && !ctx.state.sw) ||
    ctx.state.experience === "" ||
    ctx.state.education === "" ||
    ctx.state.eng_lvl === "" ||
    ctx.state.city === ""
  ) {
    ctx.state.selectedJobOption === "" && ctx.setState({ jobErr: true });

    ctx.state.city === "" && ctx.setState({ cityTErr: true });
    ctx.state.experience === "" && ctx.setState({ expTErr: true });
    ctx.state.education === "" && ctx.setState({ eduTErr: true });
    ctx.state.eng_lvl === "" && ctx.setState({ engTErr: true });
  } else {
    fullpageApi.moveTo(5, 0);
  }
};

const handleNext4 = (fullpageApi, selectedCategories, ctx) => {
  let interest = selectedCategories.toString() || "";
  if (!ctx.state.skills.length || interest === "") {
    // console.log(salarytime);

    !ctx.state.skills.length && ctx.setState({ skillTErr: true });
    interest === "" && ctx.setState({ intTErr: true });
  } else if (
    ctx.state.name === "" ||
    ctx.state.selectedJobOption === "" ||
    (ctx.state.employee
      ? !ctx.state.female && !ctx.state.male
      : ctx.state.employer
      ? ctx.state.company === ""
      : "") ||
    (!ctx.state.csr && !ctx.state.sw) ||
    ctx.state.phone === ""
  ) {
    ctx.state.name === "" && ctx.setState({ nameTErr: true });
    ctx.state.phone === "" && ctx.setState({ phoneTErr: true });
    ctx.state.selectedJobOption === "" && ctx.setState({ jobErr: true });

    if (ctx.state.employer) {
      ctx.state.company === "" && ctx.setState({ companyTErr: true });
    } else {
      !ctx.state.male && !ctx.state.female && ctx.setState({ radTErr: true });
    }
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
    fullpageApi.moveTo(4, 0);
  } else {
    fullpageApi.moveTo(6, 0);
  }
};
export {
  handleModeChange,
  afterLoad,
  onLeave,
  handleCard,
  handleSelect,
  handleSalaryChange,
  handleNoCategory,
  selectChange,
  back,
  back1,
  back2,
  handleCheck,
  handleFemale,
  handleMale,
  handleSkillAdd,
  handleSkillDefault,
  handleAchievementAdd,
  handleChange,
  _handleChange,
  clearForm,
  onSelect,
  onSelectSalary,
  handleLoginChangeBtn,
  handleNext2,
  handleNext4,
};
