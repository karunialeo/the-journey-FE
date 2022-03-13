import React, { useEffect, useState } from "react";
import { API } from "../config/api";
import { JourneyCard } from "../exports";
import dateFormat from "dateformat";
import { BookmarkCircle, PictureIcon } from "../exports/expImages";
import { globalTitle } from "../App";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
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
    document.title = globalTitle + "| Home";
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main id="journey" className="px-4 md:px-12 py-16">
      <section>
        <h3 className="text-2xl md:text-4xl font-bold pb-10">Journey</h3>

        <form className="w-full flex justify-center pb-10">
          <input
            type="text"
            className="duration-150 w-3/4 md:w-10/12 p-3 rounded-l-md outline-none focus:outline-none shadow-md focus:shadow-xl"
            placeholder="Find Journey"
            onChange={handleChange}
          />
          <button
            type="button"
            className="w-1/4 md:w-1/12 bg-brand-blue py-3 rounded-r-md text-white shadow-md"
          >
            Search
          </button>
        </form>
      </section>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <p className="animate-pulse">Loading . . .</p>
        </div>
      ) : (
        <section className="flex flex-wrap justify-center md:justify-start min-h-screen">
          {journeys
            .filter((journey) => {
              if (searchTerm === "") {
                return journey;
              } else if (
                journey.title.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return journey;
              } else if (
                journey.user.fullname
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return journey;
              } else if (
                journey.body.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return journey;
              }
            })
            .map((journey) => (
              <JourneyCard
                key={journey.id}
                id={journey.id}
                image={journey.image}
                bookmark={BookmarkCircle}
                title={journey.title}
                postAt={dateFormat(journey.createdAt, "mmmm dd, yyyy")}
                user={journey.user.fullname}
                body={journey.body}
              />
            ))}
        </section>
      )}
    </main>
  );
}
