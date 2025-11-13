const employees = [];
let selectedRoom = null;

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