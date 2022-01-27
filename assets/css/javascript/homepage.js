var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");







var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data, user);
      });
    } else {
      alert("error: github user not found");
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("unable to connect to github");
  });
};




var formSubmitHandler = function (event) {
  event.preventDefault();
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("please enter a github username");
  }

};

var displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    var repoName = repos[i].owner.login + "/" + repos[i].name;
    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    // create a span element to hold repository name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    // append to container
    repoEl.appendChild(titleEl);
    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";
    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class= 'fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>";
    }
    //apend to container
    repoEl.appendChild(statusEl);

    // append container to the DOM
    repoContainerEl.appendChild(repoEl);
  }

  console.log(repos);
  console.log(searchTerm);
};

userFormEl.addEventListener("submit", formSubmitHandler);