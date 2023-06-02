import React from "react";
import { useState } from "react";

export default function Newbook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [user, setUser] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const addBook =async(event) => {
    const res = await fetch("http://127.0.0.1:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: selectedFile,
        title: title,
        description: description,
        price: price,
        stock: stock,
        author: user,
      }),
    });
    const data = await res.json();
    console.log(data);
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bordered border-white shadow rounded border-dotted p-6">
      <h2 className="font-mono font-bold text-2xl">Add New Book</h2>

      <form onSubmit={addBook} className="flex-col">
      <input type="file" onChange={handleFileChange}/>

        <input
          type="text"
          className="input input-accent input-bordered rounded-lg m-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          className="input input-accent input-bordered rounded-lg m-2"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="input input-accent input-bordered rounded-lg m-2"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          className="input input-accent input-bordered rounded-lg m-2"
          placeholder="Stock"
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="number"
          className="input input-accent input-bordered rounded-lg m-2"
          placeholder="User"
          onChange={(e) => setUser(e.target.value)}
        />

        <button className="btn btn-secondary" type="submit"> 
          Save
        </button>
      </form>
    </div>
  );
}
