import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list,
    notes: state.products.notes,
  })
)
export default class Details extends Component {

  static propTypes = {
    products: PropTypes.array,
    notes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const id = props.navigation.state.params && props.navigation.state.params.id;
    this.state = {
      id,
    }
  }

  render() {
    const product = this.props.products.find(p => p.id === this.state.id);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={[styles.text, styles.price]}>${product.price}</Text>
        <Text style={[styles.text, styles.header]}>Description:</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={[styles.text, styles.header]}>Specifications:</Text>
        <Text style={[styles.text, styles.specification]}>{product.specification}</Text>
        
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    ...globalStyle.title,
    marginBottom: 8,
  },
  header: {
    color: globalStyle.darkGray,
    marginBottom: 4,
    marginTop: 12,
  },
  text: globalStyle.text,
  price: {
    color: globalStyle.waterBlue,
  }, 
  specification: {
    fontStyle: 'italic'
  }
});
