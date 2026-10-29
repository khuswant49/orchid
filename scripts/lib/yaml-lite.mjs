// Minimal YAML subset parser for Orchid's own files (no dependencies).
// Supports: nested maps by indentation, scalars (quoted or bare),
// inline lists [a, b], comments (#) outside quotes. Not a general YAML parser.

function stripComment(line) {
  let inS = false, inD = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inD) inS = !inS;
    else if (c === '"' && !inS) inD = !inD;
    else if (c === '#' && !inS && !inD && (i === 0 || /\s/.test(line[i - 1]))) return line.slice(0, i);
  }
  return line;
}

export function scalar(raw) {
  const v = raw.trim();
  if (v === '') return '';
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  if (v.startsWith('[') && v.endsWith(']')) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return splitTopLevel(inner).map(scalar);
  }
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v === 'null' || v === '~') return null;
  return v;
}

function splitTopLevel(s) {
  const out = []; let depth = 0, cur = '', inS = false, inD = false;
  for (const c of s) {
    if (c === "'" && !inD) inS = !inS;
    if (c === '"' && !inS) inD = !inD;
    if (!inS && !inD) {
      if (c === '[' || c === '(' || c === '{') depth++;
      if (c === ']' || c === ')' || c === '}') depth--;
      if (c === ',' && depth === 0) { out.push(cur); cur = ''; continue; }
    }
    cur += c;
  }
  if (cur.trim()) out.push(cur);
  return out;
}

export function parseYaml(text) {
  const root = {};
  const stack = [{ indent: -1, obj: root }];
  for (const rawLine of text.split(/\r?\n/)) {
    const line = stripComment(rawLine).replace(/\s+$/, '');
    if (!line.trim()) continue;
    const indent = line.match(/^ */)[0].length;
    const m = line.trim().match(/^("[^"]+"|'[^']+'|[^:]+?):(\s+(.*))?$/);
    if (!m) continue;
    const key = scalar(m[1]);
    const rest = m[3];
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) stack.pop();
    const parent = stack[stack.length - 1].obj;
    if (rest === undefined || rest.trim() === '') {
      parent[key] = {};
      stack.push({ indent, obj: parent[key] });
    } else {
      parent[key] = scalar(rest);
    }
  }
  return root;
}

// Front matter between --- fences at the top of a Markdown file.
export function frontMatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? parseYaml(m[1]) : {};
}

// All ```yaml fenced blocks in a Markdown file, parsed and merged in order.
export function yamlBlocks(md) {
  const out = {};
  for (const m of md.matchAll(/```ya?ml\r?\n([\s\S]*?)```/g)) Object.assign(out, parseYaml(m[1]));
  return out;
}
