import { useState } from "react";

const RoomUseForm = (room, submitForm, validate) => {
  const [values, setValues] = useState({
    name: "" || room.name,
    maxcount: "" || room.maxcount,
    rentperday: "" || room.rentperday,
    phonenumber: "" || room.phonenumber,
    imageurl1: "" || room.imageurls[0],
    imageurl2: "" || room.imageurls[1],
    imageurl3: "" || room.imageurls[2],
    type: "" || room.type,
    description: "" || room.description,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));

    const room = {
      name: values.name,
      maxcount: values.maxcount,
      rentperday: values.rentperday,
      phonenumber: values.phonenumber,
      imageurls: [values.imageurl1, values.imageurl2, values.imageurl3],
      type: values.type,
      description: values.description,
    };
    submitForm(room);

    setValues({
      name: "",
      maxcount: "",
      rentperday: "",
      phonenumber: "",
      type: "",
      imageurl1: "",
      imageurl2: "",
      imageurl3: "",
      description: "",
    });
  };

  return { handleChange, values, handleSubmit, errors };
};

export default RoomUseForm;
