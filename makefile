ifeq ($(OS),Windows_NT)     # is Windows_NT on XP, 2000, 7, Vista, 10...
    detected_OS := Windows
	# yikes what do we do if some numpty is using Windows
else
    detected_OS := $(shell uname)
endif

ifeq ($(detected_OS),Darwin)        # Mac OS X
    CLANG_FORMAT = node_modules/clang-format/bin/darwin_x64/clang-format --style=Google
else 
	CLANG_FORMAT = node_modules/clang-format/bin/linux_x64/clang-format --style=Google
endif

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
