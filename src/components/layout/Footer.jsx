import React from 'react';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            © {year} OXXO. Todos los derechos reservados.
        </footer>
    );
}

export default Footer;