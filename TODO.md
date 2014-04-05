### Specifying only the base path

It is perfectly possible to obtain the pages path after the base path.

1.  Use `app.get` without specifying a path for that route so that we are fully able to serve any path that comes to it. We then just need to use what came to us in the `request()` method which it will get the body of the page.

```javascript

});
```

### Functional/Interface Testing

For this kind of test, use phantomJS + casperJS for raising a interfaceless brwoser and then inspect the dom.

1.  Raise 2 servers. One server will just serve a page, which is where we want o inject stuff. The other one is the *apontador_app* server, which is goingo to inject stuff on it.

2.  Having a simple file server from the first one, and a simple script injecting an element to the body of that page served, use casper.js to see if it is really injecting into the page. We may also be able to check if a CSS that we've applied is really being used.