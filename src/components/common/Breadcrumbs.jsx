import React from 'react';
import { FaHome, FaChevronRight } from 'react-icons/fa';

function Breadcrumbs({ items = [], onNavigate }) {
    return (
        <div className="breadcrumbs">
            <div
                className="breadcrumb-item"
                onClick={() => onNavigate('inicio')}
            >
                <FaHome />
                <span>Inicio</span>
            </div>

            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="breadcrumb-separator">
                        <FaChevronRight />
                    </div>
                    <div
                        className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
                        onClick={() => item.path && onNavigate(item.path)}
                    >
                        {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                        <span>{item.label}</span>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

export default Breadcrumbs;