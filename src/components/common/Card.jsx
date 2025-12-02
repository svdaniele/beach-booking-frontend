const Card = ({ title, children, className = '', actions }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>

      {actions && (
        <div className="px-6 py-4 border-t bg-gray-50 flex gap-3 justify-end rounded-b-xl">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;