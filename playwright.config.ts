import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run dev',
		port: 5173
	},
	testDir: 'tests',
	projects: [
		{
			name: 'setup db',
			testMatch: /db\.setup\.ts/
		},
		{
			name: 'setup userdata',
			testMatch: /userdata\.setup\.ts/,
			dependencies: ['setup db']
		},
		{
			name: 'test',
			testMatch: /(.+\.)?(test|spec)\.[jt]s/,
			dependencies: ['setup userdata']
		}
	]
};

export default config;
