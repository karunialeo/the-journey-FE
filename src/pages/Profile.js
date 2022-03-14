import React, { useContext, useEffect, useState } from "react";
import { API } from "../config/api";
import { globalTitle } from "../App";

import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

import { JourneyCard } from "../exports";
import { BookmarkCircle, UserLeo } from "../exports/expImages";

export default function Profile() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [open, setOpen] = useContext(ModalContext);
  const [state, dispatch] = useContext(UserContext);
  
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserJourneys = async () => {
    try {
      const response = await API.get(`/posts/user/${state.user.id}`);
      // Store product data to useState variabel
      setJourneys(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAddBookmark = async (idPost) => {
    try {
      if (isLogin) {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const body = JSON.stringify({ idPost });

        const response = await API.post("/bookmark/toggle", body, config);
        setOpen(true);
        console.log(response);
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserJourneys();
    setLoading(false);
    document.title = globalTitle + "| Profile";
  }, []);

  return (
    <main id="profile" className="px-4 md:px-12 py-16">
      <h3 className="text-2xl md:text-4xl font-bold pb-10">Profile</h3>

      <section className="flex justify-center w-full mb-10">
        <div className="flex flex-col items-center">
          <img
            src={state.user.image}
            alt="user"
            className="rounded-full border-2 border-brand-blue mb-2 w-40"
          />
          <h4 className="text-2xl font-bold mb-1">{state.user.fullname}</h4>
          <p className="text-brand-darkGray">{state.user.email}</p>
          <p className="text-brand-darkGray">{state.user.phone}</p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center md:justify-start">
        {journeys.map((journey) => (
          <JourneyCard
            toggleAddBookmark={() => toggleAddBookmark(journey.id)}
            key={journey.id}
            id={journey.id}
            image={journey.image}
            bookmark={BookmarkCircle}
            title={journey.title}
            postAt={journey.updatedAt}
            user={journey.user.fullname}
            body={journey.body}
          />
        ))}
      </section>
    </main>
  );
}
