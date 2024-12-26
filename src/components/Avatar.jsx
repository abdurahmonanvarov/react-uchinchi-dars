import React from "react";

function Avatar({ user }) {
  return (
    <div className="flex flex-col items-center mb-2">
      <img className="w-20 h-20 rounded-full" src={user.photoURL} alt="" />
      <h2 className="font-bold text-xl">Hello, {user.displayName}</h2>
    </div>
  );
}

export default Avatar;
