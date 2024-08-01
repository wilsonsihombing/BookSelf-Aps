# Bookself Apps

## Introduction
Bookself Apps is a web application that helps users manage their book collections. The application is built to handle book data using `localStorage`, allowing for persistence across page reloads. Users can add, move, and delete books in two distinct categories: "Belum selesai dibaca" (Not Finished Reading) and "Selesai dibaca" (Finished Reading).

## Features
1. **Use of `localStorage`:** Data persists even after closing and reopening the web page. Books are stored in `localStorage` as JavaScript objects with the following format:
   ```json
   {
     "id": "string | number",
     "title": "string",
     "author": "string",
     "year": "number",
     "isComplete": "boolean"
   }
   ```
   Example:
   ```json
   {
     "id": 3657848524,
     "title": "Harry Potter and the Philosopher's Stone",
     "author": "J.K Rowling",
     "year": 1997,
     "isComplete": false
   }
   ```

2. **Add Books:** Users can add new books via a form. Each book is assigned a unique ID generated using a timestamp (e.g., `new Date().getTime()`).

3. **Two Book Shelves:** 
   - "Belum selesai dibaca" (Not Finished Reading): Displays books where `isComplete` is `false`.
   - "Selesai dibaca" (Finished Reading): Displays books where `isComplete` is `true`.

4. **Move Books Between Shelves:** Users can move books between the two shelves. Changes are saved to `localStorage`.

5. **Delete Books:** Users can delete books from either shelf. The book is removed from the display and `localStorage`.

## Technologies Used
- HTML
- CSS
- JavaScript
- localStorage for data persistence

---
Thank you for exploring the Bookself Apps project. We hope it meets your needs for managing your book collection. If you have any feedback or encounter any issues, please feel free to open an issue or submit a pull request. Happy reading!
