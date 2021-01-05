
const katex = require('katex'); 
const pandoc = require("pandoc-filter");
const RawInline = (string) => pandoc.RawInline('html', string);

async function action({ t: type, c: value }, format, meta) {
  if (!(type == 'Math' || type == 'RawInline' && value[0] == 'tex')) return null;
  // The `value` is something like: [{"t":"InlineMath"},"\\pi r^2"]
  const isInlineMath = (value[0].t == 'InlineMath');
  const html = katex.renderToString(value[1], {
    displayMode: !isInlineMath,
    throwOnError: false,
  });
  return isInlineMath ?
    RawInline('<span class="math inline">' + html + '</span>') :
    RawInline('<p align="center"><span class="math display">' + html + '</span></p>');
}

pandoc.stdio(action);
