import React from 'react';

const UnderlinedTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="lg:text-3xl text-2xl font-bold mb-6 text-center text-white">
        {title}
      </h1>
      <svg
        width="188"
        height="13"
        viewBox="0 0 188 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-5"
      >
        <path
          d="M1.22028 9.57474C59.6405 -7.79762 144.879 1.62772 188 13C188 13 118.24 2.75118 76.3532 3.51948C50.9927 3.98466 18.2285 8.63741 1.63756 11.2473C0.436851 11.4362 0.0552311 9.92119 1.22028 9.57474Z"
          fill="#76C5F5"
        />
      </svg>
    </div>
  );
};

export default UnderlinedTitle;
