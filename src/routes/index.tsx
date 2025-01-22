import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";

function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  // const isAuthenticated = true;


  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#525252',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size={60} color='#c3004d' />
      </View>
    )
  }

  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />

  )

}

export default Routes;