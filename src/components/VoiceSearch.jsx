function VoiceSearch({ onResult }) {
    const handleVoiceSearch = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.start();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
        };
    };

    return (
        <button className="btn btn-primary" onClick={handleVoiceSearch}>
            🎤 Voice Search
        </button>
    );
}

export default VoiceSearch;