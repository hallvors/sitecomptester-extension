import base64, json, re, os, subprocess, time, urlparse, tldextract, difflib, argparse, glob

target_folder = 'c:\\mozilla\\testing\\mbdtest\\'
data = {}
f = open('../special_screenshots.json', 'r')
data = json.loads(f.read())
f.close()
i = 0

def getB64(filename):
    f = open(filename, 'rb')
    data = base64.b64encode(f.read())
    f.close()
    return data

with open('%ssites.txt' % target_folder, 'r') as handle:
    for url in handle:
        if not '://' in url:
            url = 'http://%s' % url
        url = url.strip().rstrip('\r\n')
        location = urlparse.urlparse(url)
        host = location.hostname.rstrip('\r\n')
        html = ['<!DOCTYPE html><html><head><title>Compatibility report %s</title><meta name="viewport" content="width=device-width"/>' % host]
        html.append("""
<style>
    body {
        margin: 0 auto;
        text-align: center;
        padding: 0;
        font-size: 16px;
        font-family: "Helvetica Neue";

    }
    header {
        text-align: center;
        padding: 2rem;
        background-color: #fff;
        color: #000;
    }
    section {
        background-color: #E6E6E5;
        margin: 2rem 4rem;
        text-align: center;
        display:inline-block;
    }
    h2 {border-bottom: 1px solid #fff;
        padding: 1rem;}
    .figures {
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
    figcaption {background-color: #555;
        padding: 1rem;
        color: #E6E6E5}
    figure {
        margin:1rem;
        padding:0;
        background-color: #fff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }
</style>
</head><body>""")
        html.append('<header><h1>%s</h1></header>\n\n' % host)
        filename1 = target_folder + ("%03d-"%i) + host + '.png'
        filename2 = target_folder + 'wk-spoof-' + ("%03d-"%i) + host + '.png'
        if os.path.isfile(filename1) and os.path.isfile(filename2):
            html.append('<section><h2>Front page</h2>')
            html.append('<div class="figures"><figure class="screenshot first_engine">')
            html.append('<img src="data:image/png;base64,%s" alt="screenshot of %s">' % (getB64(filename1), host))
            html.append('<figcaption>With Firefox OS User-Agent</figcaption>')
            html.append('</figure>')
            html.append('<figure class="screenshot second_engine">')
            html.append('<img src="data:image/png;base64,%s" alt="screenshot of %s">' % (getB64(filename2), host))
            html.append('<figcaption>With Safari iPhone User-Agent</figcaption>')
            html.append('</figure></div></section>')

        for sub_test_id in range(len(data[host])):
            item = data[host][sub_test_id]
            filename1 = target_folder + ("%03d-"%i) + host + str(sub_test_id) + '.png'
            filename2 = target_folder + 'wk-spoof-' + ("%03d-"%i) + host + str(sub_test_id) + '.png'
            if os.path.isfile(filename1) and os.path.isfile(filename2):
                html.append('<section><h2>%s</h2>' % item['title'] )
                html.append('<div class="figures"><figure class="screenshot first_engine">')
                html.append('<img src="data:image/png;base64,%s" alt="screenshot of %s">' % (getB64(filename1), host))
                html.append('<figcaption>With Firefox OS User-Agent</figcaption>')
                html.append('</figure>')
                html.append('<figure class="screenshot second_engine">')
                html.append('<img src="data:image/png;base64,%s" alt="screenshot of %s">' % (getB64(filename2), host))
                html.append('<figcaption>With Safari iPhone User-Agent</figcaption>')
                html.append('</figure></div></section>')
        html_filename = '%s%s%s.html' % (target_folder, "%03d-" % i, host)
        f = open(html_filename, 'w')
        f.write("\n".join(html))
        f.close()
        print html_filename
        i += 1