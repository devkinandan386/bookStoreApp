import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import NoteCard from './NoteCard';
import NoteModal from './NoteModal';
import Navbar from './Navbar';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [currentNote, setCurrentNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Session state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Detect session expiry or validity
  useEffect(() => {
    const user = localStorage.getItem('Users');
    
    if (user) {
      // User session is valid
      setIsAuthenticated(true);
    } else {
      // Session has expired or no session, show expiry alert
      setIsAuthenticated(false);
      Swal.fire({
        icon: 'info',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again to continue.',
        showConfirmButton: true,
        confirmButtonColor: '#3085d6',
        timer: 5000, // auto-close after 5 seconds
        background: '#ffdddd', // Light red background for urgency
        customClass: {
          title: 'text-xl font-bold text-red-600', // Customize title style
          content: 'text-lg text-gray-700', // Customize content style
        },
      });
    }

    // Save notes to localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes));

    // Session expiration check (when app is reloaded or resumed from sleep)
    const handleBeforeUnload = () => {
      localStorage.removeItem('Users'); // Expire session on app close or reload
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [notes]);

  // Function to add a new note
  const addNote = (title, description) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please log in to add notes!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const newNote = {
      _id: Date.now().toString(), // Generate a unique ID
      title,
      description,
    };

    setNotes([...notes, newNote]);
    setIsModalOpen(false); // Close the modal after adding
  };

  // Function to edit an existing note
  const editNote = (id, updatedTitle, updatedDescription) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please log in to edit notes!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    const updatedNotes = notes.map((note) =>
      note._id === id
        ? { ...note, title: updatedTitle, description: updatedDescription }
        : note
    );

    setNotes(updatedNotes);
    setIsModalOpen(false); // Close the modal after editing
  };

  // Function to delete a note
  const deleteNote = (id) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please log in to delete notes!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, you won't be able to recover this note!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredNotes = notes.filter((note) => note._id !== id);
        setNotes(filteredNotes);
        Swal.fire('Deleted!', 'Your note has been deleted.', 'success');
      }
    });
  };

  // Handle the login process (Simulated for this example)
  const handleLogin = (userData) => {
    localStorage.setItem('Users', JSON.stringify(userData));
    setIsAuthenticated(true);
  };

  // Handle the logout process
  const handleLogout = () => {
    localStorage.removeItem('Users'); // Remove user session
    setIsAuthenticated(false); // Set authentication state to false
  };

  const handleEdit = (note) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please log in to edit this note!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }

    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: 'warning',
        title: 'Unauthorized',
        text: 'Please log in to add a new note!',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 pt-20">
        <h1 className="text-center text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-600 drop-shadow-lg mb-8">
          Creative Notes
        </h1>

        {/* Add New Note Button */}
        {isAuthenticated && (
          <button
            className="fixed right-5 bottom-24 w-16 h-16 text-3xl bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-60 active:scale-100"
            onClick={handleAddNew}
            title="Add a new note"
          >
            ✍️
          </button>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onedit={handleEdit}
              deleteNote={deleteNote}
            />
          ))}
        </div>

        {/* Note Modal */}
        {isModalOpen && (
          <NoteModal
            onClose={() => setIsModalOpen(false)}
            addNote={addNote}
            currentNote={currentNote}
            editNote={editNote}
          />
        )}
      </div>
    </div>
  );
};

export default App;
