import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image_url, setImage] = useState("");
  const [release_year, setRelease] = useState("");
  const [price, setPrice] = useState("");
  const [total_page, setTotal] = useState("");
  const [thickness, setThickness] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setImage(response.data.image_url);
        setRelease(response.data.release_year);
        setPrice(response.data.price);
        setTotal(response.data.total_page);
        setThickness(response.data.thickness);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check Console");
        console.log(error);
      });
  }, []);
  const handleEditBook = () => {
    const data = {
      title,
      description,
      image_url,
      release_year,
      price,
      total_page,
      thickness,
    };
    setLoading(true);
    axios
      .patch(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check Console");
        console.log(error);
      });
  };
  const handleTotalPageChange = (e) => {
    const newTotalPage = parseInt(e.target.value);

    if (newTotalPage <= 100) {
      setThickness("Tipis");
    } else if (newTotalPage >= 101 && newTotalPage <= 200) {
      setThickness("Sedang");
    } else {
      setThickness("Tebal");
    }
    setTotal(newTotalPage);
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Image Url</label>
          <input
            type="text"
            value={image_url}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Release</label>
          <input
            type="text"
            value={release_year}
            onChange={(e) => setRelease(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Total Page</label>
          <input
            type="number"
            value={total_page}
            onChange={handleTotalPageChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-x1 mr-4 text-gray-500">Thickness</label>
          <input
            type="text"
            value={thickness}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
