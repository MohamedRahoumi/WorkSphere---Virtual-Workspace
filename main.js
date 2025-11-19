const employees = [];
let selectedRoom = null;

const roomLimits = {
  reception: 4,
  securite: 2,
  serveurs: 2,
  conference: 6,
  archives: 2,
  personnel: 2
};

const openForm = document.getElementById("openForm");
const closeForm = document.getElementById("closeForm");
const popup = document.getElementById("popup");

const form = document.getElementById("employeeForm");
const unassignedList = document.getElementById("unassigned_list");
const popupList = document.getElementById("popup_employees");
openForm.onclick = () => popup.classList.remove("hidden");

closeForm.onclick = () => {
  popup.classList.add("hidden");
  
};

document.getElementById("addExperienceBtn").onclick = () => {
  const div = document.createElement("div");
  div.className = "popup_item";

  div.innerHTML = `
    <input type="text" placeholder="Titre" class="exp_title" required />
    <input type="date" class="exp_start" required />
    <input type="date" class="exp_end" required />
    <button class="remove_btn removeExp">X</button>
  `;

  div.querySelector(".removeExp").onclick = () => div.remove();

  const start = div.querySelector(".exp_start");
  const end = div.querySelector(".exp_end");

  end.onchange = () => {
    if (start.value && end.value && start.value > end.value) {
      alert("La date de fin erreur");
      end.value = "";
    }
  };

  document.getElementById("experienceList").appendChild(div);
};

form.onsubmit = (e) => {
  e.preventDefault();

  const employee = {
    id: Date.now(),
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    image: document.getElementById("photoUrl").value,
    experiences: [],
    room: null
  };

  document.querySelectorAll("#experienceList .popup_item")
    .forEach(ex => {
      employee.experiences.push({
        title: ex.querySelector(".exp_title").value,
        start: ex.querySelector(".exp_start").value,
        end: ex.querySelector(".exp_end").value
      });
    });

  employees.push(employee);

  displayUnassigned();
  displayRooms();

  popup.classList.add("hidden");
  form.reset();
  document.getElementById("experienceList").innerHTML = "";
};

function isRoomFull(room) {
  return employees.filter(e => e.room === room).length >= roomLimits[room];
}

function updateRoomColors() {
  document.querySelectorAll(".room").forEach(room => {
    const roomName = room.dataset.room;
    const isEmpty = room.querySelector(".room_list").children.length === 0;

    if (isRoomFull(roomName)) {
      room.style.background = "#ffe066";
      room.style.border = "2px solid #000";
      return;
    }

    if ((roomName === "conference" || roomName === "personnel") && isEmpty) {
      room.style.background = "#d4f8d4";
      room.style.border = "2px solid #28a745";
    } else if (isEmpty) {
      room.style.background = "#ffd6d6";
      room.style.border = "2px solid #ff4d4d";
    } else {
      room.style.background = "#d4f8d4";
      room.style.border = "1px solid #ccc";
    }
  });
}

function displayUnassigned() {
  unassignedList.innerHTML = "";

  employees.filter(e => e.room === null).forEach(e => {
    const div = document.createElement("div");
    div.className = "employee_box";

    div.innerHTML = `
      <img src="${e.image}" class="photo"/>
      <span>${e.role}</span>
    `;

    unassignedList.appendChild(div);
  });
}

function canEnterRoom(emp, room) {
  const r = emp.role;

  if (r === "Manager") return true;
  if (r === "Nettoyage") return room !== "archives";
  if (r === "Autre") return room === "reception" || room === "personnel";
  if (r === "Agent de securite") return room === "securite";
  if (r === "Receptionniste") return room === "reception";
  if (r === "Technicien IT") return room === "serveurs";

  return false;
}

function openRoomPopup(roomName) {
  selectedRoom = roomName;
  popupList.innerHTML = "";

  employees
    .filter(e => e.room === null && canEnterRoom(e, roomName) && !isRoomFull(roomName))
    .forEach(e => {
      const div = document.createElement("div");
      div.className = "popup_item";

      div.innerHTML = `
        <img src="${e.image}" />
        <p>${e.name}</p>
        <button class="add_btn">Ajouter</button>
      `;

      div.querySelector(".add_btn").onclick = () => assignToRoom(e.id);
      popupList.appendChild(div);
    });

  document.getElementById("roomPopup").classList.remove("hidden");
}

document.getElementById("closeRoomPopup").onclick = () =>
  document.getElementById("roomPopup").classList.add("hidden");


function assignToRoom(id) {
  if (isRoomFull(selectedRoom)) return alert("Salle pleine");

  const emp = employees.find(e => e.id === id);
  emp.room = selectedRoom;

  displayUnassigned();
  displayRooms();
  updateRoomColors();
  document.getElementById("roomPopup").classList.add("hidden");
}

function displayRooms() {
  document.querySelectorAll(".room").forEach(div => {
    const roomName = div.dataset.room;
    const list = div.querySelector(".room_list");
    list.innerHTML = "";

    employees
      .filter(e => e.room === roomName)
      .forEach(e => {
        const el = document.createElement("div");
        el.className = "room_emp";

        el.innerHTML = `
          <img src="${e.image}" />
          <p>${e.name}</p>
          <span>${e.role}</span>
          <button class="remove_btn">Remove</button>
        `;

        el.querySelector(".remove_btn").onclick = () => {
          e.room = null;
          displayRooms();
          displayUnassigned();
          updateRoomColors();
        };

        list.appendChild(el);
      });
  });

  updateRoomColors();
}

window.onload = () => {
  displayRooms();
  updateRoomColors();
};