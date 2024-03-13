const chokidar = require('chokidar');
const { exec } = require("child_process");

function copyPackageSource(path) {
    console.log(`Change is appeared at ${path}`)
    const command = "rm -rf lib && mkdir lib && cp -r ../src lib/src && cp ../package.json lib/package.json"
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
}

console.log("Listening ../src folder for updates on package source")

const folderToWatch = '../src';

const watcher = chokidar.watch(folderToWatch, {
    persistent: true,
});

watcher
    .on('add', copyPackageSource)
    .on('change', copyPackageSource)

