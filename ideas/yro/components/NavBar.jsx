import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ label, link }) => {
  return (
    <div className="relative flex items-center justify-center px-4 py-3 bg-white border-b">

      <Link to={link} className="absolute left-4 text-2xl font-bold text-gray-600">
        &#8592;
      </Link>

      <h2 className="mx-auto text-lg font-bold text-gray-800">
        {label}
      </h2>
    </div>
  );
};

export default Navbar;
