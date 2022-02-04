const isCheck = (val, Reg, name) => {
  const capName = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  if (!val.length) {
    return {
      isValid: false,
      error: `${capName} must not be left empty`,
    };
  } else if (!Reg.test(val)) {
    return {
      isValid: false,
      error:
        name !== "city"
          ? `Please enter a valid ${name}`
          : "Please enter only alphabetical letters",
    };
  }
  return {
    isValid: true,
    error: "",
  };
};

export const nameCheck = (val) => {
  const nameReg = /^[a-z ,.'-]+$/i;
  return isCheck(val, nameReg, "name");
};

export const cityCheck = (val) => {
  const nameReg = /^[a-zA-Z ,.'-]+$/;
  return isCheck(val, nameReg, "city");
};
// export const phoneCheck = (val) => {
//   const Reg = "/^(d{3})s*d{3}(?:-|s*)d{4}$/";
//   return isCheck(val, Reg, "phone number");
// };
export const phoneCheck = (val) => {
  if (val.charAt(0) === "0") {
    const Reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5,5}$/im;
    return isCheck(val, Reg, "phone number");
  } else if (val.charAt(0) === "+") {
    const Reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6,6}$/im;
    return isCheck(val, Reg, "phone number");
  } else if (val.charAt(0) === "9") {
    const Reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{6,6}$/im;
    return isCheck(val, Reg, "phone number");
  } else if (val.charAt(0) === "3") {
    const Reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,4}$/im;
    return isCheck(val, Reg, "phone number");
  } else {
    const Reg = /^[\+]?[(]?[9]{3}[)]?[-\s\.]?[9]{3}[-\s\.]?[0-9]{5,5}$/im;
    return isCheck(val, Reg, "phone number");
  }
};
export const emailCheck = (val) => {
  const Reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return isCheck(val, Reg, "Email");
};

export const companyCheck = (val) => {
  const nameReg = /^[a-zA-Z0-9!@#\s\$%\^\&*\)\(+=._-]+$/g;
  return isCheck(val, nameReg, "company");
};
