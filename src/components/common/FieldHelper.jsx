import React from 'react';

function FieldHelper({ children, icon = null }) {
    return (
        <div className="field-helper">
            {icon && <span className="helper-icon">{icon}</span>}
            <span className="helper-text">{children}</span>
        </div>
    );
}

export default FieldHelper;