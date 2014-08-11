all:
	browserify -t coffee-reactify --extension=".cjsx" main.coffee -o bundle.js

dev:
	watchify -t coffee-reactify --extension=".cjsx" main.coffee -o bundle.js
