import React from "react";

function UserProfile({ name, age, gender, picture }) {
  return (
    <div className="panel">
      <div className="flex gap-6 items-center">
        <div className="w-[100px] h-[100px] rounded-full bg-orange">
          <img
            src={picture}
            alt="user profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="">
          <h1 className="text-xl sm:text-3xl font-bold">{name}</h1>
          <p className="text-lg sm:text-xl font-normal text-gray-200 capitalize">
            {age} / {gender}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
