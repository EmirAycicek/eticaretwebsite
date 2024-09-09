export type Category = {
    id: number;
    attributes: {
        name: string;
        slug: string;
        image: {
            data: {
                attributes:{
                    url:string;
                }
            }
            url: string;
        };
    }
}

export type Slider = {
    id: number;
    attributes: {
        link: string;
        media: {
            data: {
                attributes: {
                    url: string;
                }
            }
            url: string;
        };
    }
}