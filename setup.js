document.addEventListener("DOMContentLoaded", () => {
  var category = "all";
  var difficulty = "easy";
  window.localStorage.setItem("category", category);
  window.localStorage.setItem("difficulty", difficulty);
  const categoryDiv = document.getElementById("category");
  const difficultyDiv = document.getElementById("difficulty");
  console.log(difficultyDiv);

  categoryDiv.addEventListener("change", (e) => {
    category = e.target.value;
    while (category.includes(" ")) {
      category = category.replace(" ", "_");
    }
    category = category.toLowerCase();
    console.log(category);
    window.localStorage.setItem("category", category);
  });

  difficultyDiv.addEventListener("change", (e) => {
    difficulty = e.target.value;
    difficulty = difficulty.toLowerCase();
    console.log(difficulty);
    window.localStorage.setItem("difficulty", difficulty);
  });
});
