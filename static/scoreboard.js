// Buttons
var homeButton = document.querySelector('#home');
homeButton.addEventListener('click', () => {
    window.location.href = "http://localhost:5000/home";
});

async function get_scoreboard() {
    try {
        const response = await fetch('http://localhost:5000/api/scoreboard');
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }
        const history = await response.json();
        return (history);
    } catch (err) {
        alert(err);
    }
}

async function generate_table() {
    // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    tbl.classList.add("scoreboard");
    const tblBody = document.createElement("tbody");
    const tblHead = document.createElement("thead");
    tblHead.appendChild(document.createElement("th")).
          appendChild(document.createTextNode("username"));
    tblHead.appendChild(document.createElement("th")).
          appendChild(document.createTextNode("score"));
    tbl.appendChild(tblHead);
    // Styles
    tbl.style.width = '100%';
    tbl.style.height = '100%';
    tbl.style.color = '#000';
    tbl.style.backgroundColor = 'white';
    tbl.style.fontFamily ='Poppins';

    const history = await get_scoreboard();
    // creating all cells
    for (let i = 0; i < history.length; i++) {
        console.log(history[i]);
        // creates a table row
        const row = document.createElement("tr");

        const cellUsername = document.createElement("td");
        const cellUsernameText = document.createTextNode(`${history[i].username}`);
        cellUsername.appendChild(cellUsernameText);
        
        const cellScore = document.createElement("td");
        const cellScoreText = document.createTextNode(`${history[i].score}`);
        cellScore.appendChild(cellScoreText);

        row.appendChild(cellUsername);
        row.appendChild(cellScore);

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }
   
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.querySelector('div.contenido').appendChild(tbl);
}

generate_table();