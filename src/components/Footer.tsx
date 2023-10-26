import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer>
            <p>{currentTime.toLocaleTimeString()}</p>
            {/* Contenu de votre pied de page */}
        </footer>
    );
};

export default Footer;
