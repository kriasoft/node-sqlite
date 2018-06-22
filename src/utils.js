/**
 * SQLite client library for Node.js applications
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

export function prepareParams(args, { offset = 0, excludeLastArg = false } = {}) {
  const hasOneParam = (args.length === (offset + 1 + (excludeLastArg ? 1 : 0)));
  if (hasOneParam) {
    return args[offset];
  }
  return Array.prototype.slice.call(args, offset, args.length - (excludeLastArg ? 1 : 0));
}

export function resolveTemplateStringObject(args, { offset = 0, excludeLastArg = false } = {}) {
  const hasOneParam = (args.length === (offset + 1 + (excludeLastArg ? 1 : 0)));
  if (hasOneParam && typeof args[offset] === 'object') {
    return {
      sql: args[offset].sql,
      params: args[offset].values,
    };
  }
  return {
    sql: args[offset],
    params: prepareParams(args, { offset: offset + 1, excludeLastArg }),
  };
}
