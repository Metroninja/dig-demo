import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, AsyncStorage, FlatList, Image, ScrollView, 
  StyleSheet, Text, TouchableOpacity,  } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getProducts } from '../../actions/products';
import { Product } from '../common';
import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list
  }),
  dispatch => bindActionCreators({ getProducts }, dispatch)
)
export default class Home extends Component {

  static propTypes = {
    getProducts: PropTypes.func,
    products: PropTypes.array,
  };
  
  static navigationOptions = {
    title: 'Dig Demo Products'
  }

  constructor(props) {
    super(props);

  }

  async componentDidMount() {
    // we want to fetch our notes from Async Storage, conver them to JSON and send them with out
    // bootstrap method to get our content.
    try {
      const comments = await AsyncStorage.getItem('@DIG_Demo:comments');
      this.props.getProducts({comments: JSON.parse(comments)});
    } catch(ex) {
      console.log('somehow Async storage broke', ex);
    }
  }

  /***
   * Note that if there were more than a few products here, I would use a FlatList component
   * versus a ScrollView for performance reasons as it LazyLoads content before it is close to the view
   * Also of note, the reason I'm not using a SafeAreaView or a View wrapper is that the main pages are all 
   * wrapper by the StackNavigator from react navigation which handles the SafeAreaView for us, particularly 
   * since we are using the default react-navigation header
   ***/
  render() {
    const { products } = this.props;
    return (
      <ScrollView>
        {products.length === 0 && [(
          <Text style={styles.title} key="loading-text">Fetching Content</Text>
        ), (
          <ActivityIndicator key="activity-indicator" />
        )]}
        {products.map((product, index) => <Product product={product} key={product.id || index} />)}
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    ...globalStyle.title,
    textAlign: 'center',
  }
});
