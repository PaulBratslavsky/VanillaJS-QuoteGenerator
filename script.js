console.log("Javasript ready...");
/**************************************************
    VARIABLES
**************************************************/
const quoteLength = 128;
const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const apiURL =
  "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

/**************************************************
    HTML ELEMENTS
**************************************************/
const container = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const getQuoteButton = document.getElementById("new-quote");
const share = document.getElementById("twitter");
const loader = document.getElementById("loader");

/**************************************************
    FUNCTIONS
**************************************************/
function showLoadingSpinner() {
  loader.style.display = "block";
  container.style.display = "none";
}

function hideLoadingSpinner() {
  loader.style.display = "none";
  container.style.display = "block";
}

function handleGetQuote() {
  getQuoteFromApi();
}

function handleShareToTwitter() {
  const twitterData = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
  window.open(twitterData, "_blank");
}

/**************************************************
    ARROW FUNCTIONS
**************************************************/
const checkLength = (data, numberOfChars) =>
  data.length >= numberOfChars
    ? quote.classList.add("long-quote")
    : quote.classList.remove("long-quote");

const checkAuthor = (author) => (author !== "" ? author : "Unknown");

/**************************************************
    API CALL
**************************************************/
async function getQuoteFromApi() {
  showLoadingSpinner();

  try {
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();

    checkLength(data.quoteText, quoteLength);

    quote.innerText = data.quoteText;
    author.innerText = checkAuthor(data.quoteAuthor);
    hideLoadingSpinner();
  } catch (err) {
    getQuoteFromApi();
    console.error(`API Error: ${err}`);
    showLoadingSpinner();
  }
}

/**************************************************
    EVENT LISTENERS
**************************************************/
getQuoteButton.addEventListener("click", handleGetQuote);
share.addEventListener("click", handleShareToTwitter);

/**************************************************
    RUN ON PAGE LOAD
**************************************************/
getQuoteFromApi();
