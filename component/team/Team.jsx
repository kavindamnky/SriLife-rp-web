import React from "react";

const Team = () => {
  const teamMembers = [

        {
      name: "Sahan Irandaka",
      role: "3D Artist | Concept Designer",
      description:
        "Sahan brings together full stack development expertise and 3D design skills, delivering seamless digital solutions and engaging visual experiences.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758014892/S_llm3m8.png",
      socials: {
        facebook: "https://www.facebook.com/share/17HHW23nov/?mibextid=wwXIfr",
        github: "https://github.com/sahan",
        linkedin: "https://linkedin.com/in/sahanirandaka",
      },
    },
    {
      name: "Dinuka Nirman",
      role: "3D Developer | Mechatronics Engineer",
      description:
        "Dinuka works at the intersection of mechatronics engineering and 3D design, creating innovative solutions that merge technology with creativity.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758014888/01_cbpt5k.png",
      socials: {
        facebook: "https://www.facebook.com/dinuka.gamage.647787/",

        linkedin: "https://www.linkedin.com/in/dinuka-nirman-32b288229/",
      },
    },

    {
      name: "Ashan Muthukumarana",
      role: "Commercial Vocalist | Artist ",
      description:
        "Ashan delivers professional vocal performances and engineers high-quality audio production systems.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758014886/as_ppwbnc.png",
      socials: {
        facebook: "https://www.facebook.com/ashan.muthukumarana11",
      },
    },
    {
      name: "Sethmindu Himsara",
      role: "Software Engineer | Marketing Specialist",
      description:
        "Sethmindu builds scalable software solutions and develops strategic marketing campaigns for growth.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758014892/Seth_jjh28k.png",
      socials: {
        facebook: "https://www.facebook.com/sethmidu.lead1",
        github: "https://github.com/sethmiduhimsara",
        linkedin: "https://www.linkedin.com/in/sethmindu-himsara/",
      },
    },
    {
      name: "Supun Maduwantha",
      role: "Full Stack Developer | Marketing Specialist",
      description:
        "Supun creates complete web applications and implements comprehensive marketing strategies effectively.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758014891/SS_g9dtdg.png",
      socials: {
        facebook: "https://www.facebook.com/supun.tharaka.899965",
        github: "https://github.com/supuntharaka16",
        linkedin: "https://www.linkedin.com/in/supun-tharaka-6a5b64316/",
      },
    },
    {
      name: "Kavinda Narangoda",
      role: "Developer | Concept Artist | UI/UX Designer",
      description:
        "Kavinda builds functional applications and designs intuitive user interfaces with artistic vision.",
      image:
        "https://res.cloudinary.com/dzummwk1a/image/upload/v1758015520/mn_ld1xif.png",
      socials: {
        facebook: "https://www.facebook.com/kavnda.kaviinda",
        github: "https://github.com/kavindamnky/",
        linkedin: "https://www.linkedin.com/in/vikum-kavinda-519683217/",
      },
    },
    
  ];

  return (
    <div id="teamid" className="team">
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] text-[#f5f5f5] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-center text-stone-200 mb-4">
              Our <span className="text-stone-400">Team</span>
            </h1>
            <p className="text-center text-stone-500 mb-16 max-w-2xl mx-auto">
              Meet the talented professionals who drive our innovation and
              success
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-stone-800 rounded-xl shadow-2xl border border-stone-700 overflow-hidden hover:bg-stone-700 hover:shadow-3xl hover:border-stone-600 transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image Container */}
                  <div className="w-full sm:w-48 aspect-[3/4] flex-shrink-0 overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} Avatar`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <h3 className="text-2xl font-bold text-stone-100 mb-2 group-hover:text-white transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-stone-400 font-medium mb-4 group-hover:text-stone-300 transition-colors">
                      {member.role}
                    </p>
                    <p className="text-stone-500 leading-relaxed mb-6 group-hover:text-stone-400 transition-colors">
                      {member.description}
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                      {/* Facebook */}
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-200 transition-all duration-300 transform hover:scale-110"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>

                      {/* GitHub */}
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-200 transition-all duration-300 transform hover:scale-110"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>

                      {/* LinkedIn */}
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-stone-700 hover:bg-stone-600 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-200 transition-all duration-300 transform hover:scale-110"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.137 1.445-2.137 2.939v5.667H9.345V9h3.409v1.561h.049c.476-.9 1.635-1.85 3.366-1.85 3.597 0 4.263 2.368 4.263 5.448v6.293zM5.337 7.433a1.986 1.986 0 01-1.986-1.986c0-1.1.886-1.986 1.986-1.986s1.986.886 1.986 1.986c0 1.1-.886 1.986-1.986 1.986zM6.904 20.452H3.771V9h3.133v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.729v20.542C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.729C24 .771 23.2 0 22.225 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
