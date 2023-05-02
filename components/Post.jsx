import { useAuth } from "@/contexts/Auth";
import Avatar from "./Avatar";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";

useAuth;

const Post = ({mySubreddit}) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const notification = toast.loading("Creating a new post");
    try {
     
      const { data: subreddit, error } = await supabase
        .from("subreddit")
        .select("*")
        .eq("topic",mySubreddit|| data.subreddit);
      console.log(subreddit,mySubreddit);

      const subredditExist = subreddit.length > 0;
      if (!subredditExist) {
        const { data: newSubreddit, error: newSubredditError } = await supabase
          .from("subreddit")
          .insert({ topic:mySubreddit|| data.subreddit });

        if (newSubredditError) {
          console.log("Error creating subreddit:", newSubredditError.message);
        } else {
          console.log("subreddit created:", newSubreddit);
          const image = data.postImage || "";
          const { data: createdSubreddit, createdError } = await supabase
            .from("subreddit")
            .select("*")
            .eq("topic",mySubreddit || data.subreddit);
          console.log(createdSubreddit);
          const { data: post, error: postError } = await supabase
            .from("post")
            .insert({
              title: data.postTitle,
              body: data.postBody,
              image: image,
              subreddit_id: createdSubreddit[0].id,
              username: user.name,
            });
          if (postError) {
            console.log("Error creating post:", postError.message);
          } else {
            console.log("Post created with new subreddit: ", post);
          }
        }
      } else {
        const image = data.postImage || "";
        const { data: post, error: postError } = await supabase
          .from("post")
          .insert({
            title: data.postTitle,
            body: data.postBody,
            image: image,
            subreddit_id: subreddit[0].id,
            username: user.name,
          });
        if (postError) {
          console.log("Error creating post:", postError.message);
        } else {
          console.log("Post created:with existing subreddit", post);
        }
      }

      setValue("postTitle", "");
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("subreddit", "");
      toast.success("A New post created", { id: notification });
      if (error) {
        console.log("Error fetching posts:", error.message);
      }
    } catch (err) {
      toast.error("Something went wrong", { id: notification });
    }
  });
  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-20 z-50 bg-white p-2 border border-x-gray-300 rounded-md"
    >
      <div className="flex items-center gap-3 w-full">
        <Avatar />
        <input
          {...register("postTitle", { required: "A Post Title is required" })}
          type="text"
          placeholder={
            user? 
            mySubreddit ?`write a post about r/${mySubreddit}`  : "Create a post buy entering a title"
              : "Sign in to create a post"
          }
          disabled={!user}
          className="flex-1  outline-none rounded-md bg-gray-50 p-2 px-4"
        />
        <PhotoIcon
          onClick={() => {
            !!watch("postTitle") ? setImage((val) => !val) : setImage(false);
          }}
          className={`h-6 cursor-pointer text-gray-400 ${
            image && "text-blue-200"
          }`}
        />
        <LinkIcon className="icon" />
      </div>

      {watch("postTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center m-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              type="text"
              className="bg-blue-50 flex-1 outline-none py-2 px-2"
              {...register("postBody")}
              placeholder="Text (Optional)"
            />
          </div>
        {  !mySubreddit&&<div className="flex items-center m-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              type="text"
              className="bg-blue-50 flex-1 outline-none py-2 px-2"
              {...register("subreddit", {
                required: "A Subreddit is required",
              })}
              placeholder="i.e. Nextjs"
            />
          </div>}
          {image && (
            <div className="flex items-center m-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                className="bg-blue-50 flex-1 outline-none py-2 px-2"
                {...register("postImage")}
                placeholder="Optional"
              />
            </div>
          )}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle && <p>{errors.postTitle.message}</p>}
              {errors.subreddit && <p>{errors.subreddit.message}</p>}
            </div>
          )}
          <button className="text-white bg-blue-400 rounded-full py-2">
            Create Post
          </button>
        </div>
      )}
    </form>
  );
};

export default Post;
