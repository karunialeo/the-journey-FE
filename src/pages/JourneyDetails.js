import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import dateFormat from "dateformat";
import { API } from "../config/api";
import { globalTitle } from "../App";

export default function JourneyDetails() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [journey, setJourney] = useState({});
  const [loading, setLoading] = useState(true);

  const getJourney = async () => {
    try {
      await API.get(`/post/detail/${id}`)
        .then((res) => {
          setJourney(res.data.post);
          setLoading(false);
          console.log(res.data.post);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJourney();
    document.title = globalTitle + "| " + journey.title;
  }, [loading]);

  return (
    <>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <p className="text-4xl animate-bounce font-bold">Loading . . .</p>
        </div>
      ) : (
        <main className="py-16 px-20 font-['Avenir-Book'] space-y-8 ">
          <section className="flex justify-between items-end">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Link to={-1} className="z-0">
                  <ArrowCircleLeftIcon className="h-9 w-9 rounded-full border-2 border-brand-blue text-brand-blue shadow-md hover:shadow-xl animate-bounce" />
                </Link>
                <h2 className="text-5xl font-bold">{journey.title}</h2>
              </div>
              <p className="text-brand-blue">
                {dateFormat(journey.createdAt, "dddd, mmmm dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xl">{journey.user.fullname}</p>
            </div>
          </section>

          <figure className="w-full">
            <img
              src={journey.image}
              alt={journey.image}
              className="w-full rounded-md"
            />
          </figure>

          <section>
            <p className="indent-10 text-brand-darkGray">{journey.body}</p>
          </section>
        </main>
      )}
    </>
  );
}
