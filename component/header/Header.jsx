import React, { useState, useEffect } from "react";
import { FaDiscord } from "react-icons/fa";
import { SiFivem } from "react-icons/si";

// Loader Component
const Loader = () => {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <div className="banter-loader">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="banter-loader__box" />
        ))}
      </div>

      {/* Loader Styles */}
      <style jsx>{`
        .banter-loader {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 72px;
          height: 72px;
          margin-left: -36px;
          margin-top: -36px;
        }

        .banter-loader__box {
          float: left;
          position: relative;
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }

        .banter-loader__box:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #00519d;
        }

        .banter-loader__box:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 6px;
        }

        .banter-loader__box:last-child {
          margin-bottom: 0;
        }

        /* animations remain same */
        .banter-loader__box:nth-child(1) { animation: moveBox-1 4s infinite; }
        .banter-loader__box:nth-child(2) { animation: moveBox-2 4s infinite; }
        .banter-loader__box:nth-child(3) { animation: moveBox-3 4s infinite; }
        .banter-loader__box:nth-child(4) { animation: moveBox-4 4s infinite; }
        .banter-loader__box:nth-child(5) { animation: moveBox-5 4s infinite; }
        .banter-loader__box:nth-child(6) { animation: moveBox-6 4s infinite; }
        .banter-loader__box:nth-child(7) { animation: moveBox-7 4s infinite; }
        .banter-loader__box:nth-child(8) { animation: moveBox-8 4s infinite; }
        .banter-loader__box:nth-child(9) { animation: moveBox-9 4s infinite; }
      `}</style>
    </div>
  );
};

// Main Header Component
const Header = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);
  const [ctaLoaded, setCTALoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const loadingSequence = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsLoaded(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setTextLoaded(true);
      await new Promise(resolve => setTimeout(resolve, 700));
      setCTALoaded(true);
    };
    loadingSequence();
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  return (
    <div
      id="head"
      className="min-h-screen bg-gradient-to-br text-white flex items-center relative overflow-hidden pt-16 md:pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-blue-700 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Loader */}
      {showLoader && <Loader />}
      {showLoader && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-500"></div>
      )}

      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 relative z-10 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${showLoader ? "blur-sm" : "blur-none"}`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Logo (Top on mobile, Right on desktop) */}
          <div
            className={`flex-shrink-0 relative flex justify-center order-1 lg:order-2 mt-4 lg:mt-0 transition-all duration-1000 delay-300 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative group">
              <img
                src="https://res.cloudinary.com/dzummwk1a/image/upload/v1758656688/SriLife_RP_Logo_Transparent_dlk1hy.png"
                alt="SriLife Roleplay Logo"
                className="h-24 w-auto sm:h-32 md:h-40 lg:h-36 xl:h-48 2xl:h-56 transition-all duration-500 group-hover:scale-110 filter drop-shadow-2xl max-w-full"
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="absolute inset-0 opacity-20 pointer-events-none hidden md:block">
                <div
                  className="absolute -top-8 -right-8 w-12 h-12 lg:w-16 lg:h-16 border-2 border-blue-500 transform rotate-45 animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>
                <div
                  className="absolute -bottom-6 -left-6 w-8 h-8 lg:w-12 lg:h-12 bg-blue-600 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-72 lg:h-72 border border-blue-600 rounded-full animate-ping"
                  style={{ animationDuration: "4s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Text + CTA (Bottom on mobile, Left on desktop) */}
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
            <div
              className={`space-y-3 md:space-y-4 transition-all duration-1000 delay-500 ${
                textLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight saira-stencil-one-regular">
                <span className="block text-blue-600 hover:text-white transition-colors duration-300 animate-fade-in-up break-words">
                  SRILIFE ROLEPLAY
                </span>
              </h1>
              <div className="w-16 md:w-24 h-0.5 bg-blue-500 mx-auto lg:mx-0 transform origin-left scale-x-0 animate-scale-x"></div>
            </div>

            <div
              className={`space-y-4 md:space-y-6 transition-all duration-1000 delay-700 ${
                textLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
            >
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 font-light leading-relaxed max-w-2xl px-2 lg:px-0">
                A New Era of Sri Lankan Roleplay
              </p>
              <p
                className="text-blue-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl opacity-0 animate-fade-in-up px-2 lg:px-0"
                style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
              >
                Join the most immersive GTA V RP experience built for Sri Lanka.
                Dynamic stories, real connections, and limitless creativity.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 justify-center lg:justify-start transition-all duration-1000 delay-1000 px-2 lg:px-0 ${
                ctaLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() =>
                  window.open("https://cfx.re/join/6e78x4", "_blank")
                }
                className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl text-sm md:text-base w-full sm:w-auto"
              >
                <SiFivem className="w-4 h-4 relative z-10 flex-shrink-0" />
                <span className="relative z-10 whitespace-nowrap">
                  Play Now
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("ticketid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative px-6 md:px-8 py-3 md:py-4 border-2 border-blue-400 text-blue-200 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105 hover:shadow-2xl overflow-hidden text-sm md:text-base w-full sm:w-auto"
              >
                <span className="relative z-10 flex items-center whitespace-nowrap">
                  Apply For Visa
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-10"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-scale-x {
          animation: scale-x 1s ease-out 0.8s forwards;
        }
        @media (max-width: 360px) {
          .break-words {
            word-break: break-word;
            hyphens: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
