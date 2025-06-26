import React from 'react';

const EstadoSolicitud = ({ solicitud, onLogout, setPaso }) => {
  if (!solicitud) return null;

  let color = '';
  if (solicitud.estado === 'aprobada') color = 'text-success';
  if (solicitud.estado === 'rechazada') color = 'text-error';

  // Función para subir solicitud
  const handlePasoSolicitud = () => {
    console.log('Ir a paso: solicitud');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = (e) => {
      const archivo = e.target.files[0];
      if (archivo) {
        console.log('Archivo de solicitud seleccionado:', archivo.name);
        // Aquí puedes agregar la lógica para subir el archivo
        // Por ejemplo: subirArchivo(archivo, 'solicitud');
        alert(`Solicitud "${archivo.name}" lista para subir`);
      }
    };
    input.click();
    setPaso('solicitud');
  };

  // Función para subir documentos
  const handlePasoDocumentos = () => {
    console.log('Ir a paso: documentos');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
    input.multiple = true;
    input.onchange = (e) => {
      const archivos = Array.from(e.target.files);
      if (archivos.length > 0) {
        console.log('Documentos seleccionados:', archivos.map(a => a.name));
        // Aquí puedes agregar la lógica para subir los archivos
        // Por ejemplo: subirArchivos(archivos, 'documentos');
        alert(`${archivos.length} documento(s) listos para subir`);
      }
    };
    input.click();
    setPaso('documentos');
  };

  return (
    <div className="estado-container">
      <div className="background2" />
      <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>

      <div className="glass-panel">
        <h2 className="text-center">Estado de tu solicitud</h2>
        <p className={`mb-1 ${color}`}><b>Estado:</b> {solicitud.estado}</p>

        {solicitud.estado === 'rechazada' && solicitud.motivo_rechazo && (
          <p className="text-error mb-1">Motivo de rechazo: {solicitud.motivo_rechazo}</p>
        )}

        {solicitud.estado === 'aprobada' && (
          <p className="text-success mb-1">¡Tu solicitud fue aprobada! Continúa con el siguiente paso.</p>
        )}

        {solicitud.estado === 'pendiente' && (
          <p className="mb-1 text-yellow-600">Tu solicitud está en revisión.</p>
        )}

        <div className="btn-group mt-4 flex justify-center gap-4">
          <button
            type="button"
            className="btn"
            onClick={handlePasoSolicitud}
          >
            Subir Solicitud
          </button>

          <button
            type="button"
            className="btn"
            onClick={handlePasoDocumentos}
          >
            Subir Documentos
          </button>
        </div>
      </div>
    </div>
  );
};

export default EstadoSolicitud;