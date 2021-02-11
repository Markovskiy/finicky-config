module.exports = {
	defaultBrowser: 'Google Chrome',
	options: {
		hideIcon: false,
	},
	rewrite: [
		{
			match: ({url}) => url.host.includes('appfollow-team.slack.com'),
			url: ({url}) => {
				const APPFOLLOW_TEAM_ID = 'T09S7CJE4';

				// url.pathname = https://appfollow-team.slack.com/archives/C09S7UVB3/p1610363866282200?thread_ts=1610121077.273800&cid=C09S7UVB3
				const urlArray = url.pathname.split('/'); // ["", "archives", "C09S7UVB3", "p1610363866282200?thread_ts=1610121077.273800&cid=C09S7UVB3"]
				const id = urlArray[2]; // "C09S7UVB3"
				const message1 = urlArray[3].slice(1, 11); // "1610363866"
				const message2 = urlArray[3].slice(11); // "282200"
				const message = `${message1}.${message2}`; // "1610363866.282200"
				let thread = '';

				if (url.search.includes('thread_ts')) {
					thread = url.search; // thread_ts=1610121077.273800&cid=C09S7UVB3
				}

				return `slack://channel?team=${APPFOLLOW_TEAM_ID}&id=${id}&message=${message}${thread ? `&${thread}` : ''}`;
			},
		},
	],
	handlers: [
		{
			match: /appfollow\.atlassian\.net/,
			browser: '/Applications/Jira.app',
		},
		{
			match: /slack:\/\/channel/,
			browser: '/Applications/Slack.app',
		},
		{
			match: /figma\.com\/file/,
			browser: '/Applications/Figma.app',
		},
		{
			match: /notion\.so/,
			browser: '/Applications/Notion.app',
		},
		{
			match: /zoom\.us\/j/,
			browser: '/Applications/zoom.us.app',
		},
		{
			match: /^https?:\/\/t\.me/,
			browser: '/Applications/Telegram.app',
		},
		{
			match: /open\.spotify\.com/,
			browser: '/Applications/Spotify.app',
		},
		// {
		// 	match: /mailto/,
		// 	browser: '/Applications/***.app',
		// },
	],
};
