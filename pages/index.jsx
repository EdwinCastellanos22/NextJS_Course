import React from "react";
import { format } from "timeago.js";
import Image from "next/image";

const Index = ({ data, code }) => {
  return (
    <>
      <div className="grid">
        <h1 className="text-2xl font-mono font-bold text-center">Books</h1>
        <div className="grid grid-cols-3 m-2 p-4 max-[500px]:grid-cols-1">
          {data != "Error" ? (
            data.map((item) => (
              <div
                className="card lg:card-side bg-base-100 shadow-xl m-3"
                key={item.id}
              >
                <figure>
                  <Image
                    src={item.imagePath}
                    alt="Image Card"
                    className="w-full h-full"
                    width={500}
                    height={500}
                    priority= {false}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                  <p>{item.description}</p>
                  <h4 className="text-right mt-3">{item.author.name}</h4>
                  <div className="card-actions">
                    <div className="justify-end">
                      <p className="text-right mb-1">{format(item.createAt)}</p>
                      <button className="btn btn-primary">
                        Q{item.price} Comprar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Error al obtener books, Code: {code}</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const res = await fetch("https://apirest-plum.vercel.app/api/books");
  let data = null;
  let code = await res.status;
  res.status == 200 ? data = await res.json() : (data = "Error");
  return {
    props: {
      data,
      code,
    },
  };
};
