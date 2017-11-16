#!/usr/bin/env node

const RawInline = function(format, string) {
  return {
    t: 'RawInline',
    c: [format, string],
  };
};

const PandocMath = function(value) {
  return {
    t: 'Math',
    c: value,
  };
};

var mjAPI = require("mathjax-node");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();

async function typesetAction(type, value, format, meta) {
  if (type == 'Math') {
    var isInline = (value[0].t == 'InlineMath');
    var data = await mjAPI.typeset({
      math: value[1],
      format: (isInline ? 'inline-TeX' : 'TeX'),
      svg: true,
      linebreaks: true,
    });
    if (!data.errors && data.svg != '') {
      if (isInline) {
        return RawInline('html', '<span class="math inline">' + data.svg + '</span>');
      } else {
        return RawInline('html', '<p align="center"><span class="math display">' + data.svg + '</span></p>');
      }
    } else {
      return PandocMath(value);
    }
  }
  return null;
}

// Cannot use this: See https://github.com/mvhenderson/pandoc-filter-node/issues/7 (and 1)
// pandoc.stdio(action);

async function walk(x, action, format, meta) {
  if (Array.isArray(x)) {
    const array = [];
    for (const item of x) {
      if (item === Object(item) && item.t) {
        var res = await action(item.t, item.c || [], format, meta);
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
  }
  else if (x === Object(x)) {
    var obj = {};
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

function toJSONFilter(action) {
  require('get-stdin')(function (json) {
    var data = JSON.parse(json);
    var format = (process.argv.length > 2 ? process.argv[2] : '');
    filter(data, action, format).then(output => process.stdout.write(JSON.stringify(output)));
  });
}

toJSONFilter(typesetAction);
