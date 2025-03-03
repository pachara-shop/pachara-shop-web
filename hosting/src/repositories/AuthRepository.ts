import { firebaseAuth } from '@/config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';

export class AuthRepository {
  auth;
  constructor() {
    this.auth = firebaseAuth;
  }
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
  async logout() {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }
  async register(email, password) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}
