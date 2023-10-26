import './AlertPanel.css';

export default function AlertPanel({
  onClose,
  children
}) {
  return (
    <div className="AlertPanel">
      <div>
        {children}
      </div>
      <button onClick={onClose}>✖</button>
    </div>
  );
}
