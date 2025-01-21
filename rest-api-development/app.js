const express = require("express");
const app = express();

//Middleware
app.use(express.json());

let books = [
  {
    id: "1",
    title: "Book 1",
  },
  {
    id: "2",
    title: "Book 2",
  },
];

//intro route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our bookstore api",
  });
});

//get all books
app.get("/get", (req, res) => {
    res.json(books);
  });
//get a single book
app.get("/get/:id",(req,res)=>{
    const book = books.find((item)=>item.id===req.params.id);
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({
            message:"Book not Found ! try with different book id"
        })
    }

})
//add a new book 
app.post("/add",(req,res)=>{
    const newBook = {
        id:Math.floor(Math.random()*1000).toString(),
        title:`Book ${Math.floor(Math.random()*1000)}`,
    }
    books.push(newBook);
    res.status(200).json({
        data:newBook,
        message:"New book is added successfully",
    })
})

//updating a book
app.put('/update/:id',(req,res)=>{
    const findCurrentBook = books.find((bookitem)=>bookitem.id===req.params.id);
    if(findCurrentBook){
        findCurrentBook.title = req.body.title || findCurrentBooktitle;

        res.status(200).json({
            message:`Book with id ${req.params.id} updated successfully`,
            data:findCurrentBook,
        })
    }else{
        res.status(404).json({
            message:`Book not found`,
        })
    }
})
app.delete("/delete/:id", (req, res) => {
    const findIndexOfCurrentBook = books.findIndex(
      (item) => item.id === req.params.id
    );
    if (findIndexOfCurrentBook !== -1) {//if the index is not -1 that means it is present so delete this
      const deletedBook = books.splice(findIndexOfCurrentBook, 1);
      res.status(200).json({
        message: "Book deleted successfully",
        data: deletedBook[0],
      });
    } else {
      res.status(404).json({
        message: "Book not found",
      });
    }
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});