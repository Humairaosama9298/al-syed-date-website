"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaGithub,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  country: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const countries = [
  { code: "PK", name: "Pakistan" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "BH", name: "Bahrain" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
];

const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  // ✅ Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", country: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-bg py-20 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-center mb-12 leading-tightfont-playfair text-primary">
            Get in Touch
          </h2>
          <p className="text-dark/70 text-lg max-w-2xl mx-auto">
            Ready to experience the finest Pakistani dates? Contact us for
            export inquiries, business collaborations, and partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* ===== LEFT SIDE ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-10"
          >
            {/* 📞 Contact Info */}
            <div>
              <h3 className="text-2xl md:text-4xl font-semibold font-playfair text-primary mb-16">
                Contact Information
              </h3>

              <div className="space-y-16">
                {[
                  {
                    icon: <FaEnvelope className="text-primary text-xl" />,
                    title: "Email",
                    value: "info@alsyedbrothers.com",
                    link: "mailto:info@alsyedbrothers.com",
                  },
                  {
                    icon: <FaPhone className="text-primary text-xl" />,
                    title: "Phone",
                    value: "+92 (300) 261-1865",
                    link: "tel:+923002611865",
                  },
                  {
                    icon: <FaWhatsapp className="text-primary text-xl" />,
                    title: "WhatsApp",
                    value: "+92 (300) 261-1865",
                    link: "https://wa.me/923002611865",
                  },
                  {
                    icon: <FaMapMarkerAlt className="text-primary text-xl" />,
                    title: "Location",
                     value: (
    <>
      <strong>Head Office Karachi Address:</strong>
      <br />
      Office No: 203, 2nd Floor, MR 5/121, Jodia Bazar, Karachi, Pakistan.

      <br /><br />

      <strong>Factory Khairpur Address:</strong>
      <br />
      Old National Highway, Therhi, Khairpur Mirs, 66160, Sindh, Pakistan.
    </>
  ),
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-primary hover:text-secondary">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT SIDE (Form) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-secondary rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="text-black space-y-6">
              {[
                { id: "name", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-medium mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    required
                    value={formData[field.id as keyof FormData]}
                    onChange={handleChange}
                    placeholder={`Your ${field.label.toLowerCase()}`}
                    className="w-full px-4 py-2 rounded-md bg-bg focus:ring-2 focus:ring-secondary/80 outline-none"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-2"
                >
                  Country
                </label>

                <select
                  id="country"
                  name="country"
                  required
                  value={formData.country}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 rounded-md bg-bg focus:ring-2 focus:ring-secondary/80 outline-none"
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {getFlagEmoji(country.code)} {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your inquiry"
                  className="w-full px-4 py-2 rounded-md bg-bg focus:ring-2 focus:ring-secondary/80 outline-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={status === "loading"}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-green-600 text-center">
                  ✅ Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-center">
                  ❌ Failed to send message. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
        {/* 🌐 Website & Social Links */}

        {/* website */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
            {/* 👥 Social Links */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-playfair text-primary text-center mb-4">
                Follow Us
              </h3>

              <div className="flex gap-4">
                {[
                  {
                    icon: <FaGithub />,
                    link: "https://github.com/yourusername",
                  },
                  {
                    icon: <FaTwitter />,
                    link: "https://twitter.com/yourusername",
                  },
                  {
                    icon: <FaLinkedin />,
                    link: "https://linkedin.com/in/yourusername",
                  },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-bg hover:bg-secondary/30 hover:text-primary transition-all"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
            {/* 🌐 Website */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-playfair text-primary text-center mb-4">
                Visit Our Website
              </h3>

              <a
                href="https://www.alsyedbrothers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                www.alsyedbrothers.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
