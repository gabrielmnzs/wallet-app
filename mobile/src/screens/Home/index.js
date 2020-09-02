import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, ScrollView, Modal, TouchableOpacity, TouchableHighlight } from 'react-native';
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import PureChart from '../../components/custom-chart';
import Dash from 'react-native-dash';
import api from '../../services/api';
import * as Font from 'expo-font';

import { 
  Wrapper, 
  Header, 
  HeaderButton, 
  ProfileImage, 
  Balance, 
  Notifications, 
  BalanceHeader ,
  BalanceTitle, 
  BalanceOptions, 
  BalanceValue,
  TransactionContainer,
  TransactionColumn,
  TransactionValue,
  TransactionType,
  GoToTransactionButton,
  Activity,
  ActivityHeader,
  ActivityGraph,
  LastTransactions } from './styles';

import profileImg from '../../assets/img/profile.jpg';

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

export default class Home extends Component { 
  state = {
    income: 0,
    outcome: 0,
    total: 0,
    incomes: [],
    outcomes: [],
    graphLoaded: false,
    fontsLoaded: false    
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {  
    this._loadFontsAsync();     
    this.loadBalance();
    this.loadGraph();
    this.setState({ pickerSelection: '1 WEEK', pickerDisplayed: false });
  }

  loadBalance = () => {
    const transactions = api.transactions;
    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += Number(transaction.amount);
            break;
          case 'spending':
            accumulator.outcome += Number(transaction.amount);
            break;
          default:
            break; 
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    this.setState({
      income: income,
      outcome: outcome,
      total: income - outcome
    });    
  };

  loadGraph = () => {
    const transactions = api.transactions;
    const dataIncome = [];
    const dataOutcome = [];

    transactions.map(transaction => {      
      if(transaction.type === 'income'){                
        dataIncome.push({ x: transaction.datetime, y: Number(transaction.amount) });
        dataOutcome.push({ x: transaction.datetime, y: 0 });
      }else{
        dataIncome.push({ x: transaction.datetime, y: 0 });
        dataOutcome.push({ x: transaction.datetime, y: Number(transaction.amount) });
      }
    });
    
    this.setState({ 
      incomes: [{ data: dataIncome, color: '#0d36c5' }],
      outcomes: [{ data: dataOutcome.reverse(), color: '#FF5733' }]
    }); 
  };

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
          <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <HeaderButton>
              <AntDesign name="arrowleft" size={20} color="#9ea4b2" />
            </HeaderButton>
            <View>
              <ProfileImage source={profileImg} />
              <Notifications>
                <Text style={{ fontFamily: 'dinNextLTRegular', color : '#fff', marginBottom: 5 }}>6</Text>
              </Notifications>
            </View>
          </Header>
          <Balance>
            <BalanceHeader>
              <BalanceTitle style={{ fontFamily: 'quicksandBold' }}>Current balance</BalanceTitle>
              <BalanceOptions>
                <AntDesign name="ellipsis1" size={20} color="#9ea4b2"/>
              </BalanceOptions>
            </BalanceHeader>
            <BalanceValue>
              <Text style={{ fontFamily: 'dinNextLTLight', fontSize: 50, marginBottom: 10 }}>$</Text> 
              <Text style={{ fontFamily: 'dinNextLTLight', fontSize: 80, marginRight: 10, marginLeft: 10}} >{this.state.total.toFixed(2).toString()}</Text> 
              <Text style={{ fontFamily: 'dinNextLTLight', fontSize: 20, marginTop: 60 }} >USD</Text>
            </BalanceValue>
          </Balance>
          <TransactionContainer>
            <TransactionColumn>
              <FontAwesome name="star" size={20} color="#fff" />
              <TransactionValue>$ {this.state.income.toFixed(2).toString()}</TransactionValue>
              <TransactionType style={{ fontFamily: 'quicksandMedium' }}>your income</TransactionType>
            </TransactionColumn>
            <TransactionColumn style={{marginLeft: 30}}>
              <Ionicons name="md-share-alt" size={20} color="#fff" />
              <TransactionValue>$ {this.state.outcome.toFixed(2).toString()}</TransactionValue>
              <TransactionType style={{ fontFamily: 'quicksandMedium' }}>your spending</TransactionType>
            </TransactionColumn>          
          </TransactionContainer>
          <GoToTransactionButton 
            onPress={() => this.props.navigation.navigate('Transactions')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#fff" />
          </GoToTransactionButton>
          <Activity >
            <ActivityHeader>
              <Text style={{ fontFamily: 'quicksandBold', fontSize: 18, marginRight: 20 }}>activity</Text>
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
            </ActivityHeader>            
            <ActivityGraph>              
                <View style={{ height: 100 }}>
                  <PureChart               
                      type={'bar'}
                      data={this.state.incomes}
                      width={'100%'}
                      height={80}                      
                      numberOfYAxisGuideLine={0}           
                    />
                </View>
                <Dash style={{ width:340, height:1, marginTop: 10, marginBottom: 10}} dashLength={8} dashColor={'#E6E6E6'}/>
                <View style={{ height: 100, transform: [{ rotate: '180deg'}] }}>
                  <PureChart               
                    type={'bar'}
                    data={this.state.outcomes}
                    width={'100%'}
                    height={80}                
                    numberOfYAxisGuideLine={0}           
                  />    
                </View>          
            </ActivityGraph>
          </Activity>
          <LastTransactions>
            <ActivityHeader>
              <Text style={{ fontFamily: 'quicksandBold', fontSize: 18, marginRight: 20 }}>last transactions</Text>
            </ActivityHeader>                      
            <View style={{ height: 50}}></View>
          </LastTransactions>
          </ScrollView>
        </Wrapper>
      </>
    );
}
}
