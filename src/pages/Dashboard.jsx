import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2, Calendar as CalendarIcon, MessageCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
import BirthdayModal from '../components/BirthdayModal';
import dayjs from 'dayjs';

const Dashboard = ({ user, setUser }) => {
  const [birthdays, setBirthdays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [syncing, setSyncing] = useState(false);
  
  const fetchBirthdays = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await api.get('/birthdays', config);
      setBirthdays(data);
    } catch (error) {
      toast.error('Failed to fetch birthdays');
    }
  };

  useEffect(() => {
    if (user) fetchBirthdays();
    
    // Check for google success redirect
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('google') === 'success') {
      toast.success('Successfully connected to Google Calendar!');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);

  const handleSyncAll = async () => {
    if (!user.googleConnected) {
      return toast.error('Please connect Google Calendar in Profile first');
    }

    setSyncing(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.post('/birthdays/sync', {}, config);
      toast.success('All events synced to Google Calendar!');
    } catch (error) {
      toast.error('Sync failed. Check connection.');
    } finally {
      setSyncing(false);
    }
  };

  const handleEdit = (b) => {
    setEditData(b);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this birthday?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await api.delete(`/birthdays/${id}`, config);
      toast.success('Birthday deleted');
      fetchBirthdays();
    } catch (error) {
      toast.error('Error deleting birthday');
    }
  };

  const addToGoogleCalendar = (b) => {
    const details = b.notes || 'Send birthday wishes!';
    const start = dayjs(b.dateOfBirth).year(dayjs().year()).format('YYYYMMDD');
    const end = dayjs(b.dateOfBirth).year(dayjs().year()).add(1, 'day').format('YYYYMMDD');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(b.name + "'s Birthday")}&dates=${start}/${end}&details=${encodeURIComponent(details)}&recur=RRULE:FREQ=YEARLY`;
    window.open(url, '_blank');
  };

  const calculateAge = (dob) => {
    return dayjs().diff(dayjs(dob), 'year');
  };

  const getDaysUntil = (dob) => {
    const today = dayjs().startOf('day');
    const bdayThisYear = dayjs(dob).year(today.year()).startOf('day');
    const nextBday = bdayThisYear.isBefore(today) ? bdayThisYear.add(1, 'year') : bdayThisYear;
    return nextBday.diff(today, 'day');
  };

  const getEmoji = (type) => {
    switch (type) {
      case 'Wedding': return '💍';
      case 'Loverdays': return '❤️';
      case 'Special Day': return '✨';
      default: return '🎂';
    }
  };

  const sortedBirthdays = [...birthdays]
    .filter(b => getDaysUntil(b.dateOfBirth) <= 10)
    .sort((a, b) => {
      return getDaysUntil(a.dateOfBirth) - getDaysUntil(b.dateOfBirth);
    });

  return (
    <Layout user={user} setUser={setUser} refreshBirthdays={fetchBirthdays}>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Immediate Events</h1>
          <p className="text-gray-500 mt-1">Special days occurring within the next 10 days.</p>
        </div>
        <div className="flex gap-3">
          {user.googleConnected && (
            <button
              onClick={handleSyncAll}
              disabled={syncing}
              className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
            >
              <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4" />
              {syncing ? 'Syncing...' : 'Sync All'}
            </button>
          )}
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all flex items-center gap-2 max-w-fit"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
      </div>

      {sortedBirthdays.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <CalendarIcon className="w-16 h-16 text-blue-100 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No immediate events</h3>
          <p className="text-gray-500 mt-1 mb-6">There are no special dates in the next 10 days. Check "All Events" to see your full list.</p>
          <a
            href="/events"
            className="text-blue-600 font-bold hover:underline"
          >
            View all saved events →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedBirthdays.map((b) => {
            const daysLeft = getDaysUntil(b.dateOfBirth);
            const emoji = getEmoji(b.eventType);
            return (
              <div key={b._id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold ${daysLeft === 0 ? 'bg-red-500 text-white animate-pulse' : daysLeft <= 7 ? 'bg-yellow-400 text-yellow-900' : 'bg-blue-100 text-blue-700'}`}>
                  {daysLeft === 0 ? 'Today!' : daysLeft === 1 ? 'Tomorrow' : `${daysLeft} days to go`}
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl bg-gray-50 h-14 w-14 rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                      {emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{b.name}</h3>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                        {b.eventType || 'Birthday'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(b)} className="text-gray-400 hover:text-blue-600 transition-colors p-1 bg-gray-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(b._id)} className="text-gray-400 hover:text-red-600 transition-colors p-1 bg-gray-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-semibold text-gray-900">{dayjs(b.dateOfBirth).format('MMMM D')}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Heart className="w-4 h-4 mr-2 text-red-400" />
                    <span className="text-gray-900">{b.relationship}</span>
                  </div>
                  <div className="text-blue-600 font-bold text-xs bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                    {b.eventType === 'Birthday' ? `TURNING ${calculateAge(b.dateOfBirth) + 1}` : 
                     b.eventType === 'Wedding' ? `${calculateAge(b.dateOfBirth) + 1} YEARS AGO` : 
                     `${calculateAge(b.dateOfBirth) + 1} YEAR ANNIVERSARY`}
                  </div>
                  {b.notes && (
                    <div className="text-gray-500 text-xs italic bg-gray-50 p-2 rounded-lg border-l-2 border-blue-400">
                      "{b.notes}"
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a 
                    href={`https://wa.me/${b.phoneNumber?.replace(/\D/g, '') || ''}?text=Happy%20${b.eventType === 'Birthday' ? 'Birthday' : b.eventType}%20${b.name}!%20Wishing%20you%20all%20the%20best.%20${emoji}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-center items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold py-2 px-3 rounded-lg transition-colors border border-green-100 px-4"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Wish
                  </a>
                  <button
                    onClick={() => addToGoogleCalendar(b)}
                    className="flex-1 flex justify-center items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2 px-3 rounded-lg transition-colors border border-blue-100 px-4"
                  >
                    <Plus className="w-4 h-4" />
                    Sync
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <BirthdayModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        user={user} 
        editData={editData}
        onRefresh={fetchBirthdays}
      />
    </Layout>
  );
};

export default Dashboard;
