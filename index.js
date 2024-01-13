const cells= document.querySelectorAll(".cell");
const msg= document.querySelector("#msg");
const btn= document.getElementById("btn");

const winConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""]
let curr="X";
let running=false;

initialize();

function initialize(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked))
    msg.textContent=`${curr}'s turn`
    btn.addEventListener("click",restartGame);
    running=true;
}

function cellClicked(){
    const cellind = this.getAttribute("cellIndex");
    if(options[cellind]!=""||!running) {
        return;
    }
    else{
        updateCell(this,cellind);
        checkwinner();
    }
}
function updateCell(cell,index){
    options[index]=curr;
    cell.textContent=curr;
}

function changeplayer(){
    curr= (curr=="X")? "O":"X";
    msg.textContent=`${curr}'s turn`

}
function checkwinner(){
    let roundwon = false;
    for(let i=0;i<winConditions.length;i++){
        const condition = winConditions[i];
        let cellA= options[condition[0]] 
        let cellB= options[condition[1]]
        let cellC= options[condition[2]]
        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundwon=true;
            break;
        }
    }
    if(roundwon){
        msg.textContent=`${curr} wins!`;
        running=false;
    }
    else if(!options.includes("")){
        msg.textContent=`Draw!`
        running= false;
    }
    else{
        changeplayer();
    }
    
}

function restartGame(){
    curr="X";
    options=["","","","","","","","",""];
    cells.forEach(cell=> cell.textContent="");
    running=true;
}