const fs = require('fs')
const pathFile = '../src/manifest.json'
const readline = require('readline');
let fullManifest = null

module.exports = () => {
  return new Promise((resolve, reject) => {
    findManifest(pathFile)
      .then((path) => readManifest(path))
      .then(manifest => createCopy(manifest))
      .then(manifest => findVersion(manifest))
      .then((version) => updateVersion(version))
      .then((newVersion) => updateManifest(newVersion))
      .then((manifestVersion) => resolve(manifestVersion))
      .catch((err) => {
        return reject(err)
      })
  })
}

/**
* Find the manifest
* @return Promise<string> - Path of manifest
*/
function findManifest(path){
	return new Promise((resolve, reject) => {
		fs.access(path, fs.constants.F_OK, (err) => {
			if (!err) {
				return resolve(pathFile)
			}
			return reject(new Error('Aucun manifest.json trouvé'))
		})
	})
}

function findVersion(manifest){
	let tempManifest = manifest

	if (typeof(manifest) !== 'object') {
		try {
			tempManifest = JSON.parse(manifest)
		} catch(e) {
			throw new Error(e)
		}
	}

	return tempManifest.version
}

function readManifest(path){
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf-8', (err, file) => {
			if (err) { return reject(err) }

			fullManifest = JSON.parse(file)
			return resolve(file)
		})
	})
}

function updateManifest(manifestVersion){
	return new Promise((resolve, reject) => {
		console.log('Le manifest va etre update avec la version', manifestVersion)
		fullManifest.version = manifestVersion
		fs.writeFile(pathFile, JSON.stringify(fullManifest, null, 2), 'utf-8', (err) => {
			reject(err)
		})

		resolve(manifestVersion)
	})
}

function updateVersion(version){
	return new Promise((resolve, reject) => {
		let tempVersion = version

		if (typeof(version) !== 'number') {
			try {
				tempVersion = parseFloat(version)
			} catch(e) {
				throw new Error(e)
			}
		}

		const rl = readline.createInterface({
		  input: process.stdin,
		  output: process.stdout
		});



		rl.question(`A quel version voulez-vous passer (Actuel: ${version}) ? `, (answer) => {
		  // TODO: Log the answer in a database

		  	rl.close();

		  	const confirmQuestion = readline.createInterface({
				  input: process.stdin,
			  	output: process.stdout
			})

			confirmQuestion.question(`Confirmez version: ${answer} ? (y/n) `, (confirmResponse) => {
				switch (confirmResponse) {
		  			case 'y':
		  			case '':
			  			tempVersion = answer
						  resolve(tempVersion)
			  			break
				  	case 'n':
				  		reject(new Error('Update version annulé par l\'utilisateur'))
				  		break
				  	default:
				  		console.log('Veuillez selectionner (y/n)')
				  		break
		    	}
				confirmQuestion.close()
			})
		});

	})
}

function createCopy(manifest){
	return new Promise((resolve, reject) => {
		fs.writeFile('../src/manifest_old.json', manifest, (err) => {
			return reject(err)
		})
		console.log('A copy of manifest.json has been created')
		resolve(manifest)
	})
}
