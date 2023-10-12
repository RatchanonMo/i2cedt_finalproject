// Select the elements
/* const loginBtn = document.getElementById("loginBtn");
const loginPopup = document.getElementById("loginPopup");
const closePopup = document.getElementById("closePopup");
const loginForm = document.getElementById("loginForm");
 */
/* function openLoginPopup() {
  loginPopup.style.display = "block";
}
function closeLoginPopup() {
  loginPopup.style.display = "none";
}

window.addEventListener("load", function () {
  openLoginPopup();
});

loginBtn.addEventListener("click", function () {
  openLoginPopup(); 
});

closePopup.addEventListener("click", function () {
  closeLoginPopup(); 
});

window.addEventListener("click", function (event) {
  if (event.target === loginPopup) {
    closeLoginPopup();
  }
});
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
}); */


document.querySelector("#closePopup").addEventListener
("click",()=>{
    document.querySelector(".popup").style.display = "none";
})


document.querySelector("#closePopup").addEventListener
("click",()=>{
    document.querySelector("#todoPopup").style.display = "none";
})
 
/* const db = client.db('your_database_name');
const collection = db.collection('your_collection_name');

collection.insertOne({ key: 'value' }, (err, result) => {
    if (err) {
        console.error("Error inserting document:", err);
    } else {
        console.log("Document inserted:", result);
    }
});



collection.find({ key: 'value' }).toArray((err, documents) => {
    if (err) {
        console.error("Error querying data:", err);
    } else {
        console.log("Queried documents:", documents);
    }
}); */



/* collection.updateOne({ key: 'value' }, { $set: { newKey: 'updatedValue' } }, (err, result) => {
    if (err) {
        console.error("Error updating document:", err);
    } else {
        console.log("Document updated:", result);
    }
});



collection.deleteOne({ key: 'value' }, (err, result) => {
    if (err) {
        console.error("Error deleting document:", err);
    } else {
        console.log("Document deleted:", result);
    }
}); */
