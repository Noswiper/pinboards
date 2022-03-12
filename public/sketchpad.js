// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;

async function getvalvedata() {
    const data = await fetch('./system1valves').then(response => response.json()).catch(error => console.log(error));
    console.log("data[0] = " + JSON.stringify(data[0]));
    console.log("data[0].valve = " + data[0].valve);
    const abc1 = data[0].status;
    const abc2 = data[1].status;
    const abc3 = data[2].status;
    console.log("abc1 status = " + abc1);
        localStorage.setItem("abc1status", abc1);
        localStorage.setItem("abc2status", abc2);
        localStorage.setItem("abc3status", abc3);
}
// Variables to keep track of the mouse position and left-button status 
var mouseX,mouseY,mouseDown=0;

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawDot(ctx,x,y,size) {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=255; g=0; b=0; a=255;

    // Select a fill style
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
} 

function tagoutproposal() {
    var proposal = document.getElementById("proposal");
    if(proposal.style.display === "none") {
        proposal.style.display = "block";
        proposal.style.top = 100+'px';
    } else {
        proposal.style.display = "none";
    }
}

function savestatus() {
    
}

async function getabc1() {
    const data = await fetch('./getabc1').then(response => response.json()).catch(error => console.log(error));
    valvewindow(JSON.stringify(data));
}

async function getabc2() {
    const data = await fetch('./getabc2').then(response => response.json()).catch(error => console.log(error));
    valvewindow(JSON.stringify(data));
}

async function getabc3() {
    const data = await fetch('./getabc3').then(response => response.json()).catch(error => console.log(error));
    valvewindow(JSON.stringify(data));
}


function newline() {
    var table = document.getElementById("table");
    var row = table.insertRow(table.rowIndex);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var input = document.createElement("input");
    input.type = "text"
    input.id = "valveform"+clonecount;
    var input2 = document.createElement("input");
    input2.type = "text"
    input2.id = "statusform"+clonecount;
    cell1.appendChild(input);
    cell2.appendChild(input2);
    var button = row.insertCell(2);
    var xbtn = document.createElement("button");
    xbtn.id = "xbtn"+clonecount;
    xbtn.innerHTML = "X";
    button.appendChild(xbtn);
    clonecount++;
};

function deletethis(row) {
    table.deleteRow(row);
}

function valvewindow(data) {
    console.log(data);
const app = document.getElementById("valvedata");
app.innerHTML = `${data}`
let btn = document.createElement("button");
btn.innerHTML = "Save";
btn.setAttribute("onclick", "savestatus");
app.appendChild(btn);
let select = document.createElement("select");
select.id = "myselect";
app.appendChild(select);
let tagless = document.createElement("option");
tagless.innerHTML = "Untagged";
tagless.value = "Untagged";
select.appendChild(tagless);
let caution = document.createElement("option");
caution.innerHTML = "Caution Tag";
caution.value = "Caution Tag";
select.appendChild(caution);
let danger = document.createElement("option");
danger.innerHTML = "Danger Tag";
danger.value = "Danger Tag";
select.appendChild(danger);
let working = document.createElement("option");
working.innerHTML = "Valve Working";
working.value = "Valve Working";
select.appendChild(working);
app.style.display = "block";

/*const para = document.createElement("p");
const node = document.createTextNode("This is new.");
node.className = "system1";
para.appendChild(node);

const element = document.getElementById("div1");
const child = document.getElementById("p1");
element.insertBefore(para, child);
element.className = 'abc1';
*/

}
/*
function savevalve(data) {
    let status = document.getElementById("myselect");
    fetch("./savesystem1", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: {"status": status}
      }).then(res => {
        console.log("Request complete! response:", res);
      });

}
*/
// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function togglesketchpad() {
    var sketchpad = document.getElementById("sketchpad");
    if(sketchpad.style.display === "none") {
        sketchpad.style.display = "block";
    } else {
        sketchpad.style.display = "none";
    }
}


// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY,12);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown=0;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) { 
    // Update the mouse co-ordinates when moved
    getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown==1) {
        drawDot(ctx,mouseX,mouseY,12);
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    getvalvedata();
    clonecount = 1;
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');
    var sketchpad = document.getElementById("sketchpad");
    sketchpad.style.display = "none";

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);
    }
}

init();