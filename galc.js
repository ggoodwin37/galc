


function main() {
    // attach handlers
    $('.calc-main').on('click', '.calc-button', function(ev) {
        var buttonKey = $(ev.target).attr('data-button-key');
        console.log('button click: ', buttonKey);
    });

}
