"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";
import * as actions from "@/action";
import { useFormState } from "react-dom";
import FormButton from "@/components/common/FormButton";



const TopicCreateForm = () => {
    const [formState, action] = useFormState(actions.CreateTopic, {error: {}})
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h1 className="text-xl">Create a topic</h1>
            <Input
              name="name"
              placeholder="Topic Title"
              label="Name"
              labelPlacement="outside"
              isInvalid={!!formState.error.name}
              errorMessage={formState.error.name?.join(", ")}
            />
            <Textarea
              name="description"
              placeholder="Topic Description"
              label="Description"
              labelPlacement="outside"
              isInvalid={!!formState.error.description}
              errorMessage={formState.error.description?.join(", ")}
            />
            {formState.error._form ? <div className="rounded p-2 bg-red-200 border border-red-400">{formState.error._form}</div> : null}
            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
