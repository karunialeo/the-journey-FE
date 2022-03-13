import React, { Component, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { PictureIcon } from "../exports/expImages";
import { globalTitle } from "../App";

export default function AddJourney() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    body: "",
  });

  const { title, image, body } = form;

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleChange = (e) => {
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // alert(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    console.log(form);
  };

  useEffect(() => {
    document.title = globalTitle + "| Add Journey";
  }, []);

  return (
    <main id="add-journey" className="px-4 md:px-12 py-16">
      <h3 className="text-2xl md:text-4xl font-bold pb-10">Add Journey</h3>

      <form
        className="justify-center px-12 md:justify-start"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-5 space-y-3 w-full">
          <label htmlFor="title" className="text-xl md:text-2xl font-bold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="px-4 py-3 outline-none rounded-sm"
          />
        </div>
        <Editor
          editorState={editorState}
          wrapperClassName="w-full h-48"
          toolbarClassName="rounded-sm outline-none border-0"
          editorClassName="bg-white px-5 py-1 rounded-sm"
          onEditorStateChange={onEditorStateChange}
          placeholder="Type something..."
        />
        <div className="md:flex md:justify-between items-start mt-20">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-end w-48 h-48 p-4 space-y-4 bg-brand-white border border-brand-blue rounded-md cursor-pointer"
          >
            <img
              src={preview ? preview : PictureIcon}
              alt="preview"
              className="max-h-28"
            />
            <p className="font-['Avenir-Black'] font-bold text-lg">
              Insert Image Here
            </p>
            <input
              type="file"
              id="image"
              name="image"
              value={image}
              onChange={handleChange}
              className="sr-only"
            />
          </label>
          <button className="text-center text-white px-10 py-2 bg-brand-blue rounded-md">
            Post
          </button>
        </div>
      </form>
    </main>
  );
}
