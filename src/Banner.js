import React from 'react';

let cssImported = false;

const Banner = () => {
    // Make sure you dynamic import CSS to avoid unnecessary styles if the feature is not rendered
    if (!cssImported) {
        import('./css/banner.css');
        cssImported = true;
    }

    return <div className="banner">
        Improve your site’s performance with
        <strong className="banner-strong">
            <a href="https://github.com/flowforfrank/performance-checklist">Performance checklist</a>
        </strong>
    </div>
};

export default Banner;