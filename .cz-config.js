module.exports = {

  types: [
    {value: '🌟',   name: 'feat:     A new feature'},
    {value: '🐞',   name: 'fix:      A bug fix'},
    {value: '📚',   name: 'docs:     Documentation only changes'},
    {value: '🎨',   name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)'},
    {value: '🚧',   name: 'refactor: A code change that neither fixes a bug nor adds a feature'},
    {value: '📈',   name: 'perf:     A code change that improves performance'},
    {value: '🔢',   name: 'test:     Adding missing tests'},
    {value: '🔩',   name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation'},
    {value: '🔙',   name: 'revert:   Revert to a commit'},
    {value: '🙈',   name: 'WIP:      Work in progress'}
  ],

  scopes: [
    {name: 'Argument parsing'},
    {name: 'Command dispatching'},
    {name: 'Containers'},    
    {name: 'Built-in commands'},
    {name: 'Command output'},
    {name: 'Miscelaneous'}
  ],
  
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']

};