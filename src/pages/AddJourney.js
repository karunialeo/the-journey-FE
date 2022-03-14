import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { API } from "../config/api";

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState, convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { PictureIcon } from "../exports/expImages";
import { globalTitle } from "../App";

export default function AddJourney() {
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    title: "",
    image: "",
    body: "",
  });

  const { title, image, body } = form;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setForm({
      ...form,
      body: data,
    });
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("body", form.body);
      formData.set("image", form.image[0], form.image[0].name);

      // Insert product data
      const response = await API.post("/post/add", formData, config);

      if (response.data.status === "Success") {
        console.log(response);
        setMessage("Journey Posted.");
        // setTimeout(() => {
        //   setMessage(null);
        // }, 4000);
        setForm({
          title: "",
          price: "",
          image: "",
        });
      } else {
        const alert = "Failed To Post Journey";
        setMessage(alert);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      setMessage("Server Error");
    }
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
        <CKEditor
          editor={ClassicEditor}
          onChange={handleEditorChange}
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
        <div className="">
          <label htmlFor="body" className="sr-only">
            Body
          </label>
          <textarea
            className="absolute top-28 right-20"
            disabled
            name="body"
            id="body"
            cols="100"
            rows="5"
          ></textarea>
        </div>
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
              onChange={handleChange}
              className="sr-only"
            />
          </label>
          <div className="text-right space-y-3">
            <button className="text-center text-white px-10 py-2 bg-brand-blue rounded-md">
              Post
            </button>
            <div className="text-brand-darkGray text-xl">
              {message && message}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
