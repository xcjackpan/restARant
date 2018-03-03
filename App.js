import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long: null,
      lati: null,
      accuracy: null
    };
  }
  componentDidMount() {
        setInterval(this.getLocation, 1000);
  }
  success = (pos) => {
    let crd = pos.coords;
    this.setState({
      long: crd.longitude,
      lati:  crd.latitude,
      accuracy: crd.accuracy
    })
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };


  getLocation = () => {
    console.log("hello");
    var options = {
      enableHighAccuracy: false,
      timeout: 2500,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  render() {
    // fetch("https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=42.3675294,-71.186966&radius=10000&key=AIzaSyB3O1kkwSUDm7Nmjs0lJ3Glm5zyLTmCNog").then(response => {
    //   response.json().then(responseJson => {
    //     console.log(Object.values(responseJson.results));
    //   });
    // });

    return (
      <View style={styles.container}>
      <Text> {this.state.lati} </Text>
            <Text> {this.state.long} </Text>
                  <Text> {this.state.accuracy} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
