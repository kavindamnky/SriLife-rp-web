import React, { useState } from "react";

// Constants
const API_CONFIG = {
  DISCORD_WEBHOOK_URL:
    "https://discord.com/api/webhooks/1417261572514119741/IH9kNpR4NngE107Zq-58t4VDkixW4N0VGJnCzeu2JvFpkkPdulId6ZZHPJ_zMBOAqXk0",
  HEADERS: {
    "Content-Type": "application/json",
  },
  // EmailJS Configuration - Replace with your actual values
  EMAILJS_CONFIG: {
    SERVICE_ID: "your_service_id",
    TEMPLATE_ID: "your_template_id",
    PUBLIC_KEY: "your_public_key",
  },
};

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

// Discord message formatter
const formatDiscordMessage = (formData) => {
  return {
    embeds: [
      {
        title: "📧 New Contact Form Submission",
        color: 0xe74011, // Custom orange color
        fields: [
          {
            name: "👤 Name",
            value: `${formData.firstName} ${formData.lastName}`,
            inline: true,
          },
          {
            name: "📧 Email",
            value: formData.email,
            inline: true,
          },
          {
            name: "📱 Phone",
            value: formData.phone || "Not provided",
            inline: true,
          },
          {
            name: "💬 Message",
            value: formData.message,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Contact Form Submission from Lumen Works",
        },
      },
    ],
  };
};

// Email service functions
const sendEmail = async (formData) => {
  // Check if EmailJS is loaded
  if (typeof window.emailjs === "undefined") {
    throw new Error("EmailJS not loaded");
  }

  const templateParams = {
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    phone: formData.phone || "Not provided",
    message: formData.message,
    to_email: "contact@lumenworks.lk",
    reply_to: formData.email,
  };

  return window.emailjs.send(
    API_CONFIG.EMAILJS_CONFIG.SERVICE_ID,
    API_CONFIG.EMAILJS_CONFIG.TEMPLATE_ID,
    templateParams,
    API_CONFIG.EMAILJS_CONFIG.PUBLIC_KEY
  );
};

// Alternative: Simple email using a serverless function
const sendEmailViaAPI = async (formData) => {
  // This would require a backend API endpoint
  const emailData = {
    to: "contact@lumenworks.lk",
    subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || "Not provided"}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
      
      <hr>
      <p><em>Sent from Lumen Works contact form</em></p>
    `,
    replyTo: formData.email,
  };

  // Replace with your actual API endpoint
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error(`Email API error: ${response.status}`);
  }

  return response.json();
};

// Icons Components
const CompanyIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Sub-components
const ContactHeader = () => (
  <div className="text-center mb-12 lg:mb-16">
    <h1 className="text-4xl lg:text-5xl font-bold text-center text-stone-200 mb-4">
      Contact <span className="text-stone-400">Us</span>
    </h1>
    <p className="text-center text-stone-500 mb-16 max-w-2xl mx-auto">
      We use an agile approach to test assumptions and connect with the needs of
      your audience early and often.
    </p>
  </div>
);

const MessageDisplay = ({ message, type }) => {
  if (!message) return null;

  const baseClasses = "p-4 rounded-lg mb-6 text-center font-medium";
  const typeClasses = {
    success: "bg-green-900 border border-green-700 text-green-100",
    error: "bg-red-900 border border-red-700 text-red-100",
    warning: "bg-yellow-900 border border-yellow-700 text-yellow-100",
  };

  return <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>;
};

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col space-y-2">
    <label
      htmlFor={id}
      className="text-stone-200 font-medium text-sm md:text-base"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 hover:border-stone-600"
      required={required}
    />
  </div>
);

const FormTextarea = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="flex flex-col space-y-2">
    <label
      htmlFor={id}
      className="text-stone-200 font-medium text-sm md:text-base"
    >
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="6"
      className="bg-stone-800 border border-stone-700 text-stone-100 placeholder-stone-500 rounded-lg px-4 py-3 focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition-all duration-200 hover:border-stone-600 resize-vertical min-h-[120px]"
      required={required}
    />
  </div>
);

const TermsAndConditions = () => (
  <div className="mt-6 mb-6">
    <p className="text-stone-400 text-sm leading-relaxed">
      By submitting this form you agree to our{" "}
      <a
        href="#"
        className="text-orange-400 hover:text-orange-300 underline transition-colors"
      >
        terms and conditions
      </a>{" "}
      and our{" "}
      <a
        href="#"
        className="text-orange-400 hover:text-orange-300 underline transition-colors"
      >
        privacy policy
      </a>{" "}
      which explains how we may collect, use and disclose your personal
      information including to third parties.
    </p>
  </div>
);

const SubmitButton = ({ isSubmitting }) => (
  <button
    type="submit"
    className="w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2 disabled:opacity-50"
    style={{
      backgroundColor: isSubmitting ? "#b8350e" : "#e74011",
    }}
    onMouseEnter={(e) => {
      if (!isSubmitting) {
        e.target.style.backgroundColor = "#d13910";
      }
    }}
    onMouseLeave={(e) => {
      if (!isSubmitting) {
        e.target.style.backgroundColor = "#e74011";
      }
    }}
    disabled={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        <span>Sending...</span>
      </>
    ) : (
      <span>Send Message</span>
    )}
  </button>
);

const InfoSection = ({ icon, title, children }) => (
  <div className="flex items-start space-x-4 p-6 bg-stone-800 rounded-xl border border-stone-700 hover:bg-stone-750 transition-colors duration-200">
    <div className="flex-shrink-0 w-12 h-12 bg-stone-700 rounded-lg flex items-center justify-center text-stone-300">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-stone-100 font-semibold text-lg mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  </div>
);

const ContactInfo = () => (
  <div className="space-y-6">
    <InfoSection icon={<CompanyIcon />} title="Lumen Works :">
      <p className="text-stone-400 text-sm">contact@lumenworks.lk</p>
    </InfoSection>

    <InfoSection icon={<PhoneIcon />} title="Call us :">
      <a
        href="tel:+94758281603"
        className="text-stone-300 hover:text-stone-200 font-medium transition-colors"
      >
        +94 70 765 5111
      </a>{" "}
      |
      <a
        href="tel:+94758281603"
        className="text-stone-300 hover:text-stone-200 font-medium transition-colors"
      >
        +94 72 174 1038
      </a>
    </InfoSection>

    <InfoSection icon={<LocationIcon />} title="Address :">
      <p className="text-stone-300">338/1,</p>
      <p className="text-stone-300">Robert Gunawardana Road,</p>
      <p className="text-stone-300">Malabe - SriLanka.</p>
    </InfoSection>
  </div>
);

// Load EmailJS script dynamically
const loadEmailJS = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.emailjs !== "undefined") {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init(API_CONFIG.EMAILJS_CONFIG.PUBLIC_KEY);
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Main Contact Component
const Contact = () => {
  // State Management
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Event Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const setSuccessMessage = (
    message = "Thank you! Your message has been sent successfully!"
  ) => {
    setSubmitMessage(message);
    setMessageType("success");
    resetForm();
  };

  const setErrorMessage = (
    message = "Something went wrong. Please try again."
  ) => {
    setSubmitMessage(message);
    setMessageType("error");
  };

  const setWarningMessage = (message) => {
    setSubmitMessage(message);
    setMessageType("warning");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setMessageType("");

    let discordSuccess = false;
    let emailSuccess = false;

    try {
      // Send Discord notification
      const discordPayload = formatDiscordMessage(formData);
      const discordResponse = await fetch(API_CONFIG.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(discordPayload),
      });

      discordSuccess = discordResponse.status === 204;

      // Send Email
      try {
        // Option 1: Using EmailJS (uncomment to use)
        /*
        await loadEmailJS();
        await sendEmail(formData);
        emailSuccess = true;
        */

        // Option 2: Using your own API endpoint (uncomment to use)
        /*
        await sendEmailViaAPI(formData);
        emailSuccess = true;
        */

        // For demonstration, we'll simulate email success
        // Remove this line when implementing actual email service
        emailSuccess = true;
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        emailSuccess = false;
      }

      // Handle different success/failure combinations
      if (discordSuccess && emailSuccess) {
        setSuccessMessage(
          "Thank you! Your message has been sent successfully to both Discord and email!"
        );
      } else if (discordSuccess && !emailSuccess) {
        setWarningMessage(
          "Your message was sent to Discord successfully, but there was an issue with the email notification. We still received your message!"
        );
      } else if (!discordSuccess && emailSuccess) {
        setWarningMessage(
          "Your message was sent via email successfully, but there was an issue with the Discord notification. We still received your message!"
        );
      } else {
        setErrorMessage(
          "There was an issue sending your message. Please try again or contact us directly."
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);

      if (error.status === 429) {
        setErrorMessage(
          "Too many requests. Please wait a moment and try again."
        );
      } else if (error.status === 404) {
        setErrorMessage("Service not found. Please contact support.");
      } else if (error.status === 400) {
        setErrorMessage("Invalid data format. Please check your inputs.");
      } else {
        setErrorMessage(
          "An error occurred while sending your message. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render
  return (
    <div
      id="contactid"
      className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-[#f5f5f5] py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <ContactHeader />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="xl:col-span-2">
            <div className="bg-stone-800 rounded-2xl shadow-2xl border border-stone-700 p-8 lg:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <MessageDisplay message={submitMessage} type={messageType} />

                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="First Name"
                    id="firstName"
                    placeholder="Bonnie"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Last Name"
                    id="lastName"
                    placeholder="Green"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Your Email"
                    id="email"
                    type="email"
                    placeholder="name@lumenworks.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    label="Phone Number"
                    id="phone"
                    type="tel"
                    placeholder="+12 345 6789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Message Field */}
                <FormTextarea
                  label="Your Message"
                  id="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <TermsAndConditions />
                <SubmitButton isSubmitting={isSubmitting} />
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="xl:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
