import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, MessageCircle, Heart, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import BirthdayModal from '../components/BirthdayModal';
import dayjs from 'dayjs';

const AllEvents = ({ user, setUser }) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const fetchEvents = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await api.get('/birthdays', config);
      setEvents(data);
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const handleEdit = (event) => {
    setEditData(event);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.delete(`/birthdays/${id}`, config);
      toast.success('Event deleted');
      fetchEvents();
    } catch (error) {
      toast.error('Error deleting event');
    }
  };

  const getEmoji = (type) => {
    switch (type) {
      case 'Wedding': return '💍';
      case 'Loverdays': return '❤️';
      case 'Special Day': return '✨';
      default: return '🎂';
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.relationship.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || event.eventType === filterType;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Layout user={user} setUser={setUser} refreshBirthdays={fetchEvents}>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
          <p className="text-gray-500 mt-1">Complete list of all your saved dates and occasions.</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 max-w-fit"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="flex-1 sm:w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold text-xs text-gray-700"
            >
              <option value="All">All Types</option>
              <option value="Birthday">🎂 Birthday</option>
              <option value="Wedding">💍 Wedding</option>
              <option value="Loverdays">❤️ Anniversary</option>
              <option value="Special Day">✨ Special</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Event & Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Relationship</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEvents.length > 0 ? filteredEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getEmoji(event.eventType)}</span>
                      <div>
                        <div className="font-bold text-gray-900">{event.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="text-blue-600 font-bold uppercase">{event.eventType || 'Birthday'}</span>
                          {event.phoneNumber && <span>• {event.phoneNumber}</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {dayjs(event.dateOfBirth).format('MMMM D, YYYY')}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                      {event.relationship}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(event)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(event._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-medium">
                    No events found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredEvents.length > 0 ? filteredEvents.map((event) => (
            <div key={event._id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getEmoji(event.eventType)}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{event.name}</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{event.eventType || 'Birthday'}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(event)} className="p-2 text-gray-400 bg-gray-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(event._id)} className="p-2 text-gray-400 bg-gray-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase">Date</p>
                  <p className="text-sm font-bold text-gray-700">{dayjs(event.dateOfBirth).format('MMM D, YYYY')}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded-xl">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase">Relationship</p>
                  <p className="text-sm font-bold text-gray-700">{event.relationship}</p>
                </div>
              </div>
              {event.phoneNumber && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-gray-500 bg-green-50/50 p-2 rounded-xl border border-green-100/50">
                  <MessageCircle className="w-3 h-3 text-green-600" />
                  {event.phoneNumber}
                </div>
              )}
            </div>
          )) : (
            <div className="p-10 text-center text-gray-500">
              No events found.
            </div>
          )}
        </div>
      </div>

      <BirthdayModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        user={user} 
        editData={editData}
        onRefresh={fetchEvents}
      />
    </Layout>
  );
};

export default AllEvents;
