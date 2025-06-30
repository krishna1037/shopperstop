import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | ShopperStop";
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000); // Auto-hide message after 5s
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-10 px-6 md:px-20 text-white h">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-4 drop-shadow-lg animate-fade-in">
          Contact Us
        </h2>
        <p className="text-center mb-12 text-lg max-w-xxl mx-auto ">
          Have questions or need help? Reach out to <span className="font-semibold">ShoppersStop </span>— 
          we're here for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-800 shadow-xl rounded-2xl p-8 space-y-6 transform transition duration-500 hover:shadow-2xl animate-fade-in-up"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 transition-all"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
            {submitted && (
              <p className="text-green-600 font-medium mt-3 animate-fade-in-up">
                Thank you! We'll get back to you soon.
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="bg-white text-gray-800 shadow-xl rounded-2xl p-8 flex flex-col justify-center animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Office</h3>
            <p className="mb-2 text-center">📍 ShoppersStop HQ</p>
            <p className="mb-2 text-center">123 E-commerce Ave, Mumbai, India</p>
            <p className="mb-2 text-center">
              📧 <span className="font-medium">Email:</span> support@shoppersstop.com
            </p>
            <p className="mb-2 text-center">
              📞 <span className="font-medium">Phone:</span> +91 9123456789
            </p>
            <p className="text-center">
              🕒 <span className="font-medium">Hours:</span> Mon–Fri 9:00AM – 6:00PM IST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
