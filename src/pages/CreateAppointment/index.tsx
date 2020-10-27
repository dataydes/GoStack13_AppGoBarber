import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import {
    Container, Header, BackButton, HeaderTitle, UserAvatar,
    ProvidersListContainer, ProvidersList,
    ProviderContainer, ProviderAvatar, ProviderName
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const CreateAppointment: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const { user } = useAuth();
    const route = useRoute();
    const routeParams = route.params as RouteParams;
    const { goBack } = useNavigation();
    const navigateBack = useCallback(() => { goBack(); }, [goBack]);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);
    useEffect(() => {
        api.get('providers').then((response) => {
            setProviders(response.data);
        });
    }, []);

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>
                <HeaderTitle>Cabeleireiros</HeaderTitle>
                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>
            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={(provider) => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer onPress={() => handleSelectProvider(provider.id)} selected={provider.id === selectedProvider}>
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />
                            <ProviderName selected={provider.id === selectedProvider}>{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
        </Container>
    )
}

export default CreateAppointment;