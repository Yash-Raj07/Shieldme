import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getJournals } from "../../services/JournalService";
import JournalCard from "./JournalCard.jsx";
import JournalEditor from "./JournalEditor.jsx";
import "./Journal.css";

const Journal = () => {
    const [journals, setJournals] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Fetch all journals when the component mounts
        const fetchJournals = async () => {
            const data = await getJournals();
            setJournals(data);
        };
        fetchJournals();
    }, []);

    return (
        <>
            <h1>All your Journals</h1>

            <section>
                {/* Add More Contact Button */}
                <button className="write-journal-btn" onClick={() => setShowPopup(true)}>
                    Write Journal
                </button>

                {/* Popup Form */}
                {showPopup && (
                    <div className="popup-container">
                        <div className="popup-overlay" onClick={() => setShowPopup(false)}></div> {/* Close popup when overlay is clicked */}
                        <div className="popup-content">
                            <JournalEditor closePopup={() => setShowPopup(false)} />
                        </div>
                    </div>
                )}
            </section>

            {/* Displaying the fetched journals */}
            <div id="journal-list-container">
                {journals.map((journal) => (
                    <Link key={journal.id} to={`/journal/${journal.id}`} className="journal-link">
                        <JournalCard
                            journalbanner={journal.journalbanner}
                            journaltitle={journal.title}
                            journalbody={journal.content}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Journal;
