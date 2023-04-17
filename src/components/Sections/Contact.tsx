import React from "react";

function Contact() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md mx-auto border rounded-sm p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Contact Me
        </h1>
        <form className="space-y-4">
          <div>
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full border border-gray-200 p-2 rounded-md"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-200 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full border border-gray-200 p-2 rounded-md"
              id="message"
              name="message"
              required
            ></textarea>
          </div>
          <div>
            <button className="bg-white text-black font-bold py-2 px-4 border border-black rounded-full hover:bg-black hover:text-white transition duration-300">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
