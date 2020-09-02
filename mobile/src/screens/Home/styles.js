import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  background: #fff;
  flex: 1;
`;

export const Header = styled.View`  
  padding: 0 25px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 52px;
`;

export const HeaderButton = styled.TouchableOpacity`
  background-color: #e4eaf2;
  width: 42px;
  height: 42px;
  border-radius: 21px;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  align-items: center;
  justify-content: center;
`;

export const Notifications = styled.View`
  background-color: #0d36c5;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin-left: -5px;
  margin-top: -15px;
  elevation: 8px;
`;

export const Balance = styled.View`   
  flex-direction: column;
  justify-content: space-between;
  margin-left: 52px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const BalanceHeader = styled.View` 
  flex-direction: row;
  justify-content: space-between;
  height: 25px;
  margin-right: 10px;
`;

export const BalanceTitle = styled.Text`
  color: #9ea4b2;  
`;

export const BalanceOptions = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  margin-top: -10px;
`;

export const BalanceValue = styled.View`  
  align-items: center;  
  flex-direction: row;
  height: 120px;
`;

export const TransactionContainer = styled.View`  
  background-color: #0d36c5;
  height: 200px;
  margin-left: 42px;
  border-top-left-radius: 50;
  border-bottom-left-radius: 50;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const TransactionColumn = styled.View`
  flex-direction: column;
  margin-top: -30px;
`;

export const TransactionValue = styled.Text`
  font-size: 30px; 
  color: #fff; 
  margin-top: 10px; 
  margin-bottom: 10px;
`;

export const TransactionType = styled.Text`
  font-size: 12; 
  color: #fff;
`;

export const GoToTransactionButton = styled.TouchableOpacity`
  background-color: #4e75ff;
  width: 52px;
  height: 52px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 25px;
  margin-top: -27px;
  elevation: 8px;
`;

export const Activity = styled.View`  
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
`;

export const ActivityHeader = styled.View`
  flex-direction: row;
  margin-left: 30px;
`;

export const ActivityGraph = styled.View`
  margin-top: 0px;
  height: 300px;
  align-items: center;  
  flex-direction: column;
  justify-content: center;
`;

export const LastTransactions = styled.View`
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
`;