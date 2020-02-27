const searchText = document.getElementById('searchText'),
  searchBtn = document.getElementById('searchBtn'),
  shuffleBtn = document.getElementById('shuffleBtn'),
  resultMessageDiv = document.getElementById('resultMessage'),
  resultListDiv = document.getElementById('resultList'),
  singleResultDiv = document.getElementById('singleResult');

function searchHandler(e) {
  e.preventDefault();
  const text = searchText.value;

  if (text.trim() !== '') {

    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + text).then(res => res.json()).then(data => {
      searchText.value = "";
      console.log(data.meals);
      if (data.meals === null) {
        resultMessageDiv.innerHTML = `<p>No results for '${text}'`;
      } else {
        resultMessageDiv.innerHTML = `<p>Results for the '${text}'`;
        resultListDiv.innerHTML = '';
        resultListDiv.innerHTML = data.meals.map(meal => {
          return `<div class='img-container' data-mealid=${meal.idMeal}><img src="${meal.strMealThumb}" /><h4>${meal.strMeal}</h4></div>`;
        }).join('');
      }
    })
  }
}

function randomMealHandler() {
  resultMessageDiv.innerHTML = "";
  resultListDiv.innerHTML = "";
  singleResultDiv.innerHTML = "";
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json()).then(data => {
    console.log(data.meals[0].idMeal);
    addMealToDOM(data.meals[0]);
  })
}

function recipeClickHandler(e) {
  const imgContainerClicked = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('img-container');
    }
    else {
      return false;
    }
  })

  if (imgContainerClicked) {
    console.log(imgContainerClicked.getAttribute('data-mealid'));
    const mealId = imgContainerClicked.getAttribute('data-mealid');
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId).then(res => res.json()).then(data => {
      console.log(data.meals);
      addMealToDOM(data.meals[0]);
    });
  }
}

// adding meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  singleResultDiv.innerHTML = `<div class="single-meal">
    <h2>${meal.strMeal}</h2>
    <div class="img-container">
      <img src=${meal.strMealThumb} alt=${meal.strMeal}/>
    </div>
    <div class='meal-info'>
      ${meal.strCategory ? `<h4>${meal.strCategory}</h4>` : null}
      <br>
      ${meal.strArea ? `<h4>${meal.strArea}</h4>` : null}
    </div>
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul class="ingredientList" >
      ${ingredients.map(ing => {
    return `<li>${ing}</li>`
  }).join('')}
    </ul>
  </div>`;


}

searchBtn.addEventListener('click', searchHandler);
shuffleBtn.addEventListener('click', randomMealHandler);
resultListDiv.addEventListener('click', recipeClickHandler)