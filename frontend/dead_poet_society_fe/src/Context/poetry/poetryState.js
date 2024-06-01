import { useState } from "react";
import PoetryContext from "./PoetryContext";
const hostname = "http://localhost:5000"

const PoetryState = (props) => {
    const [poem, setPoem] = useState([]);


    //api request for getting all poems 
    const getPoems = async () => {

        try {

            const response = await
                fetch(`${hostname}/api/poetry/fetchAllpoetry`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token")
                    }
                }
                );

            const json = await response.json();
            setPoem(json.allPoetries);

        } catch (error) {
            console.log("error getting poetries", error);
        }
    }

    // api request to add a poem
    const addPoem = async (poetryData) => {
        try {
            const response = await fetch(`${hostname}/api/poetry/addPoetry`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ poetryData })
            })

            const json = await response.json();
            if (json.success) {
                setPoem([...poem, json.Poetry]);
            }
        } catch (error) {
            console.log("error adding poetry", error);
        }

    }


    //api request to fetch all books

    const [kitab, setkitab] = useState([]);

    const getBooks = async () => {
        try {
            const response = await fetch(`${hostname}/api/book/fetchAllBooks`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            });

            const data = await response.json();
            if (data.success) {
                setkitab(data.Books);
            } else {
                console.error("Error fetching books:", data.message);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }


    // api request to fetch one book
    const [bookData, setBookdata] = useState({});

    const fetchOneBook = async (bookId) => {
        try {
            const response = await fetch(`${hostname}/api/book/fetchOneBook/${bookId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            });

            const data = await response.json();
            if (data.success) {
                setBookdata(data.book);
            }
            else {
                console.log("there is some error getting this book");
            }

        } catch (error) {
            console.log("error getting this book", error);
        }


    }

    // api request to fetch one book 
    const addOneBook = async (bookname, price, language, description) => {
        try {
            const response = await fetch(`${hostname}/api/book/addBook`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify({ name: bookname, price, language, description })
            })

            const json = await response.json();

            if (json.success) {
                console.log("book added successfully");
            }
            else {
                console.log("not able to add the book");
            }
        } catch (error) {
            console.log("some error adding the book in the api", error);
        }
    }


    // api request to add a review 
    const addReview = async (comment, rating, id) => {
        console.log(comment, rating, id);
        const response = await fetch(`${hostname}/api/book/addReview/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ comment, rating })
        })

        const json = response.json();

        if (json.success) {
            console.log("review added successfully");
        }
        else {
            console.log("not able to add the review");
        }
    }

    // api request to fetch carts books
    const [cartBooks, setCartBooks] = useState([]);
    const fetchCartBooks = async () => {

        try {
            const response = await fetch(`${hostname}/api/book/fetchCartBooks`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
            })

            const json = await response.json();
            if (json.success) {
                // console.log("i am in front end");
                // console.log(json);
                console.log(json.books);
                setCartBooks(json.books);
                console.log(json.books);
            }
            else {
                console.log("some error has occured");
            }
        } catch (error) {
            console.log("some error has occured while getting all books from the cart", error);
        }

    }

    const addBookCart = async (id) => {
        console.log(id);
        const response = await fetch(`${hostname}/api/book/addBookToCart/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        })

        const json = response.json();

        if (json.success) {
            console.log("book added successfully");
        }
        else {
            console.log("not able to add the book in cart");
        }
    }


    return (
        <PoetryContext.Provider value={{ poem, setPoem, getPoems, addPoem, getBooks, kitab, setkitab, bookData, fetchOneBook, addReview, fetchCartBooks, cartBooks, addOneBook, addBookCart }}>
            {props.children}
        </PoetryContext.Provider>
    )
}

export default PoetryState
