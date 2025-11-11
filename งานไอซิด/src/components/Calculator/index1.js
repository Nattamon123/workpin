//ประกาศตัวแปรและดึงdom ที่จําเป็น
let now = ''
let pre = ''
let operator1 = null
let result = 0
let lastnum = null
//กดหนดstate ไว้เช็คขั้น
let state = 'idle'
const display = document.querySelector('.display');
const zeroBtn = document.getElementById('number0');
const clearBtn = document.getElementById('clear');
function clearAll(){
  now = ''
  pre = ''
  operator1 = null
  lastnum = null
  state = 'idle'
  display.innerHTML = "0"
}
clearBtn.addEventListener('click', clearAll);

if (zeroBtn) {
  zeroBtn.addEventListener('click', () => {
    addnumber(0);
    highlightButton(zeroBtn);
  });
} else {
  console.log("error: number0 not found");
}

document.querySelectorAll('.operator').forEach((btn) => {
btn.addEventListener('click', () => {
  setop(btn.innerHTML)
  highlightOperator(btn);
}
)
})
function addnumber(num){
  if(state ==='idle' || state ==='result'){
    now = "" + num
    state = 'type'
  }else if(state === 'type'){
    now += num    
  }else if(state === 'setop'){
    now = "" + num
    state = 'type'
  }
  
  update()
}

function operator(op) {
  if(now == "") return
  operator1 = op
  pre = now  
  now = ""
console.log(operator1);

}
function setop(op){
  if(state === 'type' || state === 'result'){
    display.innerHTML = op
  pre = now
  operator1 = op
  state = 'setop'
  }
}
function update(){
  if(display.innerHTML.length < 9){
    display.innerHTML = now === '' ? "0" : now
    
  }
}
// for (let i = 1; i <= 9; i++) {
//   const btn = document.getElementById(`number${i}`);
//   if (btn) {
//     btn.addEventListener('click', () => {
//         if(display.innerHTML.length < 9){
//         now += i
//         update()
      
//     }

//     });
//   }
// }

//ลูปเพื่อเอา id ของnumberทั้ง10ตัว
for(let i =1;i <= 9;i++){
  const btn = document.getElementById(`number${i}`)
  if(btn){
    btn.addEventListener('click', () => {addnumber(i)
    highlightButton(btn);}
    )
  }
}
//ทำaddListener เพื่อเช็คตัวเลขและเครื่องหมายที่พิมพ์
document.addEventListener('keydown', (event) => {
  const keyName = event.key; 
  
  if (keyName === 'Enter') {
    equal()
  }
  for(let i = 1; i <= 9;i++){
    const btn = document.getElementById(`number${i}`)
    if(keyName == i){
      addnumber(i)
      highlightButton(btn)
    }
  }
  if(keyName == '+' || keyName == '-' || keyName == '*' || keyName == '/'){
    operator(keyName)
  }else if(keyName == 'c'){
    clearAll()
  }
  else{
    console.log(keyName);
  }
});


function equal() {
  //เช็คว่า state เป็น type เพราะถ้าเป็นtype แปลว่ามีตัวเลขเข้ามาแล้ว พร้อมคำนวณ และเช็คoperator1 ว่าไม่เป็น null 
  if(state === 'type' && operator1){
    let num1 = Number(pre)
    let num2 
    if (now !== '') {
      num2 = Number(now)
      lastnum = num2
    } else {
      num2 = lastnum
    }
    console.log(num1, num2);
    
    switch (operator1) {
      case '+':
        result = num1 + num2
        break;
        case '-':
        result = num1 - num2
        break;
        case '×':
        result = num1 * num2
        break;
        case '÷':
        result = num1 / num2
        break;
    }
   
    now = ""
    pre = result
    update1(result)
}
}
function update1(val) {
  if(display.innerHTML.length < 9){
  display.innerHTML = val
  }
}

//ทำไฮไลท์ปุ่มเวลากด
function highlightButton(btn) {
  btn.classList.add('active');
  setTimeout(() => {
    btn.classList.remove('active');
  }, 1000); 
}
let activeOperatorBtn = null;
function highlightOperator(btn) {
  if (activeOperatorBtn) {
    activeOperatorBtn.classList.remove('operator-active');
  }
  btn.classList.add('operator-active');
  activeOperatorBtn = btn;
}
