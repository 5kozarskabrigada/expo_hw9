import dayjs from 'dayjs';

export const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export const isNightTime = () => {
    const hour = dayjs().hour();
    return hour >= 18 || hour < 6;
};