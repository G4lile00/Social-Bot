//Variable define area

const comments = [];

function rangeSlide(event) {
  const value = event.target.value;
  document.getElementById("rangeValue").innerHTML = value;
}

function likeRate() {
  const value = document.getElementById("rangeValue").innerHTML;
  document.getElementById("likerate").innerText = value + "%";
}

function trans() {
  const recommend = document.getElementById("rec");
  recommend.classList.add("trans");
}

function visible() {
  const recommend = document.getElementById("rec");
  if (recommend.classList.contains("invisible"))
    recommend.classList.remove("invisible");
  if (recommend.classList.contains("trans"))
    recommend.classList.remove("trans");
  recommend.classList.add("visible");
}

function invisible() {
  const recommend = document.getElementById("rec");
  if (recommend.classList.contains("visible"))
    recommend.classList.remove("visible");
  if (recommend.classList.contains("trans"))
    recommend.classList.remove("trans");
  recommend.classList.add("invisible");
}
/**
 * Validates the user interface input
 */
function validateInput() {
  resetErrors(); // Reset errors before checking for another round
  const errMsg = [];

  // Check for login credentials
  const userNameField = document.getElementById("login");
  const userName = userNameField.value;
  if (!userName || userName.length === 0) errMsg.push("Username is required !");

  const pwdField = document.getElementById("pass");
  const pwd = pwdField.value;
  if (!pwd || pwd.length === 0) errMsg.push("Password is required !");

  const hashField = document.getElementById("hash");
  const hash = hashField.value;
  if (!hash || hash.length === 0) errMsg.push("Hashtag is required !");

  const rangeInput = document.querySelector("input[type=range]");
  const rangeValue = parseInt(rangeInput.value);
  if (!rangeValue || rangeValue === 0)
    errMsg.push("Please select a range for bot !");

  if (errMsg.length > 0) {
    showErrors(errMsg);
    return false;
  }

  return true;
}

function showErrors(errMsg = []) {
  const errStr = [];
  if (errMsg && errMsg.length > 0)
    errMsg.forEach((msg) => errStr.push(`<p>${msg}</p>`));

  if (errStr.length > 0) {
    const errorBlock = document.querySelector("#snackbar");
    errorBlock.innerHTML = errStr.join("\r\n");
    errorBlock.classList.add("show");

    setTimeout(resetErrors, 3000);
  }
}

function resetErrors() {
  const errBlock = document.querySelector("#snackbar");
  errBlock.innerHTML = "";
  if (errBlock.classList.contains("show")) errBlock.classList.remove("show");
}

/**
 * Add comments input to the comment block
 * @returns
 */
function addComment(addCloseBtn = true) {
  const commentBlock = document.querySelector("#commentBody");
  if (!commentBlock) return;

  const inputLeft = document.querySelectorAll("input.comment-input");
  if (inputLeft.length === 0) commentBlock.innerHTML = "";

  const inputTemplate = document.createElement("div");
  inputTemplate.classList.add("row", "form-group");

  const inputFieldDiv = document.createElement("div");
  inputFieldDiv.classList.add(addCloseBtn ? "input-div" : "col-xs-12");

  const inputField = document.createElement("input");
  inputField.classList.add("form-control", "comment-input");
  inputField.setAttribute("type", "text");
  inputField.setAttribute("placeholder", "Type comment");

  inputFieldDiv.appendChild(inputField);
  inputTemplate.appendChild(inputFieldDiv);

  if (addCloseBtn) {
    const inputCloseDiv = document.createElement("div");
    inputCloseDiv.classList.add("close-div");

    const inputCloseBtn = document.createElement("button");
    inputCloseBtn.innerHTML = `<i class="fa fa-times-circle "></i>`;
    inputCloseBtn.classList.add("btn-remove");
    inputCloseBtn.setAttribute("type", "button");
    inputCloseBtn.addEventListener("click", () => {
      inputTemplate.remove();
      const inputLeft = document.querySelectorAll("input.comment-input");
      if (inputLeft.length === 0)
        commentBlock.innerHTML =
          '<div class="alert alert-info" style="margin: 1vw; font-size: 30px">No Comments</div>';
    });

    inputCloseDiv.appendChild(inputCloseBtn);
    inputTemplate.appendChild(inputCloseDiv);
  }

  commentBlock.appendChild(inputTemplate);
}

/**
 * Initiate bot after validating input
 */
function runBot() {
  if (validateInput()) {
    likeRate();
    bot();
    return;
  }
  return false;
}

window.onload = () => {
  /************************ Assigning events ***************************/
  ["change", "mousemove"].forEach((event) =>
    document
      .querySelector("input[type=range]")
      .addEventListener(event, rangeSlide)
  ); // Set the range value
  document.querySelector("#Botrun").addEventListener("click", runBot); // Trigger for bot to start working
  document
    .querySelector("#addCommentsRow")
    .addEventListener("click", addComment);
  addComment(); // Adds the first row for comments block
  document
    .querySelector("input[type=range]")
    .addEventListener("mouseover", visible);
  document
    .querySelector("input[type=range]")
    .addEventListener("mouseout", invisible);
  trans();
};
