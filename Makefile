# Makefile

diff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

diff1:
	gendiff -h

test:
	npm test --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
