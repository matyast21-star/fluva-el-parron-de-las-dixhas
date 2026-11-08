/** Íconos de trazo minimalistas (decorativos: aria-hidden). */
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const IconPhone = () => (<svg {...base}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const IconWhatsapp = () => (<svg {...base}><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.4z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2z" /></svg>);
export const IconMail = () => (<svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const IconPin = () => (<svg {...base}><path d="M12 21c-4-3-8-6-8-11a8 8 0 0 1 16 0c0 5-4 8-8 11z" /><circle cx="12" cy="10" r="3" /></svg>);
export const IconClock = () => (<svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconInstagram = () => (<svg {...base}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" /></svg>);
export const IconCalendar = () => (<svg {...base}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const IconMenu = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = () => (<svg {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const IconStar = () => (<svg {...base}><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /></svg>);
