import {Navigation} from 'react-native-navigation';

import ContactsPage from './ContactsPage/ContactsPage';
import PingList from './PingList/PingList';
import Calendar from './Calendar/Calendar';
import Onboarding from './Onboarding/Onboarding';
import OnboardingContactsPage
    from './OnboardingContactsPage/OnboardingContactsPage';
import AddContactsPage from './ContactsPage/AddContactsPage';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('pingd.Contacts', () =>
        ContactsPage, store, Provider
    );
    Navigation.registerComponent('pingd.Calendar', () =>
        Calendar, store, Provider
    );
    Navigation.registerComponent('pingd.PingList', () =>
        PingList, store, Provider
    );
    Navigation.registerComponent('pingd.Onboarding', () =>
        Onboarding, store, Provider
    );
    Navigation.registerComponent('pingd.OnboardingContacts', () =>
        OnboardingContactsPage, store, Provider
    );
    Navigation.registerComponent('pingd.AddContacts', () =>
        AddContactsPage, store, Provider
    );
}
