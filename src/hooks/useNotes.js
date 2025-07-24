import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "notes";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (stored?.length > 0) {
      setNotes(stored);
    } else {
      const initial = [{ id: Date.now(), content: "" }];
      setNotes(initial);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    if (currentIndex < notes.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const deleteCurrentNote = () => {
    const updated = notes.filter((_, i) => i !== currentIndex);
    setNotes(updated);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const addNote = () => {
    const newNote = { id: Date.now(), content: "" };
    const updated = [...notes, newNote];
    setNotes(updated);
    setCurrentIndex(updated.length - 1);
  };

  const updateNote = (text) => {
    const updated = [...notes];
    updated[currentIndex] = { ...updated[currentIndex], content: text };
    setNotes(updated);
  };

  return {
    notes,
    currentIndex,
    note: notes[currentIndex]?.content || "",
    goToPrev,
    goToNext,
    deleteCurrentNote,
    addNote,
    updateNote,
  };
}
