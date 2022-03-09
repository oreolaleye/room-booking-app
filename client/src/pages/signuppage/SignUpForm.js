import React from "react";
import useForm from "./UseForm";
import validate from "./ValidateInfo";

function SignUpForm(props) {
  const { handleChange, values, handleSubmit, errors } = useForm(
    props.submit,
    validate
  );

  return (
    <div>
      <form className={props.formWidth}>
        <h2 className="boldText">Sign Up</h2>
        <p>All fields are required unless marked optional</p>
        <div className="form_input_div">
          <input
            type="text"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            placeholder="First name"
          />
          {errors.fname && <p className="error_msg">{errors.fname}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="lname"
            placeholder="Last name"
            value={values.lname}
            onChange={handleChange}
          />
          {errors.lname && <p className="error_msg">{errors.lname}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error_msg">{errors.email}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error_msg">{errors.phone}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error_msg">{errors.address}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="address2"
            value={values.address2}
            onChange={handleChange}
            placeholder="Address 2 (optional)"
          />
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={values.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error_msg">{errors.city}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="text"
            name="province"
            placeholder="State/Province"
            value={values.province}
            onChange={handleChange}
          />
          {errors.province && <p className="error_msg">{errors.province}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error_msg">{errors.password}</p>}
        </div>
        <div className="form_input_div">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="error_msg">{errors.confirmPassword}</p>
          )}
        </div>
        <div>
          <button className="btn" onClick={handleSubmit}>
            {props.btnText}
          </button>
        </div>
        <div className="form_input_div">
          <p>
            Already have an account? <a href="/login">Log In</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
