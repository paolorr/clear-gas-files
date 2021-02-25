(async () => {
	const fs = require('fs').promises;
	const path = require('path');

	const extensions = ['frm', 'bas'];

	const directory = process.argv[2];

	if (!directory) {
		console.error('ERROR: Invalid directory');
		return;
	}

	const dirContent = await fs.readdir(directory);

	for (const file of dirContent) {
		const filePath = path.join(directory, file);
		const fileExtension = path.extname(filePath).substring(1).toLowerCase();
		if (extensions.some((extension) => extension === fileExtension)) {
			const data = await fs.readFile(filePath, 'latin1');
			const fileContent = data.split('\n');
			const clearContent = fileContent.filter(
				(line) => !line.startsWith("'* Data......: ")
			);
			if (fileContent.length !== clearContent.length) {
				await fs.writeFile(filePath, clearContent.join('\n'));
			}
		}
	}
})();
