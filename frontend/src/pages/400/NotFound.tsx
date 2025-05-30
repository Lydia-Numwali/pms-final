/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound: React.FC<{}> = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <Helmet>
        <title>404 | XWZ</title>
      </Helmet>
      <main className="w-full flex items-center justify-center flex-col pt-12 pb-16">
        <section className="relative flex flex-col">
          <div className="text-[#263048] text-[200px] font-bold z-[1] px-6">
            404
          </div>
          <div className="absolute bg-primary-orange bottom-12 h-[30%] w-full"></div>
        </section>
        <section className="flex flex-col items-center space-y-3 pb-8">
          <h2 className="text-[#2A2C30] font-medium text-2xl">
            Sorry Page Not Found :(
          </h2>
          <p className="text-gray-primary text-center max-w-md text-[18px]">
            We are sorry. The Page you are looking for does not exist. It might
            have been moved or delete.
          </p>
        </section>
        <Link to={`/`}>
          <button className="text-white bg-primary-blue rounded py-3 px-8 text-lg">
            Back To Home Page
          </button>
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
