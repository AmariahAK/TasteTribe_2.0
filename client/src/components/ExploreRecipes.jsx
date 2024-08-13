import React, { useState, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";
import {
  FaSearch,
  FaBookmark,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

// Implement categories in the explore recipes section according to diet Types
const dietType = [
  "All",
  "Vegan",
  "Dash",
  "Keto",
  "Atkins",
  "Pescatarian",
  "Gluten-Free",
];

const ExploreRecipes = () => {
  // Set the states for diet types, country, recipes, searchTerm and bookmarks
  const [selectedDietType, setSelectedDietType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);

  // Declare an URL variable for the db.json file
  const URL = "http://localhost:3001/recipes";

  // Fetch the recipes from the db.json file
  useEffect(() => {
    fetch(`${URL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);
  console.log(recipes);

  // Filter the recipes based on the selected diet type, country, and search term
  const filteredRecipes = recipes.filter(
    (recipe) =>
      (recipe.dietType === selectedDietType || selectedDietType === "All") &&
      (recipe.countryOfOrigin === selectedCountry ||
        selectedCountry === "All") &&
      (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.chefName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const countries = [
    "All",
    ...new Set(recipes.map((recipe) => recipe.countryOfOrigin)),
  ];

  // Handle the share logic using social media links
  const shareOnSocialMedia = (platform, recipe) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${recipe.title} recipe!`);
    let shareUrl;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "instagram":
        shareUrl = `https://instagram.com/pin/create/button/?url=${url}&description=${text}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
  };

  // Handle the bookmark button click event
  const toggleBookmark = (recipeId) => {
    setBookmarkedRecipes((prevBookmarked) => {
      if (prevBookmarked.includes(recipeId)) {
        return prevBookmarked.filter((id) => id !== recipeId);
      } else {
        return [...prevBookmarked, recipeId];
      }
    });
  };

  return (
  <div>
    <div className="bg-green-50 min-h-screen p-8 font-urbanist">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">Explore Recipes</h1>
      
      {/*Set up the Categories */}
      <div className="flex justify-center space-x-4 mb-12">
        {dietType.map(dietType => (
          <button
            key={dietType}
            className={`px-6 py-3 ${selectedDietType === dietType ? 'bg-green-600 text-white' : 'bg-white text-green-600'} rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
            onClick={() => setSelectedDietType(dietType)}
          >
            {dietType}
          </button>
        ))}
      </div>
      </div>


  </div>);
};

export default ExploreRecipes;
