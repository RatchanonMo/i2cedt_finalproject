const calendarDays = document.getElementById("calendar-days");
const currentMonth = document.getElementById("current-month");
const currentYear = document.getElementById("current-year");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

const BACKEND_URL = "http://localhost:4000";

let currentDate = new Date();
let checkDate = new Date();
let todoData = {};

// checkbox

const getdata = async () => {
  // get data from db
  const todofetch = await fetch(`${BACKEND_URL}/todo`).then((r) => r.json());
  //

  return todofetch;
};

async function renderCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  currentMonth.textContent = getMonthName(month);
  currentYear.textContent = year;

  let calendarHtml = "";

  const weekDays = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];

  for (const dayName of weekDays) {
    calendarHtml += `<div id="dayheader" class="dayheader">${dayName}</div>`;
  }

  for (let i = 0; i < firstDay; i++) {
    calendarHtml += `<div class="day" id="daytodo"></div>`;
  }

  calendarDays.innerHTML = calendarHtml;

  //
  var data = await getdata();

  //

  for (let day = 1; day <= daysInMonth; day++) {
    const dayKey = `${year}-${month + 1}-${day}`;
    const todoList = todoData[dayKey] || [];

    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.setAttribute("data-day", dayKey);

    if (
      day === checkDate.getDate() &&
      month === checkDate.getMonth() &&
      year === checkDate.getFullYear()
    ) {
      console.log(dayElement, currentDate.getMonth(), month);
      dayElement.classList.add("current-date");
    }

    dayElement.innerHTML = `
        <span class="day-number">${day}</span>
        <ul class="todo-list">
            ${todoList
              .map(
                (item) =>
                  `<li id="${item._id}" class="todo-item subject-IntroToCEDT">${item}</li>`
              )
              .join("")}
            
            ${data
              .filter(
                (x) => x.date == dayKey
              )
              .map(
                (item) =>
                  `<li id="${item._id}" class="todo-item subject-${item.subject}">${item.title}</li>`
              )
              .join("")}

        </ul>
    
    `;

    calendarDays.appendChild(dayElement);
  }

  const addTodoButtons = document.querySelectorAll(".day");
  addTodoButtons.forEach((div) => {
    div.addEventListener("click", handleAddTodo);
  });
  const deleteTodoButtons = document.querySelectorAll(".delete-todo");
  deleteTodoButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", handleDeleteTodo);
  });

  const modal = document.querySelectorAll(".todo-item");
  modal.forEach((m) => {
    m.addEventListener("click", () => {
      event.stopPropagation();
      console.log(m.id);
      const detail = document.getElementById("detail");

      detail.innerHTML = `
    <div id="M${m.id}" class="modal">
    <div class="modal-content">
      <div>
        <img
          src="https://i.pinimg.com/564x/b4/3c/0b/b43c0b0d65e7500b6f95222ae5021835.jpg"
          style="border-radius: 15px; width: 100%"
          alt=""
        />
      </div>
      <div>
        <h3 class="close-m">&times;</h3>
        ${data
          .filter((x) => x._id == m.id)
          .map(
            (item) =>
              `
              
        <p class="modal-date" align="center">${item.date}</p>
              
              <h1 id="modal-title" style="margin: 0; font-size: 40px" align="">
            ${item.title}
                </h1>
                
                
                <p class="modal-desc">
            ${item.description}
                
              </p>


              <btn id="editTodo" class="edit-todo">Edit</btn>
              <btn id="deleteTodo" class="delete-todo">Delete</btn>
                `
          )
          .join("")}
        <div id="E${m.id}">

        </div>
      
      </div>
    </div>
  </div>
    
    `;

      // Get the modal
      var modal = document.getElementById("M" + m.id);

      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close-m")[0];

      // When the user clicks on <span> (x), close the modal
      span.onclick = function () {
        modal.style.display = "none";
      };
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = async function (event) {
        console.log(event.target.classList[0]);

        if (event.target.classList[0] == "modal") {
          modal.style.display = "none";
        }
      };

      //   DELETE

      var deleteModal = document.getElementById("deleteTodo");

      deleteModal.onclick = function () {
        fetch(`${BACKEND_URL}/todo/delete/${m.id}`, {
          method: "DELETE",
        });
        modal.style.display = "none";
        location.reload();
      };

      // EDIT

      var editModal = document.getElementById("editTodo");

      editModal.onclick = function () {
        const edit = document.getElementById("E" + m.id);
        edit.innerHTML = `
        ${data
          .filter((x) => x._id == m.id)
          .map(
            (item) =>
              `
                
                <div class="editContainer">
        <hr/>
        <div style="display:flex;gap:10px">
        <div>
        <label>หัวข้อ</label><br/>
        <input id="title" type="text" class="editInput" value="${
          item.title
        }" /><br/>
        </div>
        <div>
        <label>วิชา</label><br/>
        <input id="subject" type="text" class="editInput" value="${
          item.subject
        }" /><br/>
        </div>
   
        </div>
     
        <label>รายละเอียด</label><br/>
        <textarea id="desc"  class="editInput" rows="4" cols="50" >${
          item.description
        }</textarea><br/>



        <div style="display:flex;gap:20px">
        <div>
        <label>วัน</label><br/>
        <input id="date" type="number" min="1" max="31" class="editInput" value="${
          item.date.split("-")[2]
        }" /><br/>
        </div>

        <div>
        <label>เดือน</label><br/>
        <input id="month" type="number" min="1" max="12" class="editInput" value="${
          item.date.split("-")[1]
        }" /><br/>
        </div>
   

        <div>
       
        <label>ปี</label><br/>
        <input id="year" type="number" min="1"  class="editInput" value="${
          item.date.split("-")[0]
        }" /><br/>
        </div>
   


        
        </div>

        <btn class="confirmEdit" id="confirmEdit" >ตกลง</btn>

        </div>
                
                `
          )
          .join("")}
                  
        

            `;

        confirmEdit.onclick = function () {
          const titleInput = document.getElementById("title");
          const subjectInput = document.getElementById("subject");
          const descTextarea = document.getElementById("desc");
          const dateInput = document.getElementById("date");
          const monthInput = document.getElementById("month");
          const yearInput = document.getElementById("year");

          const newItem = {
            title: titleInput.value,
            subject: subjectInput.value,
            description: descTextarea.value,
            date: `${yearInput.value}-${monthInput.value}-${dateInput.value}`,
          };

          console.log(newItem);
          fetch(`${BACKEND_URL}/todo/edit/${m.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
          });
          modal.style.display = "none";
          location.reload();
        };
      };
    });
  });
}

const sidebarAdd = document.getElementById("sidebar-add");
sidebarAdd.addEventListener("click", () => {
  const add = document.getElementById("detail");

  add.innerHTML = `
    <div id="add" class="modal">
    <div class="modal-content">
    <h1></h1>
        <h3 class="close-m">&times;</h3>

        <div class="editContainer">
        <div style="display:flex;gap:10px">
        <div>
        <label>หัวข้อ</label><br/>
        <input id="title" type="text" class="editInput"/><br/>
        </div>
        <div>
        <label>วิชา</label><br/>
        <select id="subject" class="editInput">
                <option value="ComProg">ComProg</option>
                <option value="IntroToCEDT">IntroToCEDT</option>
                <option value="DigitalLogic">DigitalLogic</option>
              </select>
        </div>
   
        </div>
     
        <label>รายละเอียด</label><br/>
        <textarea id="desc"  class="editInput" rows="4" cols="50" ></textarea><br/>



        <div style="display:flex;gap:20px">
        <div>
        <label>วัน</label><br/>
        <input id="date" type="number" min="1" max="31" class="editInput" value="12" /><br/>
        </div>

        <div>
        <label>เดือน</label><br/>
        <input id="month" type="number" min="1" max="12" class="editInput" value="10"/><br/>
        </div>
   

        <div>
       
        <label>ปี</label><br/>
        <input id="year" type="number" min="1"  class="editInput" value="2023"/><br/>
        </div>
   


        
        </div>

        <btn class="confirmAdd" id="confirmAdd" >ตกลง</btn>

        </div>
           
       
    </div>
  </div>
    
    `;

  // Get the modal
  var modal = document.getElementById("add");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close-m")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = async function (event) {
    console.log(event.target.classList[0]);

    if (event.target.classList[0] == "modal") {
      modal.style.display = "none";
    }
  };

  const confirmAdd = document.getElementById("confirmAdd");
  confirmAdd.onclick = () => {
    const titleInput = document.getElementById("title");
    const subjectInput = document.getElementById("subject");
    const descTextarea = document.getElementById("desc");
    const dateInput = document.getElementById("date");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const newItem = {
      title: titleInput.value,
      subject: subjectInput.value,
      description: descTextarea.value,
      date: `${yearInput.value}-${monthInput.value}-${dateInput.value}`,
    };

  


    fetch(`${BACKEND_URL}/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

      location.reload()
      modal.style.display = "none";
  };
});

const sidebarNow = document.getElementById("sidebar-now");
sidebarNow.addEventListener("click", () => {
  const add = document.getElementById("detail");

  add.innerHTML = `
    <div id="add" class="modal">
    <div class="modal-content">
    <h1></h1>
        <h3 class="close-m">&times;</h3>

        <div class="editContainer">
        <div style="display:flex;gap:10px">
        <div>
        <label>หัวข้อ</label><br/>
        <input id="title" type="text" class="editInput"/><br/>
        </div>
        <div>
        <label>วิชา</label><br/>
        <select id="subject" class="editInput">
                <option value="ComProg">ComProg</option>
                <option value="IntroToCEDT">IntroToCEDT</option>
                <option value="DigitalLogic">DigitalLogic</option>
              </select>
        </div>
   
        </div>
     
        <label>รายละเอียด</label><br/>
        <textarea id="desc"  class="editInput" rows="4" cols="50" ></textarea><br/>



        <div style="display:flex;gap:20px">
        <div>
        <label>วัน</label><br/>
        <input id="date" type="number" min="1" max="31" class="editInput" value="12" /><br/>
        </div>

        <div>
        <label>เดือน</label><br/>
        <input id="month" type="number" min="1" max="12" class="editInput" value="10"/><br/>
        </div>
   

        <div>
       
        <label>ปี</label><br/>
        <input id="year" type="number" min="1"  class="editInput" value="2023"/><br/>
        </div>
   


        
        </div>

        <btn class="confirmAdd" id="confirmAdd" >ตกลง</btn>

        </div>
           
       
    </div>
  </div>
    
    `;

  // Get the modal
  var modal = document.getElementById("add");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close-m")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = async function (event) {
    console.log(event.target.classList[0]);

    if (event.target.classList[0] == "modal") {
      modal.style.display = "none";
    }
  };

  const confirmAdd = document.getElementById("confirmAdd");
  confirmAdd.onclick = () => {
    const titleInput = document.getElementById("title");
    const subjectInput = document.getElementById("subject");
    const descTextarea = document.getElementById("desc");
    const dateInput = document.getElementById("date");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const newItem = {
      title: titleInput.value,
      subject: subjectInput.value,
      description: descTextarea.value,
      date: `${yearInput.value}-${monthInput.value}-${dateInput.value}`,
    };

  


    fetch(`${BACKEND_URL}/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

      location.reload()
      modal.style.display = "none";
  };
});

function getMonthName(month) {
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];
  return monthNames[month];
}

async function handleAddTodo(event) {
  const dayElement = event.target.closest(".day");
  // if (!dayElement) return;

  const dayKey = dayElement.getAttribute("data-day");
  const todoList = todoData[dayKey] || [];

  const add = document.getElementById("detail");

  add.innerHTML = `
    <div id="add" class="modal">
    <div class="modal-content">
    <h1></h1>
        <h3 class="close-m">&times;</h3>

        <div class="editContainer">
        <div style="display:flex;gap:10px">
        <div>
        <label>หัวข้อ</label><br/>
        <input id="title" type="text" class="editInput"/><br/>
        </div>
        <div>
        <label>วิชา</label><br/>
        <select id="subject" class="editInput">
                <option value="ComProg">ComProg</option>
                <option value="IntroToCEDT">IntroToCEDT</option>
                <option value="DigitalLogic">DigitalLogic</option>
              </select>
        </div>
   
        </div>
     
        <label>รายละเอียด</label><br/>
        <textarea id="desc"  class="editInput" rows="4" cols="50" ></textarea><br/>



        <div style="display:flex;gap:20px">
        <div>
        <label>วัน</label><br/>
        <input id="date" type="number" min="1" max="31" class="editInput" value="${
          dayKey.split("-")[2]
        }" /><br/>
        </div>

        <div>
        <label>เดือน</label><br/>
        <input id="month" type="number" min="1" max="12" class="editInput" value="${
          dayKey.split("-")[1]
        }"/><br/>
        </div>
   

        <div>
       
        <label>ปี</label><br/>
        <input id="year" type="number" min="1"  class="editInput" value="${
          dayKey.split("-")[0]
        }"/><br/>
        </div>
   


        
        </div>

        <btn class="confirmAdd" id="confirmAdd" >ตกลง</btn>

        </div>
           
       
    </div>
  </div>
    
    `;

  // Get the modal
  var modal = document.getElementById("add");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close-m")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = async function (event) {
    console.log(event.target.classList[0]);

    if (event.target.classList[0] == "modal") {
      modal.style.display = "none";
    }
  };

  const confirmAdd = document.getElementById("confirmAdd");
  confirmAdd.onclick = () => {
    const titleInput = document.getElementById("title");
    const subjectInput = document.getElementById("subject");
    const descTextarea = document.getElementById("desc");
    const dateInput = document.getElementById("date");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const newItem = {
      title: titleInput.value,
      subject: subjectInput.value,
      description: descTextarea.value,
      date: `${yearInput.value}-${monthInput.value}-${dateInput.value}`,
    };

    todoList.push(titleInput.value);
    todoData[dayKey] = todoList;

    const todoListElement = dayElement.querySelector(".todo-list");
    const listItem = document.createElement("p");
    listItem.classList.add("m-0");

    listItem.innerHTML = `
                <li class="todo-item subject-${subjectInput.value}">${titleInput.value}</li>
    `;
    todoListElement.appendChild(listItem);

    fetch(`${BACKEND_URL}/todo/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    modal.style.display = "none";
  };
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

function handleDeleteTodo(event) {
  const dayElement = event.target.closest(".day");
  if (!dayElement) return;

  const dayKey = dayElement.getAttribute("data-day");
  const todoList = todoData[dayKey] || [];

  const todoElement = event.target.closest("li");
  if (!todoElement) return;

  const todo = todoElement.querySelector("span").textContent;
  const index = todoList.indexOf(todo);

  if (index !== -1) {
    todoList.splice(index, 1);
    todoElement.remove();
    todoData[dayKey] = todoList;
  }
}
