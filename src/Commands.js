"use strict";

const Items = require('./Items');
const Value = require('./Value');

class Cmd extends Value {
    create (parent) {
        var cmd = new this.type();

        if (parent) {
            cmd.attach(parent, this.name);
        }

        return cmd;
    }
}

/**
 * This class manages a case-insensitive collection of named commands
 * @private
 */
class Commands extends Items {
    static get (owner) {
        return super.get(owner, 'commands');
    }

    constructor (owner, base) {
        super(owner, base, 'commands');
    }

    wrap (item) {
        if (item.isCmdlet) {
            item = {
                type: item
            };
        }

        return new Cmd(item);
    }
}

module.exports = Commands;