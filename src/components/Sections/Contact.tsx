import React, { useState } from "react";
import githubIcon from "../../assets/github icon.png";
import linkedinIcon from "../../assets/linkedin-icon.png";
import leetcodeIcon from "../../assets/leetcode-icon.png";
import instagramIcon from "../../assets/instagram-icon.png";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function useFormField(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  const onFocus = () => {
    setTouched(false);
  };

  return { value, touched, onChange, onBlur, onFocus };
}

const SocialLink: React.FC<{
  href: string;
  icon: string;
  alt: string;
  text: string;
}> = ({ href, icon, alt, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center text-white bg-transparent border nav-link border-white rounded px-3 py-2 transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:no-invert"
  >
    <img
      src={icon}
      alt={alt}
      className="w-6 h-6 mr-2 invert"
      style={{
        width: "1.5em",
        height: "1.5em",
        marginRight: "0.5em",
      }}
    />
    <span>{text}</span>
  </a>
);

function Contact() {
  const nameField = useFormField();
  const emailField = useFormField();
  const messageField = useFormField();

  const emailValid =
    !emailField.touched || EMAIL_PATTERN.test(emailField.value);
  const isNameInvalid = nameField.touched && nameField.value.trim() === "";
  const isMessageInvalid =
    messageField.touched && messageField.value.trim() === "";

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
                  className="block text-white font-bold mb-2 transition-all duration-300"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`w-full bg-black border-2 p-2 rounded-md text-white focus:outline-none transition-border duration-200 ${
                    isNameInvalid
                      ? "border-red-500"
                      : "border-white focus:border-4"
                  }`}
                  type="text"
                  id="name"
                  name="name"
                  maxLength={50}
                  {...nameField}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-white font-bold mb-2 transition-all duration-300"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`w-full bg-black border-2 p-2 rounded-md text-white focus:outline-none transition-border duration-200 ${
                    emailValid
                      ? "border-white focus:border-4"
                      : "border-red-500"
                  }`}
                  type="email"
                  id="email"
                  name="email"
                  {...emailField}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-white font-bold mb-2 transition-all duration-300"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className={`w-full bg-black border-2 p-2 rounded-md text-white focus:outline-none transition-border duration-200 resize-none ${
                    isMessageInvalid
                      ? "border-red-500"
                      : "border-white focus:border-4"
                  }`}
                  id="message"
                  name="message"
                  maxLength={500}
                  {...messageField}
                  required
                ></textarea>
              </div>
              <div className="flex justify-center md:justify-start">
                <button
                  type="submit"
                  className="bg-white text-black border border-black font-bold py-2 px-4 rounded transition duration-200 hover:bg-black hover:text-white hover:border-white"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Connect with me
            </h2>
            <div className="mt-4 mb-2 flex flex-col space-y-3">
              <SocialLink
                href="https://github.com/IamAjHere"
                icon={githubIcon}
                alt="GitHub"
                text="GitHub"
              />
              <SocialLink
                href="https://leetcode.com/iamajhere"
                icon={leetcodeIcon}
                alt="LeetCode"
                text="LeetCode"
              />
              <SocialLink
                href="https://www.linkedin.com/in/iamajhere"
                icon={linkedinIcon}
                alt="LinkedIn"
                text="LinkedIn"
              />
              <SocialLink
                href="https://www.instagram.com/IamAjHere"
                icon={instagramIcon}
                alt="Instagram"
                text="Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
