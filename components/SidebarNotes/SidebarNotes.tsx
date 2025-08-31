'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import css from './SidebarNotes.module.css';

export default function SidebarNotes() {
  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: notesApi.getTags,
  });

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Filter by tags</h2>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag.name} className={css.menuItem}>
            <Link href={`/notes/filter/${tag.name}`} className={css.menuLink}>
              {tag.name} ({tag.count})
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

