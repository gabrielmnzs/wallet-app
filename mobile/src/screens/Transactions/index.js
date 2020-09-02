import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Text, View, FlatList, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as Font from 'expo-font';

import { 
  Wrapper, 
  Header, 
  HeaderButton, 
  TitleContainer, 
  Title, 
  SubTitle, 
  TransactionsContainer, 
  AddTransactionButton,
  ItemContainer,
  ItemIcon,
  ItemCategory,
  ItemTitle,
  ItemValue,
  FooterContainer,
  LoadMoreButton } from './styles';

  import api from '../../services/api';

  let customFonts = {
    'dinNextLTLight': require('../../assets/fonts/DIN-Next-LT-Arabic-Light.ttf'),
    'dinNextLTRegular': require('../../assets/fonts/DIN-Next-LT-Arabic-Regular.ttf'),
    'dinNextLTBold': require('../../assets/fonts/DIN-Next-LT-Arabic-Bold.ttf'),
    'quicksandMedium': require('../../assets/fonts/Quicksand-Medium.ttf'),
    'quicksandSemiBold': require('../../assets/fonts/Quicksand-SemiBold.ttf'),
    'quicksandBold': require('../../assets/fonts/Quicksand-Bold.ttf'),
    'quicksandBoldItalic': require('../../assets/fonts/Quicksand-Bold-Italic.ttf'),
  }

  const pickerValues = [
    {    
      value: '1 DAY'
    },
    {    
      value: '1 WEEK'
    },
    {    
      value: '1 MONTH'
    }
  ];

export default class Transactions extends Component {
  state = {
    transactions: [],
    total: 0,
    loading: false,
    firstIndex: 0,
    lastIndex: 4,
    endOfList: false,
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadTransactions();
    this.setState({ pickerSelection: '1 WEEK', pickerDisplayed: false });
  }

  loadTransactions = () => {
    if(this.state.loading){      
      return;
    }

    if(this.state.total > 0 && this.state.transactions.length === this.state.total){
        this.setState({ endOfList: true });
        return;
    }

    this.setState({ loading: true });
    
    const response = api;
    
    const transactionsList = response.transactions
      .slice(this.state.firstIndex, this.state.lastIndex);
    
    this.setState({
      transactions: [...this.state.transactions, ...transactionsList],
      total: response.total,
      loading: false,
      firstIndex: this.state.lastIndex, 
      lastIndex: this.state.lastIndex + 1
    });
  }

  seeMore = () => {
    this.setState({ 
      firstIndex: this.state.lastIndex, 
      lastIndex: this.state.lastIndex + 5
    });
    this.loadTransactions();
  }

  renderFooter = () => {
    if(this.state.endOfList){
      return null;
    }else{
      return (
        <FooterContainer>
            <LoadMoreButton onPress={this.seeMore}>
              <Text style={{ color: '#676767', fontWeight: "700" }}>See more</Text>
            </LoadMoreButton>
        </FooterContainer>
      );
    }
  }

  setPickerValue = (newValue) => {

    this.setState({
      pickerSelection: newValue
    })

    this.togglePicker();
  };

  togglePicker = () => {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  };

render() {
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Wrapper>
        <Header>
          <HeaderButton
            onPress={() => this.props.navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={20} color="#e4eaf2" />
          </HeaderButton>
          <HeaderButton>
            <AntDesign name="ellipsis1" size={20} color="#e4eaf2" />
          </HeaderButton>        
        </Header>
        <TitleContainer>
          <Title style={{ fontFamily: 'quicksandSemiBold' }}>TRANSACTIONS</Title>
          <SubTitle style={{ fontFamily: 'quicksandBoldItalic' }}>All transactions</SubTitle>
        </TitleContainer>      
        <TransactionsContainer>
          <AddTransactionButton>
            <FontAwesome name="plus" size={20} color="#e4eaf2" />
          </AddTransactionButton>
          <View style={{ marginLeft: 45, flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'quicksandBold', fontSize: 18, marginRight: 20 }}>yesterday</Text>                       
            <View>
                <View style={{
                  borderWidth: 2,
                  width: 90,
                  height: 30,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  borderColor: '#C4CCE8'                 
                }}>
                  <View style={{ width: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'dinNextLTBold', fontSize: 12, marginBottom: 2, color: '#9ea4b2' }}>{ this.state.pickerSelection }</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => this.togglePicker()} 
                    title={ "Select a value!" }
                    style={{ marginLeft: 2, marginRight: 10 }} >
                    <FontAwesome name="caret-down" size={12} color="#9ea4b2" />
                  </TouchableOpacity> 
                </View>       
                <Modal 
                  visible={this.state.pickerDisplayed} 
                  animationType={"slide"} 
                  transparent={true}>
                  <View style={{ margin: 20, padding: 20,
                    backgroundColor: '#eff1f7',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    alignItems: 'center',
                    position: 'absolute' }}>
                    <Text style={{ fontFamily: 'quicksandSemiBold', fontSize: 16, marginBottom: 20 }}>Please pick a value</Text>
                    { pickerValues.map((value, index) => {
                      return <TouchableHighlight
                                activeOpacity={0.2}
                                underlayColor="#C6C9D0" 
                                key={index} 
                                onPress={() => this.setPickerValue(value.value)} 
                                style={{ 
                                  paddingTop: 6, 
                                  paddingBottom: 6, 
                                  width: '100%',
                                  alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'quicksandSemiBold', fontSize: 16 }}>{ value.value }</Text>
                              </TouchableHighlight>
                    })}
                    <TouchableHighlight 
                      activeOpacity={0.2}
                      underlayColor="#C6C9D0" 
                      onPress={() => this.togglePicker()} 
                      style={{ 
                        marginTop: 14,
                        paddingTop: 6, 
                        paddingBottom: 6, 
                        width: '100%',
                        alignItems: 'center' }}>
                      <Text style={{ fontFamily: 'quicksandSemiBold', fontSize: 16, color: '#999' }}>Cancel</Text>
                    </TouchableHighlight>
                  </View>
                </Modal>
              </View>
          </View>
          <View style={{ marginTop: 30, marginBottom: 60 }}>
          <FlatList
            data={this.state.transactions}
            keyExtractor={transaction => transaction.datetime}
            showsVerticalScrollIndicator={false}            
            onEndReachedThreshold={0.2}
            renderItem={({ item: transaction}) => (
              <View style={{ marginLeft: 15, flexDirection: 'row', flex: 1 }}>
                  {transaction.type === 'spending'
                    ? <ItemIcon style={{ backgroundColor: '#FF5B5B' }}>
                        <MaterialIcons name="money-off" size={25} color="#F2F4F7" />
                      </ItemIcon>
                    : <ItemIcon style={{ backgroundColor: '#5B6AFF' }}>
                        <MaterialIcons name="attach-money" size={25} color="#F2F4F7" />
                      </ItemIcon>
                  }
                <View style={{ flex: 1, borderBottomWidth: 1, borderColor: '#ededed'}}>
                  <ItemContainer>                  
                    <View style={{ flex: 1}}>
                      <ItemCategory style={{ fontFamily: 'quicksandBold', textTransform: 'uppercase' }}>{transaction.category}</ItemCategory>
                      <ItemTitle style={{ fontFamily: 'quicksandBold' }}>{transaction.item}</ItemTitle>
                    </View>
                    <View style={{ marginRight: 30}}>
                      <ItemValue style={{ 
                        color: (transaction.status === "approved") ? '#123eda' 
                        : ((transaction.status === "pending") ? '#a2a6b2' 
                        : '#d86d77') }}>$ {transaction.amount}</ItemValue>
                    </View>
                  </ItemContainer>
                </View>
              </View>
            )}
            ListFooterComponent={this.renderFooter}
          />
          </View>
        </TransactionsContainer>
      </Wrapper>
    </>
  );
}
}

