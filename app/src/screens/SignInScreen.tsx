import { Button, StyleSheet, Text, TextInput } from 'react-native';

import { useAuth } from '../auth/AuthContext';
import { Screen } from '../components/Screen';
import { colors } from '../theme/theme';

export function SignInScreen() {
  const { signIn } = useAuth();

  return (
    <Screen>
      <Text style={styles.title}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Téléphone" keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Code OTP" keyboardType="number-pad" />
      <Button title="Se connecter" onPress={() => signIn('demo-token')} color={colors.primary} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  input: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
});
