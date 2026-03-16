import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { X, Calendar as CalendarIcon, User, Heart, FileText, Phone } from 'lucide-react';
import dayjs from 'dayjs';

const BirthdayModal = ({ isOpen, onClose, user, editData, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    relationship: '',
    eventType: 'Birthday',
    phoneNumber: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        dateOfBirth: dayjs(editData.dateOfBirth).format('YYYY-MM-DD'),
        relationship: editData.relationship,
        eventType: editData.eventType || 'Birthday',
        phoneNumber: editData.phoneNumber || '',
        notes: editData.notes || '',
      });
    } else {
      setFormData({ name: '', dateOfBirth: '', relationship: '', eventType: 'Birthday', phoneNumber: '', notes: '' });
    }
  }, [editData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editData?._id) {
        await api.put(`/birthdays/${editData._id}`, formData, config);
        toast.success('Event updated');
      } else {
        await api.post('/birthdays', formData, config);
        toast.success('Event added');
      }
      onRefresh();
      onClose();
    } catch (error) {
      toast.error('Error saving event');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            {editData ? 'Edit Event' : 'Add New Event'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="E.g. John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Event Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Relationship</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Heart className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none bg-white font-medium"
                  required
                >
                  <option value="" disabled>Select relation</option>
                  <option value="Family">👨‍👩‍👧 Family</option>
                  <option value="Friend">🤝 Friend</option>
                  <option value="Colleague">💼 Colleague</option>
                  <option value="Partner">💖 Partner</option>
                  <option value="Other">✨ Other</option>
                </select>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  placeholder="E.g. +91 9876543210"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type of Event</label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { value: 'Birthday', label: 'Birthday', emoji: '🎂' },
                  { value: 'Wedding', label: 'Wedding', emoji: '💍' },
                  { value: 'Loverdays', label: 'Anniversary', emoji: '❤️' },
                  { value: 'Special Day', label: 'Special', emoji: '✨' },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, eventType: type.value })}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
                      formData.eventType === type.value
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    <span className="text-2xl mb-1">{type.emoji}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Notes (Optional)</label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none h-20 resize-none transition-all"
                  placeholder="Gift ideas, preferences..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
            >
              {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {editData ? 'Update Birthday' : 'Save Birthday'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BirthdayModal;
