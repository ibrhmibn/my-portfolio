import React from "react";
export default function RetroWindow({ title, children, className = "", bodyClassName = "", status }) {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-titlebar">
        <span className="retro-dots" aria-hidden="true">
          <i className="dot dot-red" />
          <i className="dot dot-yellow" />
          <i className="dot dot-green" />
        </span>
        <span className="retro-title">{title}</span>
        <span className="retro-controls" aria-hidden="true">
          <b>_</b>
          <b>□</b>
          <b>×</b>
        </span>
      </div>
      <div className={`retro-body ${bodyClassName}`}>{children}</div>
      {status && <div className="retro-status">{status}</div>}
    </div>
  );
}