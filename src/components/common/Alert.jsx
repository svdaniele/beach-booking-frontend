const Alert = ({ type = 'info', title, message, onClose }) => {
  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✓'
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕'
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠'
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ'
    }
  };

  const config = types[type];

  return (
    <div className={`${config.bg} border ${config.border} ${config.text} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{config.icon}</span>
        <div className="flex-1">
          {title && <h4 className="font-bold mb-1">{title}</h4>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg hover:opacity-70"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;