const toDoForm = document.querySelector(".js-toDOForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
// 초반에 toDos를 비어있는 array로 만들어준다.
// 해야할 일을 생성시 'toDos' array에 추가되도록한다.
 
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
// filter는 array의 모든 아이템을 통해 함수를 실행하고 
// 그리고 true인 아이템들만 가지고 새로운 array를 만든다.
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
// saveToDos은 위의 toDos를 가져와서 로컬에 저장하는 일을 하도록 한다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
//cf. local storage에는 자바스크립트의 data를 저장할 수가 없다.
//cf. 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려고 한다.
//cf. 우리의 object가 string이 되도록 만들어야 한다.
//JSON.stringify는 자바스크립트 object를 string으로 바꿔준다.
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);

    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id:newId
        // text라는 key에 함수의 인자, text가 value로 올것이고
        // toDos.length는  array의 길이를 의미한다.
    };
    toDos.push(toDoObj);
    // push를 써서 array안에 element 하나를 넣어줄 수 있어
    // 이 겨웅에는 'toDos' array 안에 'toDoObj'를 넣게된다.

    //toDo를 이런 식으로 저장하는 이유는,
    //local storage에도 투두를 저장해둬야 하기 때문이다.

    saveToDos();
    //toDos.push 이후에 호출하도록 한다.
}

function handleSumit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
//JSON은 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 
// Object로 바꿔주는 기능인 셈이다.
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
//array의 속성 중 forEach가 있다.
//forEach는 기본적으로 함수를 실행하는데, array에 담겨있는 것들 각각에
//한번씩 함수를 실행시켜준다.

    }
}

function init () {
    loadToDos();
    toDoForm.addEventListener("submit", handleSumit);
}
init();