import React, { useState } from "react";
import {
  Star,
  Award,
  Users,
  Shield,
  Zap,
  Crown,
  Check,
  Sparkles,
  Gem,
} from "lucide-react";

const SRILIFEPackages = () => {
  const packages = [
    {
      id: 1,
      name: "Silver",
      icon: "star",
      tagline: "Essential Package",
      description:
        "Perfect for players who want basic priority access and standard perks.",
      price: 25,
      color: "from-gray-400 to-gray-500",
      badgeColor: "bg-gray-400",
      features: [
        "+30 Queue Boost (stacks with other sources)",
        "Exclusive Standard Badge on Website & Discord",
        "Eligible for SriLife Public Server access",
        "Also applies to Whitelisted Server (with valid whitelist status)",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Gold",
      icon: "award",
      tagline: "Most Popular Choice",
      description:
        "Ideal for serious players seeking priority support and faster whitelist processing.",
      price: 50,
      color: "from-yellow-400 to-yellow-600",
      badgeColor: "bg-yellow-500",
      features: [
        "+75 Queue Boost (stacks with other sources)",
        "Unique Prime Badge on Website & Discord",
        "1 Whitelist Application Fast-Track within 7 days",
        "Priority Support via Discord Ticket",
        "Usable on SriLife Public & Whitelisted Servers (with valid whitelist status)",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Emerald",
      icon: "gem",
      tagline: "Ultimate Elite Package",
      description:
        "Maximum priority access with unlimited fast-tracks and direct developer feedback.",
      price: 100,
      color: "from-emerald-400 to-emerald-600",
      badgeColor: "bg-emerald-500",
      features: [
        "+150 Queue Boost (stacks with other sources)",
        "Prestigious Elite Badge on Website & Discord",
        "Unlimited Whitelist Fast-Track Requests (within 7 days)",
        "Direct Feedback Channel to SriLife Developers/Staff (guaranteed replies)",
        "Access to all SriLife Servers with full priority",
      ],
      popular: false,
    },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "star":
        return <Star className="w-8 h-8" />;
      case "award":
        return <Award className="w-8 h-8" />;
      case "gem":
        return <Gem className="w-8 h-8" />;
      default:
        return <Star className="w-8 h-8" />;
    }
  };

  return (
    <div id="subscriptionid" className="subscription">
      <div className="min-h-screen boverflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 py-12 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 sm:mb-4">
              Choose <span className="text-blue-600">Your Subscription </span>
            </h1>

            <div className="max-w-3xl mx-auto space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-blue-200 mt-4 sm:mt-6">
              <p className="px-2 sm:px-0">
                Join thousands of players in the most immersive roleplay
                experience. Select the perfect package for your journey in
                SriLife.
              </p>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col p-6 lg:p-8 text-white bg-blue-900/40 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 hover:scale-102 hover:shadow-2xl ${
                  pkg.popular
                    ? "border-blue-400 shadow-xl shadow-blue-500/30 md:scale-105"
                    : "border-blue-700/50 hover:border-blue-500/50"
                }`}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Zap className="w-3 h-3" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${pkg.color} mb-4 shadow-lg`}
                >
                  {getIcon(pkg.icon)}
                </div>

                {/* Package Info */}
                <h3 className="mb-2 text-2xl md:text-3xl font-bold text-blue-50">
                  {pkg.name}
                </h3>
                <p className="text-blue-300 text-xs md:text-sm font-medium mb-3">
                  {pkg.tagline}
                </p>
                <p className="font-light text-blue-200 text-sm mb-6 min-h-[60px]">
                  {pkg.description}
                </p>

                {/* Pricing */}
                <div className="mb-6 py-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl md:text-5xl font-extrabold text-blue-50">
                      ${pkg.price}
                    </span>
                    <span className="text-blue-300 ml-2 text-lg">USD</span>
                  </div>
                  <p className="text-blue-300 text-xs md:text-sm mt-2 text-center">
                    One-time payment
                  </p>
                </div>

                {/* Features List */}
                <ul className="mb-8 space-y-3 text-left flex-grow">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${pkg.color} flex items-center justify-center mt-0.5`}
                      >
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-blue-100 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
<button
  onClick={() => window.open('https://discord.gg/eXcGpD4rY7', '_blank')}
  className={`w-full font-semibold rounded-xl text-sm md:text-base px-6 py-3.5 text-center transition-all duration-300 transform hover:scale-101 ${
    pkg.popular
      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
      : "bg-blue-700 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
  }`}
>
  Get Started
</button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center px-4">
            <p className="text-blue-200 mb-8 text-sm md:text-base">
              All packages provide lifetime access. Upgrade or modify your
              package anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-xs md:text-sm text-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span>10,000+ Active Players</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                <span>Award-Winning Server</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SRILIFEPackages;
