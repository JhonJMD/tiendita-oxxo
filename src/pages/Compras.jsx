import React, { useState } from 'react';
import CompraForm from '../components/purchases/CompraForm';

function Compras() {
    const [compraRealizada, setCompraRealizada] = useState(false);

    const handleCompraSuccess = (compra) => {
        setCompraRealizada(true);
        // Aquí podrías mostrar un resumen de la compra o realizar otras acciones
        setTimeout(() => {
            setCompraRealizada(false);
        }, 5000); // Resetear el mensaje después de 5 segundos
    };

    return (
        <div className="compras-page">
            {compraRealizada && (
                <div className="success-message">
                    ¡Compra registrada con éxito!
                </div>
            )}
            <CompraForm onSuccess={handleCompraSuccess} />
        </div>
    );
}

export default Compras;