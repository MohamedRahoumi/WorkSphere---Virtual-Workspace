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

  
};