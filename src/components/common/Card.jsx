const Card = ({ title, children, className = '', actions }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-md ${className}`}>
      {title && (
        <div className="px-5 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      
      <div className="p-5">
        {children}
      </div>

      {actions && (
        <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex gap-3 justify-end">
          {actions}
        </div>
      )}
    </div>
  );
};

export default Card;