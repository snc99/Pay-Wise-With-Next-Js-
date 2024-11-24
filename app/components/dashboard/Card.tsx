import React from "react";

export default function Card() {
  return (
    <>
      <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 1</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 2</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Kartu 3</h2>
            <p>Beberapa konten di sini...</p>
          </div>
        </div>
        {/* Tambahkan lebih banyak kartu atau komponen sesuai kebutuhan */}
      </div>
    </>
  );
}
