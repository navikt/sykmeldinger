import path from 'node:path'

import dotenv from 'dotenv'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

dotenv.config({
    path: '.env.test',
})

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        include: ['src/**/*.test.{ts,tsx}'],
        setupFiles: ['vitest.setup.mts'],
    },
    resolve: {
        alias: {
            queries: path.resolve(__dirname, './src/fetching/graphql.generated.ts'),
        },
    },
})
