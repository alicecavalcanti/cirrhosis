/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'figado-dolorido': "url('../public/assets/Figado-dolorido-Pacientes.jpg')",
        'telaInicial': "url('../public/assets/background-home.jpg')",

      },
      screens: {
        'xm': {'min': '350px', 'max': '575px'},
        'xm': {'min': '374px', 'max': '575px'},
        'sm': {'min': '576px', 'max': '767px'},
        'md': {'min': '768px', 'max': '991px'},
        'lg': {'min': '992px', 'max': '1199px'},
        'xl': {'min': '1200px'},
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        corAzul: '#556cd6',
        azulEscuro: '#075e66',
        laranjaFont: '#f47e28',
        CinzaFont: '#6e6e6e '
      }
    },
  },
  plugins: [],
}

