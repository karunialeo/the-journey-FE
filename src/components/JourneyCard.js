import dateFormat from "dateformat";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default function JourneyCard(props) {
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
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
        }}
        className="absolute top-3 right-3 cursor-default rounded-full hover:shadow-lg"
      >
        <img src={props.bookmark} alt="bookmark" className="rounded-full" />
      </button>

      <div className="p-3">
        <div className="text-lg font-bold truncate">{props.title}</div>
        <div className="text-sm text-brand-gray mb-5 truncate">
          {dateFormat(props.postAt, "mmmm dd, yyyy")}, {props.user}
        </div>
        <div className="text-sm font-['Product-Sans-Regular'] line-clamp-5">
          {props.body}
        </div>
      </div>
    </Link>
  );
}
