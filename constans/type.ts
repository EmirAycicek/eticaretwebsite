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

export type Size = {
    id: number;
    attributes: {
        name:string;
    }
}

export type Color = {
    id: number;
    attributes: {
        name:string;
    }
}

export type ProductImage = {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          name: string;
          hash: string;
          ext: string;
          mime: string;
          width: number;
          height: number;
          size: number;
          url: string;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
  

  export type Product = {
    id: number;
    attributes: {
      name: string;
      description: string;
      slug: string;
      mrp: number;
      sellingPrice: number;
      isTop: boolean;
      recent: boolean;
      images: {
        data: ProductImage[];
      };
      category: {
        data: {
          id: number;
          attributes: {
            name: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        };
      };
      sizes: {
        data: {
          id: number;
          attributes: {
            name: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        }[];
      };
      colors: {
        data: {
          id: number;
          attributes: {
            name: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
          };
        }[];
      };
    };
  };
  