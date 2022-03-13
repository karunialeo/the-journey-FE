import React, { Component, useEffect, useState } from "react";
import { globalTitle } from "../App";
import { API } from "../config/api";
import { JourneyCard } from "../exports";

import { BookmarkFill, BookmarkCircle } from "../exports/expImages";

import { blogs } from "../exports/expTempDB";

export default function Bookmarks() {
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJourneys = async () => {
    try {
      const response = await API.get("/posts");
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
        {journeys.map((journey, index) => (
          <JourneyCard
            key={index}
            journeyID={journey.id}
            image={journey.image}
            bookmark={BookmarkFill}
            title={journey.title}
            postAt={journey.createdAt}
            user={journey.user.name}
            body={journey.body}
          />
        ))}
      </section>
    </main>
  );
}
