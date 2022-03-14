import React, { Component, useContext, useEffect, useState } from "react";
import { globalTitle } from "../App";
import { API } from "../config/api";

import { JourneyCard } from "../exports";
import { UserContext } from "../contexts/UserContext";

import { BookmarkFill, BookmarkCircle } from "../exports/expImages";

export default function Bookmarks() {
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
