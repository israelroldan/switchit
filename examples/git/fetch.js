const Command = require('../../index.js').Command;

class Fetch extends Command {
    execute (params) {
        console.log(`${this.name}... "${params.remote}"`);
    }
}

Fetch.define({
    help: {
        '': 'Fetches changes from a remote',
        'remote': 'The remote to fetch changes from'
    },
    parameters: 'remote'
});

module.exports = Fetch;