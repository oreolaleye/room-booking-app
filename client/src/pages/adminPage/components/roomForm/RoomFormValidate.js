export default function ValidateInfo(values) {
  let errors = {};

  if (!values.name.trim()) {
    errors.name = "Room name is required";
  }

  if (!values.maxcount.trim()) {
    errors.maxcount = "Room capacity is required";
  }

  if (!values.rentperday.trim()) {
    errors.rentperday = "Rate per night is required";
  }

  if (!values.phonenumber.trim()) {
    errors.phonenumber = "Phone No is required";
  }

  if (!values.type.trim()) {
    errors.type = "Room type is required";
  }

  if (!values.imageurl1.trim()) {
    errors.imageurl1 = "Image URL is required";
  }

  if (!values.imageurl2.trim()) {
    errors.imageurl2 = "Image URL is required";
  }

  if (!values.imageurl3.trim()) {
    errors.imageurl3 = "Image URL is required";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  }

  return errors;
}
