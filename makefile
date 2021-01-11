ifeq ($(OS),Windows_NT)     # is Windows_NT on XP, 2000, 7, Vista, 10...
    detected_OS := Windows
	# don't worry about this for now
else
    detected_OS := $(shell uname)
endif

ifeq ($(detected_OS),Darwin)        
	# Mac OS X
    CLANG_FORMAT = node_modules/clang-format/bin/darwin_x64/clang-format --style=Google
else
	# Assume Linux, not Windows
	CLANG_FORMAT = node_modules/clang-format/bin/linux_x64/clang-format --style=Google
endif

CSS_VALIDATOR=node_modules/css-validator/bin/css-validator
ESLINT=node_modules/eslint/bin/eslint.js
PRETTIER=node_modules/prettier/bin-prettier.js

node_modules:
	npm install clang-format prettier css-validator eslint eslint-config-google react-scripts

pretty: node_modules
	$(PRETTIER) --write project/src/main/webapp/src/*.css
	find project/src/main/java -iname *.java | xargs $(CLANG_FORMAT) -i
	find project/src/main/webapp/src -iname *.js | xargs $(CLANG_FORMAT) -i

validate: node_modules
	$(CSS_VALIDATOR) project/src/main/webapp/src/*.css
	$(ESLINT) project/src/main/webapp/src/*.js

package:
	mvn package
