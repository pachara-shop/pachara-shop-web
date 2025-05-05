import shadcnConfig from './shadcn.config.js';
import { addDynamicIconSelectors } from '@iconify/tailwind';
module.exports = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'icon-[logos--facebook]',
    'icon-[skill-icons--instagram]',
    'icon-[logos--tiktok-icon]',
    'icon-[mage--line]',
    'icon-[logos--discord]',
    'icon-[mdi--github]',
    'icon-[skill-icons--twitter]',
    'icon-[logos--youtube-icon]',
    'icon-[skill-icons--linkedin]',
    'icon-[material-symbols-light--link]',
  ],
  theme: {
    screens: {
      xxs: '375px', // มือถือขนาดกลาง (iPhone 8+, SE 2020)
      xs: '480px', // มือถือขนาดกลาง (iPhone 8+, SE 2020)
      sm: '640px', // มือถือขนาดใหญ่/แท็บเล็ตขนาดเล็ก
      md: '768px', // แท็บเล็ต (iPad Mini/Air)
      lg: '1024px', // แท็บเล็ตแนวนอน/โน๊ตบุ๊คขนาดเล็ก
      xl: '1280px', // เดสก์ท็อปขนาดกลาง
      '2xl': '1536px', // เดสก์ท็อปขนาดใหญ่
    },
    extend: {
      ...shadcnConfig.theme.extend,
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    addDynamicIconSelectors(),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss-animate'),
  ],
};
