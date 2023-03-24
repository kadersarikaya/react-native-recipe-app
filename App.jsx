import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => setRecipes(data.meals))
      .catch(error => console.error(error));
  }, []);

  const handleRecipePress = (item) => {
    setSelectedRecipe(item);
  };

  const handleBackPress = () => {
    setSelectedRecipe(null);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => handleRecipePress(item)}>
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />
        <Text style={styles.text}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  };

  const renderRecipeDetails = (selectedRecipe) => {
    if (selectedRecipe) {
       return (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedRecipe.strMeal}</Text>
          <Text style={styles.detailsDescription}>{selectedRecipe.strInstructions}</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };
  
  if (selectedRecipe) {
    return (
      <ScrollView >
        {renderRecipeDetails(selectedRecipe)}
      </ScrollView>)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={({ idMeal }, index) => idMeal}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
   detailsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  detailsDescription: {
    fontSize: 18,
    textAlign: 'center',
  },
  backButton: {
    margin: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RecipeList;

