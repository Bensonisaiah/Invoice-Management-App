import React from 'react';

type StatusType = 'draft' | 'pending' | 'paid';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;   // only className stays as an optional prop
}

// colours: dot, background (lighter than dot), text
const STATUS_STYLES: Record<StatusType, {
  dot: string;
  bg: string;
  text: string;
}> = {
  draft: {
    dot: 'bg-[#373B53]',
    bg: 'bg-[#373B530F]',
    text: 'text-[#373B53]',
  },
  pending: {
    dot: 'bg-[#FF8F00]',
    bg: 'bg-[#FF8F000F]',
    text: 'text-[#FF8F00]',
  },
  paid: {
    dot: 'bg-[#33D69F]',
    bg: 'bg-[#33D69F0F]',
    text: 'text-[#33D69F]',
  },
};

const LABELS: Record<StatusType, string> = {
  draft: 'Draft',
  pending: 'Pending',
  paid: 'Paid',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const { dot, bg, text } = STATUS_STYLES[status];
  const label = LABELS[status];

  return (
    <span
      className={`
        flex justify-center items-center gap-2 rounded-md text-sm font-medium
        w-[104px] h-10 px-3 py-[15px]
        ${bg} ${className}
      `}
    >
      {/* coloured dot */}
      <span
        className={`h-2 w-2 mt-[-4px] rounded-full ${dot}`}
        aria-hidden="true"
      />
      {/* status label */}
      <span className={`font-bold text-[15px] leading-[15px] tracking-[-0.25px] ${text}`}>{label}</span>
    </span>
  );
};

export default StatusBadge;