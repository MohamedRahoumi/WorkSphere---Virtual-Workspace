const openForm = document.getElementById("openForm");
const closeForm = document.getElementById("closeForm");
const popup = document.getElementById("popup");

openForm.onclick = () => popup.classList.remove("hidden");

closeForm.onclick = () => {
  popup.classList.add("hidden");
  
};