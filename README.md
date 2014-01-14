sitecomptester-extension
========================

Firefox extension which runs in-browser site compatibility test

This extension comes with a list of "tests" in JSON format - found in the data/sitedata.js file. Tests are run against live sites.

Each test is associated with a specific site compatibility problem in Mozilla's bug tracker.

The tests can be run by clicking the extension's icon on the extension toolbar. It will run through all tests and finally list all results in CSV format.

However, before doing a test run it's best to do the following:

 * Delete session data (cache, cookies etc.)
 * Make sure log-ins for any sites you need to log in to are stored in the password manager.

