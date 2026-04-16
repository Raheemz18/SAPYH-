/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar, Footer } from './components/Layout';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Register from './pages/Register';
import ParentRegister from './pages/ParentRegister';
import OrganizerRegister from './pages/OrganizerRegister';
import OrganizerPortal from './pages/OrganizerPortal';
import UserTypeSelection from './pages/UserTypeSelection';
import Login from './pages/Login';
import Training from './pages/Training';
import Tournaments from './pages/Tournaments';
import Rankings from './pages/Rankings';
import Spotlights from './pages/Spotlights';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/select-type" element={<UserTypeSelection />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/parent" element={<ParentRegister />} />
            <Route path="/register/organizer" element={<OrganizerRegister />} />
            <Route path="/organizer-portal" element={<OrganizerPortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/training" element={<Training />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/spotlights" element={<Spotlights />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}
