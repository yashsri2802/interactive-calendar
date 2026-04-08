import { useState, useEffect } from 'react';

export interface Note {
  id: string;
  date: string;
  title?: string;
  content: string;
}

const STORAGE_KEY = 'calendar-notes';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setNotes(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored notes:', error);
      }
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newNotes));
  };

  const addNote = (note: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...note,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    saveNotes([...notes, newNote]);
  };

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id: string, updatedContent: string) => {
    saveNotes(notes.map(note => note.id === id ? { ...note, content: updatedContent } : note));
  };

  return {
    notes,
    addNote,
    deleteNote,
    editNote,
  };
}
