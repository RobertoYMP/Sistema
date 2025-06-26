import React, { useState } from 'react';

const SubirDocumentos = ({ id_solicitud }) => {
  const [horario, setHorario] = useState(null);
  const [credencial, setCredencial] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, tipo) => {
    if (tipo === 'horario') setHorario(e.target.files[0]);
    if (tipo === 'credencial') setCredencial(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!horario || !credencial) {
      setError('Debes seleccionar ambos archivos PDF.');
      setLoading(false);
      return;
    }

    try {
      const formDataHorario = new FormData();
      formDataHorario.append('archivo', horario);
      formDataHorario.append('id_solicitud', id_solicitud);
      formDataHorario.append('tipo', 'comprobante horario');
      const resHorario = await fetch('http://localhost:3001/documentos', {
        method: 'POST',
        body: formDataHorario
      });
      if (!resHorario.ok) throw new Error('Error al subir comprobante de horario');

      const formDataCredencial = new FormData();
      formDataCredencial.append('archivo', credencial);
      formDataCredencial.append('id_solicitud', id_solicitud);
      formDataCredencial.append('tipo', 'credencial vigente');
      const resCredencial = await fetch('http://localhost:3001/documentos', {
        method: 'POST',
        body: formDataCredencial
      });
      if (!resCredencial.ok) throw new Error('Error al subir credencial escolar');

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error al subir documentos');
    }

    setLoading(false);
  };

  return (
    <div className="form-bg">
      <form onSubmit={handleSubmit} className="card-form">
        <h3 className="form-title">Subir Documentos</h3>

        {success && <div className="form-success">¡Documentos subidos correctamente!</div>}
        {error && <div className="form-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Comprobante de horario vigente (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => handleFileChange(e, 'horario')}
            className="form-input"
          />
        </div>

        <div className="form-group mb-2">
          <label className="form-label">Credencial escolar vigente (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => handleFileChange(e, 'credencial')}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn btn-blue w-full" disabled={loading}>
          {loading ? 'Subiendo...' : 'Subir documentos'}
        </button>
      </form>
    </div>
  );
};

export default SubirDocumentos;
