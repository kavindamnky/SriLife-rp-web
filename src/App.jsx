import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "../component/navbar/Navbar";
import Header from "../component/header/Header";
import Aboutme from "../component/About/Aboutme";
import Ticket from "../component/Ticket/Ticket";
import SRILIFEPackages from "../component/showcase/SRILIFEPackages";
import WLapplication from "../component/WLapplications/WLapplication";
import JobApplication from "../component/Jobapplication/job_application";
import FAQ from "../component/faq/faq";
import GangApplication from "../component/Gangapplication/gang_application";
import Work from "../component/works/Works";
import Team from "../component/team/Team";
import Contact from "../component/contact/Contact";
import Footer from "../component/footer/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Whitelist Application Page - No Navbar/Footer */}
        <Route
          path="/wlapplication"
          element={<WLapplication />}
        />
        
        {/* Job Application Page - No Navbar/Footer */}
        <Route
          path="/job_application"
          element={<JobApplication />}
        />

        {/* Gang Application Page - No Navbar/Footer */}
        <Route
          path="/gang_application"
          element={<GangApplication />}
        />

        {/* All other routes with Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                {/* Home Page */}
                <Route
                  path="/"
                  element={
                    <>
                      <Header />
                      <Aboutme />
                      <Ticket />
                      <Work />
                      <SRILIFEPackages />
                      <FAQ />
                      <Footer />
                    </>
                  }
                />

                {/* About Page */}
                <Route
                  path="/about"
                  element={
                    <>
                      <Aboutme />
                      <Footer />
                    </>
                  }
                />

                {/* Work Page */}
                <Route
                  path="/work"
                  element={
                    <>
                      <Work />
                      <Footer />
                    </>
                  }
                />

                {/* Team Page */}
                <Route
                  path="/team"
                  element={
                    <>
                      <Team />
                      <Footer />
                    </>
                  }
                />

                {/* Contact Page */}
                <Route
                  path="/contact"
                  element={
                    <>
                      <Contact />
                      <Footer />
                    </>
                  }
                />

                {/* Catch-all route - redirects to home for 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;