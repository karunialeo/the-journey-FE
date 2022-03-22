import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { globalTitle } from "../App";

import { UserContext } from "../contexts/UserContext";
import { LoginContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";

import { JourneyCard } from "../exports";
import { BookmarkCircle } from "../exports/expImages";

export default function Profile() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [open, setOpen] = useContext(ModalContext);
  const [state, dispatch] = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [preview, setPreview] = useState(null);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    image: "",
  });

  const getUserJourneys = async () => {
    try {
      const response = await API.get(`/posts/user/${state.user.id}`);
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
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(form);
  };

  const handleImageSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);

      const response = await API.patch(
        `/user/edit/image/${state.user.id}`,
        formData,
        config
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
          <form className="text-center" onSubmit={handleImageSubmit}>
            <label
              htmlFor="image"
              className="rounded-full flex items-center"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Change Picture"
            >
              <input
                type="file"
                id="image"
                name="image"
                className="sr-only"
                onChange={handleImageChange}
              />
              <img
                src={preview ? preview : state.user.image}
                alt="user"
                className="rounded-full border-2 border-brand-blue mb-2 w-40 hover:brightness-75 cursor-pointer"
              />
              {preview && (
                <button className="bg-green-600 text-white font-bold text-lg px-5 py-1 rounded-md mx-3">
                  Save Changes
                </button>
              )}
            </label>
          </form>
          <h4 className="text-2xl font-bold mb-1">{state.user.fullname}</h4>
          <p className="text-brand-darkGray">{state.user.email}</p>
          <p className="text-brand-darkGray">{state.user.phone}</p>
        </div>
      </section>

      {journeys.length > 0 ? (
        <form className="md:w-full flex justify-end pb-10 md:pr-8">
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            className="w-full md:w-1/2 duration-150 p-3 rounded-md outline-none focus:outline-none shadow-md focus:shadow-xl"
            placeholder={"Find Journey"}
            onChange={handleChange}
          />
        </form>
      ) : null}
      <section className="flex flex-wrap justify-center md:justify-start">
        {journeys.length > 0 ? (
          journeys
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
                visibility={"not-sr-only"}
                key={journey.id}
                id={journey.id}
                image={journey.image}
                bookmark={BookmarkCircle}
                title={journey.title}
                postAt={journey.updatedAt}
                user={journey.user.fullname}
                body={journey.body}
              />
            ))
        ) : (
          <div className="w-full text-center text-xl">
            No Post.{" "}
            <Link to="/journey/add" className="text-brand-blue underline">
              Post A Journey.
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
