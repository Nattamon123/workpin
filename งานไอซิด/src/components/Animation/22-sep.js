let x = 0, y = 0 , roll = 0
const field_width = 600 
const field_height = 400 
const max =  field_width - 100
const Ymax = field_height - 100
let goright = true
let godown = true
let running = false
const btn = document.getElementById('run-Btn')
const ball = document.getElementById('ball').style

const buttons = document.querySelectorAll(".ball-btn")
//เก็บurl ของรูปทั้งหมด
const image = [
   '/image/basket-ball-out-door-game-png-removebg-preview.png',
   '/image/football-soccer-transparent-free-png-removebg-preview.png',
   '/image/kisspng-volleyball-mikasa-sports-mitre-sports-internationa-vollybal-5b4162ddc7fef0.3071004415310118058192-removebg-preview.png',
   '/image/f2532f33-de3f-4926-a02d-2a3f356142ca.jpeg',
   '/image/5969fbf0cc7d941e73533495da79bdf5.jpg'
]

//ลูปเอาidของปุ่มทั้งหมด และทำevent การคลิ๊กเพื่อเปลี่ยนรูป
buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const activeBtn = document.querySelector('.ball-btn.active');
        if(activeBtn){
            activeBtn.classList.remove('active');
        }
        btn.classList.add("active");
        if(index === 0){
            ball.background = 'none'
            ball.border = '1px solid #000';
        } else {
            ball.background = `url("${image[index - 1]}")`;
            ball.backgroundSize = 'cover';
            ball.border = 'none';
        }
    });
});

//เก็บปุ่มของkeyboard และเอาไปลูปเพื่อส่งไปยัง buttonว่ากดปุ่มนี้
const keyNumbers = ['0', '1', '2', '3', '4', '5'];
document.addEventListener('keydown', (event) => {
    keyNumbers.forEach((key, index) => {
        if(event.key === key){
            buttons[index].click();
        }
    });
});
const clicked = () => {
    running = !running
}
document.addEventListener('keydown', (event) => {
    if(event.key === ' '){
        clicked()
        
    }
 
    
    
})
const fieldlength = () => {
    document.getElementById('container').style.width = field_width + `px`
    document.getElementById('container').style.height = field_height + `px`
}
const cal = () => {
    if(goright) {
        x = x + 10
        roll = roll + 10
      if(x >= max){
        goright = false
      }
    }else{
        x = x - 10
        roll = roll - 10
        if(x <= 0){
            goright = true
        }
    }
    ///

    if(godown) {
        y = y + 10
        roll = roll + 10
      if(y >= Ymax){
        godown = false
      }
    }else{
        y = y - 10
        roll = roll - 10
        if(y <= 0){
            godown = true
        }
    }
}
//ฟังชั่นเรนเดอร์เพื่อให้ลูกบอลเคลื่อนที่เมื่อกดrun
const render = () => {
    if(!running){
              
        btn.innerHTML = '  <i class="bi bi-play-fill"></i>'+'run'
        btn.classList.remove('active');
        return
    }
    btn.innerHTML = '<i class="bi bi-pause"></i>'+'stop'
    btn.classList.add('active');
    cal()
    ball.left = x + `px`
    ball.transform = `rotate(${roll}deg)`
    ball.top = y + `px`
}
document.addEventListener('DOMContentLoaded',() =>{
        setInterval(render,25)
        fieldlength()
})