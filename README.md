# jury-scroll

## Example Nightbot Usage 
While you may want to maintain sole control over the ticker via the web page, if you want your viewers to have access (or mods etc) here is an example of a nightbot command script to call the api

```
$(user) set the ticker message to "$(urlfetch https://juryscroll.herokuapp.com/api/control/ea23b0d9-1ef2-4cd0-a7ad-7d945869e254/$(querystring))"
```