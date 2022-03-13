import React, { useEffect, useState } from "react";
import { globalTitle } from "../App";
import { API } from "../config/api";
import { JourneyCard } from "../exports";

import { BookmarkCircle, UserLeo } from "../exports/expImages";

import { blogs, user } from "../exports/expTempDB";

export default function Profile() {
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
    document.title = globalTitle + "| Profile";
  }, []);

  return (
    <main id="profile" className="px-4 md:px-12 py-16">
      <h3 className="text-3xl md:text-5xl font-bold pb-10">Profile</h3>

      <section className="flex justify-center w-full mb-10">
        <div className="flex flex-col items-center">
          <img
            src={UserLeo}
            alt="user"
            className="rounded-full border-2 border-brand-blue mb-2"
          />
          <h4 className="text-2xl font-bold mb-1">{user.fullname}</h4>
          <p className="text-brand-darkGray">{user.email}</p>
          <p className="text-brand-darkGray">{user.phone}</p>
        </div>
      </section>

      <section className="flex flex-wrap justify-center md:justify-start">
        {journeys.map((journey, index) => (
          <JourneyCard
            key={index}
            journeyID={journey.id}
            image={journey.image}
            bookmark={BookmarkCircle}
            title={journey.title}
            postAt={journey.createdAt}
            user={journey.user.fullname}
            body={journey.body}
          />
        ))}
      </section>
    </main>
  );
}
