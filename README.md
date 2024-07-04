# splunker
Chrome extension for opening Splunk log

## Introduction

This is a Chrome extension to read a timestamp in a tab and open corresponding Splunk log 
between `(timestamp - 1)` sec and `(timestamp + 1)` sec.

## Setup

1. Clone this repository using `git clone` command
2. **You need to edit `CONFIG` map in `service_worker.js`.**
    - key: id of context menu item
    - value:
        - `title`: String used for context menu item
        - `url`: Splunk URL excluding `earliest`, `latest` and `sid` query parameters
3. Open `chrome://extensions`
    1. Enable **Developer mode** at the top right corner of the screen
    2. Click **Load unpacked** and specify the local repo directory

## Usage

1. Open a web page that contains timestamp strings, like your test results page.
2. Select a timestamp. This code supports the `dd MMM yyyy hh:mm:ss GMT` format only... 
If you want to support other formats edit
`service_worker.js`
3. Click the right mouse button and select a content menu item for
your Splunk instance.