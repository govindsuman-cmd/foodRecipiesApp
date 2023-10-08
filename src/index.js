const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".searchBox");
const recipieContainer = document.querySelector(".recipie-container");
const recipieDetails = document.querySelector(".recipie-details");
const recipieCloseBtn = document.querySelector(".recipie-close-button");
const recipieDetailsContent = document.querySelector(
  ".recipie-details-content"
);

const fetchRecipies = async (query) => {
  recipieContainer.innerHTML = `Searching for ${query} recipies...`;
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
    recipieContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      const recipieDiv = document.createElement("div");
      recipieDiv.classList.add("recipie");
      recipieDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
    `;
      const button = document.createElement("button");
      button.textContent = "View Recipie";
      recipieDiv.appendChild(button);
      button.addEventListener("click", () => {
        openRecipiePopup(meal);
      });
      recipieContainer.appendChild(recipieDiv);
    });
  } catch (error) {
    recipieContainer.innerHTML = "<h2>404 Result Not Found!!!</h2>";
  }

  const fetchIngredents = (meal) => {
    let ingredentList = "";
    for (let i = 1; i < 20; i++) {
      const ingredents = meal[`strIngredient${i}`];
      if (ingredents) {
        const measures = meal[`strMeasure${i}`];
        ingredentList += `<li>${measures}${ingredents}</li>`;
      } else {
        break;
      }
    }
    return ingredentList;
  };
  const openRecipiePopup = (meal) => {
    recipieDetailsContent.innerHTML = `
    <h2 class="recipieName">${meal.strMeal}</h2>
    <h2>Ingredents</h2>
    <h2 class="ingredentList">${fetchIngredents(meal)}</h2>
    <div>
       <h3>Instructions</h3>
       <p class="recipieInstructions">${meal.strInstructions}</p>
    </div>
    `;
    recipieDetailsContent.parentElement.style.display = "block";
  };
};
recipieCloseBtn.addEventListener("click", () => {
  recipieDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("button clicked");
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipieContainer.innerHTML = `<h2>404 You have not enter the meal!!!!</h2>`;
    recipieContainer.style.color = "red";
    return;
  }
  fetchRecipies(searchInput);
});
