'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { notesApi } from '@/lib/api/notes';
import css from './NotePreview.module.css';

interface NotePreviewClientProps {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => notesApi.getNoteById(noteId),
    refetchOnMount: true,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return <div className={css.loading}>Loading...</div>;
  }

  if (error || !note) {
    return <div className={css.error}>Note not found</div>;
  }

  return (
    <div className={css.preview}>
      <div className={css.header}>
        <h1 className={css.title}>{note.title}</h1>
        <button className={css.closeButton} onClick={handleClose}>
          ×
        </button>
      </div>
      <div className={css.meta}>
        <span className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </span>
        {note.tags && note.tags.length > 0 && (
          <div className={css.tags}>
            {note.tags.map((tag) => (
              <span key={tag} className={css.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={css.content}>
        {note.content.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

