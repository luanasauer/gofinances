import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';  
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import AsyncStorage  from '@react-native-async-storage/async-storage';

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  name: 'Teste',
  email: 'john.doe@email.com',
  photo: 'any_photo.png'
};

jest.mock('expo-auth-session');

describe('Auth Hook', () => {

  // beforeEach(async () => {
  //   const userCollectionKey = '@gofinances:user'
  //   await AsyncStorage.removeItem(userCollectionKey)
  //    ESSFA FUNÇÃO PODE SER USADO QUANDO FOR UTILIZADO mockReturnValue 
  // })

  it('should be able to sign in with Google account existing', async () => {

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    
    (startAsync as jest.Mock).mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    });


    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    // console.log(result.current.user);
    expect(result.current.user.email)
      .toBe(userTest.email);
  });

  it('should not connect if cancel authentication with Google', async () => { 
    
    (startAsync as jest.Mock).mockReturnValueOnce({
      type: 'cancel' 
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());  
    //aqui o usuário deve ser {} console.log(result.current.user);
    expect(result.current.user).not.toHaveProperty('id');
  });

  it('should be error with incorrectly Google parameters', async () => { 
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    } 
  });

});
