
const pandoc = require("pandoc-filter");
const RawInline = (string) => pandoc.RawInline('html', string);

async function main() {
    const MathJax = await require('mathjax').init({
        loader: {load: ['input/tex-full', 'output/chtml']}
    });

    async function action({ t: type, c: value }, format, meta) {
        if (type != 'Math') return null;
        // The `value` is something like: [{"t":"InlineMath"},"\\pi r^2"]
        const isInlineMath = (value[0].t == 'InlineMath');
        const node = MathJax.tex2chtml(value[1], {
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
      const style = MathJax.chtmlStylesheet();
      let tmp = style.outerHTML;
      // console.error(style.outerHTML);
      // console.error(MathJax.startup.adaptor.outerHTML(style));
  } catch (e) {
      console.error(e);
  }
}

main();
