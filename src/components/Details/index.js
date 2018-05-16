import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Modal, ScrollView, StyleSheet, 
  Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNote } from '../../actions/products';
import { Input } from '../common';
import globalStyle from '../../styles';

@connect(
  state => ({
    products: state.products.list,
    notes: state.products.notes,
  }),
  dispatch => bindActionCreators({ addNote }, dispatch)
  
)
export default class Details extends Component {

  static propTypes = {
    addNote: PropTypes.func,
    products: PropTypes.array,
    notes: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const id = props.navigation.state.params && props.navigation.state.params.id;
    this.state = {
      id,
      modalVisible: false,
    }
    this._input = null;
  }

  submitComment() {
    // get the value from the Input component, then reset it's state to protect from double submit

    const value = this._input.state.value;
    if(!!value) {
      this._input.setState({value: ''});
      this.props.addNote({id: this.state.id, value})
    }
  }

  render() {
    console.log('this.props.notes', this.props.notes);
    const { id } = this.state;
    const product = this.props.products.find(p => p.id === id );
    const modalContent = !!this.state.modalContent && this.state.modalContent.replace('http', 'https');
    const notes = this.props.notes[id] || [];
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={[styles.text, styles.price]}>${product.price}</Text>
        <Text style={[styles.text, styles.header]}>Description:</Text>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={[styles.text, styles.header]}>Specifications:</Text>
        <Text style={[styles.text, styles.specification]}>{product.specification}</Text>
        <View style={styles.gallery}>
          {product.images.map((img, index) => (
            <TouchableOpacity 
              style={styles.thumbnail} 
              onPress={() => this.setState({modalContent: img.original})} 
              key={index}
            >
              <Image style={styles.image} source={{uri: img.thumb.replace('http', 'https')}} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.addComment}>
          <Text style={styles.title}>Add Comment</Text>
          <Input ref={(r) => this._input = r} multiline={true} />
          <Button title="Submit" onPress={() => this.submitComment()} color={globalStyle.waterBlue} />
          <View style={styles.comments}>
            <Text style={styles.title}>{`Comments (${notes.length})`}</Text>
            {notes.map((comment, index) => (
              <Text style={[styles.text, styles.comment]} key={`commentId-${index}`}>{comment}</Text>
            ))}
            {!notes.length && (<Text style={[styles.text, styles.comment]}>no comments...</Text>)}
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!modalContent}>
          <View style={styles.modal}>
            {!!modalContent && (<Image style={styles.originalImage} source={{uri: modalContent}} />)}
            <TouchableHighlight style={styles.close} onPress={() => this.setState({modalContent: ''})}>
              <Text style={styles.closeText}>X</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
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
  },
  gallery: {
    marginVertical: 24,
    ...globalStyle.row,
    justifyContent: 'center',
  },
  thumbnail: {
    marginRight: 8,
    ...globalStyle.shadow,
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  originalImage: {
    height: undefined,
    width: undefined,
    flex: 1,
    resizeMode: 'contain'
  },
  close: {
    position: 'absolute',
    top: 22,
    right: 24,
  },
  closeText: {
    fontSize: 24,
    color: '#FFF'
  },
  addCommnet: {
    marginBottom: 12,    
  },
  comments: {
    marginBottom: 24,
  },
  comment: {
    fontStyle: 'italic',
    fontSize: 12,
    marginBottom: 8,
  }
});
