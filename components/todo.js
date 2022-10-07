import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';

const Item = ({ item }) => (
    <View style={styles.item}>
        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.id}</Text>
        </View>
        <View style={{ flex: 10, }}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{ flex: 4 }}>
            <TouchableOpacity
                style={styles.buttonDelete}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default function Todo() {
    const [isLoading, setLoading] = useState(true);
    const [text, onChangeText] = useState('');
    const [data, setData] = useState([]);

    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    const postTask = async () => {
        fetch('https://633fa1dde44b83bc73bdfed4.mockapi.io/api/task', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text,
                status: false
            })
        }).then( () => getTasks())
        .finally(() => onChangeText(''));
    }
    const getTasks = async () => {
        try {
            const response = await fetch('https://633fa1dde44b83bc73bdfed4.mockapi.io/api/task');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getTasks();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.groupItem}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Text for me !"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={postTask}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Item</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%'
    },
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#1BA9FF',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1BA9FF",
        padding: 10,
        borderRadius: 5
    },
    input: {
        width: 250,
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#1BA9FF',
        padding: 10,
        borderRadius: 5
    },
    item: {
        flexDirection: 'row',
        backgroundColor: "#1BA9FF",
        marginTop: 10,
        marginHorizontal: 20,
        padding: 40,
        alignItems: 'center'
    },
    title: {
        marginLeft: 30,
        color: 'white',
        fontSize: 25
    },
    buttonDelete: {
        alignItems: "center",
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5
    },
});
