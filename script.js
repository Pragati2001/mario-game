canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

const height=canvas.height;
const width=canvas.width;
console.log(height,width)
var correct=1;
var next_level=document.getElementById("next_level");
var restart_level=document.getElementById("restart_level");
var person={
    name:"person",
    speed:5,
    x:0,
    y:height/2,
}
var mushroom1={
    name:"mushroom",
    speed:2,
    x:width/3,
    y:0,
    inc:2,
}
var mushroom2={
    name:"mushroom",
    speed:2,
    x:width/3*2,
    y:0,
    inc:2,
}
var princess={
    name:"princess",
    x:width-47,
    y:height/2,

}
function draw(box)
{
    img=document.getElementById(box.name);
    context.drawImage(img, box.x, box.y, 47,47);
}

function call_name()
{
    draw(person);
    draw(mushroom1);
    draw(mushroom2);
    draw(princess);
}
var flag=1;
function mushroom_moving(mushroom)
{
    if(flag)
    {
        mushroom.y+=mushroom.inc;
        if(mushroom.y+47>=height)
        {
            mushroom.y-=mushroom.inc;
            flag=0;
        }
    }
    else 
    {
        if(mushroom.y<=0) flag=1
        else if(mushroom.y+47>=height)
        {
            mushroom.y-=mushroom.inc;
            flag=0;
        }
        mushroom.y-=mushroom.inc;
    }
    
}
function finish_game()
{
    // call_name();
    context.font = "20px Arial";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText("Level Complete!", width/2, height/2);
    // controller.abort();
    correct = false;
    next_level.style.visibility = 'visible';
}
function increase_speed(mushroom)
{
    mushroom.inc+=2;
}
next_level.addEventListener('click', (event) =>{
    
    // temp += 1;
    // lvl.textContent = temp;
    increase_speed(mushroom1);
    increase_speed(mushroom2);
    correct = true;
    person.x = 0;
    person.y=height/2;
    next_level.style.visibility = 'hidden';
    main_fun();
    // updateGame();
}, false);
restart_level.addEventListener('click', (event) =>{
    
    
    correct = true;
    person.x = 0;
    person.y=height/2;
    restart_level.style.visibility = 'hidden';
    main_fun();
    // updateGame();
}, false);
function check(mushroom)
{
    if(person.x+47>=mushroom.x&&person.x<=mushroom.x+47)
    {
        if(mushroom.y>=200&&mushroom.y<=280) restart_game();
    } 
}
function restart_game()
{
    context.font = "20px Arial";
    context.fillStyle = 'red';
    context.textAlign = 'center';
    context.fillText("Level Restarted!", width/2, height/2);
    correct = false;
    restart_level.style.visibility='visible';
}
function main_fun()
{
    context.clearRect(0,0,width,height);
    mushroom_moving(mushroom1);
    mushroom_moving(mushroom2);
    check(mushroom1);
    check(mushroom2);
    call_name()
    if(person.x+97>=width) finish_game();
    if(correct) requestAnimationFrame(main_fun);
}
document.addEventListener("keydown",(event)=>{
    const key=event.key;
    if(key==='ArrowRight')
    {
        if(person.x+47<=width-47) 
            person.x+=person.speed;
    }
    else if(key==='ArrowLeft')
    {
        if(person.x>0)
        person.x-=person.speed;
    }
});
call_name();
main_fun();
// setInterval(main_fun,10);