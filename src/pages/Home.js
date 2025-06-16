import React from 'react';

export default function Home({ user }) {
    return (
        <div className="container">
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <p>This is your dashboard.</p>
        </div>
    );
}
