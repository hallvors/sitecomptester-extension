# sitecomptester-extension
## Background

This is a SlimerJS test runner (formerly a Firefox extension) to run in-browser site compatibility test

This extension comes with a list of "tests" in JSON format - found in the data/sitedata.js file. Tests are run against live sites.

Each test is associated with a specific site compatibility problem in Mozilla's bug tracker.

# Running tests

You'll need

* an installation of [SlimerJS](http://slimerjs.org/)
* a clone of this repository

To run a single test, open the command prompt/terminal, go to your clone of this repository, and run slimerjs with arguments "slimertester.js" and a bug number. For example:

    slimerjs slimertester.js 1003821

You can pass in several bug numbers, separated by spaces. To run ALL tests, omit the bug number argument (this will take a while).

The slimertester.js script will output results to the console while running, it will also create a CSV file in the working folder. The CSV file is named "results-" and the current date. Existing files will be overwritten by new ones.

# Writing tests

Here's information that helps you write tests. Additions welcome!

## Test format

An individual test is embedded in a JavaScript object:

    "BUG_ID": {
        "url": "http://example.com", 
        "steps": [function(){}, /*js redirect on first page, wait for next load*/
            function(){return hasViewportMeta() && location.hostname === "m.example.com";}
        ], 
        "ua": "FirefoxOS", 
        "injectScript": "void(0)", 
        "title": "example.com is broken",
        "testType":"xhr"
    }


## Structure explained

 * All tests must refer to a bug number. There can only be one test per bug.
 * The object has some meta data, and some code. As it's saved in a JS file and not JSON, we include function expressions directly inside an array.

## Properties

All properties but **BUG_ID**, **URL**, **steps** and **ua** are optional.

 * **BUG_ID** All tests are associated with a bug number, this number is the name of the property that references this test in the testdata object.
 * **URL** The URL to launch in order to run the test.
 * **steps** An array of functions. These functions implement the actual test code.
   * The **last** function in the array is expected to return true or false to indicate whether the test passed. 
   * Return values of any function that's **not** the last function in the array will be discarded.
   * The last function can also return a string to indicate an unexpected condition (i.e. 'element not found'). Strings will be logged as the test result.
   * If any function throws an exception (or returns a string starting with 'EXCEPTION:'), the rest of the functions are skipped and the exception text is logged as the test result
   * Any function in the array can return the special string 'delay-and-retry'. The framework will wait one second and run the same function again, up to 5 times.
 * **ua** An indication of how the browser should identify itself for this test. Valid values are defined in data/uadata.json. 
 * **injectScript** If a test relies on a certain page / environment state, this property can be defined. Any script specified here will be injected into the page as soon as possible when it loads. **Not currently implemented for extension testing - slimerjs only**.
 * **title** Optionally add the bug's summary to the test. This makes the test file more readable and the tests easier to review.
 * **testType** The only valid value for this property is 'xhr'. This means the test can be run by doing an XMLHttpRequest for the URL and pass the response to the function(s) listed in steps. **Not completely implementable in slimerjs**.

## Predefined functions


Tests can always assume that these methods are available:

* **hasViewportMeta()** returns true if the page has a META element with name viewport.
* **hasHandheldFriendlyMeta()** returns true if the page has a META element with name handheldfriendly.
* **hasMobileOptimizedMeta()** returns true if the page has a META element with name mobileoptimized.
* **mobileLinkOrScriptUrl(str)** returns true if the page has either LINK href or SCRIPT src attributes that contain the string 'mobile' (or the string passed to this method).
* **hasVideoTags()** returns true if the page contains HTML5 VIDEO tags.
* **noWapContentPlease()** used with XHR tests to look for WAP pages.


* **cssCheck(*classNameList*, *propertiesThatMustExist*)** - method that returns true if one of the class names has one of the properties. *This method is less used than the others and might be dropped or changed*.

