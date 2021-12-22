 module.exports = (app) => {
	app.on("issues.opened", async (context) => {
		const body = context.payload.issue.body;
		const matches = body.match(/.*(Mission|Group|Tutorials): http\S*(\.|\/)(\S*)\.html.*/);
		if (matches) {
			const taskType = matches[1].replace(/s$/, '').toLowerCase();
			const taskName = matches[3];
			const label = taskType + ':' + taskName;
			return context.octokit.issues.addLabels(context.issue({
				labels: [label],
			}));
		}
	});
};
