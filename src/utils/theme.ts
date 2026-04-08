export interface MonthTheme {
  primary: string;         // Used for text that needs primary color (e.g. text-blue-600)
  primaryBg: string;       // Used for solid primary buttons/elements (e.g. bg-blue-600)
  primaryHover: string;    // Used for hovered primary buttons (e.g. hover:bg-blue-700)
  primaryTextHover: string;// Used for hovered text (e.g. hover:text-blue-800)
  lightBg: string;         // Used for light backgrounds (e.g. bg-blue-50)
  lightBorder: string;     // Used for light borders (e.g. border-blue-200)
  ringColor: string;       // Used for ring indicators (e.g. ring-blue-600)
  gradient: string;        // Used for gradients (e.g. bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50)
}

export const MONTH_THEMES: MonthTheme[] = [
  { // 0: January (Winter, Cool tones)
    primary: 'text-blue-600',
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryTextHover: 'hover:text-blue-800',
    lightBg: 'bg-blue-50',
    lightBorder: 'border-blue-200',
    ringColor: 'ring-blue-600',
    gradient: 'from-slate-100 via-slate-50 to-blue-50',
  },
  { // 1: February (Valentine, Rose tones)
    primary: 'text-rose-600',
    primaryBg: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    primaryTextHover: 'hover:text-rose-800',
    lightBg: 'bg-rose-50',
    lightBorder: 'border-rose-200',
    ringColor: 'ring-rose-600',
    gradient: 'from-pink-50 via-rose-50 to-red-50',
  },
  { // 2: March (Spring, Emerald tones)
    primary: 'text-emerald-600',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryTextHover: 'hover:text-emerald-800',
    lightBg: 'bg-emerald-50',
    lightBorder: 'border-emerald-200',
    ringColor: 'ring-emerald-600',
    gradient: 'from-green-50 via-emerald-50 to-teal-50',
  },
  { // 3: April (Spring, Teal tones)
    primary: 'text-teal-600',
    primaryBg: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    primaryTextHover: 'hover:text-teal-800',
    lightBg: 'bg-teal-50',
    lightBorder: 'border-teal-200',
    ringColor: 'ring-teal-600',
    gradient: 'from-cyan-50 via-teal-50 to-emerald-50',
  },
  { // 4: May (Spring, Fuchsia tones)
    primary: 'text-fuchsia-600',
    primaryBg: 'bg-fuchsia-600',
    primaryHover: 'hover:bg-fuchsia-700',
    primaryTextHover: 'hover:text-fuchsia-800',
    lightBg: 'bg-fuchsia-50',
    lightBorder: 'border-fuchsia-200',
    ringColor: 'ring-fuchsia-600',
    gradient: 'from-purple-50 via-fuchsia-50 to-pink-50',
  },
  { // 5: June (Summer, Yellow/Amber tones)
    primary: 'text-amber-600',
    primaryBg: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    primaryTextHover: 'hover:text-amber-700',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    ringColor: 'ring-amber-500',
    gradient: 'from-yellow-50 via-amber-50 to-orange-50',
  },
  { // 6: July (Summer, Cyan/Blue tones)
    primary: 'text-cyan-600',
    primaryBg: 'bg-cyan-600',
    primaryHover: 'hover:bg-cyan-700',
    primaryTextHover: 'hover:text-cyan-800',
    lightBg: 'bg-cyan-50',
    lightBorder: 'border-cyan-200',
    ringColor: 'ring-cyan-600',
    gradient: 'from-sky-50 via-cyan-50 to-blue-50',
  },
  { // 7: August (Summer, Orange tones)
    primary: 'text-orange-600',
    primaryBg: 'bg-orange-500',
    primaryHover: 'hover:bg-orange-600',
    primaryTextHover: 'hover:text-orange-700',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-200',
    ringColor: 'ring-orange-500',
    gradient: 'from-amber-50 via-orange-50 to-red-50',
  },
  { // 8: September (Autumn, Orange/Amber tones)
    primary: 'text-orange-600',
    primaryBg: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryTextHover: 'hover:text-orange-800',
    lightBg: 'bg-orange-50',
    lightBorder: 'border-orange-200',
    ringColor: 'ring-orange-600',
    gradient: 'from-orange-50 via-amber-50 to-yellow-50',
  },
  { // 9: October (Halloween, Dark Orange/Slate)
    primary: 'text-orange-600',
    primaryBg: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryTextHover: 'hover:text-orange-800',
    lightBg: 'bg-slate-100',
    lightBorder: 'border-orange-300',
    ringColor: 'ring-orange-600',
    gradient: 'from-slate-200 via-slate-100 to-orange-50',
  },
  { // 10: November (Autumn, Amber/Brown tones)
    primary: 'text-amber-700',
    primaryBg: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    primaryTextHover: 'hover:text-amber-800',
    lightBg: 'bg-amber-50',
    lightBorder: 'border-amber-200',
    ringColor: 'ring-amber-600',
    gradient: 'from-amber-100 via-orange-50 to-yellow-50',
  },
  { // 11: December (Festive, Red tones)
    primary: 'text-red-600',
    primaryBg: 'bg-red-600',
    primaryHover: 'hover:bg-red-700',
    primaryTextHover: 'hover:text-red-800',
    lightBg: 'bg-red-50',
    lightBorder: 'border-red-200',
    ringColor: 'ring-red-600',
    gradient: 'from-red-50 via-rose-50 to-emerald-50',
  }
];
