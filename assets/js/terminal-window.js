var TerminalWindow = function (opts) {
    opts = opts || {};

    this.speed = opts.speed || 80;
    this.delimiter = opts.delimiter || '$ ';
    this.cliCls = opts.cliCls || 'cli';
    this.codeCls = opts.codeCls || 'code';
    this.scriptsPath = opts.scriptsPath || '.';
    this.cliEl = document.getElementsByClassName(this.cliCls)[0];
    this.codeEl = document.getElementsByClassName(this.codeCls)[0];
};

TerminalWindow.prototype.loadScript = function (name, done) {
    var me = this;
    if (!name.endsWith('.json')) {
        name += '.json';
    }
    me.scriptName = me.scriptsPath + '/' + name;
    me._getJSON(me.scriptName, function (object) {
        me._script = object.script;
        me.codeEl.innerHTML = '<pre data-src="' + me.scriptsPath + '/' + name.slice(0,-2) + '"></pre>';
        done();
    });
};

TerminalWindow.prototype._getJSON = function (url, onSuccess, onError) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            onSuccess(JSON.parse(request.responseText));
        } else {
            onError(request);
        }
    };

    request.onerror = onError;

    request.send();
};

TerminalWindow.prototype.standby = function (clearScript) {
    this.cancel = true;
    this.processing = false;
    if (clearScript) {
        this.script = this._script = [];
    }
};

TerminalWindow.prototype.processScript = function (script) {
    var me = this;
    me.script = (me._script || script || []).slice();
    me.processing = me.scriptName + new Date().getTime();
    me.cancel = false;
    me.cliEl.innerHTML = '';

    function next () {
        var instruction = me.script.shift();
        if (instruction) {
            me[instruction[0]](instruction, next);
            me.cliEl.scrollTop = me.cliEl.scrollHeight;
        } else {
            me.processing = false;
        }
    }

    next();
};

TerminalWindow.prototype.type = function(instruction, done) {
    var me = this;
    var remainder = instruction[1].split('');
    var script = me.processing;
    function go() {
        var deviation = me.speed * (1 - Math.random() / 2);
        me.wait = deviation;
        setTimeout(function () {
            me.wait = 0;
            var out = remainder.splice(0, 1);
            if (me.cancel === true || me.processing !== script) {
                return;
            }
            me.cliEl.innerHTML = me.cliEl.innerHTML.replace('█', '');
            me.cliEl.innerHTML = me.cliEl.innerHTML + out + '█';
            if (remainder.length < 1) {
                if (done) {
                    done();
                }
                return;
            } else if (me.cancel === false) {
                go();
            }
        }, deviation);
    }
    if (me.cancel === false) {
        go();
    }
};

TerminalWindow.prototype.prompt = function(instruction, done) {
    var me = this;
    me.cliEl.innerHTML = me.cliEl.innerHTML.replace('█', '');
    me.cliEl.innerHTML = me.cliEl.innerHTML + ((instruction[1]!==false) ? me.delimiter : '') + ' █';
    if (done) {
        done();
    }
};

TerminalWindow.prototype.line = function(instruction, done) {
    var me = this;
    me.cliEl.innerHTML = me.cliEl.innerHTML.replace('█', '');
    me.cliEl.innerHTML = me.cliEl.innerHTML + '<br>' + ((instruction[1]!==false) ? me.delimiter : '') + '█';
    if (done) {
        done();
    }
};

TerminalWindow.prototype.sleep = function (instruction, done) {
    var me = this;
    me.wait = instruction[1] || 500;
    setTimeout(function() {
        me.wait = 0;
        if (done) {
            done();
        }
    }, me.wait);
};

TerminalWindow.prototype.send = function (instruction, done) {
    var me = this;
    me.cliEl.innerHTML = me.cliEl.innerHTML.replace('█', '');
    me.cliEl.innerHTML += instruction[1];
    if (done) {
        done();
    }
};

TerminalWindow.prototype.return = function (instruction, done) {
    var me = this;
    me.cliEl.innerHTML = me.cliEl.innerHTML.slice(0, -(instruction[1]+1));
    if (done) {
        done();
    }
};