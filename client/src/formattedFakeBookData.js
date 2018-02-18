const formattedBooks = [];

const books = window.books;


for (var book in books) { 

  if (books[book].ddc) {   
    formattedBooks.push({
      title: books[book].title,
      author: books[book].primaryauthor,
      isnb: books[book].originalisbn || "N/A",
      ddc: {
        baseNumber: Math.floor(parseInt(books[book].ddc.code[0])/100)*100,
        fullNumber: books[book].ddc.code[0],
        category: books[book].ddc.wording   
      },
      published: books[book].date,
      pages: books[book].pages,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/51L10EnuJbL._SX295_BO1,204,203,200_.jpg'
    });
  }
}

for (var i=0; i < formattedBooks.length; i++) {
  if (i % 5 === 0) {
    formattedBooks[i].owned = false;
  } else {
    formattedBooks[i].owned = true;
  }

  if (i % 13 === 0) {
    formattedBooks[i].loaned = true;
  } else {
    formattedBooks[i].loaned = false;
  }
}

window.formattedBooks = formattedBooks;
