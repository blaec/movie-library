export const year = (fullDate) => {
    return fullDate.split('-')[0];
};

export const playTime = (totalMinutes) => {
    let hour = Math.floor(totalMinutes / 60);
    let minute = totalMinutes % 60;

    return hour > 0
        ? `${hour} ${hour === 1 ? 'hr' : 'hrs'} ${minute} mins`
        : `${minute} mins`;
};

export const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};
