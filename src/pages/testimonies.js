import React, { useState } from 'react';
import sampleImage from '../assets/image.png';
import SunsetImage from '../assets/sunset_alone.jpg';
import AnswerPrayerImage from '../assets/3rdone.jpg';
import DuckImage from '../assets/duck.jpg';
import '../style/style.css';
import '../style/events.css';

const sampleTestimonies = [
    {
        id: 1,
        title: 'Healing through Faith',
        author: 'Anna Cramling',
        time: '1h ago',
        description: 'I was broken, carrying wounds that seemed impossible to heal. But when I turned to God through Jesus, His love embraced me, bringing healing to my heart and body. Today, I stand restored, a testament to His faithfulness.',
        image: sampleImage,
    },
    { id: 2, title: 'My First Testimony', author: 'John Doe', time: '10m ago', description: 'I prayed and asked Jesus into my heart, and from that moment, my life changed. I felt a sense of peace and joy that I had never experienced before. My insecurities started to fade, and I began to see the world with a new perspective. I discovered that I was loved and accepted, not for my accomplishments, but for who I am in Christ.', image: SunsetImage },
    { id: 3, title: 'Answered Prayers', author: 'Jane Smith', time: '2h ago', description: ' I was initially skeptical, but I decided to give it a try. I started attending church and reading the Bible, and I gradually began to understand the truth about Jesus', image: AnswerPrayerImage },
    { id: 4, title: 'Community Support', author: 'Michael B.', time: 'Posted', description: 'Before I met Jesus, I felt lost and empty. I tried to find happiness in material things and relationships, but nothing filled the void inside. My life was characterized by a lack of purpose and a deep sense of insecurity. ', image: DuckImage },
];

function Testimonies() {
    // State for all testimonies
    const [testimonies, setTestimonies] = useState(sampleTestimonies);
    // Toggle between all and personal view
    const [ownView, setOwnView] = useState(false);
    // Confirmation dialog state
    const [confirm, setConfirm] = useState({ show: false, id: null });
    const [selected, setSelected] = useState(null);

    return (
        <div className="App account-page">
            <div className="account-container">
                <div
                    className="events-header"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        marginBottom: '24px',
                    }}
                >
                    <button
                        className="button_blue"
                        style={{ position: 'absolute', left: 0 }}
                        onClick={() => setOwnView(true)}
                    >
                        View your posts
                    </button>
                    <h1 style={{ margin: '0 auto' }}>
                        {ownView ? 'Your Testimonies' : 'Testimonies'}
                    </h1>
                    <button
                        className="button_blue"
                        style={{ position: 'absolute', right: 0 }}
                        onClick={() => window.location.href = '/submit-testimony'}
                    >
                        + Add Testimony
                    </button>
                </div>
                <div style={{ height: '24px' }} />
                <div className="testimonies-list">
                    {testimonies.map(({ id, title, author, time, description, image }) => (
                        <div
                            key={id}
                            className="card event-card"
                            onClick={() => setSelected({ id, title, author, time, description, image })}
                            style={{ cursor: 'pointer' }}
                        >
                            <h3>{title}</h3>
                            <p className="events-body-grey">{author}</p>
                            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="status">{time}</span>
                                {ownView && (
                                    <button
                                        className="delete-icon"
                                        style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', fontSize: '1.5rem' }}
                                        onClick={(e) => { e.stopPropagation(); setConfirm({ show: true, id }); }}
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {confirm.show && (
                    <div className="confirmation-overlay">
                        <div className="confirmation-popup">
                            <p>
                                This cannot be retrieved once it has been deleted.<br />
                                <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                  Are you sure you want to delete?
                </span>
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                                <button
                                    className="button_blue"
                                    onClick={() => setConfirm({ show: false, id: null })}
                                >
                                    No
                                </button>
                                <button
                                    className="button_red"
                                    onClick={() => {
                                        setTestimonies(testimonies.filter(t => t.id !== confirm.id));
                                        setConfirm({ show: false, id: null });
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {selected && (
                    <div className="confirmation-overlay">
                        <div
                            className="confirmation-popup large"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '24px',
                                alignItems: 'flex-start',
                                width: '80%',
                                maxWidth: '800px',
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <button
                                    className="close-btn large-x"
                                    onClick={() => setSelected(null)}
                                >
                                    ✖
                                </button>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{selected.title}</h3>
                                <p style={{ margin: '16px 0' }}>{selected.description}</p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <img
                                    src={selected.image}
                                    alt={selected.title}
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Testimonies;
