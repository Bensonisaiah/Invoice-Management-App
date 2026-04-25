// src/components/icons.tsx
import React from 'react'

export const CalendarIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#7E88C3] dark:text-[#DFE3FA]">
    <path d="M12.667 2.667H3.333C2.597 2.667 2 3.264 2 4v9.333C2 14.07 2.597 14.667 3.333 14.667h9.334C13.403 14.667 14 14.07 14 13.333V4c0-.736-.597-1.333-1.333-1.333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.667 1.333V4M5.333 1.333V4M2 6.667h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const TrashIcon: React.FC = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
    <path d="M1 3.667h12M4.333 3.667V2.333a1 1 0 0 1 1-1h3.334a1 1 0 0 1 1 1v1.334M5.667 7.333v4M8.333 7.333v4M2.333 3.667l.867 9.533a1 1 0 0 0 .997.867h5.606a1 1 0 0 0 .997-.867l.867-9.533" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const ArrowLeftIcon: React.FC = () => (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
    <path d="M6 1L1 5l5 4" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export const PlusIcon: React.FC = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)