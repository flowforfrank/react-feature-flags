const Feature = ({ name, fallback, children }) => {
    const features = JSON.parse(localStorage.getItem('flags'));
    const feature = features.find(feature => feature.name === name);

    if (feature) {
        if (feature.active) {
            return children;
        }
        
        if (fallback) {
            return fallback;
        }
    }
    
    if (process.env.NODE_ENV === 'development' && !feature) {
        const alertStyles = {
            display: 'block',
            background: '#f39c12',
            padding: '10px',
            borderRadius: '3px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif'
        };

        const featureNameStyles = {
            background: '#2c3e50',
            padding: '5px 10px',
            borderRadius: '5px',
            color: '#FFF',
        };

        console.error(`There is no feature named "${name}"\nAvailable features are:\n${features.map(feature => `• ${feature.name}`).join('\n')}`);

        return (
            <span style={alertStyles}>
                No feature named <code style={featureNameStyles}>{name}</code>
            </span>
        );
    }

    return null;
};

export default Feature;