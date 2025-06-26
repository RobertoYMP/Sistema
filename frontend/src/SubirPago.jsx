import React, { useState } from 'react';

const SubirPago = ({ id_solicitud, token }) => {
  const [comprobante, setComprobante] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setComprobante(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      if (!comprobante) throw new Error('Selecciona un archivo');
      if (!id_solicitud) throw new Error('No se encontró id_solicitud');

      const formData = new FormData();
      formData.append('comprobante', comprobante);
      formData.append('id_solicitud', id_solicitud);

      const res = await fetch('http://localhost:3001/pagos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al subir comprobante de pago');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al subir comprobante de pago');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="background" />
      <div className="login-glass">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-2">Subir Comprobante de Pago</h2>

          {success && <div className="text-success mb-1">¡Comprobante subido correctamente!</div>}
          {error && <div className="text-error mb-1">{error}</div>}

          <div className="mb-2">
            <label className="label">Comprobante (JPG, PNG o PDF)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={handleFileChange}
              className="input"
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Enviando...' : 'Subir Comprobante'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubirPago;