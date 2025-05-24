import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/style.css';
import '../style/events.css'; // reuse existing styles or create submitTestimony.css
import '../style/submitTestimonies.css';

function SubmitTestimony() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: send data to API
        navigate('/testimonies');
    };

    return (
        <div className="App account-page">
            <div className="account-container">
                <div
                    className="events-header"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        marginBottom: '24px'
                    }}
                >
                    <button
                        className="button_blue"
                        style={{ position: 'absolute', left: 0 }}
                        onClick={() => navigate(-1)}
                    >
                        ←
                    </button>
                    <h1 style={{ margin: '0 auto' }}>Submit Testimonies</h1>
                </div>
                <form onSubmit={handleSubmit} className="submit-form">
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            id="title"
                            className="login-input"
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="login-input"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={6}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">File:</label>
                        <input
                            id="file"
                            type="file"
                            accept=".pdf,.docx,.jpeg,.jpg,.png"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <p className="help-text">
                            *file supported: .pdf, .docx, .jpeg, .jpg, .png
                        </p>
                    </div>

                    <div className="form-actions">
                        <button className="button_blue" type="submit">
                            Post
                        </button>
                    </div>

                    <p className="small-text">
                        Your post will be reviewed by a moderator before it is made public to everyone.
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SubmitTestimony;