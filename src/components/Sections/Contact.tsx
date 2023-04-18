import React, { useState } from "react";
import githubIcon from "../../assets/github icon.png";
import linkedinIcon from "../../assets/linkedin-icon.png";
import leetcodeIcon from "../../assets/leetcode-icon.png";
import instagramIcon from "../../assets/instagram-icon.png";
function Contact() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto border rounded-sm p-8 bg-opacity-40 bg-black backdrop-blur-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Contact Me
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form className="space-y-4">
              <div>
                <label
                  className={`block text-white font-bold mb-2 transition-all duration-300 `}
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full bg-black border-2 border-white p-2 rounded-md text-white focus:outline-none focus:border-4 transition-border duration-200"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-white font-bold mb-2 transition-all duration-300`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-black border-2 border-white p-2 rounded-md text-white focus:outline-none focus:border-4 transition-border duration-200"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div>
                <label
                  className={`block text-white font-bold mb-2 transition-all duration-300 `}
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full bg-black border-2 border-white p-2 rounded-md text-white focus:outline-none focus:border-4 transition-border duration-200"
                  id="message"
                  name="message"
                  required
                ></textarea>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Connect with me
            </h2>
            <div className="mt-4 mb-2 flex flex-col space-y-3">
              <a
                href="https://github.com/IamAjHere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white bg-transparent border cursor-none nav-link border-white rounded px-3 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:no-invert"
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  className="w-6 h-6 mr-2 invert"
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                <span>GitHub</span>
              </a>
              <a
                href="https://leetcode.com/iamajhere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white bg-transparent border cursor-none nav-link border-white rounded px-3 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:no-invert"
              >
                <img
                  src={leetcodeIcon}
                  alt="LeetCode"
                  className="w-6 h-6 mr-2 invert"
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                <span>LeetCode</span>
              </a>
              <a
                href="https://www.linkedin.com/in/iamajhere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white bg-transparent border cursor-none nav-link border-white rounded px-3 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:no-invert"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="w-6 h-6 mr-2 invert"
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/IamAjHere"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-white bg-transparent border border-white cursor-none nav-link rounded px-3 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:no-invert"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className="w-6 h-6 mr-2 invert"
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
