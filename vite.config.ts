import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
	base: command === 'build' ? '/FitApp/' : '/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Tempo - jouw krachtplan',
				short_name: 'Tempo',
				description: 'Een persoonlijk krachtplan voor thuis.',
				theme_color: '#173d35',
				background_color: '#f8f6ee',
				display: 'standalone',
				icons: []
			}
		})
	]
}))