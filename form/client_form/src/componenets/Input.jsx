import { useState, useRef } from "react";
// import "./styles.css";
import submitForm from "../Functions/Click";

export default function Input() {
  const [admin, setAdmin] = useState("");
  const [role, setRole] = useState("");

  const inputRef = useRef();

  return (
    <div className="App">
      <input
        type="text"
        ref={inputRef}
        placeholder="email"
        onChange={(e) => setAdmin(e.target.value)}
      />
      <button
        onClick={() => {
          submitForm(admin, inputRef, setRole);
        }}
      >
        Check
      </button>
      <br />
      {role}
    </div>
  );
}
//shubham1.das@stu.adamasuniversity.ac.in
//subhasish.mohapatra@adamasuniversity.ac.in
