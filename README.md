# Track.js

Google Analytics and Floodlight tracking made a little simpler

## Installation

`bower install track.js --save` **OR** `npm install track-js --save`

## Usage

1. Require Track.js as CommonJS, AMD, or global module. Also, make sure jQuery is around.
2. Add the appropriate data attributes to your links to get things going
3. Initialize the library: `new Track()`

## Data Attributes 

`data-track` Turns on tracking for the link

### Google Analytics Event Tracking

If any of the following are present on the link, a custom GA event will be sent. 

`data-track-category` The "category" for the event

`data-track-action` The "action" for the event

`data-track-label` The "label" for the event

### Floodlight Tracking

If the following is present for a link, a Floodlight iframe will be appended to the page's body element. The "src" should be the full URL provided ending with "ord=". 

`data-track-floodlight-src` 

## Options

`debug` Should be `true` or `false. Will turn on logging of trigged events.

## Develop and Build

Run `gulp` to develop, and/or `gulp build` to create compiled js.

#### License

Copyright (c) 2013 - 2015, mattfordham / wintr.us

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.