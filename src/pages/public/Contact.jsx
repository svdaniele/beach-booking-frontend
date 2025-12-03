import { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nome: '', email: '', telefono: '', messaggio: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contattaci</h1>
          <p className="text-xl opacity-90">
            Siamo qui per aiutarti. Scrivici per qualsiasi domanda o richiesta
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Informazioni di Contatto</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                    📧
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p className="text-gray-600">info@beachbooking.it</p>
                    <p className="text-gray-600">support@beachbooking.it</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Telefono</h3>
                    <p className="text-gray-600">+39 081 123 4567</p>
                    <p className="text-sm text-gray-500">Lun-Ven: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Sede</h3>
                    <p className="text-gray-600">Via del Mare 123</p>
                    <p className="text-gray-600">80100 Napoli, Italia</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Social Media</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200">
                        📘
                      </a>
                      <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200">
                        📷
                      </a>
                      <a href="#" className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center hover:bg-primary-200">
                        🐦
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold mb-2">💡 Domande Frequenti</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Prima di contattarci, consulta le nostre FAQ per trovare risposte immediate
                </p>
                <a href="/faq" className="text-primary-600 font-semibold text-sm hover:text-primary-700">
                  Vai alle FAQ →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Inviaci un Messaggio</h2>
              
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3">✓</div>
                  <h3 className="font-bold text-green-800 mb-2">Messaggio Inviato!</h3>
                  <p className="text-green-700">Ti risponderemo al più presto</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nome *</label>
                    <input
                      type="text"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Telefono</label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Messaggio *</label>
                    <textarea
                      value={formData.messaggio}
                      onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                      rows={6}
                      required
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-semibold"
                  >
                    Invia Messaggio
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;