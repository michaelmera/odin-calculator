let state = {
    power: 0,
    last: {n1: '42', n2: '0', op: 'add'},
    curr: {n1: '12', n2: '9', op: 'add'},
};

document.querySelectorAll('.digits button').forEach((b) => {
    b.addEventListener('click', (e) => {
        if (state.curr.n2 === undefined) {
            state.curr.n1 += b.dataset['action'];
        } else {
            state.curr.n2 += b.dataset['action'];
        }
        display(state.curr, state.last);
    });
});

document.querySelectorAll('.operators button').forEach((b) => {
    b.addEventListener('click', (e) => {
        if (state.curr.n2 !== undefined) {
            state.last = state.curr;
            state.curr = {n1: String(operate(state.last)), n2: '', op: b.dataset['action']};
        } else {
            if (state.curr.n1 === undefined || state.curr.n1 === '') {
                state.curr.n1 = operate(state.last);
            }
            state.curr.op = b.dataset['action'];
            state.curr.n2 = '';
        }
        display(state.curr, state.last);
    });
});

document.querySelector('button.equal').addEventListener('click', (e) => {
        state.last = state.curr;
        state.curr = {n1: '', n2: undefined, op: undefined};
        display(state.curr, state.last);
});

function operate(operation) {
    if (operation.n2 === undefined || operation.n2 === '') {
        return Number(operation.n1);
    }

    let res;
    switch (operation.op) {
        case 'add':
            res = Number(operation.n1) + Number(operation.n2);
            break;
        case 'mul':
            res = Number(operation.n1) * Number(operation.n2);
            break;
        case 'div':
            res = Number(operation.n1) / Number(operation.n2);
            break;
        case 'sub':
            res = Number(operation.n1) - Number(operation.n2);
            break;
        default:
            res = Number(operation.n1);
    };

    return res;
}

function display(curr, last) {
    const operations = {
        'add': '+',
        'mul': 'x',
        'div': '/',
        'sub': '-',
    };

    let currentLine = curr.n1;
    if (curr.op !== undefined) {
        currentLine += ` ${operations[curr.op]}`;
    }

    if (curr.n2 !== undefined) {
        currentLine += ` ${curr.n2}`;
    }
    document.querySelector('.screen .curr').textContent = `${currentLine}_`;
    document.querySelector('.screen .last').textContent = `${operate(last)}`;
}

display(state.curr, state.last);