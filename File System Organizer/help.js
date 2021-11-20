function helpFn() {
    //In JS multiple line comments is done by ` `
    console.log(`
        List of all the Commands ->
            node main.js tree "directory_Path"
            node main.js organize "directory_Path"
            node main.js help
  `);
}

module.exports = {
    helpKey: helpFn,
};
