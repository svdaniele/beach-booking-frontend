import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaCheck } from 'react-icons/fa';
import { format, addDays } from 'date-fns';
import MappaOmbrelloni from '../../components/booking/MappaOmbrelloni';
import BookingForm from '../../components/booking/BookingForm';
import prenotazioniAPI from '../../api/prenotazioni';
import useAuthStore from '../../store/authStore';

const BookingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const [step, setStep] = useState(1); // 1: Date, 2: Mappa, 3: Form, 4: Success
  const [dateRange, setDateRange] = useState({
    dataInizio: format(new Date(), 'yyyy-MM-dd'),
    dataFine: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
  });
  const [disponibili, setDisponibili] = useState([]);
  const [selectedOmbrellone, setSelectedOmbrellone] = useState(null);
  const [prenotazione, setPrenotazione] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 2) {
      loadDisponibili();
    }
  }, [step, dateRange]);

  const loadDisponibili = async () => {
    setLoading(true);
    try {
      const data = await prenotazioniAPI.getDisponibili(
        dateRange.dataInizio,
        dateRange.dataFine
      );
      setDisponibili(data);
    } catch (error) {
      console.error('Error loading disponibili:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login?redirect=/booking');
      return;
    }
    setStep(2);
  };

  const handleSelectOmbrellone = (ombrellone) => {
    setSelectedOmbrellone(ombrellone);
    setStep(3);
  };

  const handleBookingSuccess = (data) => {
    setPrenotazione(data);
    setStep(4);
  };

  const handleBackToMap = () => {
    setSelectedOmbrellone(null);
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedOmbrellone(null);
    setPrenotazione(null);
    setDateRange({
      dataInizio: format(new Date(), 'yyyy-MM-dd'),
      dataFine: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-sand-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((s, idx) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                    s < step
                      ? 'bg-green-500 text-white'
                      : s === step
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {s < step ? <FaCheck /> : s}
                </div>
                {idx < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 transition ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-32">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm text-gray-600">Ombrellone</span>
            <span className="text-sm text-gray-600">Conferma</span>
            <span className="text-sm text-gray-600">Completato</span>
          </div>
        </div>

        {/* Step 1: Selezione Date */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="text-center mb-8">
                <FaCalendar className="text-5xl text-primary-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Quando vuoi venire?
                </h2>
                <p className="text-gray-600">
                  Seleziona le date del tuo soggiorno
                </p>
              </div>

              <form onSubmit={handleDateSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Inizio
                    </label>
                    <input
                      type="date"
                      value={dateRange.dataInizio}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, dataInizio: e.target.value })
                      }
                      min={format(new Date(), 'yyyy-MM-dd')}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Fine
                    </label>
                    <input
                      type="date"
                      value={dateRange.dataFine}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, dataFine: e.target.value })
                      }
                      min={dateRange.dataInizio}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary-600 text-white rounded-lg font-medium text-lg hover:bg-primary-700 transition"
                >
                  Cerca Ombrelloni Disponibili
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Step 2: Mappa Ombrelloni */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="mb-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  ← Cambia Date
                </button>
                <MappaOmbrelloni
                  disponibili={disponibili}
                  onSelectOmbrellone={handleSelectOmbrellone}
                  selectedOmbrellone={selectedOmbrellone}
                />
              </>
            )}
          </motion.div>
        )}

        {/* Step 3: Form Prenotazione */}
        {step === 3 && selectedOmbrellone && (
          <BookingForm
            ombrellone={selectedOmbrellone}
            onSuccess={handleBookingSuccess}
            onCancel={handleBackToMap}
          />
        )}

        {/* Step 4: Conferma */}
        {step === 4 && prenotazione && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Prenotazione Confermata!
                </h2>
                <p className="text-gray-600">
                  La tua prenotazione è stata registrata con successo
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-bold text-lg mb-4">Dettagli Prenotazione</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Codice:</strong> {prenotazione.codicePrenotazione}
                  </p>
                  <p>
                    <strong>Ombrellone:</strong> N° {prenotazione.ombrelloneNumero}
                  </p>
                  <p>
                    <strong>Dal:</strong> {prenotazione.dataInizio}
                  </p>
                  <p>
                    <strong>Al:</strong> {prenotazione.dataFine}
                  </p>
                  <p>
                    <strong>Totale:</strong> € {prenotazione.prezzoTotale}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard/prenotazioni')}
                  className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
                >
                  Vai alle Mie Prenotazioni
                </button>
                <button
                  onClick={handleReset}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                >
                  Nuova Prenotazione
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;