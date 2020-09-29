// import {Index} from './index';
// import mainFun from './index';

function get(){
    // let indexdfsdff = mainFun.getBooks();
    // let list=  index.search();


   var table = document.getElementById('tableId');
  let totalList =  getBookList()
  for (const list of totalList) {
    let tablerow = document.createElement('tr');
let tableDataCkeck = document.createElement('td');
let tableData1 = document.createElement('td');
let tableData2 = document.createElement('td');
let tableData3 = document.createElement('td');
let tableData4 = document.createElement('td');

let text = document.createTextNode("input");
let text1 = document.createTextNode(list.authorName);
let text2 = document.createTextNode(list.bookName);
let text3 = document.createTextNode(list.price);
let text4 = document.createTextNode("");

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
  }
console.log(totalList,"unnava");
}

get();