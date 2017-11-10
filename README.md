# pandoc-mathjax-filter
A Pandoc filter for typesetting (rendering) TeX snippets server-side, using mathjax-node

# Usage

Make sure you have `pandoc-filter` and `mathjax-node` installed, with say `npm install pandoc-filter mathjax-node` in the directory that contains this file -- you will need at least Node 7.6 (released in February 2017).

Pass in `--filter pandoc-mathjax-svg-filter.js` to pandoc, for example:

    pandoc supermath.md --filter ./pandoc-mathjax-svg-filter.js -s -t html5 -o supermath.html

# Alternatives

See [lierdakil/mathjax-pandoc-filter](https://github.com/lierdakil/mathjax-pandoc-filter), which is even available on NPM (and not just once but twice :P):

* https://www.npmjs.com/package/mathjax-pandoc-filter
* https://www.npmjs.com/package/mathjax-pandoc-filter-2

Unfortunately when I tried it, I couldn't install the first one, and the second one randomly failed when the input file had more than a handful of math elements:

    % for i in {1..10}; do echo $i; pandoc math-samples-$i.md --filter ../node_modules/mathjax-pandoc-filter-2/index.js -t html5 -o math-samples-$i.html; done
    1
    2
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    3
    4
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    5
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    6
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    7
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    8
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    9
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11
    10
    pandoc: Error running filter ../node_modules/mathjax-pandoc-filter-2/index.js
    Filter returned error status -11

(The file `math-samples-$i.md` has `i` copies of `math-samples.md`. Note that it worked for 1 and 3, but failed for the rest. I suspect some sort of concurrency issue.)

But if they work for you, you should use those instead; I'm barely know what I'm doing here!

# What is this?
If you want to present mathematics nicely typeset on a web page, you have a few options. This is one of them.

- [Pandoc](https://pandoc.org/), which you can use for converting from Markdown to HTML (say), lets you write custom [filters](https://pandoc.org/filters.html) that operate on the Abstract Syntax Tree (AST) that Pandoc has parsed.

- [MathJax](https://www.mathjax.org/) has a library [`mathjax-node`](https://github.com/mathjax/MathJax-node) which lets you typeset (render) the mathematics server-side. This way when someone views the page, they will see already typeset mathematics, without needing to have JavaScript running and waiting until it renders it.

What you see here in this repository is a filter that you can use with Pandoc for converting mathematics to (say) SVG.

# Acknowledgements / context
Apart from Pandoc and MathJax, it uses [pandoc-filter-node](https://github.com/mvhenderson/pandoc-filter-node).

For more context, see [this thread](https://github.com/jgm/pandoc/issues/3153). Here's some background: if we use the `tex2svg` binary distributed with `mathjax-node`, and invoke the binary each time we need to convert any Math node (in Pandoc) to SVG, then we incur the cost of startup of `tex2svg` (takes about 1 second) for each bit of mathematics we need to typeset. For example, with [such a filter](https://gist.github.com/shreevatsa/7be352a692fef4cdccc76d03b9f12bf8), it [can take](https://github.com/jgm/pandoc/issues/3153#issuecomment-343199416) about a minute to typeset a mere 480-line file (which has about 90 instances of mathematics on it). Instead, with this filter (the one in this repository), the same file [may take](https://github.com/jgm/pandoc/issues/3153#issuecomment-343199416) less than two seconds to typeset.

The code is mostly straightforward and written in imitation of the example [pandoc-tex2svg](https://github.com/jgm/pandoc-tex2svg) by the author of Pandoc, and copies some code from the internals of `pandoc-filter-node` (see [here](https://github.com/mvhenderson/pandoc-filter-node/issues/7)).

# TODO
- Improve the filter (report errors, deal with TeX parse errors).
- Add more options, such as HTML output (will need CSS and fonts) instead of SVG.
- Should display math be wrapped in `<p align="center">`? Or some CSS needs to be included even for SVG?
- Figure out proper way to specify dependencies and make this installable with `npm install`.
- Publish to npm?
