# Makefile

diff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

diff1:
	gendiff -h
