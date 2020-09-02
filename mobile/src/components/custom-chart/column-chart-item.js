import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'

export default class ColumnChartItem extends Component {



  render () {
    let renders = []
    let seriesCount = this.props.seriesArray.length
    for (let seriesIndex = 0; seriesIndex < seriesCount; seriesIndex++) {
      let lastElementMarginRight = 0
      let lastElementMarginLeft = 0
      if (seriesIndex === (seriesCount - 1)) {
        // lastElementMarginRight = 14
        // lastElementMarginLeft = 19
      }
        
      renders.push( 
        <View style={{ 
          flexDirection: 'column',          
          alignItems: 'center',       
          // marginRight: lastElementMarginRight,
          // marginLeft: lastElementMarginLeft,
          //borderWidth: 1,
          minWidth: 50 }}>              
          <Text style={{                   
            color: this.props.seriesArray[seriesIndex].seriesColor, marginBottom: 5, 
            transform: (this.props.seriesArray[seriesIndex].seriesColor === '#FF5733') ? [{rotate: '180deg'}] : [{rotate: '0deg'}] }}>
            {this.props.seriesArray[seriesIndex].data[this.props.dataIndex]['y']}
          </Text>     
          <View key={seriesIndex} style={[styles.bar, {
            width: this.props.defaultWidth / seriesCount,
            height: this.props.seriesArray[seriesIndex].data[this.props.dataIndex]['ratioY'] - 10,
            marginLeft: 10,
            backgroundColor: this.props.seriesArray[seriesIndex].seriesColor,
            borderColor: this.props.isSelected ? this.props.highlightColor : '#FFFFFF'                       
          }]} />          
        </View>
      )
    }
    return (
      <TouchableWithoutFeedback onPressIn={(evt) => this.props.onClick(evt)}>
        <View style={{height: this.props.defaultHeight}}>          
          <View style={styles.chartView}>
            {renders}
          </View>          
        </View>        
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  chartView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    paddingTop: 20
  },
  bar: {
    justifyContent: 'flex-end',
    borderRadius: 50,    
  }
})

ColumnChartItem.propTypes = {
  seriesArray: PropTypes.array,
  onClick: PropTypes.func,
  defaultWidth: PropTypes.number,
  defaultHeight: PropTypes.number,
  defaultMargin: PropTypes.number,
  primaryColor: PropTypes.string,
  highlightColor: PropTypes.string
}
