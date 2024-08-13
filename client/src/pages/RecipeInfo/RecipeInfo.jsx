import React, { useState } from 'react';
import { FaClock, FaUtensils, FaUsers, FaStar, FaBookmark } from 'react-icons/fa';

const recipe = {
  chefImage: 'https://img.freepik.com/free-photo/young-african-american-woman-isolated-yellow-studio-background-facial-expression-beautiful-female-close-up-portrait-concept-human-emotions-facial-expression-smiling-keeping-calm_155003-25193.jpg?t=st=1723163379~exp=1723166979~hmac=eb8050034805c34763f392d47e5458b872844231636ae21810f4e327c1250260&w=360',
  title: 'Delicious Pasta Recipe',
  chefName: 'Wanane Nane',
  image: 'https://img.freepik.com/premium-photo/bowl-pasta-with-bowl-tomato-sauce-basil_1246444-1166.jpg?w=740',
  ingredients: [
    'Pasta',
    'Tomato Sauce',
    'Cheese',
    'Herbs'
  ],
  instructions: [
    'Cook pasta according to package instructions.',
    'Heat tomato sauce in a separate pan.',
    'Drain pasta and add it to the sauce.',
    'Mix well and let it simmer for 2-3 minutes.',
    'Serve hot, sprinkled with cheese and garnished with fresh herbs.'
  ],
  url: 'https://example.com/recipe',
  prepTime: '30 minutes',
  servings: 4,
  countryOfOrigin: 'Italy',
  dietType: 'Vegetarian',
};

const RecipeInfo = () => {
  const [rating, setRating] = useState(4.5);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { author: 'John Doe', text: 'Great recipe! I loved how easy it was to follow.' },
    { author: 'Jane Smith', text: 'Delicious! I added some extra herbs and it turned out amazing.' }
  ]);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { author: 'You', text: comment }]);
      setComment('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 p-8">
            <div className="text-center mb-8">
              <img src={recipe.chefImage} alt={recipe.chefName} className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg object-cover" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2 font-serif">{recipe.title}</h1>
              <p className="text-xl text-gray-600 italic font-light">by {recipe.chefName}</p>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={recipe.image} alt={recipe.title} className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="flex justify-around text-sm text-gray-600 mb-8 bg-gray-100 py-6 rounded-lg shadow-inner">
              <div className="flex flex-col items-center">
                <FaClock className="text-2xl mb-2 text-blue-500" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUtensils className="text-2xl mb-2 text-green-500" />
                <span className="font-semibold">{recipe.dietType}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-2xl mb-2 text-purple-500" />
                <span className="font-semibold">{recipe.servings} Serves</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-300 pb-2">Ingredients</h2>
              <ul className="list-none text-gray-600 space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-lg flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-green-300 pb-2">Instructions</h2>
              <ol className="list-none text-gray-600 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-lg flex items-start">
                    <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">{index + 1}</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Country of Origin</h2>
              <p className="text-xl text-gray-600 italic">{recipe.countryOfOrigin}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Rating</h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-yellow-500 mr-2">{rating.toFixed(1)}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className={`text-2xl ${star <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          

            </div>
            </div>
            </div>
            </div>
    
  )
}

export default RecipeInfo
