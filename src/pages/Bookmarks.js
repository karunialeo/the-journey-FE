import React, { Component, useContext, useEffect, useState } from "react";
import { globalTitle } from "../App";
import { API } from "../config/api";

import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

import { JourneyCard } from "../exports";
import { BookmarkFill, BookmarkCircle } from "../exports/expImages";
import { Link } from "react-router-dom";

export default function Bookmarks() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [open, setOpen] = useContext(ModalContext);
  const [state, dispatch] = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJourneys = async () => {
    try {
      const id = state.user.id;
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
        getJourneys();
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getJourneys();
    setLoading(false);
    document.title = globalTitle + "| Bookmarks";
  }, []);

  return (
    <main id="bookmark" className="px-4 md:px-12 py-16 min-h-[67vh]">
      <section className="md:flex md:justify-between">
        <h3 className="text-2xl md:text-4xl font-bold pb-10">Your Bookmarks</h3>

        {journeys.length > 0 ? (
          <form className="md:w-1/2 flex justify-end pb-10 md:pr-8">
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              className="w-full duration-150 p-3 rounded-md outline-none focus:outline-none shadow-md focus:shadow-xl"
              placeholder={"Find Bookmarks"}
              onChange={handleChange}
            />
          </form>
        ) : null}
      </section>

      <section className="flex flex-wrap justify-center md:justify-start">
        {journeys.length > 0 ? (
          journeys
            .filter((journey) => {
              if (searchTerm === "") {
                return journey;
              } else if (
                journey.post.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                journey.post.user.fullname
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                journey.post.body
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return journey;
              }
            })
            .sort(
              (a, b) => new Date(b.post.updatedAt) - new Date(a.post.updatedAt)
            )
            .map((journey) => (
              <JourneyCard
                toggleAddBookmark={() => toggleAddBookmark(journey.post.id)}
                visibility={"sr-only"}
                key={journey.post.id}
                id={journey.post.id}
                image={
                  "https://res.cloudinary.com/karunialeo/image/upload/v1647573847/the_journey_media/" +
                  journey.post.image
                }
                bookmark={BookmarkFill}
                title={journey.post.title}
                postAt={journey.post.updatedAt}
                user={journey.post.user.fullname}
                body={journey.post.body}
              />
            ))
        ) : (
          <div className="w-full text-center text-xl">
            No Journey Bookmarked.{" "}
            <Link to="/" className="text-brand-blue underline">
              Browse Journeys
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
