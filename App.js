import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, NativeModules } from 'react-native';
import { Camera, Permissions } from 'expo';
import fuzzy from 'fuzzy';
import ReviewsContainer from './containers/ReviewsContainer';



export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      long: null,
      lati: null,
      hasCameraPermission: null,
      locations: null,
      imageText: [], 
      currentPicture: null
    };
  }
  componentDidMount() {
      this.getLocation();

  }
  mode = (arr) => {
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
  }
  success = (pos) => {
    let crd = pos.coords;
    this.setState({
      long: crd.longitude,
      lati:  crd.latitude,
      accuracy: crd.accuracy
    });
    let loc = [];
    console.log("Success");
      fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${crd.latitude},${crd.longitude}&radius=500&type=restaurant&key=AIzaSyAwOuyZGCccmqlcffWqoFaLkKbfvqSOVWU`).then( response => {
       response.json().then(responseJson => {
        console.log("AHHHHH"); //do not remove, will break program
          //console.log(responseJson.results);
          responseJson.results.map(data => {
          
            loc.push({
              place_id: data.place_id,
              name: data.name,
              rating: data.rating
            });
          });
                console.log("Loc length: " + loc.length);
      this.setState({
        locations: loc
      });
          // console.log(Object.values(responseJson));
        });
      });
  }

  error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  getLocation = () => {
    // console.log("hello");
    var options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.success, this.error, options);
  }

  snap = async() => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({base64:true}).then(data => {
        // console.log(data);
        // NativeModules.RNImageToBase64.getBase64String(data.uri, async(err, base64) => {
          let imageData = [];
          this.checkForLabels(data.base64).then(data => {
            // console.log(data);
            if (data.responses[0].textAnnotations) {
            data.responses[0].textAnnotations.map(a => {
              imageData.push({
                description: a.description,
                boundingBox: a.boundingBox
              })
            });
          }
            console.log("LOGO");
            if (data.responses[0].logoAnnotations) {
            data.responses[0].logoAnnotations.map(a => {
              imageData.push({
                description: a.description,
                boundingBox: a.boundingBox
              })
            });
          }
          this.setState({
            imageText: imageData
          });
          });
          // console.log(result);
        // });
        // this.checkForLabels()
      });
    }
  }

  checkForLabels = async(base64) => {
      console.log("Checking for text...");
      return await
          fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAZzA8yZIoWx9sy-3DrN-J0fT2UoHjQm2Y', {
              method: 'POST',
              body: JSON.stringify({
                  "requests": [
                      {
                          "image": {
                              "content": base64
                          },
                          "features": [
                              {
                                  "type": "TEXT_DETECTION"
                              },
                              {
                                  "type":"LOGO_DETECTION"
                              }
                          ]
                      }
                  ]
              })
          }).then((response) => {
              return response.json();
          }, (err) => {
              console.error('promise rejected')
              console.error(err)
          });
  }
  cumstain = () => {
    this.setState({
      imageText: null
    })
  }
  render() {
    // console.log("RELOADING STATE: " + this.state.locations[0].name);
    // if (this.state.locations) {
    //   console.log(this.state.locations);
    // }
          // const locations = this.state.locations
          //             ? this.state.locations.map(data => { 
          //               return(
          //               <Text key={data.name}> {data.name} </Text> )
          //             })
          //             :null;

          let filtered = this.state.imageText
                            ? (this.state.imageText.map(data => {
                                let strings = [];
                                var results = fuzzy.filter(data.description, this.state.locations.map(check => check.name)).sort((a,b) =>  {return b.score - a.score});
                                results.map(el => {
                                  // console.log(el.string);
                                  strings.push(el.string);
                                });
                                return strings[0]; 
                            }) )
                            : null;
      // console.log("Image text: " + this.state.imageText.length);
      filtered = (filtered && Object.values(filtered).find(data => data));
      console.log(filtered);        
      let index = (filtered && this.state.locations.map(data => data.name).findIndex(data => filtered===data));
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      } else {
        if (!filtered) {
      return (
          <View style={{ flex: 1 }}>
            <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={Camera.Constants.Type.back} >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                      picture
                </Text>
              </TouchableOpacity>
              </View>
            </Camera>
          </View>);
        } else {
          return(
          <View style={{ flex: 1 }}>
            <ReviewsContainer 
              location={this.state.locations[index]}
            />
            <TouchableOpacity
                onPress={this.cumstain}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                      LEAVE
                </Text>
              </TouchableOpacity>
          </View>
          );
        }
      }
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