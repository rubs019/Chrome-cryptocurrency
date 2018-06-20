const updateManifest = require('./deploy-v0')
const exec = require('child_process').exec
const fs = require('fs')
const archiver = require('archiver')

// The zip library needs to be instantiated:
let currentVersionOfApp = null

updateManifest()
  .then((manifestVersion) => {
    console.log('--- Building de l\'application --- ')
    currentVersionOfApp = manifestVersion
    return buildApp()
  })
  .then((distPath) => {
    console.log('--- Compression de l\'application --- ')
    return zipApp(distPath)
  })
  .then(() => {
    console.log('success !')
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })


function buildApp(){
  return new Promise((resolve, reject) => {
    exec('yarn run build', (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`stdout: ${stdout}`);
      console.log('---- BUILD COMPLETE ---- ')
      resolve('../dist')
    })
  })
}

function zipApp(path){
  return new Promise((resolve, reject) => {

    fs.stat(path, (err, stats) => {
      if (err) throw err

      // Check if the path point to a directory
      if(stats.isDirectory()) {
        fs.readdir(path, (err, files) => {
          if (err) reject(err)

          const output = fs.createWriteStream(`dist.zip`)
          const archive = archiver('zip', {zlib: {level: 9}})

          archive.pipe(output)

          archive.directory(path, false)

          archive.finalize()

          return resolve()

        })
      } else {
        return reject(new Error('The file isn\'t directory'))
      }
    })
  })
}

buildApp()

// First thing:
// Create the dist folders
// Check if dist folders is correctly created
// Update the manifest
// Zip the dist folders
// Upload
