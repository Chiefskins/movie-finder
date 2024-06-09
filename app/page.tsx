"use client";

import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { genres } from "@/utils/genres";
import { CommandList } from "cmdk";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
export type MovieType = {
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

  const [index, setIndex] = useState<number>(30);

  const [genreId, setGenreId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const apiOptions = {
    method: "GET",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      include_adult: "false",
      include_video: "false",
      language: "en-US",
      page: String((Math.random() * (30 - 1)).toFixed(0)),
      with_genres: genreId,
      sort_by: "popularity.desc",
    },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGRjNjY0ZjE2NTY3ZDA5YzI0MDk2NmQxNDJiZTk0OCIsInN1YiI6IjY0YTM4YmYxZThkMDI4MDBhYzA2ZmZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p33W92aAhdDZ415mfhJUTxj6gHb2_tzqM1WxJE6oWGY",
    },
  };

  async function FindMovie() {
    if (index >= 19) {
      setLoading(true);
      await axios
        .request(apiOptions)
        .then(function (response) {
          console.log(response.data);
          setMovies(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.error(error);
          setLoading(false);
        });

      // setIndex(0);
    }
    // setIndex((prev) => prev + 1);
  }

  return (
    <main className='w-full h-screen overflow-y-hidden'>
      <div
        className={
          movies
            ? "container mx-auto py-16 transition-all"
            : "py-32 transition-all"
        }>
        <header className='text-center pb-8'>
          <h1 className='text-4xl font-bold'>Movie Finder</h1>
          <p className='text-primary/60'>
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className='mx-auto'>
              <Button
                variant='outline'
                role='combobox'
                aria-expanded={open}
                className='w-[200px] justify-between'>
                {value
                  ? genres.find((genre) => genre.value === value)?.label
                  : "Choose genre..."}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Choose genre...' />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandList>
                  {(genres || []).map((genre) => (
                    <CommandItem
                      key={genre.value}
                      value={genre.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                        setGenreId(genre.genreId);
                      }}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === genre.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {genre.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className='flex items-center gap-2'>
            <Button size={"lg"} onClick={() => FindMovie()} variant={"outline"}>
              Find me a movie
            </Button>
          </div>
          <Loader2
            className={loading ? "block animate-spin opacity-100" : "opacity-0"}
          />
        </div>

        {movies && <MovieCard movie={movies.results[0]} />}
      </div>
    </main>
  );
}
