import './Loader.css';

export default function Loader({ fullscreen = false, text = 'Loading...' }) {
  const content = (
    <div className="loader-container">
      <div className="loader-orbit">
        <div className="loader-ring loader-ring--outer" />
        <div className="loader-ring loader-ring--inner" />
        <div className="loader-core" />
      </div>
      {text && <span className="loader-text">{text}</span>}
    </div>
  );

  if (fullscreen) {
    return <div className="loader-fullscreen">{content}</div>;
  }

  return <div className="loader-inline">{content}</div>;
}
