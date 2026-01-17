import { useState, useMemo } from 'react';
import { Search, Clock, Users, ChefHat, ArrowLeft, Flame, UtensilsCrossed, BookOpen, Filter, TrendingDown, ShoppingCart } from 'lucide-react';
import { mockRecipes, Recipe } from '../data/mockRecipes';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';

interface RecipesPageProps {
  onBack: () => void;
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-700 border-green-300',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  Hard: 'bg-red-100 text-red-700 border-red-300',
};

export function RecipesPage({ onBack }: RecipesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(mockRecipes.map(r => r.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (selectedRecipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        {/* Recipe Detail Header */}
        <header className="bg-white shadow-md sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Recipes
            </button>
          </div>
        </header>

        {/* Recipe Detail Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-96">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{selectedRecipe.name}</h1>
                <p className="text-lg text-white/90">{selectedRecipe.description}</p>
              </div>
            </div>

            {/* Recipe Info Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-b-2 border-orange-200">
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 text-white p-3 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Prep Time</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Cook Time</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Servings</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-600">Difficulty</p>
                  <p className="font-bold text-gray-900">{selectedRecipe.difficulty}</p>
                </div>
              </div>
            </div>

            {/* Nutrition Info */}
            {selectedRecipe.nutritionInfo && (
              <div className="p-6 bg-blue-50 border-b-2 border-blue-200">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                  Nutrition Information (per serving)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-3 rounded-lg border-2 border-blue-200">
                    <p className="text-xs text-gray-600">Calories</p>
                    <p className="text-xl font-bold text-blue-600">{selectedRecipe.nutritionInfo.calories}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-2 border-green-200">
                    <p className="text-xs text-gray-600">Protein</p>
                    <p className="text-xl font-bold text-green-600">{selectedRecipe.nutritionInfo.protein}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-2 border-yellow-200">
                    <p className="text-xs text-gray-600">Carbs</p>
                    <p className="text-xl font-bold text-yellow-600">{selectedRecipe.nutritionInfo.carbs}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg border-2 border-red-200">
                    <p className="text-xs text-gray-600">Fat</p>
                    <p className="text-xl font-bold text-red-600">{selectedRecipe.nutritionInfo.fat}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredient Cost Comparison */}
            {selectedRecipe.ingredientProducts && selectedRecipe.ingredientProducts.length > 0 && (() => {
              const recipeProducts = mockProducts.filter(p => selectedRecipe.ingredientProducts?.includes(p.id));
              const cargillsTotal = recipeProducts.reduce((sum, p) => {
                const price = p.prices.find(pr => pr.supermarket === 'cargills');
                return sum + (price?.price || 0);
              }, 0);
              const keellsTotal = recipeProducts.reduce((sum, p) => {
                const price = p.prices.find(pr => pr.supermarket === 'keells');
                return sum + (price?.price || 0);
              }, 0);
              const glomarkTotal = recipeProducts.reduce((sum, p) => {
                const price = p.prices.find(pr => pr.supermarket === 'glomark');
                return sum + (price?.price || 0);
              }, 0);

              const costs = [
                { name: 'Cargills Food City', total: cargillsTotal, color: 'red', bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-600' },
                { name: 'Keells Super', total: keellsTotal, color: 'green', bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', badge: 'bg-green-600' },
                { name: 'Glomark', total: glomarkTotal, color: 'blue', bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-blue-600' }
              ];

              const minCost = Math.min(cargillsTotal, keellsTotal, glomarkTotal);
              const maxCost = Math.max(cargillsTotal, keellsTotal, glomarkTotal);
              const savings = maxCost - minCost;

              return (
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-b-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-green-600" />
                      Ingredient Cost Comparison
                    </h3>
                    {savings > 0 && (
                      <div className="bg-green-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Save up to Rs. {savings.toFixed(2)}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Based on {recipeProducts.length} key ingredients from our price database
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {costs.map(store => (
                      <div
                        key={store.name}
                        className={`relative p-5 rounded-xl border-2 ${store.bg} ${store.border} ${
                          store.total === minCost ? 'ring-4 ring-green-400 ring-offset-2' : ''
                        } transition-all hover:scale-105`}
                      >
                        {store.total === minCost && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <TrendingDown className="w-3 h-3" />
                            BEST PRICE
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 ${store.badge} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                            {store.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className={`font-bold ${store.text}`}>{store.name}</h4>
                            <p className="text-xs text-gray-600">Estimated Total</p>
                          </div>
                        </div>
                        <div className="text-center py-3 bg-white rounded-lg border-2 border-dashed ${store.border}">
                          <p className="text-3xl font-bold ${store.text}">Rs. {store.total.toFixed(2)}</p>
                          {store.total !== minCost && (
                            <p className="text-xs text-gray-600 mt-1">
                              +Rs. {(store.total - minCost).toFixed(2)} more
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 bg-white rounded-lg p-4 border-2 border-yellow-300">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">💰 Smart Shopping Tip:</span> Buy ingredients from {costs.find(s => s.total === minCost)?.name} to make this recipe for the lowest cost of Rs. {minCost.toFixed(2)}!
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Ingredients */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                  Ingredients
                </h3>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-800">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-blue-600" />
                  Instructions
                </h3>
                <div className="space-y-4">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <div key={index} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                      <div className="flex gap-3">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="text-gray-800 pt-1">{instruction}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-t-2 border-green-200">
              <div className="bg-white rounded-xl p-6 border-2 border-green-300">
                <h4 className="font-bold text-lg mb-3 text-green-800">👨‍🍳 Chef's Tips</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Fresh ingredients make all the difference in {selectedRecipe.cuisine} cuisine</li>
                  <li>• Adjust spice levels according to your preference</li>
                  <li>• Serve hot for best taste and aroma</li>
                  <li>• You can find all ingredients at Cargills, Keells, or Glomark supermarkets!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Back Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-xl">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Sri Lankan Recipes
                  </h1>
                  <p className="text-xs text-gray-600">Traditional flavors. Modern cooking.</p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Discover Authentic Sri Lankan Cuisine</h2>
              <p className="text-white/90 text-lg mb-4">
                From traditional curries to modern fusion dishes
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-white/20 px-3 py-1 rounded-full">{filteredRecipes.length} Recipes</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Step-by-step Instructions</span>
                <span className="bg-white/20 px-3 py-1 rounded-full">Nutrition Info</span>
              </div>
            </div>
            <ChefHat className="w-32 h-32 text-white/20" />
          </div>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">No recipes found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${difficultyColors[recipe.difficulty]}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {recipe.cuisine}
                  </div>
                </div>

                {/* Recipe Info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="w-4 h-4 text-red-600" />
                      <span className="text-gray-700">{recipe.cookTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">{recipe.servings}</span>
                    </div>
                  </div>

                  {/* Nutrition Preview */}
                  {recipe.nutritionInfo && (
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-600 mb-1">Calories per serving</p>
                      <p className="text-lg font-bold text-orange-600">{recipe.nutritionInfo.calories} cal</p>
                    </div>
                  )}

                  {/* View Recipe Button */}
                  <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <span className="font-bold">💡 Pro Tip:</span> Find all recipe ingredients at your nearest Cargills, Keells, or Glomark supermarket!
            </p>
            <p className="text-xs text-gray-500">
              Brought to you by <span className="font-bold text-orange-600">PriceScope.lk</span> - Compare. Save. Shop Smart.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}