fetch("https://stoicquotesapi.com/v1/api/quotes/random")
  .then((response) => response.json())
  .then((data) => {
    // Find <main> element
    const main = document.querySelector("main");
    const firstChild = main.firstElementChild;

    // Find the quote container div
    const quoteContainer = document.querySelector(".quote-container");

    // Create a new div for the quote
    const quoteDiv = document.createElement("div");

    // Create a new element for the quote text
    const quoteText = document.createElement("p");
    quoteText.innerHTML = data.body;

    // Create a new element for the author name
    const authorName = document.createElement("p");
    authorName.innerHTML = `- ${data.author}`;

    // Append the quote text and author name to the quote div
    quoteDiv.appendChild(quoteText);
    quoteDiv.appendChild(authorName);

    // Append the quote div to the quote container
    quoteContainer.appendChild(quoteDiv);

    // Append the quote container to the main element
    main.insertBefore(quoteContainer, firstChild);

    // Button creating with material design icons
    const showSavedQuotesButton = document.querySelector(
      ".show-saved-quotes-button"
    );
    showSavedQuotesButton.innerHTML = `<i class="material-icons">list</i>`;

    const saveQuoteButton = document.querySelector(".save-quote-button");
    saveQuoteButton.innerHTML = `<i class="material-icons">save</i>`;

    const newQuoteButton = document.querySelector(".new-quote-button");
    newQuoteButton.innerHTML = `<i class="material-icons">refresh</i>`;

    // Save quotes to list

    saveQuoteButton.addEventListener("click", function () {
      // Load the saved quotes from local storage
      let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];

      // Check if the current quote is already in the list
      const isQuoteSaved = savedQuotes.some(
        (quote) => quote.body === data.body
      );

      if (!isQuoteSaved) {
        savedQuotes.push(data);
        localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
      }

      console.log(savedQuotes);
    });

    showSavedQuotesButton.addEventListener("click", function () {
      showSavedQuotes();
    });

    newQuoteButton.addEventListener("click", function () {
      window.location.reload();
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

// Show saved quotes

function showSavedQuotes() {
  console.log("showSavedQuotes");
  // Load the saved quotes from local storage
  let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];

  const main = document.querySelector("main");
  main.classList.add("hidden");

  const savedQuotesContainer = document.createElement("div");
  savedQuotesContainer.classList.add("saved-quotes-container");

  const savedQuotesList = document.createElement("ul");
  savedQuotes.forEach((quote) => {
    const quoteItem = document.createElement("li");
    quoteItem.innerHTML = `<p>${quote.body}</p><p>- ${quote.author}</p>`;
    savedQuotesList.appendChild(quoteItem);
    console.log(quoteItem);
  });

  const backButton = document.createElement("button");
  backButton.classList.add("saved-quotes-back-button");
  backButton.innerHTML = "Back";
  backButton.addEventListener("click", function () {
    main.classList.remove("hidden");
    savedQuotesList.remove();
    backButton.remove();
  });

  savedQuotesContainer.appendChild(backButton);
  savedQuotesContainer.appendChild(savedQuotesList);

  document.body.appendChild(savedQuotesContainer);
}
