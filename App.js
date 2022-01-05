import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (enteredGoal) => {
    if (!enteredGoal) return console.warn('Please write a goal');
    setCourseGoals([
      ...courseGoals,
      { key: Math.random().toString(), value: enteredGoal },
    ]);
    setIsAddMode(false);
  };
  const deleteItem = (id) => {
    const filteredGoals = courseGoals.filter((goal) => goal.key !== id);
    setCourseGoals(filteredGoals);
  };
  return (
    <View style={styles.screen}>
      <Button title='Add new goal' onPress={() => setIsAddMode(!isAddMode)} />
      <GoalInput
        addGoalHandler={addGoalHandler}
        visible={isAddMode}
        setIsAddMode={setIsAddMode}
      />
      <FlatList
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            value={itemData.item.value}
            id={itemData.item.key}
            deleteItem={deleteItem}
          />
        )}
      />

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
