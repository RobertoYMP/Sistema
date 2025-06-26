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

  const handleSubirSolicitud = () => {
    // Puedes definir aquí qué debe hacer este botón
    alert('Subir Solicitud (aún no implementado)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative">
      <div className="pt-20 pb-8 px-4 flex flex-col items-center min-h-screen">

        {/* Estado de la solicitud */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 text-center w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Estado de tu solicitud</h2>
          <div className="mb-2">
            <span className="text-gray-600 text-sm">Estado: </span>
            <span className="text-orange-500 font-semibold">pendiente</span>
          </div>
          <p className="text-orange-500 text-sm">Tu solicitud está en revisión.</p>
        </div>

        {/* Formulario con onSubmit */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Subir Documentos</h3>
          </div>

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              ¡Documentos subidos correctamente!
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Comprobante de horario vigente (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange(e, 'horario')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Credencial escolar vigente (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={e => handleFileChange(e, 'credencial')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <button
              type="button" // Importante: que NO sea submit
              onClick={handleSubirSolicitud}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
            >
              Subir Solicitud
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Subiendo...' : 'Subir Documentos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubirDocumentos;
