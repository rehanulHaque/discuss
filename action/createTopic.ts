"use server";

import { auth } from "@/auth/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/auth/paths";
import { revalidatePath } from "next/cache";

interface CreateTopicFormState {
    error: {
        name? : string[],
        description? : string[],
        _form?: string[]
    }
}

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/[a-z-]/, {message: "Must be lowercase or dashes without spaces"}),
    description: z.string().min(10), 
});

export async function CreateTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState>{
    const result = createTopicSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description")
    })
    if(!result.success){
        return {
            error: result.error.flatten().fieldErrors
        }
    }
    const session = await auth()
    if(!session || !session.user){
        return {
            error: {
                _form: ['You must be sign in.']
            }
        }
    }

    let topic : Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })
    } catch (error: unknown) {
        if(error instanceof Error){
            return {
                error: {
                    _form: [error.message]
                }
            }
        }else {
            return {
                error: {
                    _form: ["Something Went wrong"]
                }
            }
        }
    }
    revalidatePath('/')
    redirect(paths.topicShow(topic.slug))
}