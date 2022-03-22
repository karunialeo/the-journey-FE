import React, { useContext, useEffect, useState } from "react";
import { API } from "../config/api";
import { JourneyCard } from "../exports";
import dateFormat from "dateformat";
import { globalTitle } from "../App";

import { LoginContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

export default function Home() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [open, setOpen] = useContext(ModalContext);

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
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(false);
    document.title = globalTitle + "| Home";
    getJourneys();
    return () => {
      setJourneys([]);
    };
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main id="journey" className="px-4 md:px-12 pt-16">
      <section className="md:flex md:justify-between">
        <h3 className="text-2xl md:text-4xl font-bold pb-10">Journey</h3>

        <form className="md:w-1/2 flex justify-end pb-10 md:pr-8">
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            className="w-full duration-150 p-3 rounded-md outline-none focus:outline-none shadow-md focus:shadow-xl"
            placeholder={"Find Journey"}
            onChange={handleChange}
          />
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
                journey.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                journey.user.fullname
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                journey.body.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return journey;
              }
            })
            .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
            .map((journey) => (
              <JourneyCard
                toggleAddBookmark={() => toggleAddBookmark(journey.id)}
                visibility={"sr-only"}
                key={journey.id}
                bookmarkCount={4}
                id={journey.id}
                image={journey.image}
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
