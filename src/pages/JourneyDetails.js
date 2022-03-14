import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import DOMPurify from "dompurify";
import dateFormat from "dateformat";
import { API } from "../config/api";

import { globalTitle } from "../App";

export default function JourneyDetails() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [journey, setJourney] = useState({});
  const [loading, setLoading] = useState(true);

  let clean = DOMPurify.sanitize(journey.body);

  const getJourney = async () => {
    try {
      await API.get(`/post/detail/${id}`)
        .then((res) => {
          setJourney(res.data.post);
          setLoading(false);
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
                <h2 className="text-4xl font-bold">{journey.title}</h2>
              </div>
              <p className="text-brand-blue">
                {dateFormat(journey.createdAt, "dddd, mmmm dd, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-xl">{journey.user.fullname}</p>
            </div>
          </section>

          <section className="flex space-x-5">
            <figure className="w-5/12">
              <img
                src={journey.image}
                alt={journey.image}
                className="w-full rounded-md"
              />
            </figure>

            <div className="w-7/12">
              <p
                dangerouslySetInnerHTML={{ __html: clean }}
                className="indent-10 text-brand-darkGray"
              ></p>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
