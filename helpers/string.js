/**
 * @example
 *  capitalize('fooBar'); // 'FooBar'
 *  capitalize('fooBar', true); // 'Foobar'
 */
const capitalize = ([first, ...rest], lowerRest = false) => {
  return (
    first.toUpperCase() +
    (lowerRest ? rest.join('').toLowerCase() : rest.join(''))
  )
}

/**
 * @example
 *  decapitalize('FooBar'); // 'fooBar'
 *  decapitalize('FooBar', true); // 'fOOBAR'
 */
const decapitalize = ([first, ...rest], upperRest = false) => {
  return (
    first.toLowerCase() +
    (upperRest ? rest.join('').toUpperCase() : rest.join(''))
  )
}

/**
 * @example
 *  toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
 *  toCamelCase('Some label that needs to be camelized'); // 'someLabelThatNeedsToBeCamelized'
 *  toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
 *  toCamelCase('some-mixed_string with spaces_underscores-and-hyphens'); // 'someMixedStringWithSpacesUnderscoresAndHyphens'
 */
const toCamelCase = (str) => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('')
  return s.slice(0, 1).toLowerCase() + s.slice(1)
}

const toKebabCase = (str) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('-')
  )
}

const toSnakeCase = (str) => {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join('_')
  )
}

/**
 * 文字列から数値を分割
 * @example
 *  splitStrNumber('test1 test2') // ["test", "1", " test", "2"]
 */
const splitStrNumber = (str) => {
  return str.split(/(\d+)/).filter(Boolean)
}

export {
  capitalize,
  decapitalize,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  splitStrNumber
}
