import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// screens
import Home from '../screens/Home';
import Login from '../screens/Login'
import Galleries from '../screens/Galleries';
import GImages from '../screens/GImages';
import Pro from '../screens/Pro';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Components from '../screens/Components';
import AboutUS from '../screens/AboutUS';
import Articles from '../screens/Articles';
import Onboarding from '../screens/Onboarding';

// settings
import SettingsScreen from '../screens/Settings';

// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const ComponentsStack = createStackNavigator(
  {
    Components: {
      screen: Components,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Components" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const AboutUSStack = createStackNavigator(
  {
    AboutUS: {
      screen: AboutUS,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="About us" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Settings" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const ArticlesStack = createStackNavigator(
  {
    Articles: {
      screen: Articles,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Article Details" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);

const ProfileStack = createStackNavigator(
  {
    // Profile: {
    //   screen: Profile,
    //   navigationOptions: ({ navigation }) => ({
    //     header: (
    //       <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
    //     ),
    //     headerTransparent: true
    //   })
    // }
    Profile: {	
      screen: Profile,	
      navigationOptions: ({ navigation }) => ({	
        header: <Header title="Profile" navigation={navigation} />	
      })	
    },
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const AccountStack = createStackNavigator(
  {
    Account: {
      screen: Register,
      navigationOptions: {
        drawerLabel: () => {},
        header: null
      }
    }
  },
  {
    cardStyle: { backgroundColor: '#FFFFFF' },
    transitionConfig
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {	
      screen: Home,	
      navigationOptions: ({ navigation }) => ({	
        header: <Header title="Home" navigation={navigation} />	
      })	
    },
  },
  {
    cardStyle: {
      backgroundColor: '#FFFFFF'
    },
    transitionConfig
  }
);
const LoginStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      drawerLabel: () => {},
      header: null
    }
  }
})
const GalleriesStack = createStackNavigator({
  // Galleries: {
  //   screen: Galleries,
  //   navigationOptions: {
  //     drawerLabel: () => {},
  //     header: null
  //   }
  // }
  Galleries: {	
    screen: Galleries,	
    navigationOptions: ({ navigation }) => ({	
      header: <Header title="Galleries" navigation={navigation} />	
    })	
  },
})
const GImagesStack = createStackNavigator({
  // GImages: {
  //   screen: GImages,
  //   navigationOptions: {
  //     drawerLabel: () => {},
  //     header: null
  //   }
  // }
  GImages: {	
    screen: GImages,	
    navigationOptions: ({ navigation }) => ({	
      header: <Header title="Images" navigation={navigation} />	
    })	
  },
})
const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => { }
      }
    },    
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Home" title="Home" />
        )
      }),
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: {
        drawerLabel: () => {},
        header: null
      }
    },    
    Galleries: {
      screen: GalleriesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Galleries" title="Galleries" />
        )
      }),      
    },
    GImages: {
      screen: GImagesStack,
      // navigationOptions: navOpt => ({
      //   drawerLabel: ({ focused }) => (
      //     <DrawerItem focused={focused} screen="GImages" title="Images" />
      //   )
      // }),   
      navigationOptions: {
        drawerLabel: () => {},
        header: null
      }   
    },
    // Components: {
    //   screen: ComponentsStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} screen="Components" title="Components" />
    //     )
    //   })
    // },    

    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    AboutUS: {
      screen: AboutUSStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="AboutUS" title="About us" />
        )
      })
    }, 
    Login: {
      screen: LoginStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Login" title="Logout" />
        )
      }),      
    },
    Account: {
      screen: AccountStack,
      navigationOptions: {
        drawerLabel: () => {},
        header: null
      }
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
