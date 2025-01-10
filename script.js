const bookVault = [];

function Book(title,author,pages,isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToVault(title,author,pages,isRead){
    const newBook = new Book(title,author,pages,isRead);
    bookVault.push(newBook);
    createCard(bookVault.length-1);
}


const content = document.querySelector(".content");
const create = document.querySelector(".create");
const pop = document.querySelector(".pop");
const cancel = document.querySelector(".cancel");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readBox = document.getElementById("read");
const form = document.querySelector("form");


function createCard(index){

    const firstMessage = document.querySelector(".first");
    if(firstMessage && bookVault.length > 0){
        content.removeChild(firstMessage);
    }

    let box = document.createElement("div");
    box.classList.add("surprise");
    content.appendChild(box);
    
    let titleData = document.createElement("div");
    titleData.textContent = `"${bookVault[index].title}"`;
    titleData.classList.add("data");
    box.appendChild(titleData);

    let authorData = document.createElement("div");
    authorData.textContent = `${bookVault[index].author}`;
    authorData.classList.add("data");
    box.appendChild(authorData);

    let pagesData = document.createElement("div");
    pagesData.textContent = `Pages : ${bookVault[index].pages}`;
    pagesData.classList.add("data");
    box.appendChild(pagesData);

    let read = document.createElement("button");
    if (bookVault[index].isRead) { 
        read.classList.add("readCheck");
        read.textContent = "read";
    } else {
        read.classList.add("readUncheck");
        read.textContent = "Not read";
    }
    box.appendChild(read);
    statusToggle(read,index);

    let removeBtn = document.createElement("button");
    removeBtn.classList.add("removeBtn")
    removeBtn.innerHTML = ' <img src="stuff/cross.png" alt="close" class="btn"> ';
    removeBtn.setAttribute("data-index",index);
    box.appendChild(removeBtn);

    deleteCard(removeBtn);

}

create.addEventListener("click", () => {
    pop.showModal();
})

cancel.addEventListener("click", () => {
    pop.close();
})

form.addEventListener("submit", (event) => {

    event.preventDefault();
    addBookToVault(title.value , author.value , pages.value , readBox.checked);
    pop.close();
    form.reset();

})

function statusToggle(read,index){
    read.addEventListener("click", () => {

        if (read.textContent === "read") {
            read.classList.remove("readCheck");
            read.classList.add("readUncheck");
            read.textContent = "unread";
            bookVault[index].isRead = false;  
        } else {
            read.classList.remove("readUncheck");
            read.classList.add("readCheck");
            read.textContent = "read";
            bookVault[index].isRead = true; 
        }
    })
}

function deleteCard(removeBtn){
    removeBtn.addEventListener("click", () => {
        const indexRemove = parseInt(removeBtn.getAttribute("data-index"));
        bookVault.splice(indexRemove,1);
        const cardRemove = removeBtn.parentElement;
        cardRemove.remove();

        // const remainingCards = document.querySelectorAll(".surprise");  // ** didn't understand how this thing gets the i value ** //
        // remainingCards.forEach((card, i) => {
        // const removeButton = card.querySelector(".removeBtn");
        // removeButton.setAttribute("data-index", i);
        // });

        const remainingCards = Array.from(document.querySelectorAll(".surprise")); // updating indexes
        for(let i=indexRemove;i<remainingCards.length;i++){
            const removeButton = remainingCards[i].querySelector(".removeBtn");
            removeButton.setAttribute("data-index", i);
        }

        
        if(bookVault.length === 0) {
            const firstMessage = document.createElement("div");
            firstMessage.classList.add("first");
            firstMessage.innerHTML = `
                    <p>It's empty!</p>
                    <img class="face" src="stuff/face.png" alt="face">
            `
            content.appendChild(firstMessage);
        }
    })
}

/*    
at first, didn't get how it automatically rearranges the cards after i remove/delete a card
got to know that it's due to -   
        Browser's Rendering of Flex/Grid Layout

        When a card is removed (cardRemove.remove()), the browser removes that element from the DOM. This triggers a re-render of the remaining DOM elements.

        The rearrangement is handled by the browser's reflow mechanism
*/
/* this is just the default behaviour, dont know why it feels odd for this project */