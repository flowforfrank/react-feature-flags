import React from 'react';
import Feature from './Feature';
import Banner from './Banner';

import './css/styles.css';

const initFeatures = () => {
    if (!localStorage.getItem('flags')) {
        localStorage.setItem('flags', JSON.stringify([
            { name: 'banner', description: 'Banner shown on top of the page', active: false },
            { name: 'info-message', description: 'Enhance info message with icon and link', active: true },
            { name: 'New block', description: 'New block added on page', active: false }
        ]));
    }
};

const App = () => {
    initFeatures();

    const infoMessage = (
        <span className="message">Check out our latest updates in our repo</span>
    )

    return (
        <div className="App">
            <Feature name="banner">
                <Banner />
            </Feature>

            <main className="content">
                <Feature name="info-message" fallback={infoMessage}>
                    <span className="message">📦 Check out the latest updates in our <a href="https://github.com/flowforfrank/d3-treemap/pull/1/files">repo</a></span>
                </Feature>
            </main>
        </div>
    );
};

export default App;
