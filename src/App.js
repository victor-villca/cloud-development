import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';

function App() {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setCheckingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    if (checkingAuth) return <div>Loading...</div>;

    return (
        <Router>
            {user && <Navbar user={user} />}
            <Routes>
                <Route
                    path="/login"
                    element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                    path="/"
                    element={
                        user ? <Home user={user} /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/settings"
                    element={
                        user ? (
                            <Settings user={user} />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;