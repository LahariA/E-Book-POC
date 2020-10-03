let ListOfFilterData = "";
let objectOfOrders = [];
let valueOfInput = "";
let allItems = [];
let totalPrice = 0;
let serachCount = 0;
let count = 0;
let filObj = [];
let totalList = [];
let countCheck = 0;
let totalSearchedData = [];
let totalReceivedList = [];
let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function display() {
  const x = document.getElementById("myDIV");
  const y = document.getElementById("customerInfo");

  if (totalSearchedData.length == 0 && totalList.length == 0) {

    x.style.display = "none";
    y.style.display = "none";
  } else {
    x.style.display = "block";
  }

  if (filObj.length == 0) {
    y.style.display = "none";
  }
  else {
    y.style.display = "block";
  }

}
display();

function disable(val) {
  if (val) {
    document.getElementById('searchId').disabled = false;
    document.getElementById('searchId').title = '';
  } else {
    document.getElementById('searchId').disabled = true;
    document.getElementById('searchId').title = 'please select atleast one';
  }
}



disable();
function getBooks() {
  let totalBooks = getBookList();
  for (const book of totalBooks) {
    let bookElement = document.getElementById('book');
    let option = document.createElement('option');
    option.id = book.authodId
    option.innerHTML = book.authorName;
    bookElement.appendChild(option);
  }
}
getBooks();

function get() {
  let table = document.getElementById('tableId');
  totalList = ListOfFilterData;
  if (totalList.length == 0) {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 1000);
  }
  for (const list of totalList) {
    let tablerow = document.createElement('tr');
    let tableDataCkeck = document.createElement('td');
    let tableData1 = document.createElement('td');
    let tableData2 = document.createElement('td');
    let tableData3 = document.createElement('td');
    let tableData4 = document.createElement('td');

    let text = document.createElement('input');
    let textPara = document.createElement('p');
    textPara.setAttribute('id', list.authodId);
    text.setAttribute('type', 'checkbox');
    text.setAttribute('id', list.bookName);
    text.setAttribute('value', list.bookName);


    text.setAttribute('name', 'book');
    let text1 = document.createTextNode(list.authorName);
    let text2 = document.createTextNode(list.bookName);

    let text3 = document.createTextNode(list.price);
    let text4 = document.createElement('input');
    text4.setAttribute('id', list.qId);

    tableDataCkeck.appendChild(text);
    tableData1.appendChild(text1);
    tableData2.appendChild(text2);
    tableData3.appendChild(text3);
    tableData4.appendChild(text4);
    tableData4.appendChild(textPara);

    tablerow.appendChild(tableDataCkeck);
    tablerow.appendChild(tableData1);
    tablerow.appendChild(tableData2);
    tablerow.appendChild(tableData3);
    tablerow.appendChild(tableData4);

    table.appendChild(tablerow);
    let obj = {
      authorName: list.authorName,
      bookName: list.bookName,
      price: list.price,
      qId: list.qId,
      authorId: list.authorId,
    }
    allItems.push(obj);
    valueOfInput = document.getElementById(list.bookName);

  }

}


function getCustomerData() {
  removeOldData();
  if (count == 0) {
    totalReceivedList = filObj;
    let receivedDable = document.getElementById('receivedDataList');
    for (let receivedList of totalReceivedList) {
      document.getElementById('cusName').innerHTML = receivedList.name;
      document.getElementById('cusEmail').innerHTML = receivedList.email;
      document.getElementById('cusMobileNumber').innerHTML = receivedList.mobileNumber;

      let tablerow = document.createElement('tr');
      tablerow.id = receivedList.authorName;

      let tableData1 = document.createElement('td');
      let tableData2 = document.createElement('td');
      let tableData3 = document.createElement('td');
      let tableData4 = document.createElement('td');

      let text1 = document.createTextNode(receivedList.authorName);
      let text2 = document.createTextNode(receivedList.bookName);
      let text3 = document.createTextNode(receivedList.price);
      let text4 = document.createTextNode(receivedList.quality);

      tableData1.appendChild(text1);
      tableData2.appendChild(text2);
      tableData3.appendChild(text3);
      tableData4.appendChild(text4);

      tablerow.appendChild(tableData1);
      tablerow.appendChild(tableData2);
      tablerow.appendChild(tableData3);
      tablerow.appendChild(tableData4);

      receivedDable.appendChild(tablerow);
      totalPrice += (receivedList.price * receivedList.quality);
    }

    document.getElementById('totalCost').innerHTML = totalPrice.toString();
    totalPrice = 0;

  }
  count++;
}

function search() {
  let totalBooks = getBookList();
  let searchInput = document.getElementById('titleorAuthor').value;
  let selectedOption = document.getElementById('book').value;

  let filteredList = totalBooks.filter(value => {
    return value.authorName == selectedOption || value.bookName == searchInput || value.authorName == searchInput
  });
  ListOfFilterData = filteredList;

  totalSearchedData.push(ListOfFilterData);
  display();
  get();

  return filteredList;
}

function showrecordNotFound() {
  if (countCheck == 0) {
    let y = document.getElementById("record");
    y.className = "show";
    setTimeout(function () { y.className = y.className.replace("show", ""); }, 1000);
  }
  else {
    countCheck = 0;
  }
}

function orderItems() {
  removeItem();
  for (let list of allItems) {
    let inputValue = document.getElementById(list.bookName);
    if (!inputValue.checked) {
      showrecordNotFound();
    }
    else {
      countCheck++;
      showrecordNotFound();
      let quantityValue = document.getElementById(list.qId).value;
      let name = document.getElementById('name').value;

      let email = document.getElementById('email').value;
      let mobileNumber = document.getElementById('mobileNumber').value;
      if (name == "" || email == "" || mobileNumber == "" || !mobileNumber.match(/^\(?([6-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/
        || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
      ) {
        if (name == "") {
          let nameValidation = "Name Required";
          document.getElementById('validationName').innerHTML = nameValidation;
        }
        else {
          document.getElementById('validationName').innerHTML = "";
        }
        if (email == "") {
          let emailValidation = "Email Required";
          document.getElementById('emailValidation').innerHTML = emailValidation;
        }
        else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
          let emailValidationData = "Please enter valid Email";
          document.getElementById('emailValidation').innerHTML = emailValidationData;
        }
        else {
          document.getElementById('emailValidation').innerHTML = "";
        }
        if (mobileNumber == "") {
          let mobileNumberValidation = "MobileNumber Required";
          document.getElementById('mobileNumberValidation').innerHTML = mobileNumberValidation;
        }
        else if (!mobileNumber.match(/^\(?([6-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/)) {
          let mobileNumberValidationdata = "Please enter valid MobileNumber";
          document.getElementById('mobileNumberValidation').innerHTML = mobileNumberValidationdata;
        }
        else {
          document.getElementById('mobileNumberValidation').innerHTML = "";
        }

      }
      else {
        document.getElementById('validationName').innerHTML = "";
        document.getElementById('emailValidation').innerHTML = "";
        document.getElementById('mobileNumberValidation').innerHTML = "";

        let obj = {
          authorName: list.authorName,
          bookName: list.bookName,
          price: list.price,
          quality: quantityValue,
          name: name,
          email: email,
          mobileNumber: mobileNumber,

        }
        objectOfOrders.push(obj);
        filObj = objectOfOrders;
        display();
        getCustomerData();

      }
    }
  }
}

function removeItem() {
  objectOfOrders = [];
}

function removeOldData() {
  for (let receivedList of totalReceivedList) {
    let tablerow = document.getElementById(receivedList.authorName);
    if (tablerow != null) {
      tablerow.remove();
    }

  }
  count = 0;
}

function removeOldDataOfSearch() {
  for (let receivedList of totalList) {
    let tablerow = document.getElementById(receivedList.authorName);
    tablerow.remove();
  }
}