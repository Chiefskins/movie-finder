import { MovieType } from "@/app/page";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <Dialog>
      <DialogTrigger className='w-full space-y-4'>
        <div className='relative w-full grid place-items-center group'>
          <Image
            src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            className='max-w-prose w-full rounded flex-1 shadow-xl border'
            alt={movie.original_title}
            height={500}
            width={1500}
          />
          <div className='bg-gradient-to-t from-black/70 to-transparent w-full max-w-prose transition-all absolute bottom-0 py-8'>
            <h1 className='text-5xl font-bold'>{movie.original_title}</h1>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{movie.original_title}</DialogTitle>
          <div>
            {" "}
            <Image
              src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
              className='max-w-prose w-full rounded flex-1 shadow-xl border'
              alt={movie.original_title}
              height={500}
              width={1500}
            />
          </div>
        </DialogHeader>
        <div>
          <DialogDescription>{movie.overview}</DialogDescription>
          <span className='flex gap-0.5'>
            {[...Array(Math.floor(movie.vote_average / 2))].map((index) => (
              <div key={index}>
                <StarFilledIcon />
              </div>
            ))}

            {[...Array(5 - Math.floor(movie.vote_average / 2))].map((index) => (
              <div key={index}>
                <StarIcon />
              </div>
            ))}
          </span>
          <span>{(movie.vote_average / 2).toFixed(1)} /5</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
