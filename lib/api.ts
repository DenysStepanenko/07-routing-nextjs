import axios from 'axios';
import { Note, NewNoteData } from '../types/note';

const API_BASE_URL = 'https://notehub-api.vercel.app/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchNotes = async (
  query: string = '',
  page: number = 1,
  perPage: number = 12
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response = await api.get('/notes', {
    params: {
      query,
      page,
      perPage,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await api.post('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: number): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

