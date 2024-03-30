"use client"

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react"
import { useFormState } from "react-dom"
import FormButton from "../common/FormButton"
import * as actions from '@/action'
interface CreatePostProps {
    slug: string
}


export default function PostCreateForm({slug}: CreatePostProps) {
    const [formState, action] = useFormState(actions.CreatePost.bind(null, slug), {error: {}})

  return (
    <Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">Create a Post</Button>
        </PopoverTrigger>
        <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h1 className="text-xl">Create a topic</h1>
            <Input
              name="title"
              placeholder="Title"
              label="Title"
              labelPlacement="outside"
              isInvalid={!!formState.error.title}
              errorMessage={formState.error.title?.join(", ")}
            />
            <Textarea
              name="content"
              placeholder="Content"
              label="Content"
              labelPlacement="outside"
              isInvalid={!!formState.error.content}
              errorMessage={formState.error.content?.join(", ")}
            />
            {formState.error._form ? <div className="rounded p-2 bg-red-200 border border-red-400">{formState.error._form}</div> : null}
            <FormButton>Submit</FormButton>
          </div>
        </form>
        </PopoverContent>
    </Popover>
  )
}
