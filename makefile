CLANG_FORMAT=node_modules/clang-format/bin/linux_x64/clang-format --style=Google
CSS_VALIDATOR=node_modules/css-validator/bin/css-validator
ESLINT=node_modules/eslint/bin/eslint.js
PRETTIER=node_modules/prettier/bin-prettier.js

node_modules:
	npm install clang-format prettier css-validator eslint eslint-config-google react-scripts

pretty: node_modules
	$(PRETTIER) --write portfolio/frontend/src/*.css
	find portfolio/src/main/java -iname *.java | xargs $(CLANG_FORMAT) -i
	find portfolio/frontend/src -iname *.js | xargs $(CLANG_FORMAT) -i

validate: node_modules
	$(CSS_VALIDATOR) portfolio/frontend/src/*.css
	$(ESLINT) portfolio/frontend/src/*.js

package:
	mvn package