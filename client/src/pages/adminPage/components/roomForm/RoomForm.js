import React from "react";
import Close from "../../../../resources/close.svg";
import RoomUseForm from "./RoomUseForm";
import RoomValidate from "./RoomFormValidate";

function RoomForm(props) {
  const { handleChange, values, handleSubmit, errors } = RoomUseForm(
    props.room,
    props.submitForm,
    RoomValidate
  );

  return (
    <div className="modal">
      <div className="modal_inner">
        <img className="modal_close" src={Close} alt="" onClick={props.close} />
        <form className="form_div formWidth_50">
          <h2 className="boldText">{props.title}</h2>
          <div className="form_input_div">
            <input
              type="text"
              name="name"
              placeholder="Room name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error_msg">{errors.name}</p>}
          </div>

          <div className="form_input_div">
            <input
              type="number"
              name="maxcount"
              placeholder="Room Capacity"
              value={values.maxcount}
              onChange={handleChange}
            />
            {errors.maxcount && <p className="error_msg">{errors.maxcount}</p>}
          </div>

          <div className="form_input_div">
            <input
              type="number"
              name="rentperday"
              placeholder="Rate per night"
              value={values.rentperday}
              onChange={handleChange}
            />
            {errors.rentperday && (
              <p className="error_msg">{errors.rentperday}</p>
            )}
          </div>

          <div className="form_input_div">
            <input
              type="tel"
              name="phonenumber"
              placeholder="Phone No"
              value={values.phonenumber}
              onChange={handleChange}
            />
            {errors.phonenumber && (
              <p className="error_msg">{errors.phonenumber}</p>
            )}
          </div>

          <div className="form_input_div">
            <input
              type="text"
              name="type"
              placeholder="Room Type"
              value={values.type}
              onChange={handleChange}
            />
            {errors.type && <p className="error_msg">{errors.type}</p>}
          </div>

          <div className="form_input_div">
            <input
              type="text"
              name="imageurl1"
              placeholder="Image URL 1"
              value={values.imageurl1}
              onChange={handleChange}
            />
            {errors.imageurl1 && (
              <p className="error_msg">{errors.imageurl1}</p>
            )}
          </div>

          <div className="form_input_div">
            <input
              type="text"
              name="imageurl2"
              placeholder="Image URL 2"
              value={values.imageurl2}
              onChange={handleChange}
            />
            {errors.imageurl2 && (
              <p className="error_msg">{errors.imageurl2}</p>
            )}
          </div>

          <div className="form_input_div">
            <input
              type="text"
              name="imageurl3"
              placeholder="Image URL 3"
              value={values.imageurl3}
              onChange={handleChange}
            />
            {errors.imageurl3 && (
              <p className="error_msg">{errors.imageurl3}</p>
            )}
          </div>

          <div className="form_input_div">
            <textarea
              name="description"
              placeholder="Room Description"
              rows="5"
              cols="40"
              value={values.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="error_msg">{errors.description}</p>
            )}
          </div>

          <div>
            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
