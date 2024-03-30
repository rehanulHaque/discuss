"use server";

import { auth } from "@/auth/auth";
import { z } from "zod";
import type { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/auth/paths";
import { revalidatePath } from "next/cache";
import { title } from "process";

interface CreateTopicFormState {
    error: {
        title? : string[],
        content? : string[],
        _form?: string[]
    }
}

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});
export async function CreatePost(slug: string, formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState>{
    const result = createPostSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content")
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
    const topicId = await db.topic.findFirst({where: {slug}})

    if(!topicId){
        return {
            error: {
                _form: ['Topic not found']
            }
        }
    }

    let topic : Post
    try {
        topic = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topicId?.id
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
                    _form: ["Failed to create post"]
                }
            }
        }
    }
    revalidatePath(paths.topicShow(slug))
    redirect(paths.postShow(slug, topic.id))
}