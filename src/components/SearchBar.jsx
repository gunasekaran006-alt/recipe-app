import VoiceSearch from './VoiceSearch';

function SearchBar({ search, setSearch }) {
    return (
        <div className="input-group mb-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
            <input
                type="text"
                className="form-control form-control-lg border-0"
                placeholder="Search for biryani, pizza, veg..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ boxShadow: 'none' }}
            />
            <VoiceSearch onResult={(text) => setSearch(text)} />
        </div>
    );
}

export default SearchBar;