import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClipViewer from './components/ClipViewer';
import './index.css'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/clips/:channel" element={<ClipViewer />} />
                <Route path="/" element={<div className="text-white bg-black h-screen flex items-center justify-center font-bold text-4xl">¡Bienvenido Twitch Clips donde podes obtener el embed de twitch! <br />
                    Use /clips/:channel to view a clip.</div>} />
            </Routes>
        </Router>
    );
}

export default App;
