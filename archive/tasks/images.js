var page = require('webpage').create();
var address = phantom.args[0];
var outfile = phantom.args[1];
var secondsToWait = 5;
page.settings.userAgent = 'PastPages: The News Homepage Archive (www.pastpages.org)';
page.viewportSize = { width: 1024, height: 768 };
page.evaluate(function() {
    document.body.bgColor = 'white';
});
page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        page.evaluate(function() {
          var style = document.createElement('style'),
              text = document.createTextNode('body { background: #fff }');
          style.setAttribute('type', 'text/css');
          style.appendChild(text);
          document.head.insertBefore(style, document.head.firstChild);
        });
        window.setTimeout(function () {
            if (getComputedStyle(document.body, null).backgroundColor === 'rgba(0, 0, 0, 0)') {
              console.log("Setting background color to white");
              document.body.bgColor = '#ffffff';
            }
            page.render(outfile);
            phantom.exit();
        }, secondsToWait * 1000);
    }
});
