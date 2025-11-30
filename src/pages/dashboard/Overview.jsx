import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUmbrella,
  FaUsers,
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaClock,
} from 'react-icons/fa';
import prenotazioniAPI from '../../api/prenotazioni';
import ombrelloniAPI from '../../api/ombrelloni';

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentPrenotazioni, setRecentPrenotazioni] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, ombrelloniStats, prenotazioni] = await Promise.all([
        prenotazioniAPI.getStats(),
        ombrelloniAPI.getStats(),
        prenotazioniAPI.getAll({ limit: 5 }),
      ]);

      setStats({
        ...statsData,
        totalOmbrelloni: ombrelloniStats.totalOmbrelloni,
        ombrelloniAttivi: ombrelloniStats.ombrelloniAttivi,
      });
      setRecentPrenotazioni(prenotazioni.slice(0, 5));
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Prenotazioni Attive',
      value: stats?.confirmed || 0,
      icon: FaCalendarAlt,
      color: 'bg-blue-500',
      trend: '+12%',
      isPositive: true,
    },
    {
      title: 'Ombrelloni',
      value: `${stats?.ombrelloniAttivi}/${stats?.totalOmbrelloni}`,
      icon: FaUmbrella,
      color: 'bg-green-500',
      subtitle: 'Attivi',
    },
    {
      title: 'Revenue Totale',
      value: `€${stats?.totalRevenue || 0}`,
      icon: FaEuroSign,
      color: 'bg-purple-500',
      trend: '+8%',
      isPositive: true,
    },
    {
      title: 'In Attesa',
      value: stats?.pending || 0,
      icon: FaClock,
      color: 'bg-orange-500',
      subtitle: 'Da confermare',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Panoramica
        </h1>
        <p className="text-gray-600 mt-1">
          Benvenuto nel pannello di gestione
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white text-xl" />
                </div>
                {card.trend && (
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    card.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                    {card.trend}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </h3>
              <p className="text-sm text-gray-600">{card.title}</p>
              {card.subtitle && (
                <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Recent Prenotazioni */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Prenotazioni Recenti
          </h3>
          <Link
            to="/dashboard/prenotazioni"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Vedi tutte →
          </Link>
        </div>

        {recentPrenotazioni.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            Nessuna prenotazione recente
          </p>
        ) : (
          <div className="space-y-4">
            {recentPrenotazioni.map((prenotazione) => (
              <div
                key={prenotazione.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900">
                      Ombrellone #{prenotazione.ombrelloneNumero || 'N/A'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prenotazione.stato === 'PAID'
                        ? 'bg-green-100 text-green-700'
                        : prenotazione.stato === 'CONFIRMED'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {prenotazione.statoDescrizione}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {prenotazione.dataInizio} - {prenotazione.dataFine}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    €{prenotazione.prezzoTotale}
                  </p>
                  <p className="text-xs text-gray-500">
                    {prenotazione.codicePrenotazione}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/prenotazioni"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition"
        >
          <FaCalendarAlt className="text-3xl mb-3" />
          <h4 className="font-bold text-lg mb-1">Gestisci Prenotazioni</h4>
          <p className="text-blue-100 text-sm">
            Conferma, modifica o cancella prenotazioni
          </p>
        </Link>

        <Link
          to="/dashboard/ombrelloni"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition"
        >
          <FaUmbrella className="text-3xl mb-3" />
          <h4 className="font-bold text-lg mb-1">Ombrelloni</h4>
          <p className="text-green-100 text-sm">
            Gestisci la mappa e la disponibilità
          </p>
        </Link>

        <Link
          to="/dashboard/clienti"
          className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition"
        >
          <FaUsers className="text-3xl mb-3" />
          <h4 className="font-bold text-lg mb-1">Clienti</h4>
          <p className="text-purple-100 text-sm">
            Visualizza e gestisci i tuoi clienti
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Overview;