module.exports = {
  name: 'sqlite',
  theme: 'markdown',
  readme: 'api-doc.md',
  externalPattern: 'node_modules',
  module: 'commonjs',
  exclude: '**/__tests__/**/*.ts',
  excludeProtected: true,
  excludePrivate: true,
  excludeNotExported: true,
  target: 'ES6',
  mode: 'modules'
}
