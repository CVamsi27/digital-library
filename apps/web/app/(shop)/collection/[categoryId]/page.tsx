"use client";
import { CollectionCard, Loading } from "ui";
import { useEffect, useState } from "react";
import { GoogleBooksVolume } from "../../../../packages/types";
import { useSource } from "../../../../packages/ui/context";

export default function Page({
  params,
}: {
  params: { categoryId: string };
}): JSX.Element {
  const [books, setBooks] = useState<GoogleBooksVolume[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedSource } = useSource();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      let url = "";
      if (selectedSource === "google") {
        const query = params.categoryId === "all" ? "" : `subject:${params.categoryId}`;
        url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || ""}`;
      } else if (selectedSource === "openlibrary") {
        const query = params.categoryId === "all" ? "" : params.categoryId;
        url = `https://openlibrary.org/search.json?q=${query}&limit=40`;
      }

      const response = await fetch(url);
      const data = await response.json();

      let formattedBooks: GoogleBooksVolume[] = [];
      if (selectedSource === "google") {
        formattedBooks = data.items || [];
      } else if (selectedSource === "openlibrary") {
        formattedBooks = data.docs.map((doc: any) => ({
          id: doc.key,
          volumeInfo: {
            title: doc.title,
            authors: doc.author_name,
            publishedDate: doc.first_publish_year?.toString(),
            imageLinks: {
              thumbnail: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : undefined,
            },
            industryIdentifiers: doc.isbn ? [{ type: "ISBN_13", identifier: doc.isbn[0] }] : [],
          },
          saleInfo: {
            buyLink: `https://openlibrary.org${doc.key}`,
          },
        }));
      }

      setBooks(formattedBooks);
      setLoading(false);
    };
    fetchBooks();
  }, [params.categoryId, selectedSource]);

  if (loading) {
    return <Loading />;
  }

  if (books.length === 0) {
    return (
      <div className="flex justify-center items-center mt-80">
        <p className="text-3xl text-gray-600">No books found</p>
      </div>
    );
  }

  return <CollectionCard books={books} />;
}
