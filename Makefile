# Makefil
install: install-deps

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test

diff:
	gendiff test/p1.json test/p2.json

diff2:
	gendiff __fixtures__/config1.json __fixtures__/config2.json

diff-plain:
	gendiff --format plain __fixtures__/config1.json __fixtures__/config2.json

diff-json:
	gendiff --format json __fixtures__/config1.json __fixtures__/config2.json