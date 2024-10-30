/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      width: {
        full_width: "100%",
      },
      colors: {
        teal_green: "#ECFFFB",
        light_gray: "#5E5959",
        error:'#F57068',
        active_color:'#f77f00',
        primary_color:'#B8C1CB',
        orange:'#ED7D31'

      },
      placeholder: {
        xs: '0.75rem', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        serif: ['Merriweather', 'serif'], 
        mono: ['Fira Code', 'monospace'], 
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1030px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
};
