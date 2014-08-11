all:
	browserify -t coffee-reactify main.cjsx -o bundle.js

dev:
	watchify -t coffee-reactify main.cjsx -o bundle.js
