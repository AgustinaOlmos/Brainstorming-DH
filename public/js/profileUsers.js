const selectElement = document.querySelector(".selected_user");
const selectElement2 = document.querySelector(".selected_user2");
var userID;

selectElement.addEventListener("change", (event) => {
    userID = event.target.value;
    window.location.href = "/users/profileUsers/"+userID;
})
selectElement2.addEventListener("change", (event) => {
    userID = event.target.value;
    window.location.href = "/users/profileUsers/"+userID;
})