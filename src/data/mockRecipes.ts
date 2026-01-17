export interface Recipe {
  id: string;
  name: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  description: string;
  cuisine: string;
  ingredientProducts?: string[]; // Array of product IDs from mockProducts
  nutritionInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Chicken Curry (Kukul Mas)',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    category: 'Main Course',
    prepTime: '15 mins',
    cookTime: '45 mins',
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'A traditional Sri Lankan chicken curry with aromatic spices and creamy coconut milk.',
    ingredientProducts: ['1', '3', '4', '7', '13'], // Fresh Chicken, Onions, Tomatoes, Coconut Milk, Cooking Oil
    ingredients: [
      '1 kg chicken, cut into pieces',
      '2 onions, finely chopped',
      '3 cloves garlic, minced',
      '1 inch ginger, minced',
      '2 tomatoes, chopped',
      '400ml coconut milk',
      '2 tbsp curry powder',
      '1 tsp turmeric powder',
      '1 tsp chili powder',
      '2 cinnamon sticks',
      '5 curry leaves',
      '2 tbsp oil',
      'Salt to taste'
    ],
    instructions: [
      'Heat oil in a large pot and add cinnamon sticks and curry leaves.',
      'Add chopped onions and sauté until golden brown.',
      'Add garlic and ginger, cook for 2 minutes.',
      'Add curry powder, turmeric, and chili powder. Mix well.',
      'Add chicken pieces and coat with the spice mixture.',
      'Add tomatoes and cook until they soften.',
      'Pour in coconut milk and bring to a boil.',
      'Reduce heat and simmer for 30-35 minutes until chicken is cooked.',
      'Adjust salt and serve hot with rice.'
    ],
    nutritionInfo: {
      calories: 380,
      protein: '32g',
      carbs: '12g',
      fat: '24g'
    }
  },
  {
    id: '2',
    name: 'Rice and Curry',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800',
    category: 'Main Course',
    prepTime: '20 mins',
    cookTime: '40 mins',
    servings: 6,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'Classic Sri Lankan rice and curry with dhal curry, vegetable curries, and coconut sambol.',
    ingredientProducts: ['2', '3', '5', '7', '8'], // Basmati Rice, Onions, Potatoes, Coconut Milk, Lentils
    ingredients: [
      '3 cups white rice',
      '1 cup red lentils',
      '2 potatoes, cubed',
      '1 cup green beans',
      '1 eggplant, cubed',
      '1 cup grated coconut',
      '2 onions, sliced',
      '2 green chilies',
      '1 tsp mustard seeds',
      'Curry leaves',
      'Curry powder',
      'Turmeric powder',
      'Salt to taste'
    ],
    instructions: [
      'Cook rice according to package instructions.',
      'Boil red lentils with turmeric until soft and mushy.',
      'Prepare potato curry with curry powder and coconut milk.',
      'Stir-fry green beans with mustard seeds and curry leaves.',
      'Cook eggplant curry with spices.',
      'Mix grated coconut with chopped onions, chilies, and salt for pol sambol.',
      'Serve rice with all curries and sambol.'
    ],
    nutritionInfo: {
      calories: 520,
      protein: '15g',
      carbs: '85g',
      fat: '12g'
    }
  },
  {
    id: '3',
    name: 'Kottu Roti',
    image: 'https://tse2.mm.bing.net/th/id/OIP.W2Y1mYGQjCzRtuRvF868mQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Main Course',
    prepTime: '10 mins',
    cookTime: '20 mins',
    servings: 3,
    difficulty: 'Easy',
    cuisine: 'Sri Lankan',
    description: 'Popular Sri Lankan street food made with chopped roti, vegetables, and egg.',
    ingredientProducts: ['3', '6', '13'], // Onions, Eggs, Cooking Oil
    ingredients: [
      '4 roti or paratha, chopped',
      '2 eggs',
      '1 onion, sliced',
      '2 carrots, julienned',
      '1 cabbage, shredded',
      '2 green chilies, chopped',
      '3 cloves garlic, minced',
      '2 tbsp soy sauce',
      '1 tbsp curry powder',
      '2 tbsp oil',
      'Curry leaves',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Heat oil in a large flat pan or wok.',
      'Add garlic, green chilies, and curry leaves. Sauté briefly.',
      'Add onions and cook until translucent.',
      'Add carrots and cabbage, stir-fry for 5 minutes.',
      'Push vegetables to the side, crack eggs and scramble.',
      'Add chopped roti pieces to the pan.',
      'Add curry powder and soy sauce.',
      'Use two spatulas to chop and mix everything together.',
      'Cook for 5-7 minutes, continuously mixing and chopping.',
      'Serve hot with gravy or curry.'
    ],
    nutritionInfo: {
      calories: 450,
      protein: '18g',
      carbs: '55g',
      fat: '18g'
    }
  },
  {
    id: '4',
    name: 'Lamprais',
    image: 'https://tse4.mm.bing.net/th/id/OIP.iFC37o9LrcjwI3_WM12wcQAAAA?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Main Course',
    prepTime: '30 mins',
    cookTime: '60 mins',
    servings: 4,
    difficulty: 'Hard',
    cuisine: 'Sri Lankan',
    description: 'Dutch-Burgher dish of rice and accompaniments wrapped in banana leaf and baked.',
    ingredientProducts: ['1', '2', '3', '6'], // Chicken, Basmati Rice, Onions, Eggs
    ingredients: [
      '2 cups basmati rice',
      '500g chicken or beef',
      '4 eggs, hard-boiled',
      '2 cups stock',
      '1 onion, sliced and fried',
      '2 tbsp ghee',
      'Banana leaves',
      'Mixed curry powder',
      'Cardamom',
      'Cloves',
      'Cinnamon',
      'Eggplant curry',
      'Prawn blachan',
      'Seeni sambol'
    ],
    instructions: [
      'Cook rice in stock with ghee and whole spices until fragrant.',
      'Prepare meat curry with mixed curry powder and spices.',
      'Make eggplant curry, prawn blachan, and seeni sambol separately.',
      'Prepare banana leaf packets by softening leaves over flame.',
      'Layer rice, meat curry, egg halves, and other accompaniments on banana leaf.',
      'Fold and wrap securely into packets.',
      'Bake in oven at 180°C for 30 minutes.',
      'Serve hot, opening the fragrant packets at the table.'
    ],
    nutritionInfo: {
      calories: 680,
      protein: '35g',
      carbs: '72g',
      fat: '28g'
    }
  },
  {
    id: '5',
    name: 'String Hoppers (Idiyappam)',
    image: 'https://tse2.mm.bing.net/th/id/OIP.tt2c6p4SYuFtUOQeR6_oigHaLD?w=602&h=899&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Breakfast',
    prepTime: '15 mins',
    cookTime: '10 mins',
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'Steamed rice noodle patties, a popular Sri Lankan breakfast dish.',
    ingredientProducts: ['7', '13'], // Coconut Milk, Cooking Oil
    ingredients: [
      '2 cups rice flour',
      '2.5 cups water',
      '1 tsp salt',
      '1 tbsp coconut oil',
      'String hopper molds',
      'Steamer'
    ],
    instructions: [
      'Boil water with salt and coconut oil.',
      'Add rice flour to boiling water and mix quickly.',
      'Knead into a smooth dough while still hot.',
      'Fill string hopper press with dough.',
      'Press into circular patterns on greased molds.',
      'Steam for 8-10 minutes until cooked.',
      'Serve hot with curry, coconut milk, or sambol.'
    ],
    nutritionInfo: {
      calories: 180,
      protein: '4g',
      carbs: '38g',
      fat: '2g'
    }
  },
  {
    id: '6',
    name: 'Fish Ambul Thiyal',
    image: 'https://tse3.mm.bing.net/th/id/OIP.bWzUeJ4fCF1UgO-Qhl2ORAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Main Course',
    prepTime: '10 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Sri Lankan',
    description: 'Sour fish curry from Southern Sri Lanka, dry and tangy.',
    ingredientProducts: ['3', '13'], // Onions, Cooking Oil
    ingredients: [
      '500g tuna or mackerel, cubed',
      '1 tbsp goraka (garcinia)',
      '1 onion, sliced',
      '10 curry leaves',
      '1 inch cinnamon',
      '5 black peppercorns',
      '1 tsp chili powder',
      '1 tsp curry powder',
      '1/2 tsp turmeric',
      '2 cloves garlic, crushed',
      '1 inch ginger, crushed',
      '2 tbsp oil',
      'Salt to taste'
    ],
    instructions: [
      'Soak goraka in warm water for 10 minutes.',
      'Heat oil in a pan, add cinnamon, peppercorns, and curry leaves.',
      'Add sliced onions, garlic, and ginger. Sauté until fragrant.',
      'Add all spice powders and mix well.',
      'Add fish pieces and goraka water.',
      'Cook on low heat until fish is tender and liquid evaporates.',
      'The curry should be dry and dark in color.',
      'Serve with rice.'
    ],
    nutritionInfo: {
      calories: 220,
      protein: '28g',
      carbs: '8g',
      fat: '10g'
    }
  },
  {
    id: '7',
    name: 'Watalappan',
    image: 'https://www.dailylife.lk/kitchen/watalappan/images/watalappan.jpg',
    category: 'Dessert',
    prepTime: '15 mins',
    cookTime: '45 mins',
    servings: 6,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'Traditional Sri Lankan coconut custard pudding with jaggery and spices.',
    ingredientProducts: ['6', '7'], // Eggs, Coconut Milk
    ingredients: [
      '8 eggs',
      '400ml coconut milk',
      '250g jaggery (palm sugar)',
      '1/2 tsp cardamom powder',
      '1/4 tsp nutmeg powder',
      '50g cashew nuts, chopped',
      'Pinch of salt'
    ],
    instructions: [
      'Melt jaggery in a little water and strain to remove impurities.',
      'Beat eggs lightly in a bowl.',
      'Add coconut milk, melted jaggery, cardamom, and nutmeg to eggs.',
      'Mix well but don\'t create too many bubbles.',
      'Add chopped cashews and salt.',
      'Pour into a greased baking dish.',
      'Steam or bake at 160°C for 45 minutes until set.',
      'Cool completely and refrigerate before serving.',
      'Cut into squares and serve chilled.'
    ],
    nutritionInfo: {
      calories: 320,
      protein: '10g',
      carbs: '42g',
      fat: '14g'
    }
  },
  {
    id: '8',
    name: 'Pol Sambol',
    image: 'https://tse3.mm.bing.net/th/id/OIP.oF9hGSdAR1nBzbVlCQ9iegHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Side Dish',
    prepTime: '10 mins',
    cookTime: '0 mins',
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Sri Lankan',
    description: 'Spicy coconut relish, essential accompaniment to Sri Lankan meals.',
    ingredientProducts: ['3'], // Onions
    ingredients: [
      '1 cup fresh grated coconut',
      '1 onion, finely chopped',
      '3-4 red chilies',
      '1 green chili, chopped',
      '1 tsp chili powder',
      '2 tbsp lime juice',
      '1 tsp Maldive fish (optional)',
      'Salt to taste'
    ],
    instructions: [
      'Grind red chilies with a little salt.',
      'In a bowl, combine grated coconut and ground chilies.',
      'Add chopped onion and green chili.',
      'Add chili powder and Maldive fish if using.',
      'Mix thoroughly with hands.',
      'Add lime juice and adjust salt.',
      'Mix again until well combined.',
      'Serve immediately with rice, bread, or hoppers.'
    ],
    nutritionInfo: {
      calories: 120,
      protein: '2g',
      carbs: '8g',
      fat: '10g'
    }
  },
  {
    id: '9',
    name: 'Hoppers (Appa)',
    image: 'https://tse2.mm.bing.net/th/id/OIP.jp4mcbj-nX9DH8dODReplwHaEp?rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Breakfast',
    prepTime: '20 mins',
    cookTime: '30 mins',
    servings: 6,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'Bowl-shaped pancakes made from fermented rice flour and coconut milk.',
    ingredientProducts: ['7', '9', '13'], // Coconut Milk, Sugar, Cooking Oil
    ingredients: [
      '2 cups rice flour',
      '1 cup coconut milk',
      '1 cup water',
      '1 tsp sugar',
      '1 tsp instant yeast',
      '1/2 tsp salt',
      'Eggs (optional)',
      'Oil for greasing'
    ],
    instructions: [
      'Mix yeast with sugar and warm water. Let it activate for 10 minutes.',
      'In a bowl, combine rice flour, salt, and yeast mixture.',
      'Add coconut milk gradually and mix to form a smooth batter.',
      'Let batter rest for 2 hours or overnight for fermentation.',
      'Heat a hopper pan and grease lightly.',
      'Pour a ladle of batter and swirl to coat the sides.',
      'Cover and cook until edges are crispy and center is cooked.',
      'For egg hoppers, crack an egg in the center while cooking.',
      'Serve hot with curry or sambol.'
    ],
    nutritionInfo: {
      calories: 160,
      protein: '4g',
      carbs: '30g',
      fat: '3g'
    }
  },
  {
    id: '10',
    name: 'Dhal Curry (Parippu)',
    image: 'https://thehappypear.ie/wp-content/uploads/2020/09/red-lentil-dahl-e1606933795663-768x768.jpg',
    category: 'Side Dish',
    prepTime: '5 mins',
    cookTime: '25 mins',
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Sri Lankan',
    description: 'Creamy red lentil curry, a staple in Sri Lankan rice and curry meals.',
    ingredientProducts: ['3', '4', '7', '8', '13'], // Onions, Tomatoes, Coconut Milk, Lentils, Cooking Oil
    ingredients: [
      '1 cup red lentils',
      '2.5 cups water',
      '1 onion, chopped',
      '2 tomatoes, chopped',
      '1 cup coconut milk',
      '1 tsp turmeric powder',
      '1 tsp curry powder',
      '5 curry leaves',
      '2 green chilies',
      '2 cloves garlic, minced',
      '1 tbsp oil',
      'Salt to taste'
    ],
    instructions: [
      'Wash lentils thoroughly and drain.',
      'Boil lentils with turmeric and salt until soft and mushy.',
      'In a separate pan, heat oil and add curry leaves.',
      'Add garlic and onions, sauté until golden.',
      'Add tomatoes and cook until soft.',
      'Add curry powder and green chilies.',
      'Pour this tempering into the cooked lentils.',
      'Add coconut milk and simmer for 5 minutes.',
      'Adjust consistency with water if needed.',
      'Serve hot with rice.'
    ],
    nutritionInfo: {
      calories: 220,
      protein: '12g',
      carbs: '32g',
      fat: '6g'
    }
  },
  {
    id: '11',
    name: 'Egg Roti',
    image: 'https://th.bing.com/th/id/R.1b2b8f843f27d9fba4517d93ebc952f8?rik=gk8GE1uumIb2%2bw&pid=ImgRaw&r=0',
    category: 'Breakfast',
    prepTime: '30 mins',
    cookTime: '20 mins',
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Sri Lankan',
    description: 'Flaky flatbread with egg, onions, and green chilies.',
    ingredientProducts: ['3', '6', '9', '13'], // Onions, Eggs, Sugar, Cooking Oil
    ingredients: [
      '2 cups all-purpose flour',
      '1/2 tsp salt',
      '1 tbsp sugar',
      '3/4 cup water',
      '4 eggs',
      '1 onion, finely chopped',
      '2 green chilies, chopped',
      'Oil for cooking',
      'Butter for greasing'
    ],
    instructions: [
      'Mix flour, salt, sugar, and water to form a soft dough.',
      'Knead for 10 minutes until smooth and elastic.',
      'Divide into 4 balls and rest for 20 minutes.',
      'Roll each ball very thin on oiled surface.',
      'Heat a griddle and place the rolled dough.',
      'Beat an egg and pour over the dough.',
      'Add chopped onions and chilies on top.',
      'Fold the edges into the center to form a square.',
      'Flip and cook both sides until golden and crispy.',
      'Serve hot with curry or chutney.'
    ],
    nutritionInfo: {
      calories: 340,
      protein: '14g',
      carbs: '48g',
      fat: '10g'
    }
  },
  {
    id: '12',
    name: 'Coconut Roti',
    image: 'https://www.theflavorbender.com/wp-content/uploads/2020/05/Pol-Roti-SM-6714.jpg',
    category: 'Breakfast',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 6,
    difficulty: 'Easy',
    cuisine: 'Sri Lankan',
    description: 'Soft flatbread made with grated coconut, perfect for breakfast.',
    ingredientProducts: ['3', '13'], // Onions, Cooking Oil
    ingredients: [
      '3 cups wheat flour',
      '1 cup grated coconut',
      '1 onion, finely chopped',
      '2 green chilies, chopped',
      '1 tsp salt',
      '1 cup water',
      'Oil for cooking'
    ],
    instructions: [
      'Mix flour, grated coconut, onions, green chilies, and salt.',
      'Add water gradually and knead into a soft dough.',
      'Divide dough into equal portions and shape into balls.',
      'Roll each ball into a circle about 1/4 inch thick.',
      'Heat a griddle on medium heat.',
      'Cook each roti for 2-3 minutes on each side.',
      'Brush with oil or butter while cooking.',
      'Cook until brown spots appear on both sides.',
      'Serve hot with curry or dhal.'
    ],
    nutritionInfo: {
      calories: 280,
      protein: '8g',
      carbs: '46g',
      fat: '8g'
    }
  }
];