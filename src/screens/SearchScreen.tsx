import { StackScreenProps } from "@react-navigation/stack";
import { ActivityIndicator, Dimensions, FlatList, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../navigation/RootNav";
import { SafeAreaView } from "react-native-safe-area-context";
import Octicons from "@react-native-vector-icons/octicons";
import { SmartImage } from "../components/SmartImage";
import { useNetwork } from "../hooks/useNetwork";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCategoryWallpapers, fetchTrendingWallpapers } from "../api";
import { useEffect, useRef, useState } from "react";

type SearchScreenProps = StackScreenProps<RootStackParamList, 'SearchScreen'>
const IMAGE_WIDTH = Dimensions.get('window').width / 2 - 30;
const SUGGESTIONS = ['Nature', 'City', 'Abstract', 'Dark', 'Space', 'Ocean', 'Mountains'];

export const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
    const isConnected = useNetwork();
    const [searchValue, setSearchValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 500);
        return () => clearTimeout(timer); // clears timer if user keeps typing
    }, [searchValue]);

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['categoryWallpapers', debouncedValue],
        queryFn: ({ pageParam = 1 }) =>
            fetchCategoryWallpapers(debouncedValue, pageParam),
        staleTime: 1000 * 60 * 30,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage.next_page) return undefined;
            const url = new URL(lastPage.next_page);
            return parseInt(url.searchParams.get('page') ?? '1', 10);
        },
        enabled: !!isConnected && debouncedValue.trim().length > 0,
    });

    const listRef = useRef<FlatList>(null);
    const inputRef = useRef<TextInput>(null);
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const scrollToTop = () => {
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowBtn(offsetY > 500);
    };

    const wallpapers = data
        ? Array.from(
            new Map(
                data.pages
                    .flatMap(page => page.photos)
                    .map(photo => [photo.id, photo]),
            ).values(),
        )
        : [];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Octicons name="arrow-left" size={24} color={'#fff'} onPress={() => navigation.goBack()} />
                <View style={styles.searchInputContainer}>
                    <Octicons name="search" size={16} color={'#999'} />
                    <TextInput
                        ref={inputRef}
                        placeholder="Search wallpapers..."
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        autoFocus
                        returnKeyType="search"
                        value={searchValue}
                        onChangeText={(text) => {
                            // only allow letters, numbers, spaces
                            const cleaned = text.replace(/[^a-zA-Z0-9 ]/g, '');
                            setSearchValue(cleaned);
                        }}
                    />
                    {searchValue.length > 0 && (<Octicons name="x-circle-fill" size={16} color={'#999'} onPress={() => setSearchValue('')} />)}
                </View>
            </View>

            {debouncedValue.trim().length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>Try searching for</Text>
                    <View style={styles.chipsContainer}>
                        {SUGGESTIONS.map(tag => (
                            <TouchableOpacity
                                key={tag}
                                style={styles.chip}
                                onPress={() => setSearchValue(tag)}
                            >
                                <Text style={styles.chipText}>{tag}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            ) : isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size={'large'} color="white" /></View>
            ) : error ? (
                <Text>Unable to fetch wallpapers : {error.message}</Text>
            ) : (
                <FlatList
                    ref={listRef}
                    data={wallpapers}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={handleScroll}
                    onEndReached={() => {
                        if (hasNextPage) fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => {
                        if (isFetchingNextPage) {
                            return (
                                <View style={styles.footerContainer}>
                                    <ActivityIndicator size="large" color="white" />
                                </View>
                            );
                        }

                        if (!hasNextPage && wallpapers.length > 0) {
                            return (
                                <View style={styles.footerContainer}>
                                    <Text style={styles.footerText}>That's all we have!</Text>
                                </View>
                            );
                        }

                        return null;
                    }}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('ViewerScreen', { imgData: item })
                            }
                        >
                            <SmartImage
                                source={{ uri: item.src.portrait }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                No wallpapers found for "{debouncedValue}"
                            </Text>
                        </View>
                    )}

                />
            )}
            {showBtn && (
                <TouchableOpacity
                    style={styles.backToTop}
                    onPress={scrollToTop}
                    activeOpacity={0.8}
                >
                    <Octicons name="arrow-up" size={24} color={'white'} />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e2e2e',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'android' ? 0 : 10,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#fff',
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        letterSpacing: 0.5,
        fontFamily: 'System',
    },
    image: {
        width: IMAGE_WIDTH,
        aspectRatio: 9 / 16,
        borderRadius: 14,
        marginBottom: 20,
    },
    backToTop: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#000',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    arrow: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 80,
    },
    emptyStateText: {
        fontSize: 15,
        color: '#666666',
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginTop: 16,
    },
    chip: {
        backgroundColor: '#2e2e2e',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#444',
    },
    chipText: {
        color: '#ccc',
        fontSize: 13,
        fontWeight: '500',
    },

});