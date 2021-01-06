NODE_MODULES=portfolio/frontend/node_modules
CLANG_FORMAT=$(NODE_MODULES)/clang-format/bin/linux_x64/clang-format --style=Google
CSS_VALIDATOR=$(NODE_MODULES)/css-validator/bin/css-validator
ESLINT=$(NODE_MODULES)/eslint/bin/eslint.js
PRETTIER=$(NODE_MODULES)/prettier/bin-prettier.js

node_modules:
	cd portfolio/frontend; npm install clang-format prettier css-validator eslint eslint-config-google

pretty: node_modules
	$(PRETTIER) --write portfolio/frontend/src/*.css
	find portfolio/src/main/java -iname *.java | xargs $(CLANG_FORMAT) -i
	find portfolio/frontend/src -iname *.js | xargs $(CLANG_FORMAT) -i

validate: node_modules
#	$(CSS_VALIDATOR) portfolio/frontend/src/*.css
	$(ESLINT) portfolio/frontend/src/*.js

package:
	mvn package