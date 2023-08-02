"use client";
import { useState } from "react";

export default function RegisFormPage() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false); // เชคไม่ใส่ชื่อ
  const [lnameError, setlnameError] = useState(false); //เชค ไม่ใส่นามสกุล
  const [genderError, setgenderError] = useState(true);
  const [planError, setplanError] = useState(false);
  const [isUserAgreed, setisUserAgreed] = useState("");

  const [lname, setLname] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState(null);
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  const inputFnameOnChange = (event) => {
    // error ถ้าไม่ใส่ชื่อ
    setFnameError(false);
    setFname(event.target.value);
  };

  const inputLnameOnChange = (event) => {
    // ใส่ชื่อ
    setLname(event.target.value);
  };

  const selectPlanOnChange = (event) => {
    //เลือกเเบบวิ่ง
    setplanError(false);
    setPlan(event.target.value);
  };

  const radioGenderMaleOnChange = () => {
    //ถ้ากดเพศชาย
    setGender("male");
  };

  const isUserAgreedOnchange = (event) => {
    setisUserAgreed(event.target.value);
  };

  const radioGenderFemaleOnChange = () => {
    //ถ้ากดเพศหญิง
    setGender("female");
  };

  const cbBuyBottleOnChange = (event) => {
    //เชคซื้อนำ้
    setBuyBottle(event.target.checked);
  };

  const cbBuyShoesOnChange = (event) => {
    //เชคซื้อรองเท้า
    setBuyShoes(event.target.checked);
  };

  const cbBuyCapOnChange = (event) => {
    // เชคหมวก
    setBuyCap(event.target.checked);
  };

  function computeTotalPayment() {
    //คำนวนเงิน
    let total = 0;
    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;
    if (buyBottle) total += 200;
    if (buyShoes) total += 600;
    if (buyCap) total += 400;

    if (buyBottle && buyCap && buyShoes) {
      total = total - total * 0.2;
    }

    return total;
  }

  const registerBtnOnClick = () => {
    let fnameOk = true;
    if (fname === "") {
      fnameOk = false;
      setFnameError(true); //รู้ว่าไม่ใส่ first name ให้ invalid
    }

    let lnameOk = true;
    if (lname === "") {
      lnameOk = false;
      setlnameError(true); //รู้ว่าไม่ใส่ last name ให้ invalid
    }

    // let checkgender = true;
    // if (gender === "") {
    //   checkgender = false;
    //   setgenderError(true);
    //   //รู้ว่าไม่ใส่ gender ให้ invalid
    // }
    if (gender === "male" || gender === "female") {
      setgenderError(true);
    } else {
      setgenderError(false);
    }

    let checkPlan = true;
    if (plan === "") {
      setplanError(true);
      checkPlan = false;
      //รู้ว่าไม่ใส่ plan ให้ invalid
    }

    if (fnameOk) {
      alert(
        `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
      );
    }
  };

  return (
    <div className="mx-auto vstack gap-3" style={{ width: "400px" }}>
      <h3 className="text-center fst-italic">Register CMU Marathon 🏃‍♂️</h3>
      {/* First name & Last name */}
      <div className="d-flex gap-2">
        <div>
          <label className="form-label">First name</label>
          {/* ชื่อจริง */}
          <input
            className={"form-control" + (fnameError ? " is-invalid" : "")} //if else เชคเชื่อมอีกคลาสเฉยๆ
            onChange={inputFnameOnChange}
            value={fname}
          />
          <div className="invalid-feedback">Invalid first name</div>
        </div>
        <div>
          <label className="form-label">Last name</label>
          {/* นามสกุล */}
          <input
            className={"form-control" + (lnameError ? " is-invalid" : "")}
            onChange={inputLnameOnChange}
            value={lname}
            // เชคชื่อ
          />
          <div className="invalid-feedback">Invalid last name</div>
        </div>
      </div>

      {/* Running Plan */}
      <div>
        <label className="form-label">Plan</label>
        <select
          className={"form-select" + (planError ? " is-invalid " : "")}
          onChange={selectPlanOnChange}
          value={plan}
        >
          <option value="">Please select..</option>
          <option value="funrun">Fun run 5.5 Km (500 THB)</option>
          <option value="mini">Mini Marathon 10 Km (800 THB)</option>
          <option value="half">Half Marathon 21 Km (1,200 THB)</option>
          <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
        </select>
        <div className="invalid-feedback">Please select a Plan</div>
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">Gender</label>
        <div>
          <input
            className="me-2 form-check-input"
            type="radio"
            onChange={radioGenderMaleOnChange}
            checked={gender === "male"}
          />
          Male 👨
          <input
            className="mx-2 form-check-input"
            type="radio"
            onChange={radioGenderFemaleOnChange}
            checked={gender === "female"}
          />
          Female 👩
          {/* To show error when user did not select gender, */}
          {/* We just have to render the div below (Not using is-invalid bootstrap class) */}
          {genderError ? (
            ""
          ) : (
            <div className="text-danger">Please select gender</div>
          )}
        </div>
      </div>

      {/* Extra Items */}
      <div>
        <label className="form-label">Extra Item(s)</label>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyBottleOnChange}
            checked={buyBottle}
          />{" "}
          <label className="form-check-label">Bottle 🍼 (200 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyShoesOnChange}
            checked={buyShoes}
          />{" "}
          <label className="form-check-label">Shoes 👟 (600 THB)</label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={cbBuyCapOnChange}
            checked={buyCap}
          />{" "}
          <label className="form-check-label">Cap 🧢 (400 THB)</label>
        </div>
      </div>

      <div className="alert alert-primary" role="alert">
        Promotion📢 Buy all items to get 20% Discount
      </div>

      {/* Total Payment */}
      <div>
        Total Payment : {computeTotalPayment().toLocaleString()} THB{" "}
        {buyBottle && buyCap && buyShoes && (
          <span className={"text-success d-block "}>(20% Discounted)</span>
        )}
        {/* Render below element conditionally when user get 20% discount */}
      </div>

      {/* Terms and conditions */}
      <div>
        <input
          className="me-2"
          type="checkbox"
          onChange={isUserAgreedOnchange}
          checked={isUserAgreed}
        />
        I agree to the terms and conditions
      </div>

      {/* Register Button */}
      <button
        className="btn btn-success my-2"
        onClick={registerBtnOnClick}
        //You can embbed a state like below to disabled the button
        disabled={!isUserAgreed}
      >
        Register
      </button>
    </div>
  );
}
