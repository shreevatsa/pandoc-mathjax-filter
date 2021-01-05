
const pandoc = require("pandoc-filter");
const RawInline = (string) => pandoc.RawInline('html', string);

async function main() {
    const MathJax = await require('mathjax').init({
        loader: {load: ['input/tex-full', 'output/svg']},
    });

    async function action({ t: type, c: value }, format, meta) {
        if (!(type == 'Math' || type == 'RawInline' && value[0] == 'tex')) return null;
        console.error(`In typesetAction with value ${JSON.stringify(value)} and format ${format} and meta ${JSON.stringify(meta)}`);
        // The `value` is something like: [{"t":"InlineMath"},"\\pi r^2"]
        const isInlineMath = (type == 'Math' && value[0].t == 'InlineMath');
        const node = MathJax.tex2svg(value[1], {
            display: !isInlineMath,
        });
        const html = MathJax.startup.adaptor.outerHTML(node);
        return isInlineMath ?
            RawInline('<span class="math inline">' + html + '</span>') :
            RawInline('<p align="center"><span class="math display">' + html + '</span></p>');
    }
    pandoc.stdio(action);
    // TODO: This needs to be added to the header somehow.
    try {
        // This function exists, but returns null? https://github.com/mathjax/MathJax/issues/2542
        MathJax.startup.document.outputJax.svgStyles = null;
        const style = MathJax.svgStylesheet();
        console.error(MathJax.startup.adaptor.outerHTML(style));
    } catch (e) {
        console.error(e);
    }
}

try {
    main();
} catch (e) {
    console.error(e);
}
