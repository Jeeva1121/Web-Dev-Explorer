const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.js');
let text = fs.readFileSync(dataPath, 'utf8');

function addProps(id, propsArray) {
    const rx = new RegExp('({[ \t]*id:[ \t]*[\'"`]' + id + '[\'"`][^{}]*?),[ \t]*syntax:', 'g');
    const propsStr = JSON.stringify(propsArray);
    text = text.replace(rx, "$1, props: " + propsStr + ", syntax:");
}

addProps('textarea', [
    { name: 'rows', desc: 'Number of visible text lines.' },
    { name: 'cols', desc: 'Number of visible text width.' },
    { name: 'placeholder', desc: 'Hint text shown when empty.' }
]);

addProps('video', [
    { name: 'src', desc: 'Video file URL.' },
    { name: 'controls', desc: 'Show play/pause buttons.' },
    { name: 'autoplay', desc: 'Start playing automatically.' },
    { name: 'loop', desc: 'Restart when finished.' },
    { name: 'poster', desc: 'Image shown before video plays.' }
]);

addProps('iframe', [
    { name: 'src', desc: 'URL of the page to embed.' },
    { name: 'width', desc: 'Width of the frame.' },
    { name: 'height', desc: 'Height of the frame.' }
]);

addProps('button', [
    { name: 'type', desc: 'submit, reset, or button.' },
    { name: 'disabled', desc: 'Disables the button.' }
]);

addProps('border', [
    { name: 'border', desc: 'Outline of the element.' },
    { name: 'border-radius', desc: 'Rounds the corners.' }
]);

addProps('font', [
    { name: 'font-family', desc: 'Typeface (e.g., Arial, Inter).' },
    { name: 'font-size', desc: 'Size of the text.' },
    { name: 'font-weight', desc: 'Boldness (400, 700).' }
]);

addProps('text', [
    { name: 'text-align', desc: 'Alignment (left, center, right).' },
    { name: 'line-height', desc: 'Vertical space between lines.' },
    { name: 'text-transform', desc: 'Uppercase, lowercase, capitalize.' }
]);

addProps('transition', [
    { name: 'transition', desc: 'Shorthand for property, duration, timing-function.' }
]);

addProps('transform', [
    { name: 'transform', desc: 'Translate, scale, rotate, skew.' }
]);

addProps('filter', [
    { name: 'filter', desc: 'Visual effects like blur(), brightness().' }
]);

addProps('css-z-index', [
    { name: 'z-index', desc: 'Stack order (which is on top).' }
]);

addProps('css-overflow', [
    { name: 'overflow', desc: 'Handles content that overflows its container (visible, hidden, scroll, auto).' }
]);

addProps('css-cursor', [
    { name: 'cursor', desc: 'Mouse pointer appearance (pointer, not-allowed, help).' }
]);

fs.writeFileSync(dataPath, text, 'utf8');
console.log('Props injected completely');
