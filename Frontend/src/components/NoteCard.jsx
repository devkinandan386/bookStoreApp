import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const NoteCard = ({ note, onedit, deleteNote }) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.description}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => onedit(note)}
        >
          <FaEdit className="mr-1" />
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
          onClick={() => deleteNote(note._id)}
        >
          <FaTrash className="mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
