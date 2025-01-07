import React, { useState, useEffect } from 'react';

const NoteModal = ({ onClose, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Both title and description are required!');
      return;
    }
    if (currentNote) {
      console.log('Editing note:', currentNote);
      editNote(currentNote._id, title, description);
    } else {
      console.log('Adding new note:', { title, description });
      addNote(title, description);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {currentNote ? 'Edit Note' : 'Add a Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Note Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
            >
              {currentNote ? 'Update Note' : 'Add Note'}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
