import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, StickyNote } from 'lucide-react';
import { getMonthData, formatDate, isSameDay, isInRange, getHolidays } from '../utils/date';
import { Note, useNotes } from '../hooks/notes';
import NotesPanel from './NotesPanel';

const MONTH_IMAGES = [
  'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1086723/pexels-photo-1086723.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/931018/pexels-photo-931018.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1964471/pexels-photo-1964471.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1725264/pexels-photo-1725264.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [showNotes, setShowNotes] = useState(false);
  const { notes, addNote: addNoteToStore, deleteNote, editNote } = useNotes();

  const addNote = (note: Omit<Note, 'id'>) => {
    addNoteToStore(note);
  };

  const monthData = getMonthData(currentDate);
  const holidays = getHolidays(currentDate.getFullYear(), currentDate.getMonth());

  const handlePrevMonth = () => {
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
      setIsFlipping(false);
    }, 300);
  };

  const handleNextMonth = () => {
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
      setIsFlipping(false);
    }, 300);
  };

  const handleDateClick = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const isDateSelected = (date: Date) => {
    if (!selectedRange.start) return false;
    if (!selectedRange.end) return isSameDay(date, selectedRange.start);
    return isInRange(date, selectedRange.start, selectedRange.end);
  };

  const isStartDate = (date: Date) => {
    return selectedRange.start && isSameDay(date, selectedRange.start);
  };

  const isEndDate = (date: Date) => {
    return selectedRange.end && isSameDay(date, selectedRange.end);
  };

  const getHolidayForDate = (date: Date) => {
    return holidays.find(h => isSameDay(new Date(h.date), date));
  };

  const getNotesForDate = (date: Date) => {
    return notes.filter(note => {
      const noteDate = new Date(note.date);
      return isSameDay(noteDate, date);
    });
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const monthImage = MONTH_IMAGES[currentDate.getMonth()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-8 bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-xl shadow-lg">
              <div className="flex justify-around items-center h-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1 h-6 bg-gray-600 rounded-full" />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 lg:pt-6">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className={`relative overflow-hidden transition-all duration-300 ${isFlipping ? 'opacity-0' : 'opacity-100'}`}>
                <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden">
                  <img
                    src={monthImage}
                    alt={`${monthName} landscape`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-6 py-3 font-bold text-xl">
                    <div className="text-3xl">{year}</div>
                    <div className="text-sm uppercase tracking-wider">{monthName}</div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-b from-gray-50 to-white border-t-4 border-gray-200 space-y-4">
                  {selectedRange.start && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Note for Selected Range</h3>
                      <textarea
                        placeholder="Add a note for this date range..."
                        className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                        rows={2}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.ctrlKey && (e.target as HTMLTextAreaElement).value.trim()) {
                            const noteContent = (e.target as HTMLTextAreaElement).value.trim();
                            addNote({
                              date: selectedRange.start!.toISOString().split('T')[0],
                              title: `${formatDate(selectedRange.start!)}${selectedRange.end ? ` - ${formatDate(selectedRange.end!)}` : ''}`,
                              content: noteContent,
                            });
                            (e.target as HTMLTextAreaElement).value = '';
                          }
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-2">Press Ctrl+Enter to add note</p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <StickyNote className="w-5 h-5" />
                        Notes
                      </h3>
                      <button
                        onClick={() => setShowNotes(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Manage
                      </button>
                    </div>
                    <div className="space-y-2 max-h-24 overflow-y-auto">
                      {notes.length === 0 ? (
                        <p className="text-gray-400 italic text-sm">No notes yet. Select a date range and add one above.</p>
                      ) : (
                        notes.slice(0, 2).map(note => (
                          <div key={note.id} className="text-sm text-gray-600 border-l-2 border-blue-400 pl-2">
                            {note.title && <div className="font-semibold text-xs text-gray-800 mb-0.5">{note.title}</div>}
                            <div className="truncate">{note.content}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    disabled={isFlipping}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <CalendarIcon className="w-6 h-6" />
                    {monthName} {year}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    disabled={isFlipping}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className={`transition-all duration-300 ${isFlipping ? `opacity-0 ${flipDirection === 'next' ? 'rotate-y-90' : '-rotate-y-90'}` : 'opacity-100'}`}>
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {monthData.map((date, index) => {
                      const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                      const isToday = isSameDay(date, new Date());
                      const isSelected = isDateSelected(date);
                      const isStart = isStartDate(date);
                      const isEnd = isEndDate(date);
                      const holiday = getHolidayForDate(date);
                      const dayNotes = getNotesForDate(date);

                      return (
                        <button
                          key={index}
                          onClick={() => isCurrentMonth && handleDateClick(date)}
                          disabled={!isCurrentMonth}
                          className={`
                            relative aspect-square p-2 rounded-lg text-sm font-medium transition-all
                            ${!isCurrentMonth ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-blue-50'}
                            ${isToday && !isSelected ? 'ring-2 ring-blue-600' : ''}
                            ${isSelected ? 'bg-blue-100 text-blue-900' : ''}
                            ${isStart || isEnd ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
                            ${holiday ? 'text-red-600 font-bold' : ''}
                          `}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span>{date.getDate()}</span>
                            {holiday && (
                              <span className="text-[0.6rem] absolute bottom-0 left-0 right-0 text-center">🎉</span>
                            )}
                            {dayNotes.length > 0 && (
                              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedRange.start && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm font-medium text-gray-700">
                      Selected Range:
                    </div>
                    <div className="text-lg font-semibold text-blue-700">
                      {formatDate(selectedRange.start)}
                      {selectedRange.end && ` - ${formatDate(selectedRange.end)}`}
                    </div>
                    <button
                      onClick={() => setSelectedRange({ start: null, end: null })}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotesPanel
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        notes={notes}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        onEditNote={editNote}
        selectedRange={selectedRange}
      />
    </div>
  );
}
