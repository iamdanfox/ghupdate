all:
	browserify -t coffeeify main.coffee > bundle.js
