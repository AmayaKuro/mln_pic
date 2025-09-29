import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArtDetailPage from './Detail';
import HomePage from './HomePage';
import Introduction from './Introduction';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
                <Route path="/introduction" element={<Introduction />} />

        <Route path="/detail/:blob" element={<ArtDetailPage />} />
        {/* Fallback route for old /detail links without ID */}
        <Route path="/detail" element={<ArtDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;