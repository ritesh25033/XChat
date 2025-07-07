import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, chatAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  rooms: [],
  currentRoom: null,
  searchResults: [],
  isSearchOpen: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false 
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload };
    case 'ADD_ROOM':
      const existingRoom = state.rooms.find(r => r._id === action.payload._id);
      return { 
        ...state, 
        rooms: existingRoom ? state.rooms : [...state.rooms, action.payload] 
      };
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_SEARCH_OPEN':
      return { ...state, isSearchOpen: action.payload };
    case 'LOGOUT':
      return { 
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        rooms: [],
        currentRoom: null,
        searchResults: [],
        isSearchOpen: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.data.success) {
        dispatch({ type: 'SET_USER', payload: response.data.data });
        await loadUserRooms();
      }
    } catch (error) {
      dispatch({ type: 'SET_USER', payload: null });
    }
  };

  const loadUserRooms = async () => {
    try {
      const response = await chatAPI.getUserRooms();
      if (response.data.success) {
        dispatch({ type: 'SET_ROOMS', payload: response.data.data });
      }
    } catch (error) {
      console.error('Failed to load rooms:', error);
    }
  };

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await authAPI.login(credentials);
      if (response.data.success) {
        dispatch({ type: 'SET_USER', payload: response.data.data.user });
        await loadUserRooms();
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await authAPI.register(userData);
      if (response.data.success) {
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

 const logout = async () => {
  try {
    // Set loading to prevent race conditions
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Call logout API
    await authAPI.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear state immediately and synchronously
    dispatch({ type: 'LOGOUT' });
    
    // Clear all browser storage
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
    }
    
    // Add delay to ensure state is fully cleared before next action
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};

  const searchUsers = async (searchTerm) => {
    try {
      const response = await authAPI.searchUsers(searchTerm);
      if (response.data.success) {
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: response.data.data });
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const initializeChat = async (otherUserId) => {
    try {
      const response = await chatAPI.initializeRoom(otherUserId);
      if (response.data.success) {
        dispatch({ type: 'ADD_ROOM', payload: response.data.data });
        dispatch({ type: 'SET_CURRENT_ROOM', payload: response.data.data });
        await loadUserRooms();
        return response.data.data;
      }
    } catch (error) {
      console.error('Failed to initialize chat:', error);
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    searchUsers,
    initializeChat,
    loadUserRooms,
    dispatch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

