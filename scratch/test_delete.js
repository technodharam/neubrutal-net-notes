import axios from 'axios';

const testDelete = async () => {
  try {
    // 1. Login
    const loginRes = await axios.post('http://localhost:5000/api/admin/login', { password: 'admin123' });
    const token = loginRes.data.token;
    console.log('Logged in, token received');

    // 2. Get notes
    const notesRes = await axios.get('http://localhost:5000/api/notes');
    const notes = notesRes.data;
    if (notes.length === 0) {
      console.log('No notes to delete');
      return;
    }
    const idToDelete = notes[0]._id;
    console.log(`Attempting to delete note with ID: ${idToDelete}`);

    // 3. Delete note
    const delRes = await axios.delete(`http://localhost:5000/api/notes/${idToDelete}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Delete Response:', delRes.data);

    // 4. Verify
    const verifyRes = await axios.get('http://localhost:5000/api/notes');
    const remainingNotes = verifyRes.data;
    console.log(`Notes remaining: ${remainingNotes.length}`);
    if (!remainingNotes.find(n => n._id === idToDelete)) {
      console.log('SUCCESS: Note actually deleted from system.');
    } else {
      console.log('FAILURE: Note still exists.');
    }

  } catch (err) {
    console.error('Test failed:', err.response ? err.response.data : err.message);
  }
};

testDelete();
