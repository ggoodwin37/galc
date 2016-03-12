
// three pieces of state:
//  memory: the float value in memory, result of last calculation
//  op: the current operation in progress, if any
//  input: the current input, represented as a string
var state = {
    memory: 0,
    op: null,
    input: '0'
};

function clearState() {
    state.memory = 0;
    state.op = null;
    state.input = '0';
    setResultDisplay(state.input);
}

function resetInput() {
    // reset input to default state so we reset display next time.
    state.input = '0';
}

function setResultDisplay(displayStr) {
    $('.calc-result-row').text(displayStr);
}

function handleDigit(digitStr) {
    // special cases for initial state
    if (state.input === '0') {
        // don't show multiple zeroes
        if( digitStr === '0') {
            return;
        }
        // don't show leading zero
        state.input = digitStr;
    } else {
        // normal case: just append the new digit to the end
        state.input += digitStr;
    }
    setResultDisplay(state.input);
}

function handleBinaryOperator(op) {
    if (state.op !== null) {
        handleEquals();
    } else {
        state.memory = parseFloat(state.input);
    }
    resetInput();
    state.op = op;
}

function handleOpposite() {
    state.input = '' + (-1 * parseFloat(state.input));
    setResultDisplay(state.input);
}

function handleDecimal() {
    if (state.input.indexOf('.') === -1) {
        state.input += '.';
    }
    setResultDisplay(state.input);
}

function handlePercent() {
    state.input = '' + (parseFloat(state.input) / 100);
    setResultDisplay(state.input);
}

function handleEquals() {
    if (state.op === null) {
        return;
    }

    var inputVal = parseFloat(state.input);
    var result;
    switch(state.op) {
    case 'add':
        result = state.memory + inputVal;
        break;
    case 'subtract':
        result = state.memory - inputVal;
        break;
    case 'multiply':
        result = state.memory * inputVal;
        break;
    case 'divide':
        result = state.memory / inputVal;
        break;
    default:
        console.error('unexpected state.op');
        break;
    }
    setResultDisplay(result);
    state.memory = result;
    state.op = null;
    resetInput();
}

function handleKey(buttonKey) {
    if (/^num-/.test(buttonKey)) {
        handleDigit(buttonKey.substring(4));
        return;
    }

    switch(buttonKey) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
        handleBinaryOperator(buttonKey);
        break;
    case 'opposite':
        handleOpposite();
        break;
    case 'decimal':
        handleDecimal();
        break;
    case 'percent':
        handlePercent();
        break;
    case 'clear':
        clearState();
        break;
    case 'equals':
        handleEquals();
        break;
    default:
        console.error('unexpected buttonKey: ' + buttonKey);
        break;
    }
}

function main() {
    clearState();

    // attach key handler delegate
    $('.calc-main').on('click', '.calc-button', function(ev) {
        var buttonKey = $(ev.target).attr('data-button-key');
        handleKey(buttonKey);
    });
}
