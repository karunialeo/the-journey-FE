import React, { useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";

import { BookmarkCircle, BookmarkFill } from "../exports/expImages";

import { UserContext } from "../contexts/UserContext";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

export default function JourneyCard(props) {
  let navigate = useNavigate();
  let clean = DOMPurify.sanitize(props.body);

  const [state, dispatch] = useContext(UserContext);

  const forceUpdate = useForceUpdate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const checkBookmark = async () => {
    try {
      const response = await API.get(
        `/bookmark/check/${state.user.id}/${props.id}`
      );
      if (response.data.status === "Bookmarked") {
        setIsBookmarked(true);
      } else if (response.data.status === "Unbookmarked") {
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await API.delete(`/post/delete/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarkCount = async () => {
    try {
      const response = await API.get(`/bookmark/post/${props.id}`);
      setBookmarkCount(response.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (state.isLogin) {
      setIsBookmarked(!isBookmarked);
      if (isBookmarked) {
        setBookmarkCount(bookmarkCount - 1);
      } else {
        setBookmarkCount(bookmarkCount + 1);
      }
    }
  };

  useEffect(() => {
    getBookmarkCount();
  }, []);

  useEffect(() => {
    checkBookmark();
  }, [state]);

  return (
    <Link
      to={`/journey/${props.id}`}
      className="w-72 h-96 bg-white relative rounded-lg shadow-xl md:mr-6 mb-10 overflow-hidden"
    >
      <div className="flex justify-center">
        <img
          src={props.image}
          alt={props.image}
          className="h-48 object-cover self-center w-full"
        />
      </div>

      <div className="absolute top-0 h-14 px-4 w-full bg-gradient-to-b from-black bg-opacity-40 flex flex-row-reverse items-center">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
            props.toggleAddBookmark();
          }}
          className="cursor-default rounded-full hover:shadow-lg"
        >
          <img
            src={isBookmarked ? BookmarkFill : BookmarkCircle}
            alt="bookmark"
            className="rounded-full"
          />
        </button>

        <div className="text-2xl text-brand-white pr-2">{bookmarkCount}</div>
      </div>

      <div className="p-3 relative">
        <div className="text-lg font-bold truncate">{props.title}</div>
        <div className="text-sm text-brand-gray mb-5 truncate">
          {dateFormat(props.postAt, "mmmm dd, yyyy")}, {props.user}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            deletePost(props.id);
            forceUpdate();
          }}
          className={
            props.visibility + " absolute right-4 top-10 cursor-default"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 stroke-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: clean }}
          className="text-sm font-['Product-Sans-Regular'] line-clamp-5"
        ></div>
      </div>
    </Link>
  );
}
