
const katex = require('katex');

// The "action" that is used later below
async function typesetAction(type, value, format, meta) {
  if (!(type == 'Math' || type == 'RawInline' && value[0] == 'tex')) return null;
  console.error(`In typesetAction with value ${JSON.stringify(value)} and format ${format} and meta ${JSON.stringify(meta)}`);
  const isInline = (value[0].t == 'InlineMath');
  const html = katex.renderToString(value[1], {
    displayMode: !isInline,
    throwOnError: false,
  });
  return isInline ?    
    {t: 'RawInline', c: ['html', '<span class="math inline">' + html + '</span>']} :
    {t: 'RawInline', c: ['html', '<p align="center"><span class="math display">' + html + '</span></p>']};
}

// The rest of this file is for walking the JSON tree and calling the above function for math elements.
async function walk(x, action, format, meta) {
  if (Array.isArray(x)) {
    const array = [];
    for (const item of x) {
      if (item === Object(item) && item.t) {
        const res = await action(item.t, item.c || [], format, meta);
        if (!res) {
          array.push(await walk(item, action, format, meta));
        }
        else if (Array.isArray(res)) {
          for (const z of res) {
            array.push(await walk(z, action, format, meta));
          };
        }
        else {
          array.push(await walk(res, action, format, meta));
        }
      }
      else {
        array.push(await walk(item, action, format, meta));
      }
    }
    return array;
  } else if (x === Object(x)) {
    const obj = {};
    for (const k of Object.keys(x)) {
      obj[k] = await walk(x[k], action, format, meta);
    }
    return obj;
  }
  return x;
}

async function filter(data, action, format) {
  return await walk(data, action, format, data.meta || data[0].unMeta);
}

// See "For details of how to read from stdin" at https://nodejs.org/api/process.html#process_process_stdin
async function getStdin() {
  process.stdin.setEncoding('utf8');
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return chunks.join('');
}

async function toJSONFilter(action) {
  const json = await getStdin();
  const data = JSON.parse(json);
  // argv is an array like:
  // argv[0] = "/usr/local/bin/node"
  // argv[1] = "/path/to/pandoc-filter-katex.js"
  // argv[2] = "html5"
  const format = (process.argv.length > 2 ? process.argv[2] : '');
  const output = await filter(data, action, format);
  process.stdout.write(JSON.stringify(output));
}

toJSONFilter(typesetAction);
