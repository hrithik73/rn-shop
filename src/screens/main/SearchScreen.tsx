import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import { useSearchBox, useInfiniteHits } from 'react-instantsearch-hooks';
import ProductCard from '../../components/ProductCard';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from '../../constants/colors';

export default function SearchBox() {
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);

  const { hits, isLastPage, showMore } = useInfiniteHits();

  const inputRef = useRef<TextInput>(null);

  const setQuery = (newQuery: any) => {
    setInputValue(newQuery);
    refine(newQuery);
  };
  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef?.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="search rnshop.com "
          placeholderTextColor={colors.grey}
          style={styles.input}
          value={inputValue}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          autoComplete="off"
        />
        <Pressable style={styles.iconContainer}>
          <Icon name="search1" size={30} />
        </Pressable>
      </View>
      {hits.length === 0 ? (
        <Text style={styles.notFoundTxt}>No Result found </Text>
      ) : (
        <FlatList
          data={hits}
          keyExtractor={item => item.objectID}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={() => {
            if (!isLastPage) {
              showMore();
            }
          }}
          renderItem={({ item }) => {
            return <ProductCard item={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  input: {
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
    width: '80%',
    padding: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 18,
  },
  notFoundTxt: {
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 200,
    fontSize: 18,
  },
});
