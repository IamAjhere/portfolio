import React, { FormEvent, useState } from "react";
import githubIcon from "../../assets/github icon.png";
import linkedinIcon from "../../assets/linkedin-icon.png";
import leetcodeIcon from "../../assets/leetcode-icon.png";
import instagramIcon from "../../assets/instagram-icon.png";
import Toast, { ToastProps } from "../Custom Toast/Toast";

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

  const reset = () => {
    setValue(initialValue);
    setTouched(false);
  };

  return { value, touched, onChange, onBlur, onFocus, reset };
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
    className="flex items-center justify-center custom-shadow text-white bg-transparent border nav-link border-white rounded px-3 py-2 transition duration-500 ease-in-out transform hover:bg-white custom-shadow-black hover:text-black hover:no-invert"
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
  //
  const [toast, setToast] = useState<ToastProps>({
    show: true,
    message: "",
    type: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const myForm = event.currentTarget;
    const formData = new FormData(myForm);
    const searchParams = new URLSearchParams();
    if (formData.get("bot-field")) {
      return;
    }
    for (const [key, value] of formData) {
      searchParams.append(key, value as string);
    }
    setToast({
      show: true,
      message: "Form Submission Loading.",
      type: "loading",
    });
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: searchParams.toString(),
    })
      .then((response) => {
        if (response.ok) {
          setToast({
            show: true,
            message: "Thank you for your submission!",
            type: "success",
          });
        } else {
          setToast({
            show: true,
            message: "Error sending message.",
            type: "error",
          });
        }
      })
      .catch((error) => {
        setToast({
          show: true,
          message: "Error sending message.",
          type: "error",
        });
      });
    nameField.reset();
    emailField.reset();
    messageField.reset();
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  return (
    <div className="w-full h-full flex items-center justify-center mb-16">
      <div
        className="w-full mx-4 my-14 max-w-4xl border rounded-lg p-8 bg-opacity-40 bg-black backdrop-blur-md custom-shadow"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          border: "2px solid white",
          color: "white",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1 className="text-4xl mt-1 sm:mt-1 sm:text-6xl font-bold text-center text-white mb-4">
          {"Contact".split("").map((letter, index) => (
            <span key={`hello-${index}`} className="letter-stroke">
              {letter}
            </span>
          ))}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form
              name="contact"
              className="space-y-4"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />
              <div>
                <label
                  className="block text-white font-bold mb-2 transition-all duration-300 "
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`w-full bg-black border-2 p-2 rounded-md custom-shadow-focus text-white focus:outline-none  transition-border duration-500 ${
                    isNameInvalid ? "border-red-500" : "border-white "
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
                  className={`w-full bg-black border-2 p-2 rounded-md custom-shadow-focus text-white focus:outline-none transition-border duration-500 ${
                    emailValid ? "border-white" : "border-red-500"
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
                  className={`w-full bg-black border-2 p-2 rounded-md custom-shadow-focus text-white focus:outline-none transition-border duration-500 resize-none ${
                    isMessageInvalid ? "border-red-500" : "border-white"
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
                  className="bg-white custom-shadow-hover text-black border border-black font-bold py-2 px-4 rounded transition duration-500 hover:bg-black hover:text-white hover:border-white"
                >
                  Send Message
                </button>
              </div>
            </form>
            <Toast
              show={toast.show}
              message={toast.message}
              type={toast.type}
            />
          </div>
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-white mb-4">
              Connect with me
            </h2>
            <div className="mt-4 mb-2 flex flex-col space-y-3 ">
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
