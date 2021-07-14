import puppeteer from 'puppeteer'
import fs from "fs"
import os from "os"
import readline from "readline"

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Node.js');

    // Create an instance of readline interface.
    const read_line_interface = readline.createInterface({
        // Assign process.stdin as input.
        input: process.stdin,
        // Assign process.stdout as output. 
        output: process.stdout
    });

  // Get the "viewport" of the page, as reported by the page.
  const data = await page.evaluate(() => {
    const headings = document.querySelectorAll('div[class=mw-body]')
        let content:any  =""
        for (let i = 0; i < headings.length; i++) {
            var iter = document.createNodeIterator(headings[i], NodeFilter.SHOW_TEXT),
            textnode;
            while (textnode = iter.nextNode()) {
               content += textnode.textContent
            }
        }
        return content;
  });

  read_line_interface.question("Enter path:  ", (path:string) =>  {
    fs.appendFile(__dirname + path, data + os.EOL, (error)=>{
        if (error) throw error
        console.log("write success")
    })
});




  await browser.close();
})();