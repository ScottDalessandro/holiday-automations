import { defineCollection, z } from 'astro:content';

const workflowNodeSchema = z.object({
  icon: z.string(),
  label: z.string(),
  color: z.enum(['emerald', 'rose', 'slate', 'amber', 'sky', 'violet']).default('slate'),
});

const stepSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const codeBlockSchema = z.object({
  label: z.string(),
  code: z.string(),
});

const conceptSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const resourceSchema = z.object({
  icon: z.string(),
  label: z.string(),
  url: z.string(),
});

const bonusSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const lessonLinkSchema = z.object({
  title: z.string(),
  slug: z.string(),
});

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().default('⏰'),
    tutorialNumber: z.number().default(1),
    videoId: z.string().optional(),
    videoUrl: z.string().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    skills: z.array(z.string()).optional(),
    order: z.number().optional(),
    workflowDescription: z.string().optional(),
    workflowNodes: z.array(workflowNodeSchema).optional(),
    steps: z.array(stepSchema).optional(),
    codeBlocks: z.array(codeBlockSchema).optional(),
    concepts: z.array(conceptSchema).optional(),
    resources: z.array(resourceSchema).optional(),
    bonusIdeas: z.array(bonusSchema).optional(),
    nextLesson: lessonLinkSchema.optional(),
    prevLesson: lessonLinkSchema.optional(),
    workflowJson: z.string().optional(),
    workflowFile: z.string().optional(),
    // Card display fields
    shareWith: z.string().optional(),
    businessSkill: z.string().optional(),
  }),
});

export const collections = { lessons };
