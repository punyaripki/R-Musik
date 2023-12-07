import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity,Image} from 'react-native';
import { Setting } from 'iconsax-react-native';
import { BlogList, CategoryList,ProfileData } from '../../../data';
import { fontType, colors } from '../../theme';
import { Profile } from '../Profile';
import { ListHorizontal, ItemSmall } from '../../components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerLayout } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const navigation = useNavigation();

export default function Home() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator color={colors.latar()} headerShown={false} initialRouteName="Home"
     drawerContent={() => 
    <DrawerContent />}>
      <Drawer.Screen name="Home" component={HomeScreen} style={styles.Navigator}/>
    </Drawer.Navigator>
   
  );
}

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <DrawerLayout
          drawerWidth={200}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="front"
          headerShown={false}
          color={colors.latar()}
          renderNavigationView={DrawerContent}
       />
      </View>
      <View style={styles.listCategory}>
        <FlatListCategory />
      </View>
      <ListBlog />
    </View>
  );
};



const DrawerContent = () => {
  
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
      <Image style={styles.pic} source={{ uri: 'https://media.licdn.com/dms/image/D5603AQEIpqnjQqkSpA/profile-displayphoto-shrink_800_800/0/1698759551331?e=2147483647&v=beta&t=UyGrO1N2WYpUuWC9faykVTT21OvTcKBGXRh8TlsXzV0'}} />
      <Text style={styles.textProfile}>{ProfileData.name}</Text>
      </TouchableOpacity>
    </View>
  );
};


const ListBlog = () => {
  const horizontalData = BlogList.slice(0, 5);
  const verticalData = BlogList.slice(4);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.trending}>Trending Right Now</Text>
      <View style={styles.listBlog}>
        <ListHorizontal data={horizontalData} />
        <Text style={{ color: 'white', paddingHorizontal: 24, fontSize: 20, fontFamily: fontType['Pjs-Bold'] }}> Category </Text>
        <View style={{ ...category.item, marginLeft: 10 }}>
          <View style={{ alignItems: 'center', padding: 10, backgroundColor:colors.green(),borderRadius:5  }}>
            <Text style={category.textCat}>Region</Text>
          </View>
          <View style={{ alignItems: 'center', padding: 10,backgroundColor:colors.green(),borderRadius:5  }}>
            <Text style={category.textCat}>Tools</Text>
          </View>
          <View style={{ alignItems: 'center', padding: 10, backgroundColor:colors.green(),borderRadius:5 }}>
            <Text style={category.textCat}>Time</Text>
          </View>
        </View>
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            <ItemSmall item={item} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const FlatListCategory = () => {
  const [selected, setSelected] = useState(1);
  const renderItem = ({ item }) => {
    const color = item.id === selected ? colors.blue() : colors.grey();
    return (
      <ItemCategory
        item={item}
        onPress={() => setSelected(item.id)}
        color={color}
      />
    );
  };

  return (
    <FlatList
      data={CategoryList}
      keyExtractor={(item) => item.id}
      renderItem={(item) => renderItem({ ...item })}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const ItemCategory = ({ item, onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={category.item}>
        <Text style={{ ...category.title, color }}>{item.categoryName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.latar(),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 8,
    paddingHorizontal: 24,
    paddingTop: 2,
    paddingBottom: 4,
    backgroundColor: colors.latar(),
  },
  title: {
    fontSize: 20,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.white(),
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingVertical: 10,
    gap: 10,
  },
  trending: {
    fontSize: 25,
    fontFamily:'Bold',
    color: colors.white(),
    marginLeft: 25,
    marginTop:5,
  },
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  drawerContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 3,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  textProfile:{
fontSize:20,
  },
  Navigator :{
    color:colors.latar(),
    fontSize:20,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
   
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: colors.grey(),
  },
  textCat: {
    color: 'white',
  },
});
