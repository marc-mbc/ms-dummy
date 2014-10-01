test_jenkins:
	./node_modules/.bin/mocha --recursive --timeout 5000 --reporter xunit > ./test/log/test-reports.xml
.PHONY: test