import React, { Component, useContext, useEffect, useState } from "react";
import { globalTitle } from "../App";
import { API } from "../config/api";

import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

import { JourneyCard } from "../exports";
import { BookmarkFill, BookmarkCircle } from "../exports/expImages";

export default function Bookmarks() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [open, setOpen] = useContext(ModalContext);
  const [state, dispatch] = useContext(UserContext);
  const id = state.user.id;
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJourneys = async () => {
    try {
      const response = await API.get(`/bookmark/user/${id}`);
      // Store product data to useState variabel
      setJourneys(response.data.data);
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
    getJourneys();
    setLoading(false);
    document.title = globalTitle + "| Bookmarks";
  }, []);

  return (
    <main id="bookmark" className="px-4 md:px-12 py-16">
      <h3 className="text-2xl md:text-4xl font-bold pb-10">Your Bookmarks</h3>

      <section className="flex flex-wrap justify-center md:justify-start">
        {journeys.map((journey) => (
          <JourneyCard
            toggleAddBookmark={() => toggleAddBookmark(journey.post.id)}
            key={journey.post.id}
            id={journey.post.id}
            image={"http://localhost:5000/uploads/" + journey.post.image}
            bookmark={BookmarkFill}
            title={journey.post.title}
            postAt={journey.post.updatedAt}
            user={journey.post.user.fullname}
            body={journey.post.body}
          />
        ))}
      </section>
    </main>
  );
}
