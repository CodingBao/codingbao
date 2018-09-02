#! /usr/bin/env node

let fs = require("fs")
let dirName = process.argv[2]

if (!fs.existsSync(dirName)) {

    fs.mkdirSync(dirName)
    process.chdir(dirName)
    fs.mkdirSync("css")
    fs.mkdirSync("js")
    fs.writeFileSync("index.html", "<!DOCTYPE>")
    fs.appendFileSync("index.html", "\n")
    fs.appendFileSync("index.html","<title>Hello</title>")
    fs.appendFileSync("index.html", "\n")
    fs.appendFileSync("index.html", "<h1>Hi</h1>")
    fs.writeFileSync("css/style.css", "h1{color: red;}")
    fs.writeFileSync("js/main.js", "var string = \"Hello World\"")
    fs.appendFileSync("js/main.js", "\n")
    fs.appendFileSync("js/main.js", "alert(string)")
    console.log("success create " + dirName)
} else {
    console.log("Error dir exists")
}