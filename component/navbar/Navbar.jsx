import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { SiFivem } from "react-icons/si";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  const [showServerInfo, setShowServerInfo] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // FiveM Server Details
  const SERVER_IP = "51.79.224.109:3259";
  const SERVER_CODE = "6e78x4";

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_CODE}`);
        const data = await response.json();
        
        setServerStatus({
          players: data.Data?.clients || 0,
          maxPlayers: data.Data?.sv_maxclients || 128,
          serverName: data.Data?.hostname || "SriLife RP",
          isOnline: true
        });
      } catch (error) {
        setServerStatus({
          players: 0,
          maxPlayers: 128,
          isOnline: false
        });
      }
    };

    fetchServerStatus();
    const interval = setInterval(fetchServerStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: "Home", path: "/", sectionId: "head" },
    { name: "About Us", path: "/", sectionId: "aboutid" },
    { name: "Apply to Visa", path: "/", sectionId: "ticketid" },
    { name: "Sponsorships", path: "/", sectionId: "subscriptionid" },
    { name: "FAQ", path: "/", sectionId: "faqid" }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== item.path) {
      navigate(item.path);
      setTimeout(() => {
        if (item.sectionId) {
          scrollToSection(item.sectionId);
        }
      }, 100);
    } else if (item.sectionId) {
      scrollToSection(item.sectionId);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
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

      <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-blue-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100 saira-stencil-one-regular">
              SriLife RolePlay
            </span>
          </Link>

          <div className="flex md:order-2 space-x-2 rtl:space-x-reverse items-center">
            <button
              type="button"
              onClick={() => window.open('https://discord.gg/GpHzarK9F3', '_blank')}
              className="hidden md:flex items-center gap-2 text-gray-100 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
            >
              <FaDiscord className="w-4 h-4" />
              Discord
            </button>
            
            <button
              type="button"
              onClick={() => window.open('https://srilife-rp-or-rulebook.gitbook.io/guidebook', '_blank')}
              className="hidden md:flex items-center gap-2 text-gray-100 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors"
            >
              <GoLaw className="w-4 h-4" />
              Rules
            </button>

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-600 rounded-lg bg-gray-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 ${
                      location.pathname === item.path && (!item.sectionId || location.hash === `#${item.sectionId}`)
                        ? "text-gray-100 bg-blue-600 md:bg-transparent md:text-blue-400"
                        : "text-gray-800 hover:bg-gray-300 md:hover:bg-transparent md:hover:text-blue-400 md:text-gray-200 md:hover:text-blue-300"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              
              <li className="md:hidden border-t border-gray-400 mt-2 pt-2">
                <button
                  onClick={() => window.open('https://discord.gg/GpHzarK9F3', '_blank')}
                  className="flex items-center gap-2 w-full text-left py-2 px-3 text-gray-800 hover:bg-gray-300 rounded-sm"
                >
                  <FaDiscord className="w-4 h-4" />
                  Discord
                </button>
              </li>
              
              <li className="md:hidden">
                <button
                  onClick={() => window.open('https://srilife-rp-or-rulebook.gitbook.io/guidebook', '_blank')}
                  className="flex items-center gap-2 w-full text-left py-2 px-3 text-gray-800 hover:bg-gray-300 rounded-sm"
                >
                  <GoLaw className="w-4 h-4" />
                  Read Our Rules
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setShowServerInfo(!showServerInfo)}
          className="flex items-center gap-2 text-gray-100 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-3 shadow-lg transition-all duration-200"
        >
          <SiFivem className="w-5 h-5" />
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${serverStatus?.isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></span>
            {serverStatus ? `${serverStatus.players}/${serverStatus.maxPlayers}` : '0/128'}
          </span>
        </button>

        {showServerInfo && (
          <div className="absolute bottom-16 right-0 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-300">Server Information</h3>
              <span className={`px-2 py-1 text-xs rounded ${serverStatus?.isOnline ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {serverStatus?.isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Players Online</span>
                <span className="text-sm font-bold text-green-400">
                  {serverStatus?.players || 0}/{serverStatus?.maxPlayers || 128}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Status</span>
                <span className="text-sm font-medium text-gray-200">
                  {serverStatus?.isOnline ? 'Running' : 'Maintenance'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Region</span>
                <span className="text-sm font-medium text-gray-200">Asia</span>
              </div>
            </div>

            <button
              onClick={() => window.location.href = 'https://cfx.re/join/6e78x4'}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded transition-colors"
            >
              Connect to Server
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;