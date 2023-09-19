// PageContent type definition
interface PageBuilder {
    textWithImage: {
        _key: string;
        _type: string;
        image: {
            asset: {
                _ref: string;
                _type: string;
            }
        }
        text: string;
    }
}

export interface PageContent {
    heroBackgroundVideo: {
        webmPath: string;
        mp4Path: string;
        thumbnail: string;
    }
    heroImage: string;

    pageBuilder: PageBuilder[];
}