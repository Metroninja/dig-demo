import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, Image, StyleSheet,
  Text, TouchableOpacity, View } from 'react-native';
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

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.getProducts({});
  }

  render() {
    const { products } = this.props;
    return (
      <View>
        {products.length === 0 && (
          <Text style={styles.title}>Fetching Content <ActivityIndicator /> </Text>
        )}
        {products.map((product, index) => <Product product={product} key={product.id || index} />)}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    ...globalStyle.title,
    textAlign: 'center',
  }
});
