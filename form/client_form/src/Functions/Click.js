// submitFunction.js
const submitForm = (admin, inputRef, setRole) => {
  if (!admin.includes("adamasuniversity.ac.in")) {
    inputRef.current.value = "";
    setRole("please enter a valid email...");
    return;
  }
  if (admin.includes("stu")) {
    setRole("mentee");
  } else {
    setRole("mentor");
  }
};

export default submitForm;
