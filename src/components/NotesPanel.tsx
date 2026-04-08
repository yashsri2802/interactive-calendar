import { useState } from 'react';
import { X, Calendar, Edit2, Trash2, Check, XCircle } from 'lucide-react';
import { Note } from '../hooks/notes';
import { formatDate } from '../utils/date';

interface NotesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id'>) => void;
  onDeleteNote: (id: string) => void;
  onEditNote: (id: string, newContent: string) => void;
  selectedRange: { start: Date | null; end: Date | null };
}

export default function NotesPanel({
  isOpen,
  onClose,
  notes,
  onDeleteNote,
  onEditNote,
}: NotesPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const sortedNotes = [...notes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEditClick = (note: Note) => {
    setEditingId(note.id);
    setEditingContent(note.content);
  };

  const handleSaveEdit = (id: string) => {
    if (editingContent.trim()) {
      onEditNote(id, editingContent.trim());
      setEditingId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingContent('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-2xl font-bold">My Notes</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {sortedNotes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No notes yet</p>
              <p className="text-gray-400 text-sm mt-2">Select a date range on the calendar to add your first note.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">
                      {note.title || formatDate(new Date(note.date))}
                    </span>
                  </div>

                  {editingId === note.id ? (
                    <div className="mt-2 space-y-3">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none shadow-sm transition-shadow min-h-[100px]"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                          <XCircle className="w-4 h-4" /> Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(note.id)}
                          disabled={!editingContent.trim()}
                          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                        >
                          <Check className="w-4 h-4" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4 mt-2">
                      <div className="flex-1">
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                          {note.content}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditClick(note)}
                          className="p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                          title="Edit Note"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteNote(note.id)}
                          className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
                          title="Delete Note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
