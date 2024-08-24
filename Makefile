compile:
	npm run homebrew:compile
	npm run espanso:compile

linux-install:
	chmod +x ./src/linux/kazam/install.sh
	bash ./src/linux/kazam/install.sh

linux-uninstall:
	chmod +x ./src/linux/kazam/uninstall.sh
	bash ./src/linux/kazam/uninstall.sh