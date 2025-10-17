import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br text-[#f5f5f5] border-t border-blue-800">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap');
          
          .saira-stencil-one-regular {
            font-family: "Saira Stencil One", sans-serif;
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src="https://res.cloudinary.com/dzummwk1a/image/upload/v1758656688/SriLife_RP_Logo_Transparent_dlk1hy.png"
                  alt="Lumen Works Logo"
                  className="w-12 h-12 object-contain"
                />
                <h3 className="text-2xl lg:text-3xl font-bold saira-stencil-one-regular">
                  SriLife <span className="text-blue-200">Roleplay</span>
                </h3>
              </div>
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                SriLife Roleplay is a premier FiveM server dedicated to providing..
              </p>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded px-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded font-medium transition-all duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h4 className="text-lg font-semibold text-[#f5f5f5] mb-6">
                  Quick Links
                </h4>
                <nav className="space-y-4">
                  <a
                    href="#head"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Home
                  </a>
                  <a
                    href="#aboutid"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    About
                  </a>
                  <a
                    href="#ticketid"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Apply for Visa
                  </a>
                  <a
                    href="#teamid"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Team
                  </a>
                  <a
                    href="#contactid"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Contact
                  </a>
                </nav>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-[#f5f5f5] mb-6">
                  Services
                </h4>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Police
                  </a>
                  <a
                    href="#"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    EMS
                  </a>
                  <a
                    href="#"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Mechanics
                  </a>
                  <a
                    href="#"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Gangs
                  </a>
                  <a
                    href="#"
                    className="block text-blue-100 hover:text-[#00519d] transition-colors duration-200"
                  >
                    Bussness 
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-blue-800">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-blue-100 text-sm">
                <p>&copy; 2025 SriLife Roleplay. All rights reserved.</p>
              </div>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-blue-100 hover:text-[#00519d] text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-blue-100 hover:text-[#00519d] text-sm transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;