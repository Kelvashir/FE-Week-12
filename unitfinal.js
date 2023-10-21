const API_URL = `http://localhost:3000/bookList`;
const form = $("form");
const table = $("table");

//READ
$.get(API_URL).then((data) => {
  data.map((book) => {
    $("tbody").append(
      $(`
        <tr>
        <td>${book.id}</td>
        <td>${book.bookTitle}</td>
        <td>${book.bookAuthor}</td>
        <td>${book.isbn}</td>
        <td>${book.startDate}</td>
        <td>${book.endDate}</td>
        <td>
          <button type="button" class="btn btn-primary" onclick="openModal(${book.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
          </button>
        <td>
          <button type="button" class="btn btn-danger" onclick="deleteBook(${book.id}); window.location.reload();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg></button>
        </td>      
        </tr>
        `)
    );
  });
});

//CREATE
$("#submitBookBtn").click(function () {
  $.post(API_URL, {
    bookTitle: $("#bookTitle").val(),
    bookAuthor: $("#bookAuthor").val(),
    isbn: $("#isbn").val(),
    startDate: $("#startDate").val(),
    endDate: $("#endDate").val(),
  });
});

//DELETE
deleteBook = (id) => {
  $.ajax(`${API_URL}/${id}`, {
    type: "DELETE",
  });
};

//UPDATE
openModal = (id) => {
  $("#editBookModal").modal("show");
  $("#modalCommit").click(function () {
    $.ajax(`${API_URL}/${id}`, {
      method: "PUT",
      data: {
        bookTitle: $("#modalBookTitle").val(),
        bookAuthor: $("#modalBookAuthor").val(),
        isbn: $("#modalIsbn").val(),
        startDate: $("#modalStartDate").val(),
        endDate: $("#modalEndDate").val(),
      },
    });
    $("#editBookModal").modal("hide");
    window.location.reload();
    console.log("You made it here");
  });
};

//Modal close buttons (x and close)
$("#closeModal").click(function () {
  $("#editBookModal").modal("hide");
});

$("#xClose").click(function () {
  $("#editBookModal").modal("hide");
});
// Event listener for submit button
// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//Variables set to form data
//   const bookTitle = form.elements["bookTitle"].value;
//   const bookAuthor = form.elements["bookAuthor"].value;
//   const isbn = form.elements["isbn"].value;
//   const dateStart = form.elements["dateStart"].value;
//   const dateFinish = form.elements["dateFinish"].value;

//   // Validate the form data.
//   if (bookTitle === "") {
//     alert("Please enter a book title.");
//     return;
//   }

//   if (bookAuthor === "") {
//     alert("Please enter a book author.");
//     return;
//   }

//   if (dateStart === "") {
//     alert("Please enter the date you started reading the book.");
//     return;
//   }

//   if (dateFinish === "") {
//     alert("Please enter the date you finished reading the book.");
//     return;
//   }

//   // Create a new row for the table.
//   const newRow = table.insertRow(1);
//   newRow.setAttribute("id", `item-${id}`);
//   newRow.insertCell(0).textContent = bookTitle;
//   newRow.insertCell(1).textContent = bookAuthor;
//   newRow.insertCell(2).textContent = isbn;
//   newRow.insertCell(3).textContent = dateStart;
//   newRow.insertCell(4).textContent = dateFinish;
//   let actions = newRow.insertCell(5);
//   actions.appendChild(createDeleteButton(id++));
//   form.reset();
// });

// //A delete row function
// function createDeleteButton(id) {
//   let btn = document.createElement("button");
//   btn.className = "btn btn-primary";
//   btn.id = id;
//   btn.textContent = "Delete";
//   btn.onclick = () => {
//     console.log(`Deleting row with id: item-${id}`);
//     let elementToDelete = document.getElementById(`item-${id}`);
//     elementToDelete.parentNode.removeChild(elementToDelete);
//   };
//   return btn;
// }
