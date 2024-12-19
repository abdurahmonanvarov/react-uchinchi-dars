import React from "react";

function FormInput({ type, label, placeholder, name }) {
  return (
    <div>
      <label className="form-control w-full mb-3">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full"
        />
      </label>
    </div>
  );
}

export default FormInput;
