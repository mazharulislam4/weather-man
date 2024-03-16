import "./initialLoader.css";


function InitialLoader() {
  return (
    <div className="initial-loader">
      <div className="loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-text"></div>
      </div>
    </div>
  );
}

export default InitialLoader