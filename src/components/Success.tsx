import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <section className="py-20 bg-green-50 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Success!</h1>
        <p className="text-lg text-green-800 mb-6">
          Thank you for your message! We'll get back to you soon.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default Success;
