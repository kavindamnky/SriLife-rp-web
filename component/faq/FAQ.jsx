import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "⚙️ Technical Requirements",
      questions: [

        {
          question: "Do I need any mods or additional software?",
          answer: "Only the FiveM client and required server-side resources will be necessary. Extra mods are not allowed unless approved by the SriLife staff team."
        }
      ]
    },
    {
      category: "🤝 Community Standards",
      questions: [
        {
          question: "What's the minimum age requirement?",
          answer: "Players must be 18 years or older to maintain a mature and respectful environment."
        },
        {
          question: "What kind of behavior is expected?",
          answer: "Members must always be respectful and mature, avoiding toxicity, harassment, or discrimination."
        },
        {
          question: "What makes SriLife RP different from others?",
          answer: "SriLife Roleplay emphasizes immersive storytelling, realistic interactions, and a strong Sri Lankan cultural experience while maintaining global RP standards."
        }
      ]
    },
    {
      category: "🎭 Character Requirements",
      questions: [
        {
          question: "How do I create a character for SriLife RP?",
          answer: "Your character should have a detailed backstory, clear motivation, and a realistic personality with strengths and flaws."
        },
        {
          question: "Can I reuse my character from another RP server?",
          answer: "You can, but make sure to adapt the story to fit the SriLife Roleplay universe and local environment."
        },
        {
          question: "Can my character evolve over time?",
          answer: "Yes! We encourage character development — let your story grow naturally based on your experiences and decisions in the city."
        }
      ]
    },
    {
      category: "📞 General",
      questions: [
        {
          question: "How do I join the SriLife Roleplay server?",
          answer: "Join our official Discord, complete the application process, and follow the setup instructions provided by our staff."
        },
        {
          question: "Who can I contact if I need help or have issues?",
          answer: "You can open a support ticket in the Discord server to get assistance from the SriLife staff team."
        },
        {
          question: "Are there any roleplay restrictions?",
          answer: "Yes. FailRP, Powergaming, Metagaming, and VDM/RDM are strictly prohibited. These rules ensure a fair and immersive RP environment for all players."
        }
      ]
    }
  ];

  // Flatten all questions with category info
  const allQuestions = faqData.flatMap((category) =>
    category.questions.map((q) => ({
      ...q,
      category: category.category
    }))
  );

  return (
    <div id="faqid" className="faq">
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2 sm:mb-4">
              Frequently <span className="text-blue-600">asked questions</span>
            </h1>
            <div className="max-w-3xl mx-auto space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-blue-200 mt-4 sm:mt-6">
              <p className="px-2 sm:px-0">
  SriLife Roleplay – Everything you need to know
              </p>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {allQuestions.map((item, index) => (
              <div
                key={index}
                className={`rounded-lg border-2 overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "bg-[#00519d] border-[#00519d] shadow-lg"
                    : "bg-white border-gray-200 hover:border-[#00519d]"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200"
                >
                  <span
                    className={`font-medium pr-8 transition-colors duration-200 ${
                      openIndex === index
                        ? "text-white"
                        : "text-gray-800 hover:text-[#00519d]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-white"
                        : "text-[#00519d]"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-white leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Still have questions?{" "}
              <a
                href="#"
                className="text-blue-200 hover:text-blue-500 font-medium transition-colors"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;