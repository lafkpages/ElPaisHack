let cookie_name = 'ArcP';
let max_elpais_articles = 10;

function first_key(obj)
{
    return Object.keys(obj)[0];
}

function add_articles(n)
{
    chrome.tabs.getSelected(null, function(tab)
    {
        chrome.tabs.executeScript(tab.id, { code: 'localStorage[\'' + cookie_name + '\']' }, function(results)
        {
            let raw_cookie = results[0];
            let original_obj = JSON.parse(raw_cookie);

            /*
            {
                "anonymous": {
                    "d": "desktop",
                    "r": "elpais.com",
                    "pm": false,
                    "rc": {
                        "8": {
                            "c": a_number,  <----- NUMBER OF ARTICLES READ
                            "r": [],
                            "lastUpdated": 1598117965562
                        }
                    },
                ...
            */

            let original_articles_read = original_obj[first_key(original_obj)].rc;
            original_articles_read = original_articles_read[first_key(original_articles_read)].c;
            let hacked_articles_read = original_articles_read - n;

            let hacked_obj = original_obj;
            
            hacked_obj[first_key(hacked_obj)].rc[first_key(hacked_obj[first_key(hacked_obj)].rc)].c = hacked_articles_read;

            chrome.tabs.executeScript(tab.id, { code: 'localStorage.setItem(\'' + cookie_name + '\', \'' + JSON.stringify(hacked_obj) + '\'); location.reload();' });
        });
        
    });
}