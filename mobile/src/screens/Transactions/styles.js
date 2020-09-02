import styled from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  background: #123eda;
  flex: 1;  
`;

export const Header = styled.View`  
  padding: 0 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 52px;
`;

export const HeaderButton = styled.TouchableOpacity`
  background-color: #0d36c5;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.View`
  height: 120px;
  flex-direction: column;
  justify-content: center;
  margin-left: 42px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  color: #AEBCEF;  
`;

export const TransactionsContainer = styled.View`  
  flex: 1;
  background-color: #fff;  
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;

export const AddTransactionButton = styled.TouchableOpacity`
  background-color: #4e75ff;
  width: 52px;
  height: 52px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 45px;
  margin-top: -27px;
`;

export const ItemContainer = styled.View`
  flex: 1;
  flex-direction: row;  
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
`;

export const ItemIcon = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 50px;
  background-color: #0d36c5;
  align-items: center;
  justify-content: center;
  margin: 15px;
`;

export const ItemCategory = styled.Text`  
  font-size: 12px;
  color: #a2a6b2;
`;

export const ItemTitle = styled.Text`  
  font-size: 18px;
  color: #343434;
`;

export const ItemValue = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;

export const FooterContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LoadMoreButton = styled.TouchableOpacity`
  border-width: 2px;
  border-radius: 20px;
  border-color: #a2a6b2;
  width: 300px;
  height: 70px;
  margin-top: 50px;

  align-items: center;
  justify-content: center;
`;