import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView,FlatList,ActivityIndicator } from 'react-native';
import { useState,useEffect } from 'react';

//get data from this url
const moviesUrl="https://reactnative.dev/movies.json";


export default function App() {
  //managing state with 'useState'
  const [isLoading,setLoading]=useState(true);
  const [data,setData]=useState([]);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  //similar to 'componentDidMount', get called once
  useEffect(() => {
    fetch(moviesUrl)
    .then((response)=>response.json())//get response,convert to json
    .then((json)=>{
      setData(json.movies);
      setTitle(json.title);
      setDescription(json.description);
    })
    .catch((error)=>{alert(error)})//display error
    .finally(setLoading(false));//change loading state
    
  },[]);
  
  
  return (
    <SafeAreaView style={styles.container}>
      {/* while fetching show the indicator,else show response */}
      {isLoading?(<ActivityIndicator/>
      ):(
      <View>
        <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={({id},index)=>id}
        renderItem={({item})=>(
          <Text style={styles.movieText}>
            {item.id}.{item.title},{item.releaseYear}
          </Text>
      )}
      />
      <Text style={styles.description}>{description}</Text>
      </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    marginTop:40,
   
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    borderBottomWidth:0.5,
    marginBottom:12,

  },
  description:{
    marginBottom:20,
    color:'green',
    textAlign:'center',
    fontWeight:'300'
  },
  movieText:{
    fontSize:26,
    fontWeight:200,
  }
});
