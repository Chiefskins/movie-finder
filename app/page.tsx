"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

type MovieType = {
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
};

export default function Home() {
  const [movies, setMovies] = useState<{
    page: number;
    results: [MovieType];
  }>();

  const [loading, setLoading] = useState<boolean>(false);

  async function FindMovie() {
    setLoading(true);

    toast.promise(
      axios
        .request({
          method: "GET",
          url: "https://api.themoviedb.org/3/movie/popular",
          params: { page: String(Math.random() * 100), language: "english" },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGRjNjY0ZjE2NTY3ZDA5YzI0MDk2NmQxNDJiZTk0OCIsInN1YiI6IjY0YTM4YmYxZThkMDI4MDBhYzA2ZmZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33W92aAhdDZ415mfhJUTxj6gHb2_tzqM1WxJE6oWGY",
          },
        })
        .then(function (response) {
          console.log(response.data);
          setMovies(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        }),
      {
        loading: "Searching...",
        success: <b>Movie found. Enjoy!</b>,
        error: <b>Something went wrong!</b>,
      }
    );
  }

  return (
    <div className='w-full h-screen overflow-y-hidden'>
      <div className='container h-full py-32 mx-auto'>
        <header className='text-center pb-8'>
          <h1 className='text-4xl font-bold'>Movie Finder</h1>
          <p className='text-neutral-600'>
            For when you can&apos;t figure out what to watch
          </p>
        </header>

        {/* Main Content */}

        <div
          className={
            movies
              ? `w-full grid place-items-center transition-all space-y-4 pb-4`
              : `h-full py-16 flex items-center flex-col gap-4 transition-all`
          }>
          <Button size={"lg"} onClick={() => FindMovie()} variant={"outline"}>
            Click Me!!
          </Button>
          <Loader2
            className={loading ? "block animate-spin opacity-100" : "opacity-0"}
          />
        </div>

        {movies && (
          <Card className='w-[550px] mx-auto flex-wrap'>
            <CardHeader>
              <Image
                src={
                  "https://image.tmdb.org/t/p/w500" +
                  movies?.results[0].backdrop_path
                }
                className='w-[500px]'
                alt={movies.results[0].original_title}
                width={500}
                height={300}
              />
            </CardHeader>
            <CardContent className='space-y-2'>
              <CardTitle className='flex items-center justify-between'>
                <span>
                  {movies?.results[0].original_title} -{" "}
                  {movies?.results[0].release_date.slice(0, 4)}
                </span>
                <span>{(movies?.results[0].vote_average).toFixed(1)} / 10</span>
              </CardTitle>
              <CardDescription>{movies?.results[0].overview}</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
