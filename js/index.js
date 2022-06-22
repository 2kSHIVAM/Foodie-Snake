//game const & variable
let inputDir={x:0,y:0};

const back_sound=new Audio('background_music.mp3');
const food_sound=new Audio('food.mp3');
const game_end_sound=new Audio('end.wav');
const hit_sound=new Audio('hit_myself.mp3');
const move_sound=new Audio('move.wav')

let speed=5;
let maxfood=0;
let count_score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:15,y:11}
]
food={x:13,y:7};



//game functions

function main(ctime)
{ 
    
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake)
{
    //if u bump into urself
    for(let i=1;i<snake.length;i++)
    {
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y)
        return true;
    }
    if(snake[0].x>36||snake[0].x<=0||snake[0].y>22||snake[0].y<=0)
    return true;
    else return false;
}
function gameEngine()
{
    
    if((snakeArr.length-1)-maxfood==3)
    {
        maxfood=snakeArr.length-1;
        speed=speed+3;
    }

    //part1 : updating the snake array and food
    if(isCollide(snakeArr))
    {
        back_sound.pause();
        game_end_sound.play();
        
        inputDir={x:0,y:0};
        alert("Game Over, Press any key to play again!");
        speed=5;
        snakeArr=[{x:15,y:11}];
        back_sound.play();
        score_count=0;
        score.innerHTML="Score : "+"<br />"+score_count;
    }

    //if you have eaten the food
    //then increment the score and reset food;
    if(snakeArr[0].y===food.y&&snakeArr[0].x===food.x)
    {
        food_sound.play();
        let a=2;
        let b=16;

        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        score_count=score_count+1;
        score.innerHTML="Score : "+"<br />"+score_count;
    }
    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2: display snake and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
       snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart=e.y;
       snakeElement.style.gridColumnStart=e.x;
       
       if(index==0)
       {
           snakeElement.classList.add('head');
       }
       else{
        snakeElement.classList.add('snake');
       }

       board.appendChild(snakeElement); 
    });
    //display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement); 
}









window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    
    back_sound.play();

    inputDir={x:0,y:1}//start the game
    move_sound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case 'ArrowRight':
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})
