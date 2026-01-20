import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

// Icons
import { CgEnter } from 'react-icons/cg';
import { RiVideoAddFill, RiGlobalLine, RiSecurePaymentLine, RiTimeLine, RiQuestionAnswerLine, RiTeamLine, RiBriefcaseLine } from 'react-icons/ri';
import { MdOutlineSecurity, MdGroups, MdScreenShare, MdSchool, MdHealthAndSafety } from 'react-icons/md';
import { IoIosArrowDown } from "react-icons/io";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// Context
import { AuthContext } from '../context/authContext';
import { SocketContext } from '../context/SocketContext';

// Styles
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { socket, setMyMeets, newMeetType, setNewMeetType } = useContext(SocketContext);

  const [roomName, setRoomName] = useState('');
  const [newMeetDate, setNewMeetDate] = useState('');
  const [newMeetTime, setNewMeetTime] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [joinRoomError, setJoinRoomError] = useState('');
  const [showModal, setShowModal] = useState(false);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  const userId = localStorage.getItem("userId") || '';
  const userName = localStorage.getItem("userName") || '';
  const isLoggedIn = userName && userName !== 'null';

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  useEffect(() => {
    socket.on("room-exists", ({ roomId }) => {
      navigate(`/meet/${roomId}`);
    });
    socket.on("room-not-exist", () => {
      setJoinRoomId('');
      setJoinRoomError("Room doesn't exist! Please try again.");
    });
    socket.emit("fetch-my-meets", { userId });
    socket.on("meets-fetched", ({ myMeets }) => {
      setMyMeets(myMeets);
    });
  }, [socket, navigate, setMyMeets, userId]);

  const handleCreateRoom = () => {
    socket.emit("create-room", { userId, roomName, newMeetType, newMeetDate, newMeetTime });
    setShowModal(false);
  };

  const handleJoinRoom = async () => {
    if (!joinRoomId) return;
    await socket.emit('user-code-join', { roomId: joinRoomId });
    setRoomName('');
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // --- RENDER HELPERS ---

  const Navbar = () => (
    <nav className="glass-nav">
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="nav-logo">
        <RiGlobalLine className="logo-icon" />
        <h2>Smart Meet</h2>
      </motion.div>

      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="nav-actions">
        {!isLoggedIn ? (
          <button className="btn-glass" onClick={() => navigate('/login')}>Login</button>
        ) : (
          <Dropdown align="end">
            <Dropdown.Toggle id="dropdown-custom" className="user-dropdown-toggle">
              {userName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="glass-dropdown">
              <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
              <Dropdown.Item onClick={(e) => { e.preventDefault(); logout(); }}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </motion.div>
    </nav>
  );

  const Footer = () => (
    <footer className="footer-glass">
      <p>© 2026 Smart Meet. Connected by Future.</p>
      <div className="social-links">
        <GoogleIcon className="social-icon" />
        <FacebookIcon className="social-icon" />
        <InstagramIcon className="social-icon" />
        <TwitterIcon className="social-icon" />
      </div>
    </footer>
  );

  // --- MAIN VIEWS ---

  const DashboardView = () => (
    <div className='dashboard-view-container'>
      <motion.div
        className="dashboard-welcome-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome back, <span className="gradient-text">{userName}</span></h1>
        <p>Ready to connect with your team today?</p>
      </motion.div>

      <div className="dashboard-cards-row">
        {/* Join Meeting Card */}
        <motion.div
          className="dashboard-action-card card-join"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dashboard-card-icon">
            <CgEnter />
          </div>
          <h3>Join Meeting</h3>
          <p>Enter a code to join an existing session instantly.</p>

          <div className="join-input-container">
            <input
              type="text"
              placeholder="Enter meeting code..."
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
            />
          </div>
          <button className="btn-card-action btn-join" onClick={handleJoinRoom}>
            Join Now
          </button>
          {joinRoomError && <span className="error-msg mt-2">{joinRoomError}</span>}
        </motion.div>

        {/* Create Meeting Card */}
        <motion.div
          className="dashboard-action-card card-create"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleShow}
        >
          <div className="dashboard-card-icon">
            <RiVideoAddFill />
          </div>
          <h3>New Meeting</h3>
          <p>Host a secure meeting for your team or friends.</p>

          <button className="btn-card-action btn-create mt-auto">
            Create Room
          </button>
        </motion.div>
      </div>
    </div>
  );

  const PublicHomeView = () => (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <motion.div
              className="col-lg-6 hero-text"
              initial="hidden" animate="visible" variants={containerVariants}
            >
              <motion.h1 variants={itemVariants}>
                Unbounded <span className="gradient-text">Connections</span>
              </motion.h1>
              <motion.p variants={itemVariants} className="hero-description">
                Elevate your meetings with future-forward video conferencing.
                Seamless collaboration, crystal-clear audio, and HD video.
                <br /><strong>Free. Secure. Limitless.</strong>
              </motion.p>
              <motion.button variants={itemVariants} className="btn-primary-glow" onClick={() => navigate('/login')}>
                Get Started
              </motion.button>
            </motion.div>

            <motion.div
              className="col-lg-6 hero-visual"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="visual-circle-container">
                <div className="glowing-circle"></div>
                <div className="visual-card card-1"><RiVideoAddFill /></div>
                <div className="visual-card card-2"><MdScreenShare /></div>
                <div className="visual-card card-3"><MdGroups /></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <motion.div className="container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.h2 variants={itemVariants} className="section-title">Key Features</motion.h2>
          <div className="features-grid">
            <motion.div variants={itemVariants} className="feature-card">
              <div className="icon-wrapper"><MdGroups /></div>
              <h3>Group Conference</h3>
              <p>Host up to 100 participants in a single secure room with HD quality.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card">
              <div className="icon-wrapper"><RiTimeLine /></div>
              <h3>Schedule Anytime</h3>
              <p>Plan ahead with scheduled meetings or start instantly with one click.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card">
              <div className="icon-wrapper"><RiSecurePaymentLine /></div>
              <h3>Free Forever</h3>
              <p>Premium features at zero cost. Keep your business moving forward.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="feature-card">
              <div className="icon-wrapper"><MdOutlineSecurity /></div>
              <h3>Secure & Private</h3>
              <p>End-to-end encryption ensures your conversations stay private.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Solutions Section */}
      <section className="solutions-section">
        <div className="container">
          <h2 className="section-title">Solutions for Every Team</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="solution-card-glass">
                <div className="solution-icon-box"><RiBriefcaseLine /></div>
                <h3>Enterprise</h3>
                <p>Scale your business with reliable, secure video meetings for remote teams of any size.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card-glass">
                <div className="solution-icon-box"><MdSchool /></div>
                <h3>Education</h3>
                <p>Create virtual classrooms with whiteboard and screen sharing tools for engaging learning.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="solution-card-glass">
                <div className="solution-icon-box"><MdHealthAndSafety /></div>
                <h3>Healthcare</h3>
                <p>Connect doctors and patients securely with HIPAA-compliant virtual consultations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {[
              { q: "Is Smart Meet really free?", a: "Yes! We believe in open communication. All core features including group calls and screen sharing are 100% free." },
              { q: "Do I need to download software?", a: "No downloads required. Smart Meet runs entirely in your modern web browser (Chrome, Firefox, Safari, Edge)." },
              { q: "How many participants can join?", a: "Currently, we support up to 50 active participants in a single meeting room with optimal performance." },
              { q: "Is my data secure?", a: "Absolutely. We use industry-standard encryption protocols and do not store your video or audio data on our servers." }
            ].map((faq, index) => (
              <div key={index} className={`faq-item-glass ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                <div className="faq-question">
                  {faq.q}
                  <IoIosArrowDown className="faq-icon" />
                </div>
                <div className="faq-answer">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className='home-page-wrapper'>
      <Navbar />

      {isLoggedIn ? <DashboardView /> : <PublicHomeView />}

      {!isLoggedIn && <Footer />}

      {/* Shared Create Meet Modal */}
      <Modal show={showModal} onHide={handleClose} centered className="glass-modal">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Create New Meet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mb-3">
            <label className="form-label">Meet Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Project Kickoff"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Type</label>
            <select className="form-select" onChange={(e) => setNewMeetType(e.target.value)} defaultValue="">
              <option value="" disabled>Choose type</option>
              <option value="instant">Instant Meet</option>
              <option value="scheduled">Schedule for Later</option>
            </select>
          </div>

          {newMeetType === 'scheduled' && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="scheduled-options">
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type='date' className="form-control" onChange={(e) => setNewMeetDate(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input type='time' className="form-control" onChange={(e) => setNewMeetTime(e.target.value)} />
              </div>
            </motion.div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateRoom}>Create Meet</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;