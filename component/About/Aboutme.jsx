import React, { useState, useEffect, useRef } from "react";

/**
 * CountUp - animates a number from 0 to `end` over `duration` ms.
 * Returns a <span> so it can be used directly inside markup.
 */
const CountUp = ({ end, duration = 2000, isVisible = true }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const startCount = 0;
    const endCount = Number(end) || 0;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = startCount + (endCount - startCount) * progress;
      setCount(Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration, isVisible]);

  return <span>{count}</span>;
};

/**
 * useIntersectionObserver - returns [ref, isVisible].
 * Accepts options object for threshold / root / rootMargin.
 */
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      observer.disconnect();
    };
  }, [ref, options]);

  return [ref, isVisible];
};

const StatCard = ({ value, label, color = "text-blue-400", isVisible, delay = 0 }) => (
  <div
    className={`text-center transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className={`text-4xl md:text-5xl lg:text-6xl font-bold ${color} mb-2`}>
      {typeof value === "number" ? <CountUp end={value} isVisible={isVisible} /> : value}
    </div>
    <div className="text-gray-400 text-base md:text-lg font-medium">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, description, isVisible, delay = 0 }) => (
  <div
    className={`text-center px-4 py-6 transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 mx-auto mb-4 text-blue-400 flex items-center justify-center">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
  </div>
);

const ServerOwnerCard = ({ name, title, description, avatar, discord, isVisible }) => (
  <div
    className={`bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
  >
    <div className="flex items-start space-x-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
        <p className="text-blue-300 text-sm font-medium mb-4">{title}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-500 text-sm">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            {discord}
          </div>
          <div className="flex space-x-3">
            {/* small icons */}
            <svg className="w-5 h-5 text-gray-400 hover:text-shadow-blue-800 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>

            <svg className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutUs = () => {
  // intersection refs
  const [headerRef, headerVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [statsRef, statsVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [missionRef, missionVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [featuresRef, featuresVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [ownersRef, ownersVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    // Outer: center everything horizontally and vertically
    <div id="aboutid" className="aboutus min-h-screen flex items-center justify-center text-white relative bg-transparent">
      {/* Background pattern (keeps absolutely positioned elements) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-600/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Content container: fixed max width centered */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Main (left) - spans 2 columns on large */}
            <div
              ref={headerRef}
              className={`lg:col-span-2 transition-all duration-1000 transform ${headerVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
              <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 sm:mb-4">
                  About <span className="text-blue-600">Our Community</span>
                </h1>
              </div>

              <p className="max-w-3xl mx-auto space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-blue-200 mt-4 sm:mt-6">
                Meet the passionate team behind this immersive Wild West roleplay experience. We've built a community where stories come to life and friendships are forged in the heat of the frontier.
              </p>

              <div className="text-center mb-6 sm:mb-8 lg:mb-12 mt-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 sm:mb-4">
                  Our <span className="text-blue-600">Mission</span>
                </h1>
              </div>

              <p className="max-w-3xl mx-auto space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-blue-200 mt-4 sm:mt-6">
                We're dedicated to creating the most authentic and immersive Wild West roleplay experience possible. Our team works tirelessly to maintain a welcoming community where players can craft meaningful stories, forge lasting friendships, and experience the thrill of life on the frontier.
              </p>

              {/* Example Stats (uncomment and customize values if needed) */}
              {/* 
              <div ref={statsRef} className="mb-16 mt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-300 mb-8 text-center">Community Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <StatCard value={120} label="Active Members" color="text-green-400" isVisible={statsVisible} delay={0} />
                  <StatCard value={4} label="Years Running" color="text-white" isVisible={statsVisible} delay={200} />
                  <StatCard value="24/7" label="Server Uptime" color="text-blue-400" isVisible={statsVisible} delay={400} />
                  <StatCard value="10+" label="Staff Members" color="text-purple-400" isVisible={statsVisible} delay={600} />
                </div>
              </div>
              */}
            </div>

            {/* Right Sidebar - Server Owners */}
            <div
              ref={ownersRef}
              className={`transition-all duration-1000 transform ${ownersVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            >
              <div className="flex items-center mb-6">
                <svg className="w-6 h-6 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h2 className="text-xl md:text-2xl font-bold text-blue-300">Server Owner</h2>
              </div>

              <ServerOwnerCard
                name="MaMBaXd"
                title="Founder & Lead Developer"
                description="Passionate about creating immersive roleplay experiences with over 5 years in the RP community."
                avatar={
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                }
                discord="mambaxd#7426"
                isVisible={ownersVisible}
              />
            </div>
          </div>

          {/* Mission Section - invisible placeholder if needed for future content */}
          <div
            ref={missionRef}
            className={`px-4 sm:px-6 lg:px-8 py-12 backdrop-blur-sm transition-all duration-1000 transform ${missionVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
          >
            {/* Add mission-specific content here if desired */}
          </div>

          {/* Features Section */}
          <div ref={featuresRef} className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FeatureCard
                  icon={<svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>}
                  title="Immersive Roleplay"
                  description="Authentic Wild West experience with historical accuracy"
                  isVisible={featuresVisible}
                  delay={0}
                />
                <FeatureCard
                  icon={<svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01.99l-2.54 3.38c-.35.47-.35 1.1 0 1.58L14 17h-3v5h9z" /></svg>}
                  title="Community First"
                  description="Welcoming and inclusive environment for all players"
                  isVisible={featuresVisible}
                  delay={200}
                />
                <FeatureCard
                  icon={<svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>}
                  title="Fair Play"
                  description="Equal opportunities for all players with transparent rules"
                  isVisible={featuresVisible}
                  delay={400}
                />
                <FeatureCard
                  icon={<svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>}
                  title="Continuous Improvement"
                  description="Always evolving and improving based on community feedback"
                  isVisible={featuresVisible}
                  delay={600}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-transform {
            transition: none;
          }
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
