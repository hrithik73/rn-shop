import React, { useRef, useState } from 'react';
import { useInfiniteHits, useSearchBox } from 'react-instantsearch-hooks';
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import ProductCard from '@src/components/ProductCard';
import colors from '@src/constants/colors';
import styles from './styles';

const SearchScreen = () => {
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
    <View style={styles.container}>
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
    </View>
  );
};

export default SearchScreen;
