'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { notesApi } from '@/lib/api/notes';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: tags = [] } = useQuery({
    queryKey: ['tags'],
    queryFn: notesApi.getTags,
  });

  return (
    <div className={css.menuContainer}>
      <button 
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link 
              href="/notes/filter/All" 
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag.name} className={css.menuItem}>
              <Link 
                href={`/notes/filter/${tag.name}`} 
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

