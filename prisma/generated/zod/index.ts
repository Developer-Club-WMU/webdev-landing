import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PostScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','createdById']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','refresh_token_expires_in']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const TaskScalarFieldEnumSchema = z.enum(['id','title','description','status','priority','dueDate','createdAt','updatedAt','createdById']);

export const PipelineScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','createdById']);

export const PipelineSegmentScalarFieldEnumSchema = z.enum(['id','name','deleted','pipelineId']);

export const PipelineSegmentDataScalarFieldEnumSchema = z.enum(['id','pipelineId','segmentId','completedAt','notes','createdAt','updatedAt']);

export const LeadScalarFieldEnumSchema = z.enum(['id','title','description','capitalValue','contactName','companyName','avatarURL','addedOn','dueDate','status','leadType','pipelineStage','isArchived','source','tags','createdById','pipelineId','segmentId','createdAt','updatedAt']);

export const CommunityScalarFieldEnumSchema = z.enum(['id','name','description','createdAt','updatedAt']);

export const CommunityMembershipScalarFieldEnumSchema = z.enum(['id','userId','communityId','role','joinedAt']);

export const CommunityQuestionScalarFieldEnumSchema = z.enum(['id','communityId','createdById','label','type','options','required','order']);

export const UserAnswerScalarFieldEnumSchema = z.enum(['id','userId','questionId','communityId','value','answeredAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const TaskStatusSchema = z.enum(['TODO','IN_PROGRESS','DONE','BLOCKED']);

export type TaskStatusType = `${z.infer<typeof TaskStatusSchema>}`

export const TaskPrioritySchema = z.enum(['LOW','MEDIUM','HIGH','URGENT']);

export type TaskPriorityType = `${z.infer<typeof TaskPrioritySchema>}`

export const QuestionTypeSchema = z.enum(['TEXT','TEXTAREA','SELECT','MULTISELECT','NUMBER','DATE','BOOLEAN']);

export type QuestionTypeType = `${z.infer<typeof QuestionTypeSchema>}`

export const MembershipRoleSchema = z.enum(['MEMBER','OFFICER','MENTOR','CLIENT']);

export type MembershipRoleType = `${z.infer<typeof MembershipRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  refresh_token_expires_in: z.number().int().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// TASK SCHEMA
/////////////////////////////////////////

export const TaskSchema = z.object({
  status: TaskStatusSchema,
  priority: TaskPrioritySchema,
  id: z.number().int(),
  title: z.string(),
  description: z.string().nullable(),
  dueDate: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Task = z.infer<typeof TaskSchema>

/////////////////////////////////////////
// PIPELINE SCHEMA
/////////////////////////////////////////

export const PipelineSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Pipeline = z.infer<typeof PipelineSchema>

/////////////////////////////////////////
// PIPELINE SEGMENT SCHEMA
/////////////////////////////////////////

export const PipelineSegmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  deleted: z.boolean(),
  pipelineId: z.string(),
})

export type PipelineSegment = z.infer<typeof PipelineSegmentSchema>

/////////////////////////////////////////
// PIPELINE SEGMENT DATA SCHEMA
/////////////////////////////////////////

export const PipelineSegmentDataSchema = z.object({
  id: z.number().int(),
  pipelineId: z.string(),
  segmentId: z.number().int(),
  completedAt: z.coerce.date().nullable(),
  notes: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type PipelineSegmentData = z.infer<typeof PipelineSegmentDataSchema>

/////////////////////////////////////////
// LEAD SCHEMA
/////////////////////////////////////////

export const LeadSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
  description: z.string().nullable(),
  capitalValue: z.number().int().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().nullable(),
  addedOn: z.coerce.date(),
  dueDate: z.coerce.date().nullable(),
  status: z.string(),
  leadType: z.string(),
  pipelineStage: z.string().nullable(),
  isArchived: z.boolean(),
  source: z.string().nullable(),
  tags: z.string().array(),
  createdById: z.string(),
  pipelineId: z.string().nullable(),
  segmentId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Lead = z.infer<typeof LeadSchema>

/////////////////////////////////////////
// COMMUNITY SCHEMA
/////////////////////////////////////////

export const CommunitySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Community = z.infer<typeof CommunitySchema>

/////////////////////////////////////////
// COMMUNITY MEMBERSHIP SCHEMA
/////////////////////////////////////////

export const CommunityMembershipSchema = z.object({
  role: MembershipRoleSchema,
  id: z.string().cuid(),
  userId: z.string(),
  communityId: z.string(),
  joinedAt: z.coerce.date(),
})

export type CommunityMembership = z.infer<typeof CommunityMembershipSchema>

/////////////////////////////////////////
// COMMUNITY QUESTION SCHEMA
/////////////////////////////////////////

export const CommunityQuestionSchema = z.object({
  type: QuestionTypeSchema,
  id: z.string().cuid(),
  communityId: z.string(),
  createdById: z.string(),
  label: z.string(),
  options: z.string().array(),
  required: z.boolean(),
  order: z.number().int(),
})

export type CommunityQuestion = z.infer<typeof CommunityQuestionSchema>

/////////////////////////////////////////
// USER ANSWER SCHEMA
/////////////////////////////////////////

export const UserAnswerSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  questionId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date(),
})

export type UserAnswer = z.infer<typeof UserAnswerSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z.object({
  select: z.lazy(() => PostSelectSchema).optional(),
  include: z.lazy(() => PostIncludeSchema).optional(),
}).strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  refresh_token_expires_in: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  memberships: z.union([z.boolean(),z.lazy(() => CommunityMembershipFindManyArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  questionsCreated: z.union([z.boolean(),z.lazy(() => CommunityQuestionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  Pipeline: z.union([z.boolean(),z.lazy(() => PipelineFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  memberships: z.boolean().optional(),
  answers: z.boolean().optional(),
  questionsCreated: z.boolean().optional(),
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  posts: z.boolean().optional(),
  tasks: z.boolean().optional(),
  Pipeline: z.boolean().optional(),
  Lead: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  memberships: z.union([z.boolean(),z.lazy(() => CommunityMembershipFindManyArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  questionsCreated: z.union([z.boolean(),z.lazy(() => CommunityQuestionFindManyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  posts: z.union([z.boolean(),z.lazy(() => PostFindManyArgsSchema)]).optional(),
  tasks: z.union([z.boolean(),z.lazy(() => TaskFindManyArgsSchema)]).optional(),
  Pipeline: z.union([z.boolean(),z.lazy(() => PipelineFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// TASK
//------------------------------------------------------

export const TaskIncludeSchema: z.ZodType<Prisma.TaskInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TaskArgsSchema: z.ZodType<Prisma.TaskDefaultArgs> = z.object({
  select: z.lazy(() => TaskSelectSchema).optional(),
  include: z.lazy(() => TaskIncludeSchema).optional(),
}).strict();

export const TaskSelectSchema: z.ZodType<Prisma.TaskSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  status: z.boolean().optional(),
  priority: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PIPELINE
//------------------------------------------------------

export const PipelineIncludeSchema: z.ZodType<Prisma.PipelineInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  segmentData: z.union([z.boolean(),z.lazy(() => PipelineSegmentDataFindManyArgsSchema)]).optional(),
  segments: z.union([z.boolean(),z.lazy(() => PipelineSegmentFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PipelineCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PipelineArgsSchema: z.ZodType<Prisma.PipelineDefaultArgs> = z.object({
  select: z.lazy(() => PipelineSelectSchema).optional(),
  include: z.lazy(() => PipelineIncludeSchema).optional(),
}).strict();

export const PipelineCountOutputTypeArgsSchema: z.ZodType<Prisma.PipelineCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PipelineCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PipelineCountOutputTypeSelectSchema: z.ZodType<Prisma.PipelineCountOutputTypeSelect> = z.object({
  segmentData: z.boolean().optional(),
  segments: z.boolean().optional(),
  Lead: z.boolean().optional(),
}).strict();

export const PipelineSelectSchema: z.ZodType<Prisma.PipelineSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdById: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  segmentData: z.union([z.boolean(),z.lazy(() => PipelineSegmentDataFindManyArgsSchema)]).optional(),
  segments: z.union([z.boolean(),z.lazy(() => PipelineSegmentFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PipelineCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PIPELINE SEGMENT
//------------------------------------------------------

export const PipelineSegmentIncludeSchema: z.ZodType<Prisma.PipelineSegmentInclude> = z.object({
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segmentData: z.union([z.boolean(),z.lazy(() => PipelineSegmentDataFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PipelineSegmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PipelineSegmentArgsSchema: z.ZodType<Prisma.PipelineSegmentDefaultArgs> = z.object({
  select: z.lazy(() => PipelineSegmentSelectSchema).optional(),
  include: z.lazy(() => PipelineSegmentIncludeSchema).optional(),
}).strict();

export const PipelineSegmentCountOutputTypeArgsSchema: z.ZodType<Prisma.PipelineSegmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PipelineSegmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PipelineSegmentCountOutputTypeSelectSchema: z.ZodType<Prisma.PipelineSegmentCountOutputTypeSelect> = z.object({
  segmentData: z.boolean().optional(),
  Lead: z.boolean().optional(),
}).strict();

export const PipelineSegmentSelectSchema: z.ZodType<Prisma.PipelineSegmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  deleted: z.boolean().optional(),
  pipelineId: z.boolean().optional(),
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segmentData: z.union([z.boolean(),z.lazy(() => PipelineSegmentDataFindManyArgsSchema)]).optional(),
  Lead: z.union([z.boolean(),z.lazy(() => LeadFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PipelineSegmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PIPELINE SEGMENT DATA
//------------------------------------------------------

export const PipelineSegmentDataIncludeSchema: z.ZodType<Prisma.PipelineSegmentDataInclude> = z.object({
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segment: z.union([z.boolean(),z.lazy(() => PipelineSegmentArgsSchema)]).optional(),
}).strict()

export const PipelineSegmentDataArgsSchema: z.ZodType<Prisma.PipelineSegmentDataDefaultArgs> = z.object({
  select: z.lazy(() => PipelineSegmentDataSelectSchema).optional(),
  include: z.lazy(() => PipelineSegmentDataIncludeSchema).optional(),
}).strict();

export const PipelineSegmentDataSelectSchema: z.ZodType<Prisma.PipelineSegmentDataSelect> = z.object({
  id: z.boolean().optional(),
  pipelineId: z.boolean().optional(),
  segmentId: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segment: z.union([z.boolean(),z.lazy(() => PipelineSegmentArgsSchema)]).optional(),
}).strict()

// LEAD
//------------------------------------------------------

export const LeadIncludeSchema: z.ZodType<Prisma.LeadInclude> = z.object({
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segment: z.union([z.boolean(),z.lazy(() => PipelineSegmentArgsSchema)]).optional(),
}).strict()

export const LeadArgsSchema: z.ZodType<Prisma.LeadDefaultArgs> = z.object({
  select: z.lazy(() => LeadSelectSchema).optional(),
  include: z.lazy(() => LeadIncludeSchema).optional(),
}).strict();

export const LeadSelectSchema: z.ZodType<Prisma.LeadSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  capitalValue: z.boolean().optional(),
  contactName: z.boolean().optional(),
  companyName: z.boolean().optional(),
  avatarURL: z.boolean().optional(),
  addedOn: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  status: z.boolean().optional(),
  leadType: z.boolean().optional(),
  pipelineStage: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  source: z.boolean().optional(),
  tags: z.boolean().optional(),
  createdById: z.boolean().optional(),
  pipelineId: z.boolean().optional(),
  segmentId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  pipeline: z.union([z.boolean(),z.lazy(() => PipelineArgsSchema)]).optional(),
  segment: z.union([z.boolean(),z.lazy(() => PipelineSegmentArgsSchema)]).optional(),
}).strict()

// COMMUNITY
//------------------------------------------------------

export const CommunityIncludeSchema: z.ZodType<Prisma.CommunityInclude> = z.object({
  questions: z.union([z.boolean(),z.lazy(() => CommunityQuestionFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => CommunityMembershipFindManyArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommunityArgsSchema: z.ZodType<Prisma.CommunityDefaultArgs> = z.object({
  select: z.lazy(() => CommunitySelectSchema).optional(),
  include: z.lazy(() => CommunityIncludeSchema).optional(),
}).strict();

export const CommunityCountOutputTypeArgsSchema: z.ZodType<Prisma.CommunityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommunityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommunityCountOutputTypeSelectSchema: z.ZodType<Prisma.CommunityCountOutputTypeSelect> = z.object({
  questions: z.boolean().optional(),
  members: z.boolean().optional(),
  answers: z.boolean().optional(),
}).strict();

export const CommunitySelectSchema: z.ZodType<Prisma.CommunitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  questions: z.union([z.boolean(),z.lazy(() => CommunityQuestionFindManyArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => CommunityMembershipFindManyArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// COMMUNITY MEMBERSHIP
//------------------------------------------------------

export const CommunityMembershipIncludeSchema: z.ZodType<Prisma.CommunityMembershipInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
}).strict()

export const CommunityMembershipArgsSchema: z.ZodType<Prisma.CommunityMembershipDefaultArgs> = z.object({
  select: z.lazy(() => CommunityMembershipSelectSchema).optional(),
  include: z.lazy(() => CommunityMembershipIncludeSchema).optional(),
}).strict();

export const CommunityMembershipSelectSchema: z.ZodType<Prisma.CommunityMembershipSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  communityId: z.boolean().optional(),
  role: z.boolean().optional(),
  joinedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
}).strict()

// COMMUNITY QUESTION
//------------------------------------------------------

export const CommunityQuestionIncludeSchema: z.ZodType<Prisma.CommunityQuestionInclude> = z.object({
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CommunityQuestionArgsSchema: z.ZodType<Prisma.CommunityQuestionDefaultArgs> = z.object({
  select: z.lazy(() => CommunityQuestionSelectSchema).optional(),
  include: z.lazy(() => CommunityQuestionIncludeSchema).optional(),
}).strict();

export const CommunityQuestionCountOutputTypeArgsSchema: z.ZodType<Prisma.CommunityQuestionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CommunityQuestionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CommunityQuestionCountOutputTypeSelectSchema: z.ZodType<Prisma.CommunityQuestionCountOutputTypeSelect> = z.object({
  answers: z.boolean().optional(),
}).strict();

export const CommunityQuestionSelectSchema: z.ZodType<Prisma.CommunityQuestionSelect> = z.object({
  id: z.boolean().optional(),
  communityId: z.boolean().optional(),
  createdById: z.boolean().optional(),
  label: z.boolean().optional(),
  type: z.boolean().optional(),
  options: z.boolean().optional(),
  required: z.boolean().optional(),
  order: z.boolean().optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
  createdBy: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  answers: z.union([z.boolean(),z.lazy(() => UserAnswerFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CommunityQuestionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER ANSWER
//------------------------------------------------------

export const UserAnswerIncludeSchema: z.ZodType<Prisma.UserAnswerInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  question: z.union([z.boolean(),z.lazy(() => CommunityQuestionArgsSchema)]).optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
}).strict()

export const UserAnswerArgsSchema: z.ZodType<Prisma.UserAnswerDefaultArgs> = z.object({
  select: z.lazy(() => UserAnswerSelectSchema).optional(),
  include: z.lazy(() => UserAnswerIncludeSchema).optional(),
}).strict();

export const UserAnswerSelectSchema: z.ZodType<Prisma.UserAnswerSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  questionId: z.boolean().optional(),
  communityId: z.boolean().optional(),
  value: z.boolean().optional(),
  answeredAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  question: z.union([z.boolean(),z.lazy(() => CommunityQuestionArgsSchema)]).optional(),
  community: z.union([z.boolean(),z.lazy(() => CommunityArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PostAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PostSumOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refresh_token_expires_in: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  refresh_token_expires_in: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipListRelationFilterSchema).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  Pipeline: z.lazy(() => PipelineListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  memberships: z.lazy(() => CommunityMembershipOrderByRelationAggregateInputSchema).optional(),
  answers: z.lazy(() => UserAnswerOrderByRelationAggregateInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
  tasks: z.lazy(() => TaskOrderByRelationAggregateInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineOrderByRelationAggregateInputSchema).optional(),
  Lead: z.lazy(() => LeadOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipListRelationFilterSchema).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  posts: z.lazy(() => PostListRelationFilterSchema).optional(),
  tasks: z.lazy(() => TaskListRelationFilterSchema).optional(),
  Pipeline: z.lazy(() => PipelineListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const TaskWhereInputSchema: z.ZodType<Prisma.TaskWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumTaskPriorityFilterSchema),z.lazy(() => TaskPrioritySchema) ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TaskOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TaskWhereUniqueInputSchema: z.ZodType<Prisma.TaskWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskWhereInputSchema),z.lazy(() => TaskWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumTaskPriorityFilterSchema),z.lazy(() => TaskPrioritySchema) ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TaskOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskSumOrderByAggregateInputSchema).optional()
}).strict();

export const TaskScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusWithAggregatesFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumTaskPriorityWithAggregatesFilterSchema),z.lazy(() => TaskPrioritySchema) ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PipelineWhereInputSchema: z.ZodType<Prisma.PipelineWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineWhereInputSchema),z.lazy(() => PipelineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineWhereInputSchema),z.lazy(() => PipelineWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataListRelationFilterSchema).optional(),
  segments: z.lazy(() => PipelineSegmentListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict();

export const PipelineOrderByWithRelationInputSchema: z.ZodType<Prisma.PipelineOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataOrderByRelationAggregateInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentOrderByRelationAggregateInputSchema).optional(),
  Lead: z.lazy(() => LeadOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PipelineWhereUniqueInputSchema: z.ZodType<Prisma.PipelineWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PipelineWhereInputSchema),z.lazy(() => PipelineWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineWhereInputSchema),z.lazy(() => PipelineWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataListRelationFilterSchema).optional(),
  segments: z.lazy(() => PipelineSegmentListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict());

export const PipelineOrderByWithAggregationInputSchema: z.ZodType<Prisma.PipelineOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PipelineCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PipelineMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PipelineMinOrderByAggregateInputSchema).optional()
}).strict();

export const PipelineScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PipelineScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PipelineSegmentWhereInputSchema: z.ZodType<Prisma.PipelineSegmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentWhereInputSchema),z.lazy(() => PipelineSegmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentWhereInputSchema),z.lazy(() => PipelineSegmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict();

export const PipelineSegmentOrderByWithRelationInputSchema: z.ZodType<Prisma.PipelineSegmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  pipeline: z.lazy(() => PipelineOrderByWithRelationInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataOrderByRelationAggregateInputSchema).optional(),
  Lead: z.lazy(() => LeadOrderByRelationAggregateInputSchema).optional()
}).strict();

export const PipelineSegmentWhereUniqueInputSchema: z.ZodType<Prisma.PipelineSegmentWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    pipelineId_name: z.lazy(() => PipelineSegmentPipelineIdNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    pipelineId_name: z.lazy(() => PipelineSegmentPipelineIdNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  pipelineId_name: z.lazy(() => PipelineSegmentPipelineIdNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PipelineSegmentWhereInputSchema),z.lazy(() => PipelineSegmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentWhereInputSchema),z.lazy(() => PipelineSegmentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataListRelationFilterSchema).optional(),
  Lead: z.lazy(() => LeadListRelationFilterSchema).optional()
}).strict());

export const PipelineSegmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.PipelineSegmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PipelineSegmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PipelineSegmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PipelineSegmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PipelineSegmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PipelineSegmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const PipelineSegmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PipelineSegmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineSegmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineSegmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PipelineSegmentDataWhereInputSchema: z.ZodType<Prisma.PipelineSegmentDataWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentDataWhereInputSchema),z.lazy(() => PipelineSegmentDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentDataWhereInputSchema),z.lazy(() => PipelineSegmentDataWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  segmentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  segment: z.union([ z.lazy(() => PipelineSegmentScalarRelationFilterSchema),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataOrderByWithRelationInputSchema: z.ZodType<Prisma.PipelineSegmentDataOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  pipeline: z.lazy(() => PipelineOrderByWithRelationInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentOrderByWithRelationInputSchema).optional()
}).strict();

export const PipelineSegmentDataWhereUniqueInputSchema: z.ZodType<Prisma.PipelineSegmentDataWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    pipelineId_segmentId: z.lazy(() => PipelineSegmentDataPipelineIdSegmentIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    pipelineId_segmentId: z.lazy(() => PipelineSegmentDataPipelineIdSegmentIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  pipelineId_segmentId: z.lazy(() => PipelineSegmentDataPipelineIdSegmentIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => PipelineSegmentDataWhereInputSchema),z.lazy(() => PipelineSegmentDataWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentDataWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentDataWhereInputSchema),z.lazy(() => PipelineSegmentDataWhereInputSchema).array() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  segmentId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  segment: z.union([ z.lazy(() => PipelineSegmentScalarRelationFilterSchema),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional(),
}).strict());

export const PipelineSegmentDataOrderByWithAggregationInputSchema: z.ZodType<Prisma.PipelineSegmentDataOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  notes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PipelineSegmentDataCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PipelineSegmentDataAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PipelineSegmentDataMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PipelineSegmentDataMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PipelineSegmentDataSumOrderByAggregateInputSchema).optional()
}).strict();

export const PipelineSegmentDataScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PipelineSegmentDataScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentDataScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereWithAggregatesInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  segmentId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const LeadWhereInputSchema: z.ZodType<Prisma.LeadWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LeadWhereInputSchema),z.lazy(() => LeadWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LeadWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LeadWhereInputSchema),z.lazy(() => LeadWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capitalValue: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  contactName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  leadType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineStage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isArchived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  segmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineNullableScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional().nullable(),
  segment: z.union([ z.lazy(() => PipelineSegmentNullableScalarRelationFilterSchema),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional().nullable(),
}).strict();

export const LeadOrderByWithRelationInputSchema: z.ZodType<Prisma.LeadOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  capitalValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactName: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  avatarURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addedOn: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  leadType: z.lazy(() => SortOrderSchema).optional(),
  pipelineStage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isArchived: z.lazy(() => SortOrderSchema).optional(),
  source: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  segmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  pipeline: z.lazy(() => PipelineOrderByWithRelationInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentOrderByWithRelationInputSchema).optional()
}).strict();

export const LeadWhereUniqueInputSchema: z.ZodType<Prisma.LeadWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => LeadWhereInputSchema),z.lazy(() => LeadWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LeadWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LeadWhereInputSchema),z.lazy(() => LeadWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capitalValue: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  contactName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  leadType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineStage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isArchived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  segmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  pipeline: z.union([ z.lazy(() => PipelineNullableScalarRelationFilterSchema),z.lazy(() => PipelineWhereInputSchema) ]).optional().nullable(),
  segment: z.union([ z.lazy(() => PipelineSegmentNullableScalarRelationFilterSchema),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional().nullable(),
}).strict());

export const LeadOrderByWithAggregationInputSchema: z.ZodType<Prisma.LeadOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  capitalValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  contactName: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  avatarURL: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  addedOn: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  leadType: z.lazy(() => SortOrderSchema).optional(),
  pipelineStage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isArchived: z.lazy(() => SortOrderSchema).optional(),
  source: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  segmentId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LeadCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LeadAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LeadMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LeadMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LeadSumOrderByAggregateInputSchema).optional()
}).strict();

export const LeadScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LeadScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LeadScalarWhereWithAggregatesInputSchema),z.lazy(() => LeadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LeadScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LeadScalarWhereWithAggregatesInputSchema),z.lazy(() => LeadScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  capitalValue: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  contactName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatarURL: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  addedOn: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  leadType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pipelineStage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isArchived: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  source: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  segmentId: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommunityWhereInputSchema: z.ZodType<Prisma.CommunityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  questions: z.lazy(() => CommunityQuestionListRelationFilterSchema).optional(),
  members: z.lazy(() => CommunityMembershipListRelationFilterSchema).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional()
}).strict();

export const CommunityOrderByWithRelationInputSchema: z.ZodType<Prisma.CommunityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  questions: z.lazy(() => CommunityQuestionOrderByRelationAggregateInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipOrderByRelationAggregateInputSchema).optional(),
  answers: z.lazy(() => UserAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommunityWhereUniqueInputSchema: z.ZodType<Prisma.CommunityWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityWhereInputSchema),z.lazy(() => CommunityWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  questions: z.lazy(() => CommunityQuestionListRelationFilterSchema).optional(),
  members: z.lazy(() => CommunityMembershipListRelationFilterSchema).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional()
}).strict());

export const CommunityOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommunityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommunityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommunityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommunityMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommunityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommunityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommunityMembershipWhereInputSchema: z.ZodType<Prisma.CommunityMembershipWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityMembershipWhereInputSchema),z.lazy(() => CommunityMembershipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityMembershipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityMembershipWhereInputSchema),z.lazy(() => CommunityMembershipWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipOrderByWithRelationInputSchema: z.ZodType<Prisma.CommunityMembershipOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  community: z.lazy(() => CommunityOrderByWithRelationInputSchema).optional()
}).strict();

export const CommunityMembershipWhereUniqueInputSchema: z.ZodType<Prisma.CommunityMembershipWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_communityId: z.lazy(() => CommunityMembershipUserIdCommunityIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_communityId: z.lazy(() => CommunityMembershipUserIdCommunityIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_communityId: z.lazy(() => CommunityMembershipUserIdCommunityIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CommunityMembershipWhereInputSchema),z.lazy(() => CommunityMembershipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityMembershipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityMembershipWhereInputSchema),z.lazy(() => CommunityMembershipWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
}).strict());

export const CommunityMembershipOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommunityMembershipOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommunityMembershipCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommunityMembershipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommunityMembershipMinOrderByAggregateInputSchema).optional()
}).strict();

export const CommunityMembershipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommunityMembershipScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityMembershipScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityMembershipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityMembershipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityMembershipScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityMembershipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleWithAggregatesFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommunityQuestionWhereInputSchema: z.ZodType<Prisma.CommunityQuestionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityQuestionWhereInputSchema),z.lazy(() => CommunityQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityQuestionWhereInputSchema),z.lazy(() => CommunityQuestionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  options: z.lazy(() => StringNullableListFilterSchema).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional()
}).strict();

export const CommunityQuestionOrderByWithRelationInputSchema: z.ZodType<Prisma.CommunityQuestionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  community: z.lazy(() => CommunityOrderByWithRelationInputSchema).optional(),
  createdBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  answers: z.lazy(() => UserAnswerOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CommunityQuestionWhereUniqueInputSchema: z.ZodType<Prisma.CommunityQuestionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CommunityQuestionWhereInputSchema),z.lazy(() => CommunityQuestionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityQuestionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityQuestionWhereInputSchema),z.lazy(() => CommunityQuestionWhereInputSchema).array() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  options: z.lazy(() => StringNullableListFilterSchema).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
  createdBy: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  answers: z.lazy(() => UserAnswerListRelationFilterSchema).optional()
}).strict());

export const CommunityQuestionOrderByWithAggregationInputSchema: z.ZodType<Prisma.CommunityQuestionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CommunityQuestionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CommunityQuestionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CommunityQuestionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CommunityQuestionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CommunityQuestionSumOrderByAggregateInputSchema).optional()
}).strict();

export const CommunityQuestionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CommunityQuestionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityQuestionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityQuestionScalarWhereWithAggregatesInputSchema),z.lazy(() => CommunityQuestionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeWithAggregatesFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  options: z.lazy(() => StringNullableListFilterSchema).optional(),
  required: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserAnswerWhereInputSchema: z.ZodType<Prisma.UserAnswerWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserAnswerWhereInputSchema),z.lazy(() => UserAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAnswerWhereInputSchema),z.lazy(() => UserAnswerWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answeredAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  question: z.union([ z.lazy(() => CommunityQuestionScalarRelationFilterSchema),z.lazy(() => CommunityQuestionWhereInputSchema) ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
}).strict();

export const UserAnswerOrderByWithRelationInputSchema: z.ZodType<Prisma.UserAnswerOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  answeredAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  question: z.lazy(() => CommunityQuestionOrderByWithRelationInputSchema).optional(),
  community: z.lazy(() => CommunityOrderByWithRelationInputSchema).optional()
}).strict();

export const UserAnswerWhereUniqueInputSchema: z.ZodType<Prisma.UserAnswerWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    userId_questionId: z.lazy(() => UserAnswerUserIdQuestionIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    userId_questionId: z.lazy(() => UserAnswerUserIdQuestionIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  userId_questionId: z.lazy(() => UserAnswerUserIdQuestionIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => UserAnswerWhereInputSchema),z.lazy(() => UserAnswerWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAnswerWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAnswerWhereInputSchema),z.lazy(() => UserAnswerWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answeredAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  question: z.union([ z.lazy(() => CommunityQuestionScalarRelationFilterSchema),z.lazy(() => CommunityQuestionWhereInputSchema) ]).optional(),
  community: z.union([ z.lazy(() => CommunityScalarRelationFilterSchema),z.lazy(() => CommunityWhereInputSchema) ]).optional(),
}).strict());

export const UserAnswerOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserAnswerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  answeredAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserAnswerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserAnswerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserAnswerMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserAnswerScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserAnswerScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => UserAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAnswerScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAnswerScalarWhereWithAggregatesInputSchema),z.lazy(() => UserAnswerScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  answeredAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema)
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema).optional()
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateInputSchema: z.ZodType<Prisma.TaskCreateInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutTasksInputSchema)
}).strict();

export const TaskUncheckedCreateInputSchema: z.ZodType<Prisma.TaskUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string()
}).strict();

export const TaskUpdateInputSchema: z.ZodType<Prisma.TaskUpdateInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutTasksNestedInputSchema).optional()
}).strict();

export const TaskUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskCreateManyInputSchema: z.ZodType<Prisma.TaskCreateManyInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string()
}).strict();

export const TaskUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskUpdateManyMutationInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineCreateInputSchema: z.ZodType<Prisma.PipelineCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutPipelineInputSchema),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUncheckedCreateInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUpdateInputSchema: z.ZodType<Prisma.PipelineUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutPipelineNestedInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineCreateManyInputSchema: z.ZodType<Prisma.PipelineCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string()
}).strict();

export const PipelineUpdateManyMutationInputSchema: z.ZodType<Prisma.PipelineUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentCreateInputSchema: z.ZodType<Prisma.PipelineSegmentCreateInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutSegmentsInputSchema),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutSegmentInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedCreateInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  pipelineId: z.string(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutSegmentInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentUpdateInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneRequiredWithoutSegmentsNestedInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutSegmentNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedUpdateInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentCreateManyInputSchema: z.ZodType<Prisma.PipelineSegmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  pipelineId: z.string()
}).strict();

export const PipelineSegmentUpdateManyMutationInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataCreateInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateInput> = z.object({
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutSegmentDataInputSchema),
  segment: z.lazy(() => PipelineSegmentCreateNestedOneWithoutSegmentDataInputSchema)
}).strict();

export const PipelineSegmentDataUncheckedCreateInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  pipelineId: z.string(),
  segmentId: z.number().int(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataUpdateInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateInput> = z.object({
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneRequiredWithoutSegmentDataNestedInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentUpdateOneRequiredWithoutSegmentDataNestedInputSchema).optional()
}).strict();

export const PipelineSegmentDataUncheckedUpdateInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataCreateManyInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManyInput> = z.object({
  id: z.number().int().optional(),
  pipelineId: z.string(),
  segmentId: z.number().int(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataUpdateManyMutationInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyMutationInput> = z.object({
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadCreateInputSchema: z.ZodType<Prisma.LeadCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutLeadInputSchema),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutLeadInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentCreateNestedOneWithoutLeadInputSchema).optional()
}).strict();

export const LeadUncheckedCreateInputSchema: z.ZodType<Prisma.LeadUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  pipelineId: z.string().optional().nullable(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadUpdateInputSchema: z.ZodType<Prisma.LeadUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutLeadNestedInputSchema).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneWithoutLeadNestedInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentUpdateOneWithoutLeadNestedInputSchema).optional()
}).strict();

export const LeadUncheckedUpdateInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadCreateManyInputSchema: z.ZodType<Prisma.LeadCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  pipelineId: z.string().optional().nullable(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadUpdateManyMutationInputSchema: z.ZodType<Prisma.LeadUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityCreateInputSchema: z.ZodType<Prisma.CommunityCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCommunityInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityUncheckedCreateInputSchema: z.ZodType<Prisma.CommunityUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCommunityInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityUpdateInputSchema: z.ZodType<Prisma.CommunityUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUpdateManyWithoutCommunityNestedInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityUncheckedUpdateInputSchema: z.ZodType<Prisma.CommunityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityCreateManyInputSchema: z.ZodType<Prisma.CommunityCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommunityUpdateManyMutationInputSchema: z.ZodType<Prisma.CommunityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommunityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipCreateInputSchema: z.ZodType<Prisma.CommunityMembershipCreateInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMembershipsInputSchema),
  community: z.lazy(() => CommunityCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const CommunityMembershipUncheckedCreateInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  communityId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const CommunityMembershipUpdateInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembershipsNestedInputSchema).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const CommunityMembershipUncheckedUpdateInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipCreateManyInputSchema: z.ZodType<Prisma.CommunityMembershipCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  communityId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const CommunityMembershipUpdateManyMutationInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionCreateInputSchema: z.ZodType<Prisma.CommunityQuestionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutQuestionsInputSchema),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutQuestionsCreatedInputSchema),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedCreateInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  createdById: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionUpdateInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutQuestionsCreatedNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionCreateManyInputSchema: z.ZodType<Prisma.CommunityQuestionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  createdById: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional()
}).strict();

export const CommunityQuestionUpdateManyMutationInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerCreateInputSchema: z.ZodType<Prisma.UserAnswerCreateInput> = z.object({
  id: z.string().cuid().optional(),
  value: z.string(),
  answeredAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAnswersInputSchema),
  question: z.lazy(() => CommunityQuestionCreateNestedOneWithoutAnswersInputSchema),
  community: z.lazy(() => CommunityCreateNestedOneWithoutAnswersInputSchema)
}).strict();

export const UserAnswerUncheckedCreateInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  questionId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerUpdateInputSchema: z.ZodType<Prisma.UserAnswerUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  question: z.lazy(() => CommunityQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutAnswersNestedInputSchema).optional()
}).strict();

export const UserAnswerUncheckedUpdateInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerCreateManyInputSchema: z.ZodType<Prisma.UserAnswerCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  questionId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerUpdateManyMutationInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostSumOrderByAggregateInputSchema: z.ZodType<Prisma.PostSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  refresh_token_expires_in: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CommunityMembershipListRelationFilterSchema: z.ZodType<Prisma.CommunityMembershipListRelationFilter> = z.object({
  every: z.lazy(() => CommunityMembershipWhereInputSchema).optional(),
  some: z.lazy(() => CommunityMembershipWhereInputSchema).optional(),
  none: z.lazy(() => CommunityMembershipWhereInputSchema).optional()
}).strict();

export const UserAnswerListRelationFilterSchema: z.ZodType<Prisma.UserAnswerListRelationFilter> = z.object({
  every: z.lazy(() => UserAnswerWhereInputSchema).optional(),
  some: z.lazy(() => UserAnswerWhereInputSchema).optional(),
  none: z.lazy(() => UserAnswerWhereInputSchema).optional()
}).strict();

export const CommunityQuestionListRelationFilterSchema: z.ZodType<Prisma.CommunityQuestionListRelationFilter> = z.object({
  every: z.lazy(() => CommunityQuestionWhereInputSchema).optional(),
  some: z.lazy(() => CommunityQuestionWhereInputSchema).optional(),
  none: z.lazy(() => CommunityQuestionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> = z.object({
  every: z.lazy(() => PostWhereInputSchema).optional(),
  some: z.lazy(() => PostWhereInputSchema).optional(),
  none: z.lazy(() => PostWhereInputSchema).optional()
}).strict();

export const TaskListRelationFilterSchema: z.ZodType<Prisma.TaskListRelationFilter> = z.object({
  every: z.lazy(() => TaskWhereInputSchema).optional(),
  some: z.lazy(() => TaskWhereInputSchema).optional(),
  none: z.lazy(() => TaskWhereInputSchema).optional()
}).strict();

export const PipelineListRelationFilterSchema: z.ZodType<Prisma.PipelineListRelationFilter> = z.object({
  every: z.lazy(() => PipelineWhereInputSchema).optional(),
  some: z.lazy(() => PipelineWhereInputSchema).optional(),
  none: z.lazy(() => PipelineWhereInputSchema).optional()
}).strict();

export const LeadListRelationFilterSchema: z.ZodType<Prisma.LeadListRelationFilter> = z.object({
  every: z.lazy(() => LeadWhereInputSchema).optional(),
  some: z.lazy(() => LeadWhereInputSchema).optional(),
  none: z.lazy(() => LeadWhereInputSchema).optional()
}).strict();

export const CommunityMembershipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommunityMembershipOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAnswerOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserAnswerOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityQuestionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PipelineOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LeadOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LeadOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTaskStatusFilterSchema: z.ZodType<Prisma.EnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const EnumTaskPriorityFilterSchema: z.ZodType<Prisma.EnumTaskPriorityFilter> = z.object({
  equals: z.lazy(() => TaskPrioritySchema).optional(),
  in: z.lazy(() => TaskPrioritySchema).array().optional(),
  notIn: z.lazy(() => TaskPrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => NestedEnumTaskPriorityFilterSchema) ]).optional(),
}).strict();

export const TaskCountOrderByAggregateInputSchema: z.ZodType<Prisma.TaskCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  priority: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TaskSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const EnumTaskPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskPrioritySchema).optional(),
  in: z.lazy(() => TaskPrioritySchema).array().optional(),
  notIn: z.lazy(() => TaskPrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => NestedEnumTaskPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskPriorityFilterSchema).optional()
}).strict();

export const PipelineSegmentDataListRelationFilterSchema: z.ZodType<Prisma.PipelineSegmentDataListRelationFilter> = z.object({
  every: z.lazy(() => PipelineSegmentDataWhereInputSchema).optional(),
  some: z.lazy(() => PipelineSegmentDataWhereInputSchema).optional(),
  none: z.lazy(() => PipelineSegmentDataWhereInputSchema).optional()
}).strict();

export const PipelineSegmentListRelationFilterSchema: z.ZodType<Prisma.PipelineSegmentListRelationFilter> = z.object({
  every: z.lazy(() => PipelineSegmentWhereInputSchema).optional(),
  some: z.lazy(() => PipelineSegmentWhereInputSchema).optional(),
  none: z.lazy(() => PipelineSegmentWhereInputSchema).optional()
}).strict();

export const PipelineSegmentDataOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineCountOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineMinOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const PipelineScalarRelationFilterSchema: z.ZodType<Prisma.PipelineScalarRelationFilter> = z.object({
  is: z.lazy(() => PipelineWhereInputSchema).optional(),
  isNot: z.lazy(() => PipelineWhereInputSchema).optional()
}).strict();

export const PipelineSegmentPipelineIdNameCompoundUniqueInputSchema: z.ZodType<Prisma.PipelineSegmentPipelineIdNameCompoundUniqueInput> = z.object({
  pipelineId: z.string(),
  name: z.string()
}).strict();

export const PipelineSegmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  deleted: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const PipelineSegmentScalarRelationFilterSchema: z.ZodType<Prisma.PipelineSegmentScalarRelationFilter> = z.object({
  is: z.lazy(() => PipelineSegmentWhereInputSchema).optional(),
  isNot: z.lazy(() => PipelineSegmentWhereInputSchema).optional()
}).strict();

export const PipelineSegmentDataPipelineIdSegmentIdCompoundUniqueInputSchema: z.ZodType<Prisma.PipelineSegmentDataPipelineIdSegmentIdCompoundUniqueInput> = z.object({
  pipelineId: z.string(),
  segmentId: z.number()
}).strict();

export const PipelineSegmentDataCountOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentDataAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentDataMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentDataMinOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  completedAt: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PipelineSegmentDataSumOrderByAggregateInputSchema: z.ZodType<Prisma.PipelineSegmentDataSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const PipelineNullableScalarRelationFilterSchema: z.ZodType<Prisma.PipelineNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PipelineWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PipelineWhereInputSchema).optional().nullable()
}).strict();

export const PipelineSegmentNullableScalarRelationFilterSchema: z.ZodType<Prisma.PipelineSegmentNullableScalarRelationFilter> = z.object({
  is: z.lazy(() => PipelineSegmentWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PipelineSegmentWhereInputSchema).optional().nullable()
}).strict();

export const LeadCountOrderByAggregateInputSchema: z.ZodType<Prisma.LeadCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  capitalValue: z.lazy(() => SortOrderSchema).optional(),
  contactName: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  avatarURL: z.lazy(() => SortOrderSchema).optional(),
  addedOn: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  leadType: z.lazy(() => SortOrderSchema).optional(),
  pipelineStage: z.lazy(() => SortOrderSchema).optional(),
  isArchived: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  tags: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LeadAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LeadAvgOrderByAggregateInput> = z.object({
  capitalValue: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LeadMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LeadMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  capitalValue: z.lazy(() => SortOrderSchema).optional(),
  contactName: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  avatarURL: z.lazy(() => SortOrderSchema).optional(),
  addedOn: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  leadType: z.lazy(() => SortOrderSchema).optional(),
  pipelineStage: z.lazy(() => SortOrderSchema).optional(),
  isArchived: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LeadMinOrderByAggregateInputSchema: z.ZodType<Prisma.LeadMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  capitalValue: z.lazy(() => SortOrderSchema).optional(),
  contactName: z.lazy(() => SortOrderSchema).optional(),
  companyName: z.lazy(() => SortOrderSchema).optional(),
  avatarURL: z.lazy(() => SortOrderSchema).optional(),
  addedOn: z.lazy(() => SortOrderSchema).optional(),
  dueDate: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  leadType: z.lazy(() => SortOrderSchema).optional(),
  pipelineStage: z.lazy(() => SortOrderSchema).optional(),
  isArchived: z.lazy(() => SortOrderSchema).optional(),
  source: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  pipelineId: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LeadSumOrderByAggregateInputSchema: z.ZodType<Prisma.LeadSumOrderByAggregateInput> = z.object({
  capitalValue: z.lazy(() => SortOrderSchema).optional(),
  segmentId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMembershipRoleFilterSchema: z.ZodType<Prisma.EnumMembershipRoleFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.lazy(() => MembershipRoleSchema).array().optional(),
  notIn: z.lazy(() => MembershipRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleFilterSchema) ]).optional(),
}).strict();

export const CommunityScalarRelationFilterSchema: z.ZodType<Prisma.CommunityScalarRelationFilter> = z.object({
  is: z.lazy(() => CommunityWhereInputSchema).optional(),
  isNot: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export const CommunityMembershipUserIdCommunityIdCompoundUniqueInputSchema: z.ZodType<Prisma.CommunityMembershipUserIdCommunityIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  communityId: z.string()
}).strict();

export const CommunityMembershipCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityMembershipCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityMembershipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityMembershipMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityMembershipMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityMembershipMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  joinedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumMembershipRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumMembershipRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.lazy(() => MembershipRoleSchema).array().optional(),
  notIn: z.lazy(() => MembershipRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional()
}).strict();

export const EnumQuestionTypeFilterSchema: z.ZodType<Prisma.EnumQuestionTypeFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const CommunityQuestionCountOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  options: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityQuestionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionAvgOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityQuestionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityQuestionMinOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  createdById: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  required: z.lazy(() => SortOrderSchema).optional(),
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CommunityQuestionSumOrderByAggregateInputSchema: z.ZodType<Prisma.CommunityQuestionSumOrderByAggregateInput> = z.object({
  order: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional()
}).strict();

export const CommunityQuestionScalarRelationFilterSchema: z.ZodType<Prisma.CommunityQuestionScalarRelationFilter> = z.object({
  is: z.lazy(() => CommunityQuestionWhereInputSchema).optional(),
  isNot: z.lazy(() => CommunityQuestionWhereInputSchema).optional()
}).strict();

export const UserAnswerUserIdQuestionIdCompoundUniqueInputSchema: z.ZodType<Prisma.UserAnswerUserIdQuestionIdCompoundUniqueInput> = z.object({
  userId: z.string(),
  questionId: z.string()
}).strict();

export const UserAnswerCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserAnswerCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  answeredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAnswerMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserAnswerMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  answeredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAnswerMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserAnswerMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  questionId: z.lazy(() => SortOrderSchema).optional(),
  communityId: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  answeredAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPostsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerCreateWithoutUserInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadCreateWithoutCreatedByInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerCreateWithoutUserInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUncheckedCreateNestedManyWithoutCreatedByInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadCreateWithoutCreatedByInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyCreatedByInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const CommunityMembershipUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerCreateWithoutUserInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TaskUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.PipelineUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PipelineUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PipelineUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => PipelineUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineScalarWhereInputSchema),z.lazy(() => PipelineScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.LeadUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadCreateWithoutCreatedByInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerCreateWithoutUserInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PostCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PostUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PostUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PostCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PostWhereUniqueInputSchema),z.lazy(() => PostWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PostUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PostUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PostUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => PostUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskCreateWithoutCreatedByInputSchema).array(),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => TaskCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TaskUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TaskUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TaskCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TaskWhereUniqueInputSchema),z.lazy(() => TaskWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TaskUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => TaskUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TaskUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => TaskUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateWithoutCreatedByInputSchema).array(),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => PipelineCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PipelineUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineWhereUniqueInputSchema),z.lazy(() => PipelineWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => PipelineUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => PipelineUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineScalarWhereInputSchema),z.lazy(() => PipelineScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutCreatedByNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadCreateWithoutCreatedByInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema),z.lazy(() => LeadCreateOrConnectWithoutCreatedByInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyCreatedByInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutCreatedByInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutCreatedByInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutCreatedByInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutCreatedByInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTasksInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumTaskStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskStatusSchema).optional()
}).strict();

export const EnumTaskPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskPriorityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskPrioritySchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTasksNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTasksNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTasksInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTasksInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTasksInputSchema),z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutPipelineInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedCreateWithoutPipelineInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPipelineInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PipelineSegmentDataCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.LeadCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadCreateWithoutPipelineInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedCreateNestedManyWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUncheckedCreateNestedManyWithoutPipelineInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadCreateWithoutPipelineInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyPipelineInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutPipelineNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedCreateWithoutPipelineInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPipelineInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPipelineInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutPipelineInputSchema),z.lazy(() => UserUpdateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPipelineInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentScalarWhereInputSchema),z.lazy(() => PipelineSegmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.LeadUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadCreateWithoutPipelineInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema).array(),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentWhereUniqueInputSchema),z.lazy(() => PipelineSegmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentScalarWhereInputSchema),z.lazy(() => PipelineSegmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutPipelineNestedInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutPipelineNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadCreateWithoutPipelineInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema),z.lazy(() => LeadCreateOrConnectWithoutPipelineInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManyPipelineInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutPipelineInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutPipelineInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutPipelineInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutPipelineInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineCreateNestedOneWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineCreateNestedOneWithoutSegmentsInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutSegmentsInputSchema).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional()
}).strict();

export const PipelineSegmentDataCreateNestedManyWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateNestedManyWithoutSegmentInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManySegmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadCreateNestedManyWithoutSegmentInputSchema: z.ZodType<Prisma.LeadCreateNestedManyWithoutSegmentInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadCreateWithoutSegmentInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManySegmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedCreateNestedManyWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedCreateNestedManyWithoutSegmentInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManySegmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedCreateNestedManyWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUncheckedCreateNestedManyWithoutSegmentInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadCreateWithoutSegmentInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManySegmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const PipelineUpdateOneRequiredWithoutSegmentsNestedInputSchema: z.ZodType<Prisma.PipelineUpdateOneRequiredWithoutSegmentsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutSegmentsInputSchema).optional(),
  upsert: z.lazy(() => PipelineUpsertWithoutSegmentsInputSchema).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PipelineUpdateToOneWithWhereWithoutSegmentsInputSchema),z.lazy(() => PipelineUpdateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataUpdateManyWithoutSegmentNestedInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyWithoutSegmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManySegmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUpdateManyWithoutSegmentNestedInputSchema: z.ZodType<Prisma.LeadUpdateManyWithoutSegmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadCreateWithoutSegmentInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManySegmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutSegmentInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutSegmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedUpdateManyWithoutSegmentNestedInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateManyWithoutSegmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema).array(),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PipelineSegmentDataCreateManySegmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutSegmentNestedInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutSegmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadCreateWithoutSegmentInputSchema).array(),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema),z.lazy(() => LeadCreateOrConnectWithoutSegmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LeadUpsertWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => LeadUpsertWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LeadCreateManySegmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LeadWhereUniqueInputSchema),z.lazy(() => LeadWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LeadUpdateWithWhereUniqueWithoutSegmentInputSchema),z.lazy(() => LeadUpdateWithWhereUniqueWithoutSegmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LeadUpdateManyWithWhereWithoutSegmentInputSchema),z.lazy(() => LeadUpdateManyWithWhereWithoutSegmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PipelineCreateNestedOneWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineCreateNestedOneWithoutSegmentDataInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutSegmentDataInputSchema).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional()
}).strict();

export const PipelineSegmentCreateNestedOneWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentCreateNestedOneWithoutSegmentDataInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutSegmentDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineSegmentCreateOrConnectWithoutSegmentDataInputSchema).optional(),
  connect: z.lazy(() => PipelineSegmentWhereUniqueInputSchema).optional()
}).strict();

export const PipelineUpdateOneRequiredWithoutSegmentDataNestedInputSchema: z.ZodType<Prisma.PipelineUpdateOneRequiredWithoutSegmentDataNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutSegmentDataInputSchema).optional(),
  upsert: z.lazy(() => PipelineUpsertWithoutSegmentDataInputSchema).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PipelineUpdateToOneWithWhereWithoutSegmentDataInputSchema),z.lazy(() => PipelineUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentDataInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentUpdateOneRequiredWithoutSegmentDataNestedInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateOneRequiredWithoutSegmentDataNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutSegmentDataInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineSegmentCreateOrConnectWithoutSegmentDataInputSchema).optional(),
  upsert: z.lazy(() => PipelineSegmentUpsertWithoutSegmentDataInputSchema).optional(),
  connect: z.lazy(() => PipelineSegmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentUpdateToOneWithWhereWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutSegmentDataInputSchema) ]).optional(),
}).strict();

export const LeadCreatetagsInputSchema: z.ZodType<Prisma.LeadCreatetagsInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutLeadInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutLeadInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLeadInputSchema),z.lazy(() => UserUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLeadInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const PipelineCreateNestedOneWithoutLeadInputSchema: z.ZodType<Prisma.PipelineCreateNestedOneWithoutLeadInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutLeadInputSchema).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional()
}).strict();

export const PipelineSegmentCreateNestedOneWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentCreateNestedOneWithoutLeadInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineSegmentCreateOrConnectWithoutLeadInputSchema).optional(),
  connect: z.lazy(() => PipelineSegmentWhereUniqueInputSchema).optional()
}).strict();

export const LeadUpdatetagsInputSchema: z.ZodType<Prisma.LeadUpdatetagsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutLeadNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutLeadNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutLeadInputSchema),z.lazy(() => UserUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutLeadInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutLeadInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutLeadInputSchema),z.lazy(() => UserUpdateWithoutLeadInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLeadInputSchema) ]).optional(),
}).strict();

export const PipelineUpdateOneWithoutLeadNestedInputSchema: z.ZodType<Prisma.PipelineUpdateOneWithoutLeadNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineCreateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineCreateOrConnectWithoutLeadInputSchema).optional(),
  upsert: z.lazy(() => PipelineUpsertWithoutLeadInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PipelineWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PipelineWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PipelineUpdateToOneWithWhereWithoutLeadInputSchema),z.lazy(() => PipelineUpdateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutLeadInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentUpdateOneWithoutLeadNestedInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateOneWithoutLeadNestedInput> = z.object({
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutLeadInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PipelineSegmentCreateOrConnectWithoutLeadInputSchema).optional(),
  upsert: z.lazy(() => PipelineSegmentUpsertWithoutLeadInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => PipelineSegmentWhereInputSchema) ]).optional(),
  connect: z.lazy(() => PipelineSegmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PipelineSegmentUpdateToOneWithWhereWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUpdateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutLeadInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUncheckedCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipUncheckedCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedCreateNestedManyWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateNestedManyWithoutCommunityInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyCommunityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityQuestionUncheckedUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityQuestionCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityQuestionWhereUniqueInputSchema),z.lazy(() => CommunityQuestionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CommunityMembershipUncheckedUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema).array(),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CommunityMembershipCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CommunityMembershipWhereUniqueInputSchema),z.lazy(() => CommunityMembershipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutCommunityNestedInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutCommunityNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutCommunityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyCommunityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutCommunityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutCommunityInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutCommunityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMembershipsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembershipsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommunityCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.CommunityCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional()
}).strict();

export const EnumMembershipRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMembershipRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MembershipRoleSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutMembershipsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembershipsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembershipsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMembershipsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMembershipsInputSchema),z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]).optional(),
}).strict();

export const CommunityUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.CommunityUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => CommunityUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommunityUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionCreateoptionsInputSchema: z.ZodType<Prisma.CommunityQuestionCreateoptionsInput> = z.object({
  set: z.string().array()
}).strict();

export const CommunityCreateNestedOneWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityCreateNestedOneWithoutQuestionsInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutQuestionsCreatedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuestionsCreatedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuestionsCreatedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserAnswerCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateNestedManyWithoutQuestionInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumQuestionTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumQuestionTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => QuestionTypeSchema).optional()
}).strict();

export const CommunityQuestionUpdateoptionsInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateoptionsInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const CommunityUpdateOneRequiredWithoutQuestionsNestedInputSchema: z.ZodType<Prisma.CommunityUpdateOneRequiredWithoutQuestionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutQuestionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutQuestionsInputSchema).optional(),
  upsert: z.lazy(() => CommunityUpsertWithoutQuestionsInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommunityUpdateToOneWithWhereWithoutQuestionsInputSchema),z.lazy(() => CommunityUpdateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutQuestionsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutQuestionsCreatedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutQuestionsCreatedNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuestionsCreatedInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutQuestionsCreatedInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutQuestionsCreatedInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUpdateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutQuestionsCreatedInputSchema) ]).optional(),
}).strict();

export const UserAnswerUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema).array(),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema),z.lazy(() => UserAnswerCreateOrConnectWithoutQuestionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserAnswerCreateManyQuestionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserAnswerWhereUniqueInputSchema),z.lazy(() => UserAnswerWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserAnswerUpdateManyWithWhereWithoutQuestionInputSchema),z.lazy(() => UserAnswerUpdateManyWithWhereWithoutQuestionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CommunityQuestionCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityQuestionCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => CommunityQuestionWhereUniqueInputSchema).optional()
}).strict();

export const CommunityCreateNestedOneWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityCreateNestedOneWithoutAnswersInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAnswersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => UserUpdateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateOneRequiredWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityQuestionCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => CommunityQuestionUpsertWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => CommunityQuestionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const CommunityUpdateOneRequiredWithoutAnswersNestedInputSchema: z.ZodType<Prisma.CommunityUpdateOneRequiredWithoutAnswersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CommunityCreateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutAnswersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CommunityCreateOrConnectWithoutAnswersInputSchema).optional(),
  upsert: z.lazy(() => CommunityUpsertWithoutAnswersInputSchema).optional(),
  connect: z.lazy(() => CommunityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CommunityUpdateToOneWithWhereWithoutAnswersInputSchema),z.lazy(() => CommunityUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutAnswersInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumTaskStatusFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskPriorityFilterSchema: z.ZodType<Prisma.NestedEnumTaskPriorityFilter> = z.object({
  equals: z.lazy(() => TaskPrioritySchema).optional(),
  in: z.lazy(() => TaskPrioritySchema).array().optional(),
  notIn: z.lazy(() => TaskPrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => NestedEnumTaskPriorityFilterSchema) ]).optional(),
}).strict();

export const NestedEnumTaskStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskStatusSchema).optional(),
  in: z.lazy(() => TaskStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => NestedEnumTaskStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskStatusFilterSchema).optional()
}).strict();

export const NestedEnumTaskPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskPriorityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskPrioritySchema).optional(),
  in: z.lazy(() => TaskPrioritySchema).array().optional(),
  notIn: z.lazy(() => TaskPrioritySchema).array().optional(),
  not: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => NestedEnumTaskPriorityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskPriorityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskPriorityFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumMembershipRoleFilterSchema: z.ZodType<Prisma.NestedEnumMembershipRoleFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.lazy(() => MembershipRoleSchema).array().optional(),
  notIn: z.lazy(() => MembershipRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumMembershipRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumMembershipRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => MembershipRoleSchema).optional(),
  in: z.lazy(() => MembershipRoleSchema).array().optional(),
  notIn: z.lazy(() => MembershipRoleSchema).array().optional(),
  not: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => NestedEnumMembershipRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumMembershipRoleFilterSchema).optional()
}).strict();

export const NestedEnumQuestionTypeFilterSchema: z.ZodType<Prisma.NestedEnumQuestionTypeFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumQuestionTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumQuestionTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QuestionTypeSchema).optional(),
  in: z.lazy(() => QuestionTypeSchema).array().optional(),
  notIn: z.lazy(() => QuestionTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => NestedEnumQuestionTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQuestionTypeFilterSchema).optional()
}).strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPostsInputSchema),z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPostsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema) ]),
}).strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const CommunityMembershipCreateWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const CommunityMembershipUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const CommunityMembershipCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommunityMembershipCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CommunityMembershipCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommunityMembershipCreateManyUserInputSchema),z.lazy(() => CommunityMembershipCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserAnswerCreateWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  value: z.string(),
  answeredAt: z.coerce.date().optional(),
  question: z.lazy(() => CommunityQuestionCreateNestedOneWithoutAnswersInputSchema),
  community: z.lazy(() => CommunityCreateNestedOneWithoutAnswersInputSchema)
}).strict();

export const UserAnswerUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  questionId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserAnswerCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserAnswerCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserAnswerCreateManyUserInputSchema),z.lazy(() => UserAnswerCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommunityQuestionCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutQuestionsInputSchema),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const CommunityQuestionCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.CommunityQuestionCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommunityQuestionCreateManyCreatedByInputSchema),z.lazy(() => CommunityQuestionCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PostCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.PostCreateWithoutCreatedByInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const PostCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PostCreateManyCreatedByInputSchema),z.lazy(() => PostCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const TaskCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskCreateWithoutCreatedByInput> = z.object({
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TaskCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.TaskCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TaskCreateManyCreatedByInputSchema),z.lazy(() => TaskCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PipelineCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const PipelineCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.PipelineCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PipelineCreateManyCreatedByInputSchema),z.lazy(() => PipelineCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LeadCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutLeadInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentCreateNestedOneWithoutLeadInputSchema).optional()
}).strict();

export const LeadUncheckedCreateWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUncheckedCreateWithoutCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  pipelineId: z.string().optional().nullable(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadCreateOrConnectWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadCreateOrConnectWithoutCreatedByInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const LeadCreateManyCreatedByInputEnvelopeSchema: z.ZodType<Prisma.LeadCreateManyCreatedByInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LeadCreateManyCreatedByInputSchema),z.lazy(() => LeadCreateManyCreatedByInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommunityMembershipUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CommunityMembershipUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommunityMembershipUpdateWithoutUserInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CommunityMembershipUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CommunityMembershipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommunityMembershipUpdateManyMutationInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CommunityMembershipScalarWhereInputSchema: z.ZodType<Prisma.CommunityMembershipScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityMembershipScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityMembershipScalarWhereInputSchema),z.lazy(() => CommunityMembershipScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumMembershipRoleFilterSchema),z.lazy(() => MembershipRoleSchema) ]).optional(),
  joinedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserAnswerUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserAnswerUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateWithoutUserInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserAnswerUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateManyMutationInputSchema),z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserAnswerScalarWhereInputSchema: z.ZodType<Prisma.UserAnswerScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserAnswerScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserAnswerScalarWhereInputSchema),z.lazy(() => UserAnswerScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  questionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  answeredAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutCreatedByInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const CommunityQuestionUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => CommunityQuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommunityQuestionUpdateManyMutationInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const CommunityQuestionScalarWhereInputSchema: z.ZodType<Prisma.CommunityQuestionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CommunityQuestionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CommunityQuestionScalarWhereInputSchema),z.lazy(() => CommunityQuestionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  communityId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumQuestionTypeFilterSchema),z.lazy(() => QuestionTypeSchema) ]).optional(),
  options: z.lazy(() => StringNullableListFilterSchema).optional(),
  required: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  order: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PostUpdateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => PostCreateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const PostUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PostWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PostUpdateWithoutCreatedByInputSchema),z.lazy(() => PostUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const PostUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PostScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PostUpdateManyMutationInputSchema),z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereInputSchema),z.lazy(() => PostScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TaskUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TaskUpdateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => TaskCreateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const TaskUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TaskWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateWithoutCreatedByInputSchema),z.lazy(() => TaskUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const TaskUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => TaskScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TaskUpdateManyMutationInputSchema),z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const TaskScalarWhereInputSchema: z.ZodType<Prisma.TaskScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskScalarWhereInputSchema),z.lazy(() => TaskScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
  priority: z.union([ z.lazy(() => EnumTaskPriorityFilterSchema),z.lazy(() => TaskPrioritySchema) ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PipelineUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PipelineUpdateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineCreateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const PipelineUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PipelineUpdateWithoutCreatedByInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const PipelineUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => PipelineScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PipelineUpdateManyMutationInputSchema),z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const PipelineScalarWhereInputSchema: z.ZodType<Prisma.PipelineScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineScalarWhereInputSchema),z.lazy(() => PipelineScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineScalarWhereInputSchema),z.lazy(() => PipelineScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LeadUpsertWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUpsertWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LeadUpdateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutCreatedByInputSchema) ]),
  create: z.union([ z.lazy(() => LeadCreateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedCreateWithoutCreatedByInputSchema) ]),
}).strict();

export const LeadUpdateWithWhereUniqueWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUpdateWithWhereUniqueWithoutCreatedByInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateWithoutCreatedByInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutCreatedByInputSchema) ]),
}).strict();

export const LeadUpdateManyWithWhereWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUpdateManyWithWhereWithoutCreatedByInput> = z.object({
  where: z.lazy(() => LeadScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateManyMutationInputSchema),z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByInputSchema) ]),
}).strict();

export const LeadScalarWhereInputSchema: z.ZodType<Prisma.LeadScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LeadScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LeadScalarWhereInputSchema),z.lazy(() => LeadScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  capitalValue: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  contactName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatarURL: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  addedOn: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  dueDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  leadType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineStage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isArchived: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  source: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tags: z.lazy(() => StringNullableListFilterSchema).optional(),
  createdById: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  segmentId: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateWithoutTasksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTasksInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTasksInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpsertWithoutTasksInputSchema: z.ZodType<Prisma.UserUpsertWithoutTasksInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTasksInputSchema),z.lazy(() => UserUncheckedCreateWithoutTasksInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTasksInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTasksInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTasksInputSchema) ]),
}).strict();

export const UserUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTasksInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTasksInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutPipelineInputSchema: z.ZodType<Prisma.UserCreateWithoutPipelineInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutPipelineInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPipelineInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutPipelineInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPipelineInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentDataCreateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateWithoutPipelineInput> = z.object({
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  segment: z.lazy(() => PipelineSegmentCreateNestedOneWithoutSegmentDataInputSchema)
}).strict();

export const PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedCreateWithoutPipelineInput> = z.object({
  id: z.number().int().optional(),
  segmentId: z.number().int(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataCreateOrConnectWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateOrConnectWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentDataCreateManyPipelineInputEnvelopeSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManyPipelineInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PipelineSegmentDataCreateManyPipelineInputSchema),z.lazy(() => PipelineSegmentDataCreateManyPipelineInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PipelineSegmentCreateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentCreateWithoutPipelineInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutSegmentInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedCreateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedCreateWithoutPipelineInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutSegmentInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentCreateOrConnectWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentCreateOrConnectWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentCreateManyPipelineInputEnvelopeSchema: z.ZodType<Prisma.PipelineSegmentCreateManyPipelineInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PipelineSegmentCreateManyPipelineInputSchema),z.lazy(() => PipelineSegmentCreateManyPipelineInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LeadCreateWithoutPipelineInputSchema: z.ZodType<Prisma.LeadCreateWithoutPipelineInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutLeadInputSchema),
  segment: z.lazy(() => PipelineSegmentCreateNestedOneWithoutLeadInputSchema).optional()
}).strict();

export const LeadUncheckedCreateWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUncheckedCreateWithoutPipelineInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadCreateOrConnectWithoutPipelineInputSchema: z.ZodType<Prisma.LeadCreateOrConnectWithoutPipelineInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const LeadCreateManyPipelineInputEnvelopeSchema: z.ZodType<Prisma.LeadCreateManyPipelineInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LeadCreateManyPipelineInputSchema),z.lazy(() => LeadCreateManyPipelineInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutPipelineInputSchema: z.ZodType<Prisma.UserUpsertWithoutPipelineInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPipelineInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedCreateWithoutPipelineInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutPipelineInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPipelineInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPipelineInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPipelineInputSchema) ]),
}).strict();

export const UserUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.UserUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpsertWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateWithoutPipelineInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyWithWhereWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyMutationInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentDataScalarWhereInputSchema: z.ZodType<Prisma.PipelineSegmentDataScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),z.lazy(() => PipelineSegmentDataScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  segmentId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  completedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  notes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUpsertWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutPipelineInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutPipelineInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentUpdateManyWithWhereWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateManyWithWhereWithoutPipelineInput> = z.object({
  where: z.lazy(() => PipelineSegmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentUpdateManyMutationInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateManyWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineSegmentScalarWhereInputSchema: z.ZodType<Prisma.PipelineSegmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PipelineSegmentScalarWhereInputSchema),z.lazy(() => PipelineSegmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PipelineSegmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PipelineSegmentScalarWhereInputSchema),z.lazy(() => PipelineSegmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  pipelineId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const LeadUpsertWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUpsertWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LeadUpdateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutPipelineInputSchema) ]),
  create: z.union([ z.lazy(() => LeadCreateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedCreateWithoutPipelineInputSchema) ]),
}).strict();

export const LeadUpdateWithWhereUniqueWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUpdateWithWhereUniqueWithoutPipelineInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateWithoutPipelineInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutPipelineInputSchema) ]),
}).strict();

export const LeadUpdateManyWithWhereWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUpdateManyWithWhereWithoutPipelineInput> = z.object({
  where: z.lazy(() => LeadScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateManyMutationInputSchema),z.lazy(() => LeadUncheckedUpdateManyWithoutPipelineInputSchema) ]),
}).strict();

export const PipelineCreateWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineCreateWithoutSegmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutPipelineInputSchema),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUncheckedCreateWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateWithoutSegmentsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineCreateOrConnectWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineCreateOrConnectWithoutSegmentsInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentsInputSchema) ]),
}).strict();

export const PipelineSegmentDataCreateWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateWithoutSegmentInput> = z.object({
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutSegmentDataInputSchema)
}).strict();

export const PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedCreateWithoutSegmentInput> = z.object({
  id: z.number().int().optional(),
  pipelineId: z.string(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataCreateOrConnectWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateOrConnectWithoutSegmentInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema) ]),
}).strict();

export const PipelineSegmentDataCreateManySegmentInputEnvelopeSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManySegmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PipelineSegmentDataCreateManySegmentInputSchema),z.lazy(() => PipelineSegmentDataCreateManySegmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LeadCreateWithoutSegmentInputSchema: z.ZodType<Prisma.LeadCreateWithoutSegmentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutLeadInputSchema),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutLeadInputSchema).optional()
}).strict();

export const LeadUncheckedCreateWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUncheckedCreateWithoutSegmentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  pipelineId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadCreateOrConnectWithoutSegmentInputSchema: z.ZodType<Prisma.LeadCreateOrConnectWithoutSegmentInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema) ]),
}).strict();

export const LeadCreateManySegmentInputEnvelopeSchema: z.ZodType<Prisma.LeadCreateManySegmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LeadCreateManySegmentInputSchema),z.lazy(() => LeadCreateManySegmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PipelineUpsertWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineUpsertWithoutSegmentsInput> = z.object({
  update: z.union([ z.lazy(() => PipelineUpdateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentsInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentsInputSchema) ]),
  where: z.lazy(() => PipelineWhereInputSchema).optional()
}).strict();

export const PipelineUpdateToOneWithWhereWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineUpdateToOneWithWhereWithoutSegmentsInput> = z.object({
  where: z.lazy(() => PipelineWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PipelineUpdateWithoutSegmentsInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentsInputSchema) ]),
}).strict();

export const PipelineUpdateWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineUpdateWithoutSegmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutPipelineNestedInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateWithoutSegmentsInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateWithoutSegmentsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpsertWithWhereUniqueWithoutSegmentInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateWithoutSegmentInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineSegmentDataCreateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedCreateWithoutSegmentInputSchema) ]),
}).strict();

export const PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateWithWhereUniqueWithoutSegmentInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentDataUpdateWithoutSegmentInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateWithoutSegmentInputSchema) ]),
}).strict();

export const PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyWithWhereWithoutSegmentInput> = z.object({
  where: z.lazy(() => PipelineSegmentDataScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PipelineSegmentDataUpdateManyMutationInputSchema),z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutSegmentInputSchema) ]),
}).strict();

export const LeadUpsertWithWhereUniqueWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUpsertWithWhereUniqueWithoutSegmentInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LeadUpdateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutSegmentInputSchema) ]),
  create: z.union([ z.lazy(() => LeadCreateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedCreateWithoutSegmentInputSchema) ]),
}).strict();

export const LeadUpdateWithWhereUniqueWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUpdateWithWhereUniqueWithoutSegmentInput> = z.object({
  where: z.lazy(() => LeadWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateWithoutSegmentInputSchema),z.lazy(() => LeadUncheckedUpdateWithoutSegmentInputSchema) ]),
}).strict();

export const LeadUpdateManyWithWhereWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUpdateManyWithWhereWithoutSegmentInput> = z.object({
  where: z.lazy(() => LeadScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LeadUpdateManyMutationInputSchema),z.lazy(() => LeadUncheckedUpdateManyWithoutSegmentInputSchema) ]),
}).strict();

export const PipelineCreateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineCreateWithoutSegmentDataInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutPipelineInputSchema),
  segments: z.lazy(() => PipelineSegmentCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUncheckedCreateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateWithoutSegmentDataInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string(),
  segments: z.lazy(() => PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineCreateOrConnectWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineCreateOrConnectWithoutSegmentDataInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentDataInputSchema) ]),
}).strict();

export const PipelineSegmentCreateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentCreateWithoutSegmentDataInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutSegmentsInputSchema),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedCreateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedCreateWithoutSegmentDataInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  pipelineId: z.string(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentCreateOrConnectWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentCreateOrConnectWithoutSegmentDataInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutSegmentDataInputSchema) ]),
}).strict();

export const PipelineUpsertWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineUpsertWithoutSegmentDataInput> = z.object({
  update: z.union([ z.lazy(() => PipelineUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentDataInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutSegmentDataInputSchema) ]),
  where: z.lazy(() => PipelineWhereInputSchema).optional()
}).strict();

export const PipelineUpdateToOneWithWhereWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineUpdateToOneWithWhereWithoutSegmentDataInput> = z.object({
  where: z.lazy(() => PipelineWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PipelineUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutSegmentDataInputSchema) ]),
}).strict();

export const PipelineUpdateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineUpdateWithoutSegmentDataInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateWithoutSegmentDataInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUpsertWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentUpsertWithoutSegmentDataInput> = z.object({
  update: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutSegmentDataInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutSegmentDataInputSchema) ]),
  where: z.lazy(() => PipelineSegmentWhereInputSchema).optional()
}).strict();

export const PipelineSegmentUpdateToOneWithWhereWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateToOneWithWhereWithoutSegmentDataInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutSegmentDataInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutSegmentDataInputSchema) ]),
}).strict();

export const PipelineSegmentUpdateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateWithoutSegmentDataInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneRequiredWithoutSegmentsNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedUpdateWithoutSegmentDataInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateWithoutSegmentDataInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutLeadInputSchema: z.ZodType<Prisma.UserCreateWithoutLeadInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutLeadInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLeadInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutLeadInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLeadInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutLeadInputSchema),z.lazy(() => UserUncheckedCreateWithoutLeadInputSchema) ]),
}).strict();

export const PipelineCreateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineCreateWithoutLeadInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutPipelineInputSchema),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineUncheckedCreateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineUncheckedCreateWithoutLeadInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  createdById: z.string(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutPipelineInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedCreateNestedManyWithoutPipelineInputSchema).optional()
}).strict();

export const PipelineCreateOrConnectWithoutLeadInputSchema: z.ZodType<Prisma.PipelineCreateOrConnectWithoutLeadInput> = z.object({
  where: z.lazy(() => PipelineWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineCreateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutLeadInputSchema) ]),
}).strict();

export const PipelineSegmentCreateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentCreateWithoutLeadInput> = z.object({
  name: z.string(),
  deleted: z.boolean().optional(),
  pipeline: z.lazy(() => PipelineCreateNestedOneWithoutSegmentsInputSchema),
  segmentData: z.lazy(() => PipelineSegmentDataCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedCreateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedCreateWithoutLeadInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional(),
  pipelineId: z.string(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedCreateNestedManyWithoutSegmentInputSchema).optional()
}).strict();

export const PipelineSegmentCreateOrConnectWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentCreateOrConnectWithoutLeadInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutLeadInputSchema) ]),
}).strict();

export const UserUpsertWithoutLeadInputSchema: z.ZodType<Prisma.UserUpsertWithoutLeadInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutLeadInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLeadInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutLeadInputSchema),z.lazy(() => UserUncheckedCreateWithoutLeadInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutLeadInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutLeadInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutLeadInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLeadInputSchema) ]),
}).strict();

export const UserUpdateWithoutLeadInputSchema: z.ZodType<Prisma.UserUpdateWithoutLeadInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutLeadInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLeadInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const PipelineUpsertWithoutLeadInputSchema: z.ZodType<Prisma.PipelineUpsertWithoutLeadInput> = z.object({
  update: z.union([ z.lazy(() => PipelineUpdateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutLeadInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineCreateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedCreateWithoutLeadInputSchema) ]),
  where: z.lazy(() => PipelineWhereInputSchema).optional()
}).strict();

export const PipelineUpdateToOneWithWhereWithoutLeadInputSchema: z.ZodType<Prisma.PipelineUpdateToOneWithWhereWithoutLeadInput> = z.object({
  where: z.lazy(() => PipelineWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PipelineUpdateWithoutLeadInputSchema),z.lazy(() => PipelineUncheckedUpdateWithoutLeadInputSchema) ]),
}).strict();

export const PipelineUpdateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineUpdateWithoutLeadInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutPipelineNestedInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateWithoutLeadInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUpsertWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentUpsertWithoutLeadInput> = z.object({
  update: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutLeadInputSchema) ]),
  create: z.union([ z.lazy(() => PipelineSegmentCreateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedCreateWithoutLeadInputSchema) ]),
  where: z.lazy(() => PipelineSegmentWhereInputSchema).optional()
}).strict();

export const PipelineSegmentUpdateToOneWithWhereWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateToOneWithWhereWithoutLeadInput> = z.object({
  where: z.lazy(() => PipelineSegmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PipelineSegmentUpdateWithoutLeadInputSchema),z.lazy(() => PipelineSegmentUncheckedUpdateWithoutLeadInputSchema) ]),
}).strict();

export const PipelineSegmentUpdateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateWithoutLeadInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneRequiredWithoutSegmentsNestedInputSchema).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedUpdateWithoutLeadInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateWithoutLeadInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const CommunityQuestionCreateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutQuestionsCreatedInputSchema),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedCreateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  createdById: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutQuestionInputSchema).optional()
}).strict();

export const CommunityQuestionCreateOrConnectWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionCreateOrConnectWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityQuestionCreateManyCommunityInputEnvelopeSchema: z.ZodType<Prisma.CommunityQuestionCreateManyCommunityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommunityQuestionCreateManyCommunityInputSchema),z.lazy(() => CommunityQuestionCreateManyCommunityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommunityMembershipCreateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutMembershipsInputSchema)
}).strict();

export const CommunityMembershipUncheckedCreateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const CommunityMembershipCreateOrConnectWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipCreateOrConnectWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityMembershipCreateManyCommunityInputEnvelopeSchema: z.ZodType<Prisma.CommunityMembershipCreateManyCommunityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CommunityMembershipCreateManyCommunityInputSchema),z.lazy(() => CommunityMembershipCreateManyCommunityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserAnswerCreateWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  value: z.string(),
  answeredAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAnswersInputSchema),
  question: z.lazy(() => CommunityQuestionCreateNestedOneWithoutAnswersInputSchema)
}).strict();

export const UserAnswerUncheckedCreateWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateWithoutCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  questionId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerCreateOrConnectWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerCreateOrConnectWithoutCommunityInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const UserAnswerCreateManyCommunityInputEnvelopeSchema: z.ZodType<Prisma.UserAnswerCreateManyCommunityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserAnswerCreateManyCommunityInputSchema),z.lazy(() => UserAnswerCreateManyCommunityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUpsertWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutCommunityInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutCommunityInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityQuestionUpdateManyWithWhereWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyWithWhereWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityQuestionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommunityQuestionUpdateManyMutationInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUpsertWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CommunityMembershipUpdateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateWithoutCommunityInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityMembershipCreateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityMembershipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CommunityMembershipUpdateWithoutCommunityInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateWithoutCommunityInputSchema) ]),
}).strict();

export const CommunityMembershipUpdateManyWithWhereWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyWithWhereWithoutCommunityInput> = z.object({
  where: z.lazy(() => CommunityMembershipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CommunityMembershipUpdateManyMutationInputSchema),z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutCommunityInputSchema) ]),
}).strict();

export const UserAnswerUpsertWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUpsertWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutCommunityInputSchema) ]),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutCommunityInputSchema) ]),
}).strict();

export const UserAnswerUpdateWithWhereUniqueWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithWhereUniqueWithoutCommunityInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateWithoutCommunityInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutCommunityInputSchema) ]),
}).strict();

export const UserAnswerUpdateManyWithWhereWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithWhereWithoutCommunityInput> = z.object({
  where: z.lazy(() => UserAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateManyMutationInputSchema),z.lazy(() => UserAnswerUncheckedUpdateManyWithoutCommunityInputSchema) ]),
}).strict();

export const UserCreateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateWithoutMembershipsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMembershipsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMembershipsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMembershipsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]),
}).strict();

export const CommunityCreateWithoutMembersInputSchema: z.ZodType<Prisma.CommunityCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.CommunityCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => CommunityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserUpsertWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpsertWithoutMembershipsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembershipsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembershipsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMembershipsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembershipsInputSchema) ]),
}).strict();

export const UserUpdateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUpdateWithoutMembershipsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMembershipsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMembershipsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const CommunityUpsertWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityCreateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export const CommunityUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => CommunityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommunityUpdateWithoutMembersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const CommunityUpdateWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.CommunityUncheckedUpdateWithoutMembersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityCreateWithoutQuestionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => CommunityMembershipCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityUncheckedCreateWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityUncheckedCreateWithoutQuestionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  members: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutCommunityInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityCreateOrConnectWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityCreateOrConnectWithoutQuestionsInput> = z.object({
  where: z.lazy(() => CommunityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityCreateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutQuestionsInputSchema) ]),
}).strict();

export const UserCreateWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserCreateWithoutQuestionsCreatedInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutQuestionsCreatedInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutQuestionsCreatedInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuestionsCreatedInputSchema) ]),
}).strict();

export const UserAnswerCreateWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerCreateWithoutQuestionInput> = z.object({
  id: z.string().cuid().optional(),
  value: z.string(),
  answeredAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAnswersInputSchema),
  community: z.lazy(() => CommunityCreateNestedOneWithoutAnswersInputSchema)
}).strict();

export const UserAnswerUncheckedCreateWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUncheckedCreateWithoutQuestionInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerCreateOrConnectWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerCreateOrConnectWithoutQuestionInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const UserAnswerCreateManyQuestionInputEnvelopeSchema: z.ZodType<Prisma.UserAnswerCreateManyQuestionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserAnswerCreateManyQuestionInputSchema),z.lazy(() => UserAnswerCreateManyQuestionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CommunityUpsertWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityUpsertWithoutQuestionsInput> = z.object({
  update: z.union([ z.lazy(() => CommunityUpdateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutQuestionsInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityCreateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutQuestionsInputSchema) ]),
  where: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export const CommunityUpdateToOneWithWhereWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityUpdateToOneWithWhereWithoutQuestionsInput> = z.object({
  where: z.lazy(() => CommunityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommunityUpdateWithoutQuestionsInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutQuestionsInputSchema) ]),
}).strict();

export const CommunityUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => CommunityMembershipUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityUncheckedUpdateWithoutQuestionsInputSchema: z.ZodType<Prisma.CommunityUncheckedUpdateWithoutQuestionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  members: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserUpsertWithoutQuestionsCreatedInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutQuestionsCreatedInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedCreateWithoutQuestionsCreatedInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutQuestionsCreatedInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutQuestionsCreatedInputSchema),z.lazy(() => UserUncheckedUpdateWithoutQuestionsCreatedInputSchema) ]),
}).strict();

export const UserUpdateWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserUpdateWithoutQuestionsCreatedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutQuestionsCreatedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutQuestionsCreatedInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserAnswerUpsertWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUpsertWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
  create: z.union([ z.lazy(() => UserAnswerCreateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedCreateWithoutQuestionInputSchema) ]),
}).strict();

export const UserAnswerUpdateWithWhereUniqueWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithWhereUniqueWithoutQuestionInput> = z.object({
  where: z.lazy(() => UserAnswerWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateWithoutQuestionInputSchema),z.lazy(() => UserAnswerUncheckedUpdateWithoutQuestionInputSchema) ]),
}).strict();

export const UserAnswerUpdateManyWithWhereWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUpdateManyWithWhereWithoutQuestionInput> = z.object({
  where: z.lazy(() => UserAnswerScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserAnswerUpdateManyMutationInputSchema),z.lazy(() => UserAnswerUncheckedUpdateManyWithoutQuestionInputSchema) ]),
}).strict();

export const UserCreateWithoutAnswersInputSchema: z.ZodType<Prisma.UserCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedCreateNestedManyWithoutCreatedByInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const CommunityQuestionCreateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional(),
  community: z.lazy(() => CommunityCreateNestedOneWithoutQuestionsInputSchema),
  createdBy: z.lazy(() => UserCreateNestedOneWithoutQuestionsCreatedInputSchema)
}).strict();

export const CommunityQuestionUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  createdById: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional()
}).strict();

export const CommunityQuestionCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const CommunityCreateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionCreateNestedManyWithoutCommunityInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityUncheckedCreateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityUncheckedCreateWithoutAnswersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedCreateNestedManyWithoutCommunityInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUncheckedCreateNestedManyWithoutCommunityInputSchema).optional()
}).strict();

export const CommunityCreateOrConnectWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityCreateOrConnectWithoutAnswersInput> = z.object({
  where: z.lazy(() => CommunityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CommunityCreateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutAnswersInputSchema) ]),
}).strict();

export const UserUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.UserUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAnswersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const UserUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.UserUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  memberships: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  questionsCreated: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  posts: z.lazy(() => PostUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  tasks: z.lazy(() => TaskUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Pipeline: z.lazy(() => PipelineUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutCreatedByNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityQuestionCreateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => CommunityQuestionWhereInputSchema).optional()
}).strict();

export const CommunityQuestionUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => CommunityQuestionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommunityQuestionUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityQuestionUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const CommunityQuestionUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutQuestionsCreatedNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityUpsertWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityUpsertWithoutAnswersInput> = z.object({
  update: z.union([ z.lazy(() => CommunityUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutAnswersInputSchema) ]),
  create: z.union([ z.lazy(() => CommunityCreateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedCreateWithoutAnswersInputSchema) ]),
  where: z.lazy(() => CommunityWhereInputSchema).optional()
}).strict();

export const CommunityUpdateToOneWithWhereWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityUpdateToOneWithWhereWithoutAnswersInput> = z.object({
  where: z.lazy(() => CommunityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CommunityUpdateWithoutAnswersInputSchema),z.lazy(() => CommunityUncheckedUpdateWithoutAnswersInputSchema) ]),
}).strict();

export const CommunityUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUpdateManyWithoutCommunityNestedInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityUncheckedUpdateWithoutAnswersInputSchema: z.ZodType<Prisma.CommunityUncheckedUpdateWithoutAnswersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  questions: z.lazy(() => CommunityQuestionUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional(),
  members: z.lazy(() => CommunityMembershipUncheckedUpdateManyWithoutCommunityNestedInputSchema).optional()
}).strict();

export const CommunityMembershipCreateManyUserInputSchema: z.ZodType<Prisma.CommunityMembershipCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UserAnswerCreateManyUserInputSchema: z.ZodType<Prisma.UserAnswerCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  questionId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const CommunityQuestionCreateManyCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionCreateManyCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  communityId: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  refresh_token_expires_in: z.number().int().optional().nullable()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const PostCreateManyCreatedByInputSchema: z.ZodType<Prisma.PostCreateManyCreatedByInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const TaskCreateManyCreatedByInputSchema: z.ZodType<Prisma.TaskCreateManyCreatedByInput> = z.object({
  id: z.number().int().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  status: z.lazy(() => TaskStatusSchema).optional(),
  priority: z.lazy(() => TaskPrioritySchema).optional(),
  dueDate: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineCreateManyCreatedByInputSchema: z.ZodType<Prisma.PipelineCreateManyCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadCreateManyCreatedByInputSchema: z.ZodType<Prisma.LeadCreateManyCreatedByInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  pipelineId: z.string().optional().nullable(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CommunityMembershipUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const CommunityMembershipUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  question: z.lazy(() => CommunityQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutAnswersNestedInputSchema).optional()
}).strict();

export const UserAnswerUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutQuestionsNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refresh_token_expires_in: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUpdateWithoutCreatedByInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUpdateWithoutCreatedByInput> = z.object({
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TaskUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.TaskUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  priority: z.union([ z.lazy(() => TaskPrioritySchema),z.lazy(() => EnumTaskPriorityFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  segments: z.lazy(() => PipelineSegmentUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutPipelineNestedInputSchema).optional()
}).strict();

export const PipelineUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.PipelineUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneWithoutLeadNestedInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentUpdateOneWithoutLeadNestedInputSchema).optional()
}).strict();

export const LeadUncheckedUpdateWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutCreatedByInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutCreatedByInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataCreateManyPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManyPipelineInput> = z.object({
  id: z.number().int().optional(),
  segmentId: z.number().int(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentCreateManyPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentCreateManyPipelineInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  deleted: z.boolean().optional()
}).strict();

export const LeadCreateManyPipelineInputSchema: z.ZodType<Prisma.LeadCreateManyPipelineInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  segmentId: z.number().int().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateWithoutPipelineInput> = z.object({
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  segment: z.lazy(() => PipelineSegmentUpdateOneRequiredWithoutSegmentDataNestedInputSchema).optional()
}).strict();

export const PipelineSegmentDataUncheckedUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedUpdateManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateManyWithoutPipelineInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUpdateWithoutPipelineInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUpdateManyWithoutSegmentNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  segmentData: z.lazy(() => PipelineSegmentDataUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional(),
  Lead: z.lazy(() => LeadUncheckedUpdateManyWithoutSegmentNestedInputSchema).optional()
}).strict();

export const PipelineSegmentUncheckedUpdateManyWithoutPipelineInputSchema: z.ZodType<Prisma.PipelineSegmentUncheckedUpdateManyWithoutPipelineInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutLeadNestedInputSchema).optional(),
  segment: z.lazy(() => PipelineSegmentUpdateOneWithoutLeadNestedInputSchema).optional()
}).strict();

export const LeadUncheckedUpdateWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateWithoutPipelineInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutPipelineInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutPipelineInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  segmentId: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataCreateManySegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManySegmentInput> = z.object({
  id: z.number().int().optional(),
  pipelineId: z.string(),
  completedAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const LeadCreateManySegmentInputSchema: z.ZodType<Prisma.LeadCreateManySegmentInput> = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  capitalValue: z.number().int().optional().nullable(),
  contactName: z.string(),
  companyName: z.string(),
  avatarURL: z.string().optional().nullable(),
  addedOn: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional().nullable(),
  status: z.string().optional(),
  leadType: z.string().optional(),
  pipelineStage: z.string().optional().nullable(),
  isArchived: z.boolean().optional(),
  source: z.string().optional().nullable(),
  tags: z.union([ z.lazy(() => LeadCreatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.string(),
  pipelineId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PipelineSegmentDataUpdateWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateWithoutSegmentInput> = z.object({
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneRequiredWithoutSegmentDataNestedInputSchema).optional()
}).strict();

export const PipelineSegmentDataUncheckedUpdateWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateWithoutSegmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PipelineSegmentDataUncheckedUpdateManyWithoutSegmentInputSchema: z.ZodType<Prisma.PipelineSegmentDataUncheckedUpdateManyWithoutSegmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  notes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUpdateWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUpdateWithoutSegmentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutLeadNestedInputSchema).optional(),
  pipeline: z.lazy(() => PipelineUpdateOneWithoutLeadNestedInputSchema).optional()
}).strict();

export const LeadUncheckedUpdateWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateWithoutSegmentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LeadUncheckedUpdateManyWithoutSegmentInputSchema: z.ZodType<Prisma.LeadUncheckedUpdateManyWithoutSegmentInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  capitalValue: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contactName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatarURL: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  addedOn: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dueDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  leadType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineStage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isArchived: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  source: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.union([ z.lazy(() => LeadUpdatetagsInputSchema),z.string().array() ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pipelineId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityQuestionCreateManyCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionCreateManyCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  createdById: z.string(),
  label: z.string(),
  type: z.lazy(() => QuestionTypeSchema),
  options: z.union([ z.lazy(() => CommunityQuestionCreateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.boolean().optional(),
  order: z.number().int().optional()
}).strict();

export const CommunityMembershipCreateManyCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipCreateManyCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  role: z.lazy(() => MembershipRoleSchema).optional(),
  joinedAt: z.coerce.date().optional()
}).strict();

export const UserAnswerCreateManyCommunityInputSchema: z.ZodType<Prisma.UserAnswerCreateManyCommunityInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  questionId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const CommunityQuestionUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdBy: z.lazy(() => UserUpdateOneRequiredWithoutQuestionsCreatedNestedInputSchema).optional(),
  answers: z.lazy(() => UserAnswerUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  answers: z.lazy(() => UserAnswerUncheckedUpdateManyWithoutQuestionNestedInputSchema).optional()
}).strict();

export const CommunityQuestionUncheckedUpdateManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityQuestionUncheckedUpdateManyWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdById: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => QuestionTypeSchema),z.lazy(() => EnumQuestionTypeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.union([ z.lazy(() => CommunityQuestionUpdateoptionsInputSchema),z.string().array() ]).optional(),
  required: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  order: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembershipsNestedInputSchema).optional()
}).strict();

export const CommunityMembershipUncheckedUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CommunityMembershipUncheckedUpdateManyWithoutCommunityInputSchema: z.ZodType<Prisma.CommunityMembershipUncheckedUpdateManyWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => MembershipRoleSchema),z.lazy(() => EnumMembershipRoleFieldUpdateOperationsInputSchema) ]).optional(),
  joinedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  question: z.lazy(() => CommunityQuestionUpdateOneRequiredWithoutAnswersNestedInputSchema).optional()
}).strict();

export const UserAnswerUncheckedUpdateWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutCommunityInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutCommunityInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  questionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerCreateManyQuestionInputSchema: z.ZodType<Prisma.UserAnswerCreateManyQuestionInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  communityId: z.string(),
  value: z.string(),
  answeredAt: z.coerce.date().optional()
}).strict();

export const UserAnswerUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAnswersNestedInputSchema).optional(),
  community: z.lazy(() => CommunityUpdateOneRequiredWithoutAnswersNestedInputSchema).optional()
}).strict();

export const UserAnswerUncheckedUpdateWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateWithoutQuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserAnswerUncheckedUpdateManyWithoutQuestionInputSchema: z.ZodType<Prisma.UserAnswerUncheckedUpdateManyWithoutQuestionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  communityId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  answeredAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const TaskFindFirstArgsSchema: z.ZodType<Prisma.TaskFindFirstArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TaskFindFirstOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskFindManyArgsSchema: z.ZodType<Prisma.TaskFindManyArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskScalarFieldEnumSchema,TaskScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TaskAggregateArgsSchema: z.ZodType<Prisma.TaskAggregateArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithRelationInputSchema.array(),TaskOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskGroupByArgsSchema: z.ZodType<Prisma.TaskGroupByArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  orderBy: z.union([ TaskOrderByWithAggregationInputSchema.array(),TaskOrderByWithAggregationInputSchema ]).optional(),
  by: TaskScalarFieldEnumSchema.array(),
  having: TaskScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TaskFindUniqueArgsSchema: z.ZodType<Prisma.TaskFindUniqueArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TaskFindUniqueOrThrowArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const PipelineFindFirstArgsSchema: z.ZodType<Prisma.PipelineFindFirstArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereInputSchema.optional(),
  orderBy: z.union([ PipelineOrderByWithRelationInputSchema.array(),PipelineOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineScalarFieldEnumSchema,PipelineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PipelineFindFirstOrThrowArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereInputSchema.optional(),
  orderBy: z.union([ PipelineOrderByWithRelationInputSchema.array(),PipelineOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineScalarFieldEnumSchema,PipelineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineFindManyArgsSchema: z.ZodType<Prisma.PipelineFindManyArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereInputSchema.optional(),
  orderBy: z.union([ PipelineOrderByWithRelationInputSchema.array(),PipelineOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineScalarFieldEnumSchema,PipelineScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineAggregateArgsSchema: z.ZodType<Prisma.PipelineAggregateArgs> = z.object({
  where: PipelineWhereInputSchema.optional(),
  orderBy: z.union([ PipelineOrderByWithRelationInputSchema.array(),PipelineOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineGroupByArgsSchema: z.ZodType<Prisma.PipelineGroupByArgs> = z.object({
  where: PipelineWhereInputSchema.optional(),
  orderBy: z.union([ PipelineOrderByWithAggregationInputSchema.array(),PipelineOrderByWithAggregationInputSchema ]).optional(),
  by: PipelineScalarFieldEnumSchema.array(),
  having: PipelineScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineFindUniqueArgsSchema: z.ZodType<Prisma.PipelineFindUniqueArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereUniqueInputSchema,
}).strict() ;

export const PipelineFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PipelineFindUniqueOrThrowArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentFindFirstArgsSchema: z.ZodType<Prisma.PipelineSegmentFindFirstArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentOrderByWithRelationInputSchema.array(),PipelineSegmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentScalarFieldEnumSchema,PipelineSegmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PipelineSegmentFindFirstOrThrowArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentOrderByWithRelationInputSchema.array(),PipelineSegmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentScalarFieldEnumSchema,PipelineSegmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentFindManyArgsSchema: z.ZodType<Prisma.PipelineSegmentFindManyArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentOrderByWithRelationInputSchema.array(),PipelineSegmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentScalarFieldEnumSchema,PipelineSegmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentAggregateArgsSchema: z.ZodType<Prisma.PipelineSegmentAggregateArgs> = z.object({
  where: PipelineSegmentWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentOrderByWithRelationInputSchema.array(),PipelineSegmentOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineSegmentGroupByArgsSchema: z.ZodType<Prisma.PipelineSegmentGroupByArgs> = z.object({
  where: PipelineSegmentWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentOrderByWithAggregationInputSchema.array(),PipelineSegmentOrderByWithAggregationInputSchema ]).optional(),
  by: PipelineSegmentScalarFieldEnumSchema.array(),
  having: PipelineSegmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineSegmentFindUniqueArgsSchema: z.ZodType<Prisma.PipelineSegmentFindUniqueArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PipelineSegmentFindUniqueOrThrowArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentDataFindFirstArgsSchema: z.ZodType<Prisma.PipelineSegmentDataFindFirstArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentDataOrderByWithRelationInputSchema.array(),PipelineSegmentDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentDataScalarFieldEnumSchema,PipelineSegmentDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentDataFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PipelineSegmentDataFindFirstOrThrowArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentDataOrderByWithRelationInputSchema.array(),PipelineSegmentDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentDataScalarFieldEnumSchema,PipelineSegmentDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentDataFindManyArgsSchema: z.ZodType<Prisma.PipelineSegmentDataFindManyArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentDataOrderByWithRelationInputSchema.array(),PipelineSegmentDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PipelineSegmentDataScalarFieldEnumSchema,PipelineSegmentDataScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PipelineSegmentDataAggregateArgsSchema: z.ZodType<Prisma.PipelineSegmentDataAggregateArgs> = z.object({
  where: PipelineSegmentDataWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentDataOrderByWithRelationInputSchema.array(),PipelineSegmentDataOrderByWithRelationInputSchema ]).optional(),
  cursor: PipelineSegmentDataWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineSegmentDataGroupByArgsSchema: z.ZodType<Prisma.PipelineSegmentDataGroupByArgs> = z.object({
  where: PipelineSegmentDataWhereInputSchema.optional(),
  orderBy: z.union([ PipelineSegmentDataOrderByWithAggregationInputSchema.array(),PipelineSegmentDataOrderByWithAggregationInputSchema ]).optional(),
  by: PipelineSegmentDataScalarFieldEnumSchema.array(),
  having: PipelineSegmentDataScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PipelineSegmentDataFindUniqueArgsSchema: z.ZodType<Prisma.PipelineSegmentDataFindUniqueArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentDataFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PipelineSegmentDataFindUniqueOrThrowArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereUniqueInputSchema,
}).strict() ;

export const LeadFindFirstArgsSchema: z.ZodType<Prisma.LeadFindFirstArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereInputSchema.optional(),
  orderBy: z.union([ LeadOrderByWithRelationInputSchema.array(),LeadOrderByWithRelationInputSchema ]).optional(),
  cursor: LeadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LeadScalarFieldEnumSchema,LeadScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LeadFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LeadFindFirstOrThrowArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereInputSchema.optional(),
  orderBy: z.union([ LeadOrderByWithRelationInputSchema.array(),LeadOrderByWithRelationInputSchema ]).optional(),
  cursor: LeadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LeadScalarFieldEnumSchema,LeadScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LeadFindManyArgsSchema: z.ZodType<Prisma.LeadFindManyArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereInputSchema.optional(),
  orderBy: z.union([ LeadOrderByWithRelationInputSchema.array(),LeadOrderByWithRelationInputSchema ]).optional(),
  cursor: LeadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LeadScalarFieldEnumSchema,LeadScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LeadAggregateArgsSchema: z.ZodType<Prisma.LeadAggregateArgs> = z.object({
  where: LeadWhereInputSchema.optional(),
  orderBy: z.union([ LeadOrderByWithRelationInputSchema.array(),LeadOrderByWithRelationInputSchema ]).optional(),
  cursor: LeadWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LeadGroupByArgsSchema: z.ZodType<Prisma.LeadGroupByArgs> = z.object({
  where: LeadWhereInputSchema.optional(),
  orderBy: z.union([ LeadOrderByWithAggregationInputSchema.array(),LeadOrderByWithAggregationInputSchema ]).optional(),
  by: LeadScalarFieldEnumSchema.array(),
  having: LeadScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LeadFindUniqueArgsSchema: z.ZodType<Prisma.LeadFindUniqueArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereUniqueInputSchema,
}).strict() ;

export const LeadFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LeadFindUniqueOrThrowArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereUniqueInputSchema,
}).strict() ;

export const CommunityFindFirstArgsSchema: z.ZodType<Prisma.CommunityFindFirstArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithRelationInputSchema.array(),CommunityOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityScalarFieldEnumSchema,CommunityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommunityFindFirstOrThrowArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithRelationInputSchema.array(),CommunityOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityScalarFieldEnumSchema,CommunityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityFindManyArgsSchema: z.ZodType<Prisma.CommunityFindManyArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithRelationInputSchema.array(),CommunityOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityScalarFieldEnumSchema,CommunityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityAggregateArgsSchema: z.ZodType<Prisma.CommunityAggregateArgs> = z.object({
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithRelationInputSchema.array(),CommunityOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityGroupByArgsSchema: z.ZodType<Prisma.CommunityGroupByArgs> = z.object({
  where: CommunityWhereInputSchema.optional(),
  orderBy: z.union([ CommunityOrderByWithAggregationInputSchema.array(),CommunityOrderByWithAggregationInputSchema ]).optional(),
  by: CommunityScalarFieldEnumSchema.array(),
  having: CommunityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityFindUniqueArgsSchema: z.ZodType<Prisma.CommunityFindUniqueArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereUniqueInputSchema,
}).strict() ;

export const CommunityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommunityFindUniqueOrThrowArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereUniqueInputSchema,
}).strict() ;

export const CommunityMembershipFindFirstArgsSchema: z.ZodType<Prisma.CommunityMembershipFindFirstArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereInputSchema.optional(),
  orderBy: z.union([ CommunityMembershipOrderByWithRelationInputSchema.array(),CommunityMembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityMembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityMembershipScalarFieldEnumSchema,CommunityMembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityMembershipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommunityMembershipFindFirstOrThrowArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereInputSchema.optional(),
  orderBy: z.union([ CommunityMembershipOrderByWithRelationInputSchema.array(),CommunityMembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityMembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityMembershipScalarFieldEnumSchema,CommunityMembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityMembershipFindManyArgsSchema: z.ZodType<Prisma.CommunityMembershipFindManyArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereInputSchema.optional(),
  orderBy: z.union([ CommunityMembershipOrderByWithRelationInputSchema.array(),CommunityMembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityMembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityMembershipScalarFieldEnumSchema,CommunityMembershipScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityMembershipAggregateArgsSchema: z.ZodType<Prisma.CommunityMembershipAggregateArgs> = z.object({
  where: CommunityMembershipWhereInputSchema.optional(),
  orderBy: z.union([ CommunityMembershipOrderByWithRelationInputSchema.array(),CommunityMembershipOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityMembershipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityMembershipGroupByArgsSchema: z.ZodType<Prisma.CommunityMembershipGroupByArgs> = z.object({
  where: CommunityMembershipWhereInputSchema.optional(),
  orderBy: z.union([ CommunityMembershipOrderByWithAggregationInputSchema.array(),CommunityMembershipOrderByWithAggregationInputSchema ]).optional(),
  by: CommunityMembershipScalarFieldEnumSchema.array(),
  having: CommunityMembershipScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityMembershipFindUniqueArgsSchema: z.ZodType<Prisma.CommunityMembershipFindUniqueArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereUniqueInputSchema,
}).strict() ;

export const CommunityMembershipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommunityMembershipFindUniqueOrThrowArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereUniqueInputSchema,
}).strict() ;

export const CommunityQuestionFindFirstArgsSchema: z.ZodType<Prisma.CommunityQuestionFindFirstArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereInputSchema.optional(),
  orderBy: z.union([ CommunityQuestionOrderByWithRelationInputSchema.array(),CommunityQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityQuestionScalarFieldEnumSchema,CommunityQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityQuestionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CommunityQuestionFindFirstOrThrowArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereInputSchema.optional(),
  orderBy: z.union([ CommunityQuestionOrderByWithRelationInputSchema.array(),CommunityQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityQuestionScalarFieldEnumSchema,CommunityQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityQuestionFindManyArgsSchema: z.ZodType<Prisma.CommunityQuestionFindManyArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereInputSchema.optional(),
  orderBy: z.union([ CommunityQuestionOrderByWithRelationInputSchema.array(),CommunityQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CommunityQuestionScalarFieldEnumSchema,CommunityQuestionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CommunityQuestionAggregateArgsSchema: z.ZodType<Prisma.CommunityQuestionAggregateArgs> = z.object({
  where: CommunityQuestionWhereInputSchema.optional(),
  orderBy: z.union([ CommunityQuestionOrderByWithRelationInputSchema.array(),CommunityQuestionOrderByWithRelationInputSchema ]).optional(),
  cursor: CommunityQuestionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityQuestionGroupByArgsSchema: z.ZodType<Prisma.CommunityQuestionGroupByArgs> = z.object({
  where: CommunityQuestionWhereInputSchema.optional(),
  orderBy: z.union([ CommunityQuestionOrderByWithAggregationInputSchema.array(),CommunityQuestionOrderByWithAggregationInputSchema ]).optional(),
  by: CommunityQuestionScalarFieldEnumSchema.array(),
  having: CommunityQuestionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CommunityQuestionFindUniqueArgsSchema: z.ZodType<Prisma.CommunityQuestionFindUniqueArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereUniqueInputSchema,
}).strict() ;

export const CommunityQuestionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CommunityQuestionFindUniqueOrThrowArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereUniqueInputSchema,
}).strict() ;

export const UserAnswerFindFirstArgsSchema: z.ZodType<Prisma.UserAnswerFindFirstArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereInputSchema.optional(),
  orderBy: z.union([ UserAnswerOrderByWithRelationInputSchema.array(),UserAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAnswerScalarFieldEnumSchema,UserAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAnswerFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserAnswerFindFirstOrThrowArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereInputSchema.optional(),
  orderBy: z.union([ UserAnswerOrderByWithRelationInputSchema.array(),UserAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAnswerScalarFieldEnumSchema,UserAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAnswerFindManyArgsSchema: z.ZodType<Prisma.UserAnswerFindManyArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereInputSchema.optional(),
  orderBy: z.union([ UserAnswerOrderByWithRelationInputSchema.array(),UserAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserAnswerScalarFieldEnumSchema,UserAnswerScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAnswerAggregateArgsSchema: z.ZodType<Prisma.UserAnswerAggregateArgs> = z.object({
  where: UserAnswerWhereInputSchema.optional(),
  orderBy: z.union([ UserAnswerOrderByWithRelationInputSchema.array(),UserAnswerOrderByWithRelationInputSchema ]).optional(),
  cursor: UserAnswerWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserAnswerGroupByArgsSchema: z.ZodType<Prisma.UserAnswerGroupByArgs> = z.object({
  where: UserAnswerWhereInputSchema.optional(),
  orderBy: z.union([ UserAnswerOrderByWithAggregationInputSchema.array(),UserAnswerOrderByWithAggregationInputSchema ]).optional(),
  by: UserAnswerScalarFieldEnumSchema.array(),
  having: UserAnswerScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserAnswerFindUniqueArgsSchema: z.ZodType<Prisma.UserAnswerFindUniqueArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereUniqueInputSchema,
}).strict() ;

export const UserAnswerFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserAnswerFindUniqueOrThrowArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereUniqueInputSchema,
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  include: PostIncludeSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyAndReturnArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskCreateArgsSchema: z.ZodType<Prisma.TaskCreateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
}).strict() ;

export const TaskUpsertArgsSchema: z.ZodType<Prisma.TaskUpsertArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
  create: z.union([ TaskCreateInputSchema,TaskUncheckedCreateInputSchema ]),
  update: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
}).strict() ;

export const TaskCreateManyArgsSchema: z.ZodType<Prisma.TaskCreateManyArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskCreateManyAndReturnArgs> = z.object({
  data: z.union([ TaskCreateManyInputSchema,TaskCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TaskDeleteArgsSchema: z.ZodType<Prisma.TaskDeleteArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateArgsSchema: z.ZodType<Prisma.TaskUpdateArgs> = z.object({
  select: TaskSelectSchema.optional(),
  include: TaskIncludeSchema.optional(),
  data: z.union([ TaskUpdateInputSchema,TaskUncheckedUpdateInputSchema ]),
  where: TaskWhereUniqueInputSchema,
}).strict() ;

export const TaskUpdateManyArgsSchema: z.ZodType<Prisma.TaskUpdateManyArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TaskUpdateManyAndReturnArgs> = z.object({
  data: z.union([ TaskUpdateManyMutationInputSchema,TaskUncheckedUpdateManyInputSchema ]),
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TaskDeleteManyArgsSchema: z.ZodType<Prisma.TaskDeleteManyArgs> = z.object({
  where: TaskWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineCreateArgsSchema: z.ZodType<Prisma.PipelineCreateArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  data: z.union([ PipelineCreateInputSchema,PipelineUncheckedCreateInputSchema ]),
}).strict() ;

export const PipelineUpsertArgsSchema: z.ZodType<Prisma.PipelineUpsertArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereUniqueInputSchema,
  create: z.union([ PipelineCreateInputSchema,PipelineUncheckedCreateInputSchema ]),
  update: z.union([ PipelineUpdateInputSchema,PipelineUncheckedUpdateInputSchema ]),
}).strict() ;

export const PipelineCreateManyArgsSchema: z.ZodType<Prisma.PipelineCreateManyArgs> = z.object({
  data: z.union([ PipelineCreateManyInputSchema,PipelineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineCreateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineCreateManyInputSchema,PipelineCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineDeleteArgsSchema: z.ZodType<Prisma.PipelineDeleteArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  where: PipelineWhereUniqueInputSchema,
}).strict() ;

export const PipelineUpdateArgsSchema: z.ZodType<Prisma.PipelineUpdateArgs> = z.object({
  select: PipelineSelectSchema.optional(),
  include: PipelineIncludeSchema.optional(),
  data: z.union([ PipelineUpdateInputSchema,PipelineUncheckedUpdateInputSchema ]),
  where: PipelineWhereUniqueInputSchema,
}).strict() ;

export const PipelineUpdateManyArgsSchema: z.ZodType<Prisma.PipelineUpdateManyArgs> = z.object({
  data: z.union([ PipelineUpdateManyMutationInputSchema,PipelineUncheckedUpdateManyInputSchema ]),
  where: PipelineWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineUpdateManyMutationInputSchema,PipelineUncheckedUpdateManyInputSchema ]),
  where: PipelineWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineDeleteManyArgsSchema: z.ZodType<Prisma.PipelineDeleteManyArgs> = z.object({
  where: PipelineWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentCreateArgsSchema: z.ZodType<Prisma.PipelineSegmentCreateArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  data: z.union([ PipelineSegmentCreateInputSchema,PipelineSegmentUncheckedCreateInputSchema ]),
}).strict() ;

export const PipelineSegmentUpsertArgsSchema: z.ZodType<Prisma.PipelineSegmentUpsertArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereUniqueInputSchema,
  create: z.union([ PipelineSegmentCreateInputSchema,PipelineSegmentUncheckedCreateInputSchema ]),
  update: z.union([ PipelineSegmentUpdateInputSchema,PipelineSegmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const PipelineSegmentCreateManyArgsSchema: z.ZodType<Prisma.PipelineSegmentCreateManyArgs> = z.object({
  data: z.union([ PipelineSegmentCreateManyInputSchema,PipelineSegmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineSegmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineSegmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineSegmentCreateManyInputSchema,PipelineSegmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineSegmentDeleteArgsSchema: z.ZodType<Prisma.PipelineSegmentDeleteArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  where: PipelineSegmentWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentUpdateArgsSchema: z.ZodType<Prisma.PipelineSegmentUpdateArgs> = z.object({
  select: PipelineSegmentSelectSchema.optional(),
  include: PipelineSegmentIncludeSchema.optional(),
  data: z.union([ PipelineSegmentUpdateInputSchema,PipelineSegmentUncheckedUpdateInputSchema ]),
  where: PipelineSegmentWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentUpdateManyArgsSchema: z.ZodType<Prisma.PipelineSegmentUpdateManyArgs> = z.object({
  data: z.union([ PipelineSegmentUpdateManyMutationInputSchema,PipelineSegmentUncheckedUpdateManyInputSchema ]),
  where: PipelineSegmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineSegmentUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineSegmentUpdateManyMutationInputSchema,PipelineSegmentUncheckedUpdateManyInputSchema ]),
  where: PipelineSegmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentDeleteManyArgsSchema: z.ZodType<Prisma.PipelineSegmentDeleteManyArgs> = z.object({
  where: PipelineSegmentWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentDataCreateArgsSchema: z.ZodType<Prisma.PipelineSegmentDataCreateArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  data: z.union([ PipelineSegmentDataCreateInputSchema,PipelineSegmentDataUncheckedCreateInputSchema ]),
}).strict() ;

export const PipelineSegmentDataUpsertArgsSchema: z.ZodType<Prisma.PipelineSegmentDataUpsertArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereUniqueInputSchema,
  create: z.union([ PipelineSegmentDataCreateInputSchema,PipelineSegmentDataUncheckedCreateInputSchema ]),
  update: z.union([ PipelineSegmentDataUpdateInputSchema,PipelineSegmentDataUncheckedUpdateInputSchema ]),
}).strict() ;

export const PipelineSegmentDataCreateManyArgsSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManyArgs> = z.object({
  data: z.union([ PipelineSegmentDataCreateManyInputSchema,PipelineSegmentDataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineSegmentDataCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineSegmentDataCreateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineSegmentDataCreateManyInputSchema,PipelineSegmentDataCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PipelineSegmentDataDeleteArgsSchema: z.ZodType<Prisma.PipelineSegmentDataDeleteArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  where: PipelineSegmentDataWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentDataUpdateArgsSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateArgs> = z.object({
  select: PipelineSegmentDataSelectSchema.optional(),
  include: PipelineSegmentDataIncludeSchema.optional(),
  data: z.union([ PipelineSegmentDataUpdateInputSchema,PipelineSegmentDataUncheckedUpdateInputSchema ]),
  where: PipelineSegmentDataWhereUniqueInputSchema,
}).strict() ;

export const PipelineSegmentDataUpdateManyArgsSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyArgs> = z.object({
  data: z.union([ PipelineSegmentDataUpdateManyMutationInputSchema,PipelineSegmentDataUncheckedUpdateManyInputSchema ]),
  where: PipelineSegmentDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentDataUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PipelineSegmentDataUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PipelineSegmentDataUpdateManyMutationInputSchema,PipelineSegmentDataUncheckedUpdateManyInputSchema ]),
  where: PipelineSegmentDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PipelineSegmentDataDeleteManyArgsSchema: z.ZodType<Prisma.PipelineSegmentDataDeleteManyArgs> = z.object({
  where: PipelineSegmentDataWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LeadCreateArgsSchema: z.ZodType<Prisma.LeadCreateArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  data: z.union([ LeadCreateInputSchema,LeadUncheckedCreateInputSchema ]),
}).strict() ;

export const LeadUpsertArgsSchema: z.ZodType<Prisma.LeadUpsertArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereUniqueInputSchema,
  create: z.union([ LeadCreateInputSchema,LeadUncheckedCreateInputSchema ]),
  update: z.union([ LeadUpdateInputSchema,LeadUncheckedUpdateInputSchema ]),
}).strict() ;

export const LeadCreateManyArgsSchema: z.ZodType<Prisma.LeadCreateManyArgs> = z.object({
  data: z.union([ LeadCreateManyInputSchema,LeadCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LeadCreateManyAndReturnArgsSchema: z.ZodType<Prisma.LeadCreateManyAndReturnArgs> = z.object({
  data: z.union([ LeadCreateManyInputSchema,LeadCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LeadDeleteArgsSchema: z.ZodType<Prisma.LeadDeleteArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  where: LeadWhereUniqueInputSchema,
}).strict() ;

export const LeadUpdateArgsSchema: z.ZodType<Prisma.LeadUpdateArgs> = z.object({
  select: LeadSelectSchema.optional(),
  include: LeadIncludeSchema.optional(),
  data: z.union([ LeadUpdateInputSchema,LeadUncheckedUpdateInputSchema ]),
  where: LeadWhereUniqueInputSchema,
}).strict() ;

export const LeadUpdateManyArgsSchema: z.ZodType<Prisma.LeadUpdateManyArgs> = z.object({
  data: z.union([ LeadUpdateManyMutationInputSchema,LeadUncheckedUpdateManyInputSchema ]),
  where: LeadWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LeadUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.LeadUpdateManyAndReturnArgs> = z.object({
  data: z.union([ LeadUpdateManyMutationInputSchema,LeadUncheckedUpdateManyInputSchema ]),
  where: LeadWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const LeadDeleteManyArgsSchema: z.ZodType<Prisma.LeadDeleteManyArgs> = z.object({
  where: LeadWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityCreateArgsSchema: z.ZodType<Prisma.CommunityCreateArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  data: z.union([ CommunityCreateInputSchema,CommunityUncheckedCreateInputSchema ]),
}).strict() ;

export const CommunityUpsertArgsSchema: z.ZodType<Prisma.CommunityUpsertArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereUniqueInputSchema,
  create: z.union([ CommunityCreateInputSchema,CommunityUncheckedCreateInputSchema ]),
  update: z.union([ CommunityUpdateInputSchema,CommunityUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommunityCreateManyArgsSchema: z.ZodType<Prisma.CommunityCreateManyArgs> = z.object({
  data: z.union([ CommunityCreateManyInputSchema,CommunityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityCreateManyInputSchema,CommunityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityDeleteArgsSchema: z.ZodType<Prisma.CommunityDeleteArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  where: CommunityWhereUniqueInputSchema,
}).strict() ;

export const CommunityUpdateArgsSchema: z.ZodType<Prisma.CommunityUpdateArgs> = z.object({
  select: CommunitySelectSchema.optional(),
  include: CommunityIncludeSchema.optional(),
  data: z.union([ CommunityUpdateInputSchema,CommunityUncheckedUpdateInputSchema ]),
  where: CommunityWhereUniqueInputSchema,
}).strict() ;

export const CommunityUpdateManyArgsSchema: z.ZodType<Prisma.CommunityUpdateManyArgs> = z.object({
  data: z.union([ CommunityUpdateManyMutationInputSchema,CommunityUncheckedUpdateManyInputSchema ]),
  where: CommunityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityUpdateManyMutationInputSchema,CommunityUncheckedUpdateManyInputSchema ]),
  where: CommunityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityDeleteManyArgsSchema: z.ZodType<Prisma.CommunityDeleteManyArgs> = z.object({
  where: CommunityWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityMembershipCreateArgsSchema: z.ZodType<Prisma.CommunityMembershipCreateArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  data: z.union([ CommunityMembershipCreateInputSchema,CommunityMembershipUncheckedCreateInputSchema ]),
}).strict() ;

export const CommunityMembershipUpsertArgsSchema: z.ZodType<Prisma.CommunityMembershipUpsertArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereUniqueInputSchema,
  create: z.union([ CommunityMembershipCreateInputSchema,CommunityMembershipUncheckedCreateInputSchema ]),
  update: z.union([ CommunityMembershipUpdateInputSchema,CommunityMembershipUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommunityMembershipCreateManyArgsSchema: z.ZodType<Prisma.CommunityMembershipCreateManyArgs> = z.object({
  data: z.union([ CommunityMembershipCreateManyInputSchema,CommunityMembershipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityMembershipCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityMembershipCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityMembershipCreateManyInputSchema,CommunityMembershipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityMembershipDeleteArgsSchema: z.ZodType<Prisma.CommunityMembershipDeleteArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  where: CommunityMembershipWhereUniqueInputSchema,
}).strict() ;

export const CommunityMembershipUpdateArgsSchema: z.ZodType<Prisma.CommunityMembershipUpdateArgs> = z.object({
  select: CommunityMembershipSelectSchema.optional(),
  include: CommunityMembershipIncludeSchema.optional(),
  data: z.union([ CommunityMembershipUpdateInputSchema,CommunityMembershipUncheckedUpdateInputSchema ]),
  where: CommunityMembershipWhereUniqueInputSchema,
}).strict() ;

export const CommunityMembershipUpdateManyArgsSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyArgs> = z.object({
  data: z.union([ CommunityMembershipUpdateManyMutationInputSchema,CommunityMembershipUncheckedUpdateManyInputSchema ]),
  where: CommunityMembershipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityMembershipUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityMembershipUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityMembershipUpdateManyMutationInputSchema,CommunityMembershipUncheckedUpdateManyInputSchema ]),
  where: CommunityMembershipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityMembershipDeleteManyArgsSchema: z.ZodType<Prisma.CommunityMembershipDeleteManyArgs> = z.object({
  where: CommunityMembershipWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityQuestionCreateArgsSchema: z.ZodType<Prisma.CommunityQuestionCreateArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  data: z.union([ CommunityQuestionCreateInputSchema,CommunityQuestionUncheckedCreateInputSchema ]),
}).strict() ;

export const CommunityQuestionUpsertArgsSchema: z.ZodType<Prisma.CommunityQuestionUpsertArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereUniqueInputSchema,
  create: z.union([ CommunityQuestionCreateInputSchema,CommunityQuestionUncheckedCreateInputSchema ]),
  update: z.union([ CommunityQuestionUpdateInputSchema,CommunityQuestionUncheckedUpdateInputSchema ]),
}).strict() ;

export const CommunityQuestionCreateManyArgsSchema: z.ZodType<Prisma.CommunityQuestionCreateManyArgs> = z.object({
  data: z.union([ CommunityQuestionCreateManyInputSchema,CommunityQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityQuestionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityQuestionCreateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityQuestionCreateManyInputSchema,CommunityQuestionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CommunityQuestionDeleteArgsSchema: z.ZodType<Prisma.CommunityQuestionDeleteArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  where: CommunityQuestionWhereUniqueInputSchema,
}).strict() ;

export const CommunityQuestionUpdateArgsSchema: z.ZodType<Prisma.CommunityQuestionUpdateArgs> = z.object({
  select: CommunityQuestionSelectSchema.optional(),
  include: CommunityQuestionIncludeSchema.optional(),
  data: z.union([ CommunityQuestionUpdateInputSchema,CommunityQuestionUncheckedUpdateInputSchema ]),
  where: CommunityQuestionWhereUniqueInputSchema,
}).strict() ;

export const CommunityQuestionUpdateManyArgsSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyArgs> = z.object({
  data: z.union([ CommunityQuestionUpdateManyMutationInputSchema,CommunityQuestionUncheckedUpdateManyInputSchema ]),
  where: CommunityQuestionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityQuestionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CommunityQuestionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ CommunityQuestionUpdateManyMutationInputSchema,CommunityQuestionUncheckedUpdateManyInputSchema ]),
  where: CommunityQuestionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const CommunityQuestionDeleteManyArgsSchema: z.ZodType<Prisma.CommunityQuestionDeleteManyArgs> = z.object({
  where: CommunityQuestionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserAnswerCreateArgsSchema: z.ZodType<Prisma.UserAnswerCreateArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  data: z.union([ UserAnswerCreateInputSchema,UserAnswerUncheckedCreateInputSchema ]),
}).strict() ;

export const UserAnswerUpsertArgsSchema: z.ZodType<Prisma.UserAnswerUpsertArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereUniqueInputSchema,
  create: z.union([ UserAnswerCreateInputSchema,UserAnswerUncheckedCreateInputSchema ]),
  update: z.union([ UserAnswerUpdateInputSchema,UserAnswerUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserAnswerCreateManyArgsSchema: z.ZodType<Prisma.UserAnswerCreateManyArgs> = z.object({
  data: z.union([ UserAnswerCreateManyInputSchema,UserAnswerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserAnswerCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserAnswerCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserAnswerCreateManyInputSchema,UserAnswerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserAnswerDeleteArgsSchema: z.ZodType<Prisma.UserAnswerDeleteArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  where: UserAnswerWhereUniqueInputSchema,
}).strict() ;

export const UserAnswerUpdateArgsSchema: z.ZodType<Prisma.UserAnswerUpdateArgs> = z.object({
  select: UserAnswerSelectSchema.optional(),
  include: UserAnswerIncludeSchema.optional(),
  data: z.union([ UserAnswerUpdateInputSchema,UserAnswerUncheckedUpdateInputSchema ]),
  where: UserAnswerWhereUniqueInputSchema,
}).strict() ;

export const UserAnswerUpdateManyArgsSchema: z.ZodType<Prisma.UserAnswerUpdateManyArgs> = z.object({
  data: z.union([ UserAnswerUpdateManyMutationInputSchema,UserAnswerUncheckedUpdateManyInputSchema ]),
  where: UserAnswerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserAnswerUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserAnswerUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserAnswerUpdateManyMutationInputSchema,UserAnswerUncheckedUpdateManyInputSchema ]),
  where: UserAnswerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserAnswerDeleteManyArgsSchema: z.ZodType<Prisma.UserAnswerDeleteManyArgs> = z.object({
  where: UserAnswerWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;