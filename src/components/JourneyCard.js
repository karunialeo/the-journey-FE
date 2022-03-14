import React, { useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { API } from "../config/api";

import { BookmarkCircle, BookmarkFill } from "../exports/expImages";

import { UserContext } from "../contexts/UserContext";

export default function JourneyCard(props) {
  let clean = DOMPurify.sanitize(props.body);

  const [state, dispatch] = useContext(UserContext);

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
    checkBookmark();
  }, []);

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

      <div className="p-3">
        <div className="text-lg font-bold truncate">{props.title}</div>
        <div className="text-sm text-brand-gray mb-5 truncate">
          {dateFormat(props.postAt, "mmmm dd, yyyy")}, {props.user}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: clean }}
          className="text-sm font-['Product-Sans-Regular'] line-clamp-5"
        ></div>
      </div>
    </Link>
  );
}
