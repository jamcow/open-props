const brandColours = {
    brand: {
        plum: "#564f7c",
        teal: "#41778b",
        orange: "#dd923b",
        moave: "#948dbc",
        electra: "#53c6db",
        toxic: "#83f400",
    },
    grey: {
        100: "#f4f0f0",
        200: "#e6e6e6",
        300: "#c4c4c4",
        400: "#7c7c7c",
        500: "#222222",
    },
    green: {
        100: "#78c350",
        200: "#629d35",
        300: "#4e8331",
        400: "#297201",
        500: "#205a00",
    },
    red: {
        100: "#fc7c7c",
        200: "#ff5d5d",
        300: "#e22a2a",
        400: "#be2d2d",
        500: "#980000",
    },
    blue: {
        100: "#7aa1fa",
        200: "#125aff",
        300: "#0b3ba8",
        400: "#02236e",
        500: "#001952",
    },
};

const Color = (await import('https://colorjs.io/dist/color.esm.js')).default
// const Color = (await import('../node_modules/colorjs.io/dist/color.esm.js')).default

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
      if (isNaN(coord)) {
        coord = 0;
      }
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