let bitMode = 8;

function setBits(n) {
    bitMode = n;
    document.querySelectorAll('.bit-btn').forEach(b => b.classList.remove('active'));
    const ids = { 8: 'btn8', 16: 'btn16', 0: 'btnfull' };
    if (ids[n]) document.getElementById(ids[n]).classList.add('active');
}

function clampBits(val) {
    if (bitMode === 0) return val;
    const max = (2 ** bitMode) - 1;
    return Math.max(0, Math.min(max, Math.floor(val)));
}

function fromDec(val) {
    if (!val) return;
    const v = clampBits(parseInt(val));
    document.getElementById('conv-results').style.display = 'grid';
    document.getElementById('r-dec').textContent = v;
    document.getElementById('r-bin').textContent = v.toString(2).padStart(bitMode || 1, '0');
    document.getElementById('r-hex').textContent = '0x' + v.toString(16).toUpperCase();
    document.getElementById('r-oct').textContent = '0' + v.toString(8);
}

function solveOhm() {
    const v = parseFloat(document.getElementById('ohm-V').value);
    const i = parseFloat(document.getElementById('ohm-I').value);
    const r = parseFloat(document.getElementById('ohm-R').value);

    if (!isNaN(i) && !isNaN(r)) {
        const res = i * r;
        document.getElementById('ohm-V').value = res.toFixed(2);
        document.getElementById('ohm-result-val').textContent = res.toFixed(2) + " V";
        document.getElementById('ohm-result').style.display = 'flex';
    }
}

function decodeResistor() {
    const b1 = parseInt(document.getElementById('band1').value);
    const b2 = parseInt(document.getElementById('band2').value);
    const mult = parseFloat(document.getElementById('band3').value);
    const res = (b1 * 10 + b2) * mult;
    document.getElementById('res-result').textContent = res.toLocaleString() + " Ω";
}

function scaleData() {
    const val = parseFloat(document.getElementById('data-val').value);
    if (isNaN(val)) return;
    document.getElementById('data-display').textContent = (val / 8).toFixed(2) + " MB";
}

function copyVal(id) {
    const text = document.getElementById(id).textContent;
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}

// Initialize
decodeResistor();