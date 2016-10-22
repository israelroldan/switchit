function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}
var terminal = new TerminalWindow({
    delimiter: '<span class="terminal-green">$</span> ',
    scriptsPath: 'examples'
});

terminal.loadScript('minimal', Prism.fileHighlight);

document.addEventListener("DOMContentLoaded", function() {
    var examples = document.getElementsByClassName('button-example');
    for (var i = 0; i<examples.length; i++) {
        examples[i].addEventListener('click', function (evt) {
            var me = evt.target;
            var oldActive = document.getElementsByClassName('button-example active')[0];
            if (me !== oldActive) {
                oldActive.classList.remove('active');
                me.classList.add('active');
                terminal.standby(true);
                terminal.loadScript(me.getAttribute('data-example'), function () {
                    Prism.fileHighlight();
                    terminal.processScript();
                });
            }
        });
    }
    window.addEventListener("scroll", function () {
        if (isScrolledIntoView(document.getElementsByClassName('terminal-window')[0])) {
            if (!terminal.processing) {
                terminal.processScript();
            }
        } else {
            terminal.standby();
        }
    });
});
