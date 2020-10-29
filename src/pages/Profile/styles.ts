import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
flex:1;
justify-content:center;
padding: 0px 20px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
`;

export const UserAvatarButton = styled.TouchableOpacity`
position: relative;
flex-direction:row;
margin-left: 65%;
margin-top: -10%;
`;

export const Title = styled.Text`
font-size:20px;
color:#f4ede8;
font-family:'RobotoSlab-Medium';
margin: 24px 0; 
`;

export const UserAvatar = styled.Image`
width: 160px;
height: 160px;
border-radius: 98px;
margin-top:50%;
align-self: center;
`;
