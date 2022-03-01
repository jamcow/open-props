const brandColours = {
    brand: {
        teallight: "#86b6b6",
        teal: "#66a3a1",
        red: "#d84161",
        yellowlight: "#e2d66f",
        yellow: "#d9ca45",
    },
};

const Color = (await import('https://colorjs.io/dist/color.esm.js')).default

const colors = Object
  .entries(brandColours)
  .filter(group => typeof group[1] === 'object')

const customizeIncrements = num =>
  num === '50'
    ? num.replaceAll('50', '0')
    : num.replaceAll('0', '')

const hexTOhsl = hex =>
  new Color(hex).to('hsl')
    .coords.map(Math.round)
    .reduce((acc, coord, index) => {
      if (index > 0)
        return acc += ' ' + coord + '%'
      else
        return acc += coord
    }, '')

const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const groupedObject = colors.reduce((root, [basename, color]) => {
  let base = `'--${basename}-`
  root += `\n\nexport const ${capitalizeFirstLetter(basename)} = {`

  Object.entries(color).forEach(([num, hex]) =>
    root += `
  ${base}${customizeIncrements(num)}-hsl': '${hexTOhsl(hex)}',`
  )

  root += '\n}'

  return root
}, ``)

const groupedObjectHex = colors.reduce((root, [basename, color]) => {
  let base = `'--${basename}-`
  root += `\n\nexport const ${capitalizeFirstLetter(basename)} = {`

  Object.entries(color).forEach(([num, hex]) =>
    root += `
  ${base}${customizeIncrements(num)}': '${hex}',`
  )

  root += '\n}'

  return root
}, ``)

const channels = colors.reduce((root, [basename, color]) => {
  let base = `--${basename}-`

  Object.entries(color).forEach(([num, hex]) =>
    root += `
    ${base}${customizeIncrements(num)}-hsl: '${hexTOhsl(hex)}',`
  )

  return root
}, ``)

const vars = colors.reduce((root, [basename, color]) => {
  let base = `--${basename}-`

  Object.entries(color).forEach(([num, hex]) =>
    root += `
    ${base}${customizeIncrements(num)}: ${hex};`
  )

  return root
}, ``)

console.log(groupedObject)
console.log(groupedObjectHex)
// console.log(vars)
// console.log(channels)