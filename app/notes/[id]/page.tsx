import { notesApi } from '@/lib/api/notes';
import { notFound } from 'next/navigation';
import css from './page.module.css';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  try {
    const note = await notesApi.getNoteById(id);

    return (
      <div className={css.container}>
        <h1 className={css.title}>{note.title}</h1>
        <div className={css.meta}>
          <span className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <span className={css.category}>
            Category: {note.categoryId}
          </span>
        </div>
        <div className={css.content}>
          {note.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}

