# @picperf/rehype

Use this plugin to transform the URLs in your Markdown images into PicPerf URLs, ready to be optimzed.

## Install the Package

Run `npm install @picperf/rehype`. 

## Usage

Wire it up by importing the plugin and configuring it with your Markdown setup. Here's an example from Astro: 

```js
import { rehypePicPerf } from '@picperf/rehype';

export default defineConfig({
  markdown:{
    rehypePlugins: [rehypePicPerf],
  },

  // Other stuff...
});
```

## Overriding Transformations

By default, absolute URLs will be prefixed with "https://picperf.dev". If you'd like to override this behavior for particular URLs, you can use the `shouldTransform()` option: 

```js
markdown:{
    rehypePlugins: [[ rehypePicPerf, {
        shouldTransform: (url) => {
            // Return a boolean based on the URL, or not.

            return false;
        }
    }]],
},
```