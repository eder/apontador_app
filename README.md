# Apps Runner

> Naively injects stuff

> ps.: in heavy dev yet

![Imgur](http://i.imgur.com/6fUHVC3.png)

## Usage

|    arg    |                        description                         |
| --------- | ---------------------------------------------------------- |
| --webpage | the webpage which will be proxied to our the local server  |
| --dir     | the directory where your awesome stuff lives (relative)    |
| --watch   | watches the specified *dir* and reloads the page when that |
|           | happens.                                                   |


## Motivation

[Chrome DevTools](https://developers.google.com/chrome-developer-tools/) comes with a lot of cool stuff for those awesome devs (which are, by definition, [lazy](http://blog.codinghorror.com/how-to-be-lazy-dumb-and-successful/)).

Here comes a great quote from the link above:

> only lazy programmers will want to write the kind of tools that might replace them in the end. Only a lazy programmer will avoid writing monotonous, repetitive code.

As we, from the frontend team, didn't wan't to keep injecting code into devtools and them repeting this, we've then developed this.

By utilizing this little hack we are able to use some debugging and fast debugging cool stuff provided by devtools like Workspaces w/ mapping (both js and css) which is extremely great.

For more on how this improves debugging/refactoring, see [this](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013) article on the new dev tools powers and particularly [this](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/#toc-adding-workspace) part of it.


## Piping to multiple browsers

One of the problems that we were facing prior to this project was to test a particular js code into different browsers.

**MIT License**