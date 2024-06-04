import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';


import Welcome from '../app/Screens/Welcome';
import login from '../app/Screens/login'
import Signup from '../app/Screens/Signup';
import PageUser from '../app/Screens/PageUser';
import Parametre from '../app/Screens/Parametre';
import TakeImage from '../app/Screens/TakeImage';
import Add from '../app/Screens/Add';
import Historique from '../app/Screens/Historique';
import Forgetpassword from '../app/Screens/Forgetpassword';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/slices/user';
import Profile from '../app/Screens/Profile';
import ChangePassword from '../app/Screens/ChangePassword';
import ProductsPage from '../app/Screens/ProductsPage';
import Cart from '../app/Screens/Cart';
import Favorite from '../app/Screens/Favorite';
import Help from '../app/Screens/Help';
import Favorite1 from '../app/Screens/Favorite1';
import Checkout from '../app/Screens/Checkout';
import ProductDetails from '../app/Screens/ProductDetails';

const Stack = createNativeStackNavigator();


const RootStack = () => {
    const {user} = useSelector(state => state.user);
    
    const dispatch = useDispatch();
    onAuthStateChanged(auth ,u =>{
        console.log('got user :',u);
        dispatch(setUser(u));
    })

    if(user){
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft:20,
                    }     
                }}
                initialRouteName="PageUser"
                >
                    <Stack.Screen name='PageUser' component={PageUser}/>
                    <Stack.Screen name='Parametre' component={Parametre}/>
                    <Stack.Screen name='TakeImage' component={TakeImage}/>
                    <Stack.Screen name='Add' component={Add}/>
                    <Stack.Screen name='Historique' component={Historique}/>
                    <Stack.Screen name='Profile' component={Profile}/>
                    <Stack.Screen name='ChangePassword' component={ChangePassword}/>
                    <Stack.Screen name='ProductsPage' component={ProductsPage}/>
                    <Stack.Screen name='Cart' component={Cart}/>
                    <Stack.Screen name='Favorite' component={Favorite}/>
                    <Stack.Screen name='Favorite1' component={Favorite1}/>
                    <Stack.Screen name='Checkout' component={Checkout}/>
                    <Stack.Screen name='ProductDetails' component={ProductDetails}/>
                    <Stack.Screen name='Help' component={Help}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }else{
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerStyle:{
                        backgroundColor:'transparent'
                    },
                    headerTransparent:true,
                    headerTitle:'',
                    headerLeftContainerStyle:{
                        paddingLeft:20,
                    }     
                }}
                initialRouteName="Welcome"
                >
                    <Stack.Screen name='Welcome'component={Welcome}/>
                    <Stack.Screen name='Signup'component={Signup}/>
                    <Stack.Screen name='Login'component={login}/>
                    <Stack.Screen name='Forgetpassword'component={Forgetpassword}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
export default RootStack;