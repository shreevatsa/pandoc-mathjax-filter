# pandoc-mathjax-filter
A Pandoc filter for typesetting (rendering) TeX snippets server-side, using mathjax-node

# Usage
Pass in `--filter pandoc-mathjax-svg-filter.js` to pandoc, for example:

    pandoc math-samples.md --filter ./pandoc-mathjax-svg-filter.js -s -t html5 -o math-samples.html

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
- Improve the filter (report errors etc).
- Add more options, such as HTML output (will need CSS and fonts) instead of SVG.
- Publish to npm?
