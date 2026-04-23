import { Icon } from '@iconify/react';
import React, { useState, useRef, useEffect, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface StatusOption {
  label: string;
  value: string;
  // The colorClass is still available but won't be used for dots
  colorClass?: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { label: 'Draft',   value: 'draft' },
  { label: 'Pending', value: 'pending' },
  { label: 'Paid',    value: 'paid' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const FilterByStatus: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // ---- Helpers -----------------------------------------------------------
  const selectedOption = STATUS_OPTIONS.find(opt => opt.value === selectedValue) ?? null;
  const buttonLabel = selectedOption ? selectedOption.label : 'Filter by status';

  const updateActiveDescendant = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.setAttribute(
        'aria-activedescendant',
        activeIndex >= 0 ? `option-${activeIndex}` : ''
      );
    }
  }, [activeIndex]);

  const toggleOpen = () => {
    setIsOpen(prev => {
      if (!prev) setActiveIndex(0);
      return !prev;
    });
  };

  const close = () => setIsOpen(false);

  const selectOption = (option: StatusOption) => {
    // If the same option is clicked again, deselect it (optional)
    setSelectedValue(prev => (prev === option.value ? null : option.value));
    close(); // Optionally close the dropdown on selection
  };

  // ---- Keyboard navigation ------------------------------------------------
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        toggleOpen();
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => Math.min(prev + 1, STATUS_OPTIONS.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < STATUS_OPTIONS.length) {
          selectOption(STATUS_OPTIONS[activeIndex]);
        }
        break;
    }
  };

  // ---- Click outside -------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Sync active descendant whenever activeIndex changes
  useEffect(() => {
    updateActiveDescendant();
  }, [updateActiveDescendant]);

  return (
    <div className="relative inline-block text-left">
      {/* Trigger button */}
      <button
        ref={triggerRef}
        id="filter-by-status"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="filter-label"
        aria-activedescendant={activeIndex >= 0 ? `option-${activeIndex}` : undefined}
        onClick={toggleOpen}
        onKeyDown={handleKeyDown}
        className="flex w-[120px] justify-between items-center gap-2 text-[15px] leading-[15px] tracking-[-0.25px] font-bold text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      >
        <span id="filter-label">{buttonLabel}</span>
        {/* Chevron down icon */}
        <Icon className={`h-3 mt-[-3px] w-4 text-[#7C5DFA] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} icon="picon:down" />
      </button>

      {/* Dropdown panel – single‑select with checkboxes */}
      {isOpen && (
        <div
          className="absolute -left-1/3 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
          aria-labelledby="filter-label"
          tabIndex={-1}
        >
          <ul ref={listRef} className="py-1" role="none">
            {STATUS_OPTIONS.map((option, index) => {
              const isSelected = selectedValue === option.value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex items-center px-4 py-2 text-sm cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Square checkbox – only one can be checked at a time */}
                  <span
                    className={`mr-3 flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300 bg-white'
                    }`}
                    aria-hidden="true"
                  >
                    {isSelected && (
                      <svg
                        className="h-3 w-3 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  {/* Label only – no colored dot */}
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterByStatus;