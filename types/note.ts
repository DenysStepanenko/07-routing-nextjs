export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface NewNoteData {
  title: string;
  content: string;
  categoryId: string;
  tags?: string[];
}

export interface NoteListResponse {
  notes: Note[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export interface Tag {
  name: string;
  count: number;
}

