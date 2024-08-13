const { app } = require("electron");

const win = require("../win");
const version = require("./version");

module.exports = async () => {
	if (version.northstar() == "unknown")
		return;

	const args = process.argv.slice(app.isPackaged ? 1 : 2);

	for (const key of args) {
		if (key.startsWith("ror2mm://")) {
			let fragments = key.slice(9).split("/");
		
			if (fragments.length < 6)
				return;

			const ver = fragments[0];
			const term = fragments[1];
			const domain = fragments[2];
			const author = fragments[3];
			const package_name = fragments[4];
			const version = fragments[5];

			// There is only v1
			if (ver != "v1")
				continue;

			// No support for custom thunderstore instances
			if (domain != "thunderstore.io")
				continue;

			try {
				if (term == "install") {
					win().send("protocol-install-mod", [domain, author, package_name, version]);
				}
			}catch(err) {
				console.error(err);
				continue;
			}
		}
	}
}
