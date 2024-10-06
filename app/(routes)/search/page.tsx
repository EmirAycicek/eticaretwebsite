"use client";

import React, { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, Color, Product, Size } from "@/constans/type";
import axios from "axios";
import { Input } from "@/components/ui/input";
import HomeProductSkeleton from "../_components/Skeleton/HomeProductSkeleton";
import ProductItem from "../_components/Product/ProductItem";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [color, setColor] = useState(searchParams.get("color") || "all");
  const [size, setSize] = useState(searchParams.get("size") || "all");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [pageSize] = useState(8); // Her sayfada 8 ürün
  const [totalPages, setTotalPages] = useState(1);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    fetchColorSizesCategories();
    fetchProducts({
      search,
      category,
      color,
      size,
      page: page.toString(),
      pageSize: pageSize.toString(), // pageSize ekliyoruz
    });
  }, [searchParams, page]);

  const fetchColorSizesCategories = async () => {
    try {
      const colorResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/colors`
      );
      setColors(colorResponse.data.data);
      const sizeResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sizes`
      );
      setSizes(sizeResponse.data.data);
      const categoriesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
      );
      setCategories(categoriesResponse.data.data);
    } catch (error) {
      console.error("Color size category", error);
    }
  };

  const fetchProducts = async (
    filters = {
      search: "", // Varsayılan olarak boş bir string
      category: "all", // Varsayılan olarak 'all' kategorisi
      color: "all",
      size: "all",
      page: "1",
      pageSize: "8", // Her sayfada kaç ürün gösterileceğini belirtiyoruz
    }
  ) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (filters.search) {
        params.append("filters[name][$contains]", filters.search);
      }

      if (filters.category && filters.category !== "all") {
        params.append("filters[category][slug][$eq]", filters.category);
      }

      if (filters.color && filters.color !== "all") {
        params.append("filters[colors][name][$eq]", filters.color);
      }

      if (filters.size && filters.size !== "all") {
        params.append("filters[sizes][name][$eq]", filters.size);
      }

      // Sayfa ve sayfa boyutunu ekliyoruz
      params.append("pagination[page]", filters.page);
      params.append("pagination[pageSize]", filters.pageSize);

      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_API_URL
        }/products?populate=*&${params.toString()}`
      );
      setProducts(response.data.data);
      setTotalPages(response.data.meta.pagination.pageCount);
    } catch (error) {
      console.error("response", error);
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (key !== "page") {
      newParams.set("page", "1");
    }
    router.push(`/search?${newParams.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      updateURL("q", value);
    }, 2000);

    setDebounceTimeout(timeout);
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    updateURL("color", value);
  };

  const handleSizeChange = (value: string) => {
    setSize(value);
    updateURL("size", value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    updateURL("category", value);
  };

  const handlePageChange = (newPage: string) => {
    if (parseInt(newPage) < 1 || parseInt(newPage) > totalPages) return;

    setLoading(true);
    setPage(parseInt(newPage));
    updateURL("page", newPage);
  };

  return (
    <div className="container mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bgone borderone p-2 rounded-md">
        <Input
          className="w-full"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <Select onValueChange={handleColorChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Color</SelectItem>
            {colors.map((color) => (
              <SelectItem key={color.id} value={color.attributes.name}>
                {color.attributes.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleSizeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            {sizes.map((size) => (
              <SelectItem key={size.id} value={size.attributes.name}>
                {size.attributes.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.attributes.slug}>
                {category.attributes.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        {loading ? (
          <HomeProductSkeleton />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8 mb-8">
              {products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-8 mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      className={page === 1 ? "disabled-class" : ""}
                      onClick={() => handlePageChange((page - 1).toString())}
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={() => handlePageChange((i + 1).toString())}
                        className={i + 1 === page ? "border-blue-500" : ""}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => handlePageChange((page + 1).toString())}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
