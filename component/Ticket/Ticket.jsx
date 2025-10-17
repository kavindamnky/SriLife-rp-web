import React, { useState, useEffect } from "react";
import { GiPassport } from "react-icons/gi";
import { GiMachineGunMagazine } from "react-icons/gi";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { MdAddBusiness } from "react-icons/md";
import { Link } from "react-router-dom";

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startCount = 0;
    const endCount = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = startCount + (endCount - startCount) * progress;
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
};

const Ticket = () => {
  return (
    <div id="ticketid" className="ticket">
      <div className="min-h-screen bg-gradient-to-br text-[#f5f5f5] flex items-center justify-center relative overflow-hidden py-4 sm:py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 sm:mb-4">
              Apply <span className="text-blue-600">to Visa</span>
            </h1>

            {/* Description Paragraphs */}
            <div className="max-w-3xl mx-auto space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-blue-200 mt-4 sm:mt-6">
              <p className="px-2 sm:px-0">
                Ready to join our exclusive community? Click the boarding pass
                below to start your whitelist application!
              </p>
              <span className="text-blue-400 font-medium block text-xs sm:text-sm md:text-base">
                Click the boarding pass to begin
              </span>
            </div>
          </div>

          {/* Airplane Ticket Section */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Airplane Ticket */}
            <div className="max-w-full mx-auto px-2 sm:px-4">
              <div className="relative group cursor-pointer transform hover:scale-[1.02] transition-all duration-300">
                {/* Main Airplane Image as Ticket - Opens in new tab */}
                <div className="relative w-full">
                  <Link
                    to="/wlapplication"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src="https://res.cloudinary.com/dzummwk1a/image/upload/v1758669574/air11_iii7k4.png"
                      alt="Airplane Ticket"
                      className="w-250 h-auto object-contain transition-all duration-300 max-h-[60vh] sm:max-h-[70vh]"
                      style={{
                        filter: "drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2))",
                      }}
                    />
                  </Link>

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

                  {/* Subtle overlay for hover effect only */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Applications Open Badge - Bottom */}
              <div className="flex justify-center mt-2 sm:mt-4">
                <div className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse">
                  ✓ APPLICATIONS OPEN
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center mt-3 sm:mt-6">
              <p className="text-gray-400 text-xs sm:text-sm px-4">
                Limited slots available • Priority access • Exclusive benefits
              </p>
            </div>

{/* Application Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-4 max-w-6xl mx-auto">
              <button
                onClick={() =>
                  window.open("/wlapplication", "_blank")
                }
                className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl text-sm md:text-base w-full"
              >
                <GiPassport className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">
                  Whitelist
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() =>
                  window.open("/job_application", "_blank")
                }
                className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl text-sm md:text-base w-full"
              >
                <RiPoliceBadgeFill className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">
                  Job Application
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() =>
                  window.open("/gang_application", "_blank")
                }
                className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl text-sm md:text-base w-full"
              >
                <GiMachineGunMagazine className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">
                  Gang Applications
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>

              <button
                onClick={() =>
                  window.open("/", "_blank")
                }
                className="group relative flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl text-sm md:text-base w-full"
              >
                <MdAddBusiness className="relative z-10" />
                <span className="relative z-10 whitespace-nowrap">
                  Business Registrations
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Ticket;