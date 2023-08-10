import React, { useEffect } from "react";
import UserProfile from "./UserProfile";
import Paragraph from "./Paragraph";
import Details from "./Details";
import Brands from "./Brands";
import store from "../store";
import { getRandomUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { getDetailAttributes } from "../utils/data";

function PersonalityCard() {
  const { user, loading } = useSelector((state) => state.users);

  const dispatchGetRandomUser = () => {
    store.dispatch(getRandomUser());
  };

  useEffect(() => {
    dispatchGetRandomUser();
  }, []);

  return (
    <div className="bg-basic flex justify-center items-center h-[100vh]">
      <div className="max-w-[500px] w-full px-6 py-8 bg-white rounded-3xl ">
        {user && (
          <>
            <UserProfile
              name={user.name}
              age={user.age}
              gender={user.gender}
              picture={user.picture}
            />
            <Paragraph info={user.paragraph} />
            <Details attributes={getDetailAttributes(user)} />
            <Brands brands={user.brands} />
          </>
        )}
        <button
          className={`btn text-white bg-orange mx-auto py-1.5 min-w-[250px] rounded-lg text-base sm:text-xl font-bold mt-7 sm:mt-10 flex justify-center ${
            loading && "cursor-not-allowed"
          }`}
          onClick={dispatchGetRandomUser}
        >
          {loading ? <Loader /> : " Random Student"}
        </button>
      </div>
    </div>
  );
}

export default PersonalityCard;
