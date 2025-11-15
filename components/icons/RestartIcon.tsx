import React from 'react';

const RestartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21.5 2v6h-6" />
    <path d="M3.5 12a9 9 0 0 1 14.8-4.8L21.5 8" />
    <path d="M2.5 22v-6h6" />
    <path d="M20.5 12a9 9 0 0 1-14.8 4.8L2.5 16" />
  </svg>
);

export default RestartIcon;
