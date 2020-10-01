

let ListOfFilterData = "";
let objectOfOrders = [];
let valueOfInput = "";
let allItems = [];
let totalPrice = 0;
let serachCount =0;
let count = 0;
let filObj = [];

function disableOrderButton(){
document.getElementById('orderId').disabled = true; 
document.getElementById('orderId').title = "please select atleast one record"; 
}
disableOrderButton();
function display() {
  let x = document.getElementById("myDIV");
  let y = document.getElementById("customerInfo");

  if (ListOfFilterData.length == 0) {
    x.style.display = "none";
    y.style.display = "none";
    
  } else {
    x.style.display = "block";
  
  }
  if(allItems.length == 0){
    y.style.display = "none";
  }
  else {
    y.style.display = "block";
  
  }
}
display();

function disable(val){

if(val) { 
  document.getElementById('searchId').disabled = false; 
  document.getElementById('searchId').title = ''; 
} else { 
  document.getElementById('searchId').disabled = true;
  document.getElementById('searchId').title = 'please select atleast one'; 
}


}



function disableOrder(val){
console.log(val,"checked or not");
  if(val.checked ==  true) { 
    document.getElementById('orderId').disabled = false; 
    document.getElementById('orderId').title = ''; 
  } else { 
    document.getElementById('orderId').disabled = true;
    document.getElementById('orderId').title = 'please select atleast one record'; 
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

  var table = document.getElementById('tableId');
  let totalList = ListOfFilterData;
if(totalList.length == 0){
   var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
  for (const list of totalList) {

    // let tablerow1 = document.getElementById(list.bookName);

    //  console.log(tablerow1.id ,"tablerow");
    //  if(tablerow1.id == list.bookName )
    let tablerow = document.createElement('tr');
    let tableDataCkeck = document.createElement('td');
    let tableData1 = document.createElement('td');
    let tableData2 = document.createElement('td');
    let tableData3 = document.createElement('td');
    let tableData4 = document.createElement('td');

    let text = document.createElement('input');
    text.setAttribute('type', 'checkbox');
    text.setAttribute('id', list.bookName);
    text.setAttribute('value', list.bookName);
  //  let inputCheck= document.getElementById(list.bookName)
    text.setAttribute("onchange","disableOrder(this)");

    text.setAttribute('name', 'book');
    let text1 = document.createTextNode(list.authorName);
    let text2 = document.createTextNode(list.bookName);

    let text3 = document.createTextNode(list.price);
    let text4 = document.createElement('input');
    text4.setAttribute('id', list.qId);
    // text.setAttribute('value',);
    //  valueOfInput =  text4.value;

    tableDataCkeck.appendChild(text);
    tableData1.appendChild(text1);
    tableData2.appendChild(text2);
    tableData3.appendChild(text3);
    tableData4.appendChild(text4);

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
    }

    allItems.push(obj);

    valueOfInput = document.getElementById(list.bookName);
    console.log(valueOfInput.checked ,"valueOfInput");
    // disableOrder(this.value){

    // }

  }
  console.log(totalList, "unnava");



}
let totalReceivedList = [];
function getCustomerData() {
  removeOldData();
  if (count == 0) {
    totalReceivedList = filObj;
    let receivedDable = document.getElementById('receivedDataList');
    for (const receivedList of totalReceivedList) {
      document.getElementById('cusName').innerHTML = receivedList.name;
      document.getElementById('cusEmail').innerHTML = receivedList.email;
      document.getElementById('cusMobileNumber').innerHTML = receivedList.mobileNumber;


      let tablerow = document.createElement('tr');
      tablerow.id = receivedList.authorName;

      let tableData1 = document.createElement('td');
      // tableData1.id = receivedList.authorName;
      let tableData2 = document.createElement('td');
      // tableData1.id = receivedList.bookName;
      let tableData3 = document.createElement('td');
      // tableData1.id = receivedList.authodId;
      let tableData4 = document.createElement('td');
      // tableData1.id = receivedList.quality;



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
    console.log(totalPrice.toString(), "totalPrice");
    document.getElementById('totalCost').innerHTML = totalPrice.toString();
    totalPrice = 0;
    console.log(totalReceivedList, "totalReceivedList");
  }
  count++;

}

function search() {
  let totalBooks = getBookList();
  let searchInput = document.getElementById('titleorAuthor').value;
  let selectedOption = document.getElementById('book').value;
  
  console.log(searchInput, "searchInput");
  console.log(selectedOption, "selectedOption");
  //  let book  = totalBooks.some(val => return val.bookName != selectedOption ) 
  //   console.log(book ,"return value");

  let filteredList = totalBooks.filter(value => {
    return value.authorName == selectedOption || value.bookName == searchInput || value.authorName == searchInput

  });
  // for (const iterator of filteredList) {
  //   if(iterator.bookName != selectedOption ){
  ListOfFilterData = filteredList;
  //   }
  // }
  // ListOfFilterData = filteredList;
  // allItems.push(ListOfFilterData);
  console.log(ListOfFilterData, "filteredList");
  display();
  get();
  console.log(filteredList)
  return filteredList;


}



function orderItems() {
  removeItem();
  // for (const list of ListOfFilterData) {
    // var x = document.getElementById("toaste");
    // x.className = "show";
    // setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

  for (const list of allItems) {
    let inputValue = document.getElementById(list.bookName);
    // objectOfOrders.push(inputValue)
    if (inputValue.checked) {
      let quantityValue = document.getElementById(list.qId).value;
      let name = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let mobileNumber = document.getElementById('mobileNumber').value;
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
    }


  }
  display();
  getCustomerData();
  console.log(objectOfOrders, "orderObject");

}

function removeItem() {
  objectOfOrders = [];
}

function removeOldData() {
  for (const receivedList of totalReceivedList) {
    let tablerow = document.getElementById(receivedList.authorName);
    tablerow.remove();
  }
  count = 0;
}

function removeOldDataOfSearch(){

  for (const receivedList of totalList) {
    let tablerow = document.getElementById(receivedList.authorName);
    tablerow.remove();
  }
}