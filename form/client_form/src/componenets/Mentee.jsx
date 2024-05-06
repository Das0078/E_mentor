import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom';
const Mentee = () => {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
};
  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">Mentorship Platform</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-4 mb-4">Welcome Mentee!</h1>
            <p className="lead">Explore your mentoring journey with us.</p>
          </div>
        </div>
      </div>

      {/* Mentee Details */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <h2 className="card-header bg-primary text-white mb-4">Mentee Details</h2>
              <div className="card-body">
                <div className="mb-3">
                  <h5>ID</h5>
                  {/* Placeholder for ID */}
                </div>
                <div className="mb-3">
                  <h5>Name</h5>
                  {/* Placeholder for name */}
                </div>
                <div className="mb-3">
                  <h5>Programme</h5>
                  {/* Placeholder for programme */}
                </div>
                <div className="mb-3">
                  <h5>Date of Birth</h5>
                  {/* Placeholder for date of birth */}
                </div>
                <div className="mb-3">
                  <h5>Email</h5>
                  {/* Placeholder for email */}
                </div>
                <div className="mb-3">
                  <h5>Mobile</h5>
                  {/* Placeholder for mobile */}
                </div>
                <div className="mb-3">
                  <h5>Address</h5>
                  {/* Placeholder for address */}
                </div>
                <div className="mb-3">
                  <h5>Mother's Name</h5>
                  {/* Placeholder for mother's name */}
                </div>
                <div className="mb-3">
                  <h5>Mother's Occupation</h5>
                  {/* Placeholder for mother's occupation */}
                </div>
                <div className="mb-3">
                  <h5>Father's Name</h5>
                  {/* Placeholder for father's name */}
                </div>
                <div className="mb-3">
                  <h5>Father's Occupation</h5>
                  {/* Placeholder for father's occupation */}
                </div>
                <div className="mb-3">
                  <h5>Parents' Number</h5>
                  {/* Placeholder for parents' number */}
                </div>
                <div className="mb-3">
                  <h5>Strengths</h5>
                  {/* Placeholder for strengths */}
                </div>
                <div className="mb-3">
                  <h5>Weaknesses</h5>
                  {/* Placeholder for weaknesses */}
                </div>
                <div className="mb-3">
                  <h5>Mentor ID</h5>
                  {/* Placeholder for mentor ID */}
                </div>
                <div className="mb-3">
                  <h5>Role</h5>
                  {/* Placeholder for role */}
                </div>
                <div className="mb-3">
                  <h5>Profile URL</h5>
                  {/* Placeholder for profile URL */}
                </div>
                <div className="mb-3">
                  <h5>Signature URL</h5>
                  {/* Placeholder for signature URL */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='HomePage'>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Enter Room Code</label>
                    <input
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        type='text'
                        required
                        placeholder='Enter Room code'
                    />
                    <button type="submit">Enter Room</button>
                </div>
            </form>
        </div>


      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">&copy; 2024 Mentorship Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Mentee;
