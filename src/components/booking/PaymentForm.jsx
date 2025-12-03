import { useState } from 'react';

const PaymentForm = ({ amount, onSubmit, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('CARTA');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        metodoPagamento: paymentMethod,
        importo: amount,
        ...formData
      });
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold mb-6">Metodo di Pagamento</h3>

      {/* Payment Method Selection */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {[
          { value: 'CARTA', label: 'Carta di Credito', icon: '💳' },
          { value: 'BONIFICO', label: 'Bonifico', icon: '🏦' },
          { value: 'CONTANTI', label: 'Contanti', icon: '💵' }
        ].map((method) => (
          <button
            key={method.value}
            onClick={() => setPaymentMethod(method.value)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === method.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300'
            }`}
          >
            <div className="text-3xl mb-2">{method.icon}</div>
            <p className="font-semibold">{method.label}</p>
          </button>
        ))}
      </div>

      {/* Card Form */}
      {paymentMethod === 'CARTA' && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Numero Carta</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nome Titolare</label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              placeholder="MARIO ROSSI"
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Scadenza</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                placeholder="MM/AA"
                maxLength={5}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                placeholder="123"
                maxLength={3}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bonifico Info */}
      {paymentMethod === 'BONIFICO' && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="font-semibold mb-2">Coordinate Bancarie:</p>
          <div className="space-y-1 text-sm">
            <p><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</p>
            <p><strong>Intestatario:</strong> Beach Booking SRL</p>
            <p><strong>Causale:</strong> Prenotazione #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
      )}

      {/* Contanti Info */}
      {paymentMethod === 'CONTANTI' && (
        <div className="bg-yellow-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            💵 Il pagamento in contanti dovrà essere effettuato direttamente presso lo stabilimento
          </p>
        </div>
      )}

      {/* Total */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Totale da pagare</span>
          <span className="text-2xl font-bold text-primary-600">€{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold disabled:opacity-50"
        >
          {loading ? 'Elaborazione...' : 'Conferma Pagamento'}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-3 border rounded-lg hover:bg-gray-50"
          >
            Annulla
          </button>
        )}
      </div>

      {/* Security Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>🔒</span>
        <span>Pagamento sicuro SSL certificato</span>
      </div>
    </div>
  );
};

export default PaymentForm;