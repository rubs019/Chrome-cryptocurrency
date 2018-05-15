const updateManifest = require('./deploy-v0')
const exec = require('child_process').exec
const JSZip = require("jszip");
const fs = require('fs')

// The zip library needs to be instantiated:
let currentVersionOfApp = null

/*updateManifest()
.then((manifestVersion) => {
  console.log('--- Building de l\'application --- ')
  currentVersionOfApp = manifestVersion
  return buildApp()
})
.then(() => {
  console.log('--- Compression de l\'application --- ')
  zipApp()
})*/
zipApp()


function buildApp(){
  return new Promise((resolve, reject) => {
    exec('yarn run build', (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`stdout: ${stdout}`);
      console.log('---- BUILD COMPLETE ---- ')
      resolve()
    })
  })
}

function zipApp(){
  const zip = new JSZip()
  zip.file("hello.txt", "Hello World\n");
  console.log(zip.files['./test-folder/'])
  zip
    .generateNodeStream({type:'nodebuffer',streamFiles:true})
    .pipe(fs.createWriteStream('outs.zip'))
    .on('finish', function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log("outs.zip written.");
    });
}
