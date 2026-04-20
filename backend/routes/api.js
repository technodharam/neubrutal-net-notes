import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/Note.js';
import Blog from '../models/Blog.js';
import { authMiddleware } from '../middleware/auth.js';

import mongoose from 'mongoose';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper to load local data
const getLocalData = (filename) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return [];
  } catch (err) {
    console.error(`Error loading local data ${filename}:`, err);
    return [];
  }
};

// Helper to save local data
const saveLocalData = (filename, data) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error saving local data ${filename}:`, err);
    return false;
  }
};

const checkDbConnection = (req, res, next) => {
  // Now we allow falling through to local data for all requests if DB is down
  // The route handlers will decide how to handle it
  next();
};


// --------------------------------------------------------
// Admin Auth
// --------------------------------------------------------
router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// --------------------------------------------------------
// Notes Routes
// --------------------------------------------------------
// Get all notes
router.get('/notes', checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notes = await Note.find().sort({ createdAt: -1 });
      res.json(notes);
    } else {
      // Demo Mode: Serve local data
      res.json(getLocalData('notes.json'));
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single note
router.get('/notes/:id', checkDbConnection, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create note (Admin only)
router.post('/notes', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newNote = new Note(req.body);
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    } else {
      // Demo Mode: Save to local file
      const notes = getLocalData('notes.json');
      const newNote = { ...req.body, _id: Date.now().toString() };
      notes.push(newNote);
      if (saveLocalData('notes.json', notes)) {
        res.status(201).json(newNote);
      } else {
        res.status(500).json({ message: 'Failed to save to local data' });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update note (Admin only)
router.put('/notes/:id', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedNote);
    } else {
      // Demo Mode: Update in local file
      let notes = getLocalData('notes.json');
      notes = notes.map(n => n._id === req.params.id ? { ...req.body, _id: req.params.id } : n);
      if (saveLocalData('notes.json', notes)) {
        res.json({ _id: req.params.id, ...req.body });
      } else {
        res.status(500).json({ message: 'Failed to update local data' });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete note (Admin only)
router.delete('/notes/:id', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Note.findByIdAndDelete(req.params.id);
      res.json({ message: 'Note deleted from database' });
    } else {
      // Demo Mode: Delete from local file
      const notes = getLocalData('notes.json');
      const filtered = notes.filter(n => n._id !== req.params.id);
      if (saveLocalData('notes.json', filtered)) {
        res.json({ message: 'Note deleted from local data' });
      } else {
        res.status(500).json({ message: 'Failed to delete from local data' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------------------------------------
// Blog Routes
// --------------------------------------------------------
// Get all blogs
router.get('/blogs', checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      res.json(blogs);
    } else {
      // Demo Mode: Serve local data
      res.json(getLocalData('blogs.json'));
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog
router.get('/blogs/:id', checkDbConnection, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create blog (Admin only)
router.post('/blogs', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newBlog = new Blog(req.body);
      const savedBlog = await newBlog.save();
      res.status(201).json(savedBlog);
    } else {
      // Demo Mode: Save to local file
      const blogs = getLocalData('blogs.json');
      const newBlog = { ...req.body, _id: Date.now().toString(), createdAt: new Date().toISOString() };
      blogs.push(newBlog);
      if (saveLocalData('blogs.json', blogs)) {
        res.status(201).json(newBlog);
      } else {
        res.status(500).json({ message: 'Failed to save to local data' });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog (Admin only)
router.put('/blogs/:id', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedBlog);
    } else {
      // Demo Mode: Update in local file
      let blogs = getLocalData('blogs.json');
      blogs = blogs.map(b => b._id === req.params.id ? { ...req.body, _id: req.params.id } : b);
      if (saveLocalData('blogs.json', blogs)) {
        res.json({ _id: req.params.id, ...req.body });
      } else {
        res.status(500).json({ message: 'Failed to update local data' });
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog (Admin only)
router.delete('/blogs/:id', authMiddleware, checkDbConnection, async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      await Blog.findByIdAndDelete(req.params.id);
      res.json({ message: 'Blog deleted from database' });
    } else {
      // Demo Mode: Delete from local file
      const blogs = getLocalData('blogs.json');
      const filtered = blogs.filter(b => b._id !== req.params.id);
      if (saveLocalData('blogs.json', filtered)) {
        res.json({ message: 'Blog deleted from local data' });
      } else {
        res.status(500).json({ message: 'Failed to delete from local data' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --------------------------------------------------------
// Chatbot Route
// --------------------------------------------------------
router.post('/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    // Add system prompt to guide it as an IT networking expert
    const systemPrompt = {
      role: 'system',
      content: 'You are an IT Networking expert assistant. Explain concepts clearly and simply, following a brutalist/direct style. Focus primarily on IT Networking, protocols, OSI model, IP addressing, and troubleshooting. If asked about non-networking topics, gently guide the user back to networking.'
    };

    const fetchResponse = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [systemPrompt, ...messages],
        model: 'openai' // defaults to a good text model
      })
    });

    if (!fetchResponse.ok) {
      throw new Error(`Pollinations API Error: ${fetchResponse.statusText}`);
    }

    const replyText = await fetchResponse.text();

    res.json({ role: 'assistant', content: replyText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: 'Failed to fetch response from free AI API' });
  }
});

export default router;
