//mang chua du lieu goc
let tasks =[];

const taskInput = document.getElementById('taskInput');
const taskList =document.getElementById('taskList');

//ham render de dong bo giao dien dua tren mang du lieu
function renderTasks(){
    //b1:xoa giao dien cu
    taskList.innerHTML='';
    //buoc 2: sap xep mang( completed ra sau cung)
    //false(0) dung trc true (1) dung sau
    tasks.sort((a,b) => a.completed - b.completed);

    //buoc 3:dung lai html cho tung phan tu
    tasks.forEach(task =>{
        const li= document.createElement('li');
        li.className=`task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
        `;
        taskList.appendChild(li);
    });
}
//chuc nang 1: them task moi sau khi bam enter
taskInput.addEventListener('keypress', (e) =>{
    if(e.key==='Enter'){
        const text=taskInput.value.trim();
        if(!text) return;

        const newTask = {
            id:Date.now(),
            text:text,
            completed:false
        };
        tasks.push(newTask);
        taskInput.value='';//reset o nhap du lieu
        renderTasks();
    }
});
//chuc nang 2:bat tat trang thai hoan thanh(dung pham vi toan cuc window de goi tu html)
window.toggleTask=function(id){
    tasks= tasks.map(task=>{
        if(task.id ===id){
            return {...task,completed:!task.completed};
        }
        return task;
    });
    renderTasks();
}
//chuc nang 3:xoa task khoi danh sach
window.deleteTask= function(id){
    tasks= tasks.filter(task=> task.id !==id);
    renderTasks();
};
renderTasks();