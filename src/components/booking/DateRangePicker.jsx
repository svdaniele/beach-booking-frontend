import { useState } from 'react';

const DateRangePicker = ({ onDateChange }) => {
  const [dateRange, setDateRange] = useState({
    dataInizio: '',
    dataFine: ''
  });

  const handleChange = (field, value) => {
    const newRange = { ...dateRange, [field]: value };
    setDateRange(newRange);
    
    if (newRange.dataInizio && newRange.dataFine) {
      onDateChange(newRange);
    }
  };

  const getMinEndDate = () => {
    if (!dateRange.dataInizio) return '';
    const startDate = new Date(dateRange.dataInizio);
    startDate.setDate(startDate.getDate() + 1);
    return startDate.toISOString().split('T')[0];
  };

  const calculateNights = () => {
    if (!dateRange.dataInizio || !dateRange.dataFine) return 0;
    const start = new Date(dateRange.dataInizio);
    const end = new Date(dateRange.dataFine);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold mb-4">Seleziona Date</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Check-in</label>
          <input
            type="date"
            value={dateRange.dataInizio}
            onChange={(e) => handleChange('dataInizio', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Check-out</label>
          <input
            type="date"
            value={dateRange.dataFine}
            onChange={(e) => handleChange('dataFine', e.target.value)}
            min={getMinEndDate()}
            disabled={!dateRange.dataInizio}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100"
          />
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm font-medium text-primary-700">
            📅 {nights} {nights === 1 ? 'giorno' : 'giorni'} selezionati
          </p>
        </div>
      )}

      {dateRange.dataInizio && dateRange.dataFine && nights === 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg">
          <p className="text-sm font-medium text-red-700">
            ⚠️ La data di check-out deve essere successiva al check-in
          </p>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;