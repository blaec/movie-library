export const drawer = {
    width: 180,
};

export const mobile = {
    windowWidth: 600,
};

export const delay = {
    search: 500,
};

export const toolbarHeight = {
    mobile: 64,
    desktop: 56,
};

export const grid = {
    g2: {
        resolution: 0,
        rows: 12,
        moviesPerRow: 2
    },
    g3: {
        resolution: 450,
        rows: 7,
        moviesPerRow: 3
    },
    g4: {
        resolution: 700,
        rows: 6,
        moviesPerRow: 4
    },
    g5: {
        resolution: 1000,
        rows: 5,
        moviesPerRow: 5
    },
    g6: {
        resolution: 1300,
        rows: 4,
        moviesPerRow: 6
    },
    g7: {
        resolution: 1700,
        rows: 3,
        moviesPerRow: 7
    },
};

export const Loader = Object.freeze(
    {
        wishMovie: 1,
        folderScan: 2
    }
);

export const MovieTab = Object.freeze(
    {
        cast: 0,
        description: 1,
        trailers: 2,
        facts: 3,
        crew: 4,
    }
);

export const ActorTab = Object.freeze(
    {
        movies: 0,
        biography: 1,
        facts: 2,
    }
);

export const Language = Object.freeze(
    {
        english: 'en',
        russian: 'ru',
    }
);

export const ReleaseType = Object.freeze(
    {
        1: 'Premiere',
        2: 'Theatrical Ltd',
        3: 'Theatrical',
        4: 'Digital',
        5: 'Physical',
        6: 'TV',
    }
);
