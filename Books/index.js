class MainFun{

constructor(){
// this.getBooks();
}

  getBooks(){
  let totalBooks =  getBookList();
  for (const book of totalBooks) {
   let bookElement=  document.getElementById('book');
   let option = document.createElement('option');
   option.id = book.authodId
   option.innerHTML = book.authorName;
   bookElement.appendChild(option);

  }

}



 search(){

      let totalBooks =  getBookList();
let searchInput = document.getElementById('titleorAuthor').value;
let selectedOption = document.getElementById('book').value;
console.log(searchInput,"searchInput");
console.log(selectedOption,"selectedOption");

let filteredList = totalBooks.filter(value =>{
return value.authorName == selectedOption || value.bookName == searchInput || value.authorName == searchInput
});

console.log(filteredList,"filteredList");
return filteredList;
//  window.location.replace("file:///C:/Users/alahari/Desktop/javascript/E-Book_management/displayTable.html ") ;
// console.log(window.location.href,"location");
}

}

let mainFun = new MainFun();
mainFun.getBooks();
// export default mainFun;