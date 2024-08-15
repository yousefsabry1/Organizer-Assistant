var userName = document.getElementById("addName");
var userState = document.getElementById("addState");
var userBadge = document.getElementById("addBadge");
var search = document.getElementById('ProductSearch');

var tableBody = document.getElementById('tabBody');

var addBtn = document.getElementById("addBtn");
var addBtn2 = document.getElementById('addBtn2');

addBtn.addEventListener('click',addUser);
addBtn2.addEventListener('click',updateUser);

// ===========>> local storage setub

var userContainer;

if(localStorage.getItem("User") == null)
{
    userContainer = [] ;
}
else
{
    userContainer = JSON.parse(localStorage.getItem("User"));
    displayUsers(userContainer)
}



// ===========>> Add Function

function addUser()
{
   var User = {
    names : userName.value ,
    stats : userState.value ,
    badge : userBadge.value
   };

   userContainer.push(User);
   localStorage.setItem("User" , JSON.stringify(userContainer));
   displayUsers(userContainer);
   clearForm();
}

// ===========>> Display Function

function displayUsers(arr)
{
    var users = '' ;

    for( var i = 0 ; i < arr.length ; i++ )
    {
        users += `
                        <tr>
                            <td>${i + 1}</td>
                            <td>${arr[i].names}</td>
                            <td>${arr[i].stats}</td>
                            <td>${arr[i].badge}</td>
                            <td><button onclick="setFormUpdate(${i})" id="updateBtn">update</button></td>
                            <td><button onclick="deleteUser(${i})" id="delBtn">delete</button></td>
                        </tr>
        `
    }
    tableBody.innerHTML = users ;
}

// ===========>> Clear Function

function clearForm()
{
    userName.value = null ;
    userState.value = null ;
    userBadge.value = null ;
}

// ===========>> Delete Function

function deleteUser(delIdx) {
    if (isSearching) {
        // Find the corresponding index in the original userContainer
        let originalIndex = userContainer.indexOf(filteredUsers[delIdx]);
        userContainer.splice(originalIndex, 1); // Delete from original list
        filteredUsers.splice(delIdx, 1); // Remove from the filtered list as well
    } else {
        userContainer.splice(delIdx, 1);
    }

    localStorage.setItem("User", JSON.stringify(userContainer));
    displayUsers(isSearching ? filteredUsers : userContainer); // Display correct list
}


// ===========>> Scope of Updated functions

// global variable

var filteredUsers = []; // For filtered search results
var isSearching = false; // To track whether the user is in search mode
var upIndex = -1; // This will store the index to update


// set form for update function

function setFormUpdate(updatedIdx) {
    // Check if user is searching and map the index accordingly
    if (isSearching) {
        let originalIndex = userContainer.indexOf(filteredUsers[updatedIdx]);
        upIndex = originalIndex;
    } else {
        upIndex = updatedIdx;
    }

    addBtn.classList.add('d-none');
    addBtn2.classList.remove('d-none');

    userName.value = userContainer[upIndex].names;
    userState.value = userContainer[upIndex].stats;
    userBadge.value = userContainer[upIndex].badge;
}

// update function

function updateUser()
{
    if (upIndex > -1) {
        userContainer[upIndex].names = userName.value;
        userContainer[upIndex].stats = userState.value;
        userContainer[upIndex].badge = userBadge.value;

        localStorage.setItem("User", JSON.stringify(userContainer));
        displayUsers(isSearching ? filteredUsers : userContainer); // Display correct list
        addBtn2.classList.add('d-none');
        addBtn.classList.remove('d-none');
        clearForm();
    }
}

// ===========>> Search Function
function searchUser() {
    var searchValue = search.value.toLowerCase();
    filteredUsers = userContainer.filter(user => user.names.toLowerCase().includes(searchValue));

    // Update display and set search mode
    displayUsers(filteredUsers);
    isSearching = searchValue.length > 0;
}




// Disable inspect element

body.document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};

$(document).bind("contextmenu",function(e) {
    e.preventDefault();
  });
  $(document).keydown(function(e){
    if(e.which === 123){
      return false;
  }
  });