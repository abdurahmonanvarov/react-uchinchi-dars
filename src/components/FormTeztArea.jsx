import React from "react";

function FormTeztArea({ name }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Enter your bio</span>
        <span></span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder="Bio"
        name={name}
      ></textarea>
    </label>
  );
}

export default FormTeztArea;
