import './Loader.css';

export default function Loader({ fullscreen = false, text = 'Loading...' }) {
  if (fullscreen) {
    return (
      <div className="loader-fullscreen">
        <div className="loader-wrap">
          <div className="loader-spinner" />
          <span className="loader-text">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="loader-inline">
      <div className="loader-spinner" />
      <span className="loader-text">{text}</span>
    </div>
  );
}
