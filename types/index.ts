export type User = {
    id: string;
    email: string;
    user_metadata?: {
        name?: string;
    };
};

export type Meditation = {
    id: string;
    title: string;
    duration: string;
    category: string;
    description?: string;
};

export type Reminder = {
    time: string;
    days: string[];
};