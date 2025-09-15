import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: 'google' | 'github' | 'discord' | 'email';
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (provider: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing user session in localStorage
        const savedUser = localStorage.getItem('typeon-user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('typeon-user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (provider: string): Promise<void> => {
        setIsLoading(true);

        // Simulate OAuth login process
        // In a real app, this would redirect to the OAuth provider
        try {
            // Mock user data based on provider
            const mockUsers = {
                google: {
                    id: 'google_123',
                    name: 'John Doe',
                    email: 'john.doe@gmail.com',
                    avatar: 'https://ui-avatars.com/api/?name=John+Doe',
                    provider: 'google' as const,
                },
                github: {
                    id: 'github_123',
                    name: 'Jane Smith',
                    email: 'jane.smith@github.com',
                    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
                    provider: 'github' as const,
                },
                discord: {
                    id: 'discord_123',
                    name: 'Gaming Pro',
                    email: 'gamer@discord.com',
                    avatar: 'https://ui-avatars.com/api/?name=Gaming+Pro',
                    provider: 'discord' as const,
                },
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser = mockUsers[provider as keyof typeof mockUsers];
            if (mockUser) {
                setUser(mockUser);
                localStorage.setItem('typeon-user', JSON.stringify(mockUser));
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('typeon-user');
    };

    const value: AuthContextType = {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
