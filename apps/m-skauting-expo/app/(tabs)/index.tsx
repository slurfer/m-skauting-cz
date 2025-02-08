import React, { useState } from "react"
import { StyleSheet, Button } from "react-native"
import EditScreenInfo from "@/components/EditScreenInfo"
import { Text, View } from "@/components/Themed"
import { ApiClient, Maybe, OrganizationDTO } from "m-skuating-sdk"

const client = new ApiClient("http://192.168.1.107:8000")

export default function TabOneScreen() {
    const [organization, setOrganization] = useState<Maybe<OrganizationDTO>>(null)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <Text style={styles.title}>{organization?.name ?? "No organization"}</Text>
            <Text style={styles.title}>{organization?.orgNumber ?? "No org number"}</Text>
            <Button
                title="Get organization"
                onPress={() => {
                    client
                        .getOrganization("123")
                        .then((organization) => {
                            setOrganization(organization)
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }}
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="app/(tabs)/index.tsx" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
})
