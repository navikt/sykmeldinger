/* eslint-disable @typescript-eslint/no-var-requires */

const naviktTailwindPreset = require('@navikt/ds-tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [naviktTailwindPreset],
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
}
