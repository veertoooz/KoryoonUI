export const LoadingScreen = () => {
  return (
    <div
      className="koryoon-fullscreen koryoon-flex-center koryoon-text-center"
      style={{ background: '#000' }}
    >
      <div>
        <div className="koryoon-spinner" style={{ margin: '0 auto 1rem' }} />
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '1rem' }}>
          Loading 3D experience...
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
          Optimized for GeForce 210
        </p>
      </div>
    </div>
  );
};
