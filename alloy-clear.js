// Simplifies the filesystem for comparison

import fs from 'fs'

const path = './src/';
const filesToRemoveBase = [
    'index.css',
    'props.animations.css',
    'props.aspects.css',
    'props.blue-hsl.css',
    'props.blue.css',
    'props.borders.css',
    'props.brand-hsl.css',
    'props.brand.css',
    'props.colors-hsl.css',
    'props.colors.css',
    'props.cyan-hsl.css',
    'props.cyan.css',
    'props.easing.css',
    'props.fonts.css',
    'props.gradients.css',
    'props.grape-hsl.css',
    'props.grape.css',
    'props.gray-hsl.css',
    'props.gray.css',
    'props.grey-hsl.css',
    'props.grey.css',
    'props.green-hsl.css',
    'props.green.css',
    'props.indigo-hsl.css',
    'props.indigo.css',
    'props.lime-hsl.css',
    'props.lime.css',
    'props.orange-hsl.css',
    'props.orange.css',
    'props.pink-hsl.css',
    'props.pink.css',
    'props.red-hsl.css',
    'props.red.css',
    'props.shadows.css',
    'props.sizes.css',
    // 'props.svg.css',
    'props.teal-hsl.css',
    'props.teal.css',
    'props.violet-hsl.css',
    'props.violet.css',
    'props.yellow-hsl.css',
    'props.yellow.css',
    'props.zindex.css',
]

const filesToRemoveBaseTokens = [
    'open-props.figma-tokens.json',
    'open-props.figma-tokens.sync.json',
    'open-props.tokens.json',
]

filesToRemoveBase.forEach(file => {
    fs.unlink(`${path}${file}`, (err) => {
      if (err) {
        console.error(err)
        return
      }
    //   console.log('file removed');
    })
})

filesToRemoveBaseTokens.forEach(file => {
    fs.unlink(`./${file}`, (err) => {
      if (err) {
        console.error(err)
        return
      }
    //   console.log('file removed');
    })
})
