import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: [
		{
			command: 'npm run dev',
			port: 5173
		},
		{
			command: 'npm run build && npm run preview',
			port: 4173
		}
	],
	testDir: 'tests',
	projects: [
		{
			name: 'setup db',
			testMatch: /db\.setup\.ts/,
			use: {
				baseURL: 'http://localhost:5173'
			}
		},
		{
			name: 'setup userdata',
			testMatch: /userdata\.setup\.ts/,
			dependencies: ['setup db'],
			use: {
				baseURL: 'http://localhost:5173'
			}
		},
		{
			name: 'test',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			dependencies: ['setup userdata'],
			use: {
				baseURL: 'http://localhost:5173'
			}
		},
		{
			name: 'production test',
			testMatch: /(.+\.)?prodtest\.[jt]s/,
			use: {
				baseURL: 'http://localhost:4173'
			}
		}
	]
};

export default config;
