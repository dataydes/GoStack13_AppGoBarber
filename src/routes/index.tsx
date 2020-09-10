import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import AutoRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../hooks/auth';



const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#666" />
            </View>
        );
    }


    return user ? <AppRoutes /> : <AutoRoutes />;
};

export default Routes;