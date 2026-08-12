import { z } from 'zod';
import { JsonValue, InputJsonValue, objectEnumValues } from '@prisma/client/runtime/library';
import type { Prisma } from '../../../../generated/prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = JsonValue | null | 'JsonNull' | 'DbNull' | typeof objectEnumValues.instances.DbNull | typeof objectEnumValues.instances.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return typeof objectEnumValues.instances.DbNull;
  if (v === 'JsonNull') return typeof objectEnumValues.instances.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.any() }),
    z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','phone','password','role','isActive','verificationStatus']);

export const SellerProfileScalarFieldEnumSchema = z.enum(['id','userId','buisnessName','gstNumber','panNumber','bankAccountNo','categoryofBuisness','rejectionReason','createdAt']);

export const DocumentsScalarFieldEnumSchema = z.enum(['id','userId','type','fileURL','verified','uploadedAt']);

export const AuditLogsScalarFieldEnumSchema = z.enum(['id','action','performedBy','targetUserId','metaData','createdAt']);

export const RefreshTokensScalarFieldEnumSchema = z.enum(['id','userId','token','expiresAt','revoked','createdAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema: z.ZodType<Prisma.NullableJsonNullValueInput> = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema: z.ZodType<Prisma.JsonNullValueFilter> = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const RoleSchema = z.enum(['CUSTOMER','ADMIN','SELLER','DELIVERY_PARTNER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

export const VerificationStatusSchema = z.enum(['PENDING','UNDER_REVIEW','APPROVED','REJECTED']);

export type VerificationStatusType = `${z.infer<typeof VerificationStatusSchema>}`

export const Document_TypeSchema = z.enum(['PAN_CARD','GST_CERTIFICATE','BANK_ACCOUNT','DRIVING_LICENSE','VEHICLE_RC']);

export type Document_TypeType = `${z.infer<typeof Document_TypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  verificationStatus: VerificationStatusSchema,
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  isActive: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELLER PROFILE SCHEMA
/////////////////////////////////////////

export const SellerProfileSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type SellerProfile = z.infer<typeof SellerProfileSchema>

/////////////////////////////////////////
// DOCUMENTS SCHEMA
/////////////////////////////////////////

export const DocumentsSchema = z.object({
  type: Document_TypeSchema,
  id: z.uuid(),
  userId: z.string(),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date(),
})

export type Documents = z.infer<typeof DocumentsSchema>

/////////////////////////////////////////
// AUDIT LOGS SCHEMA
/////////////////////////////////////////

export const AuditLogsSchema = z.object({
  id: z.uuid(),
  action: z.string(),
  performedBy: z.string(),
  targetUserId: z.string(),
  metaData: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
})

export type AuditLogs = z.infer<typeof AuditLogsSchema>

/////////////////////////////////////////
// REFRESH TOKENS SCHEMA
/////////////////////////////////////////

export const RefreshTokensSchema = z.object({
  id: z.uuid(),
  userId: z.string().nullable(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean(),
  createdAt: z.coerce.date(),
})

export type RefreshTokens = z.infer<typeof RefreshTokensSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  sellerProfile: z.union([z.boolean(),z.lazy(() => SellerProfileArgsSchema)]).optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentsFindManyArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokensFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  documents: z.boolean().optional(),
  refreshTokens: z.boolean().optional(),
  auditLogs: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  password: z.boolean().optional(),
  role: z.boolean().optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.boolean().optional(),
  sellerProfile: z.union([z.boolean(),z.lazy(() => SellerProfileArgsSchema)]).optional(),
  documents: z.union([z.boolean(),z.lazy(() => DocumentsFindManyArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokensFindManyArgsSchema)]).optional(),
  auditLogs: z.union([z.boolean(),z.lazy(() => AuditLogsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SELLER PROFILE
//------------------------------------------------------

export const SellerProfileIncludeSchema: z.ZodType<Prisma.SellerProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const SellerProfileArgsSchema: z.ZodType<Prisma.SellerProfileDefaultArgs> = z.object({
  select: z.lazy(() => SellerProfileSelectSchema).optional(),
  include: z.lazy(() => SellerProfileIncludeSchema).optional(),
}).strict();

export const SellerProfileSelectSchema: z.ZodType<Prisma.SellerProfileSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  buisnessName: z.boolean().optional(),
  gstNumber: z.boolean().optional(),
  panNumber: z.boolean().optional(),
  bankAccountNo: z.boolean().optional(),
  categoryofBuisness: z.boolean().optional(),
  rejectionReason: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// DOCUMENTS
//------------------------------------------------------

export const DocumentsIncludeSchema: z.ZodType<Prisma.DocumentsInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const DocumentsArgsSchema: z.ZodType<Prisma.DocumentsDefaultArgs> = z.object({
  select: z.lazy(() => DocumentsSelectSchema).optional(),
  include: z.lazy(() => DocumentsIncludeSchema).optional(),
}).strict();

export const DocumentsSelectSchema: z.ZodType<Prisma.DocumentsSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  fileURL: z.boolean().optional(),
  verified: z.boolean().optional(),
  uploadedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// AUDIT LOGS
//------------------------------------------------------

export const AuditLogsIncludeSchema: z.ZodType<Prisma.AuditLogsInclude> = z.object({
  performedby: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const AuditLogsArgsSchema: z.ZodType<Prisma.AuditLogsDefaultArgs> = z.object({
  select: z.lazy(() => AuditLogsSelectSchema).optional(),
  include: z.lazy(() => AuditLogsIncludeSchema).optional(),
}).strict();

export const AuditLogsSelectSchema: z.ZodType<Prisma.AuditLogsSelect> = z.object({
  id: z.boolean().optional(),
  action: z.boolean().optional(),
  performedBy: z.boolean().optional(),
  targetUserId: z.boolean().optional(),
  metaData: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  performedby: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REFRESH TOKENS
//------------------------------------------------------

export const RefreshTokensIncludeSchema: z.ZodType<Prisma.RefreshTokensInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict();

export const RefreshTokensArgsSchema: z.ZodType<Prisma.RefreshTokensDefaultArgs> = z.object({
  select: z.lazy(() => RefreshTokensSelectSchema).optional(),
  include: z.lazy(() => RefreshTokensIncludeSchema).optional(),
}).strict();

export const RefreshTokensSelectSchema: z.ZodType<Prisma.RefreshTokensSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  token: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  revoked: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  verificationStatus: z.union([ z.lazy(() => EnumVerificationStatusFilterSchema), z.lazy(() => VerificationStatusSchema) ]).optional(),
  sellerProfile: z.union([ z.lazy(() => SellerProfileNullableScalarRelationFilterSchema), z.lazy(() => SellerProfileWhereInputSchema) ]).optional().nullable(),
  documents: z.lazy(() => DocumentsListRelationFilterSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  verificationStatus: z.lazy(() => SortOrderSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileOrderByWithRelationInputSchema).optional(),
  documents: z.lazy(() => DocumentsOrderByRelationAggregateInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensOrderByRelationAggregateInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
    phone: z.string(),
  }),
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
    phone: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
    phone: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
  z.object({
    phone: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  isActive: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  verificationStatus: z.union([ z.lazy(() => EnumVerificationStatusFilterSchema), z.lazy(() => VerificationStatusSchema) ]).optional(),
  sellerProfile: z.union([ z.lazy(() => SellerProfileNullableScalarRelationFilterSchema), z.lazy(() => SellerProfileWhereInputSchema) ]).optional().nullable(),
  documents: z.lazy(() => DocumentsListRelationFilterSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensListRelationFilterSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  verificationStatus: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema) ]).optional(),
  isActive: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  verificationStatus: z.union([ z.lazy(() => EnumVerificationStatusWithAggregatesFilterSchema), z.lazy(() => VerificationStatusSchema) ]).optional(),
});

export const SellerProfileWhereInputSchema: z.ZodType<Prisma.SellerProfileWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SellerProfileWhereInputSchema), z.lazy(() => SellerProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SellerProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SellerProfileWhereInputSchema), z.lazy(() => SellerProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  buisnessName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  gstNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  panNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bankAccountNo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  categoryofBuisness: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rejectionReason: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const SellerProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.SellerProfileOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  buisnessName: z.lazy(() => SortOrderSchema).optional(),
  gstNumber: z.lazy(() => SortOrderSchema).optional(),
  panNumber: z.lazy(() => SortOrderSchema).optional(),
  bankAccountNo: z.lazy(() => SortOrderSchema).optional(),
  categoryofBuisness: z.lazy(() => SortOrderSchema).optional(),
  rejectionReason: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const SellerProfileWhereUniqueInputSchema: z.ZodType<Prisma.SellerProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => SellerProfileWhereInputSchema), z.lazy(() => SellerProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SellerProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SellerProfileWhereInputSchema), z.lazy(() => SellerProfileWhereInputSchema).array() ]).optional(),
  buisnessName: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  gstNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  panNumber: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  bankAccountNo: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  categoryofBuisness: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  rejectionReason: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const SellerProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.SellerProfileOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  buisnessName: z.lazy(() => SortOrderSchema).optional(),
  gstNumber: z.lazy(() => SortOrderSchema).optional(),
  panNumber: z.lazy(() => SortOrderSchema).optional(),
  bankAccountNo: z.lazy(() => SortOrderSchema).optional(),
  categoryofBuisness: z.lazy(() => SortOrderSchema).optional(),
  rejectionReason: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SellerProfileCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SellerProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SellerProfileMinOrderByAggregateInputSchema).optional(),
});

export const SellerProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SellerProfileScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => SellerProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => SellerProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SellerProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SellerProfileScalarWhereWithAggregatesInputSchema), z.lazy(() => SellerProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  buisnessName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  gstNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  panNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  bankAccountNo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  categoryofBuisness: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  rejectionReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const DocumentsWhereInputSchema: z.ZodType<Prisma.DocumentsWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentsWhereInputSchema), z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsWhereInputSchema), z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDocument_TypeFilterSchema), z.lazy(() => Document_TypeSchema) ]).optional(),
  fileURL: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const DocumentsOrderByWithRelationInputSchema: z.ZodType<Prisma.DocumentsOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  fileURL: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const DocumentsWhereUniqueInputSchema: z.ZodType<Prisma.DocumentsWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => DocumentsWhereInputSchema), z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsWhereInputSchema), z.lazy(() => DocumentsWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDocument_TypeFilterSchema), z.lazy(() => Document_TypeSchema) ]).optional(),
  fileURL: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const DocumentsOrderByWithAggregationInputSchema: z.ZodType<Prisma.DocumentsOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  fileURL: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DocumentsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DocumentsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DocumentsMinOrderByAggregateInputSchema).optional(),
});

export const DocumentsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DocumentsScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema), z.lazy(() => DocumentsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDocument_TypeWithAggregatesFilterSchema), z.lazy(() => Document_TypeSchema) ]).optional(),
  fileURL: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  verified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const AuditLogsWhereInputSchema: z.ZodType<Prisma.AuditLogsWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuditLogsWhereInputSchema), z.lazy(() => AuditLogsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogsWhereInputSchema), z.lazy(() => AuditLogsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  performedBy: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  targetUserId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  metaData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  performedby: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
});

export const AuditLogsOrderByWithRelationInputSchema: z.ZodType<Prisma.AuditLogsOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedBy: z.lazy(() => SortOrderSchema).optional(),
  targetUserId: z.lazy(() => SortOrderSchema).optional(),
  metaData: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  performedby: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const AuditLogsWhereUniqueInputSchema: z.ZodType<Prisma.AuditLogsWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => AuditLogsWhereInputSchema), z.lazy(() => AuditLogsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogsWhereInputSchema), z.lazy(() => AuditLogsWhereInputSchema).array() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  performedBy: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  targetUserId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  metaData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  performedby: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}));

export const AuditLogsOrderByWithAggregationInputSchema: z.ZodType<Prisma.AuditLogsOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedBy: z.lazy(() => SortOrderSchema).optional(),
  targetUserId: z.lazy(() => SortOrderSchema).optional(),
  metaData: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AuditLogsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AuditLogsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AuditLogsMinOrderByAggregateInputSchema).optional(),
});

export const AuditLogsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AuditLogsScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuditLogsScalarWhereWithAggregatesInputSchema), z.lazy(() => AuditLogsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogsScalarWhereWithAggregatesInputSchema), z.lazy(() => AuditLogsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  performedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  targetUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  metaData: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const RefreshTokensWhereInputSchema: z.ZodType<Prisma.RefreshTokensWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RefreshTokensWhereInputSchema), z.lazy(() => RefreshTokensWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokensWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokensWhereInputSchema), z.lazy(() => RefreshTokensWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  revoked: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
});

export const RefreshTokensOrderByWithRelationInputSchema: z.ZodType<Prisma.RefreshTokensOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revoked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});

export const RefreshTokensWhereUniqueInputSchema: z.ZodType<Prisma.RefreshTokensWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => RefreshTokensWhereInputSchema), z.lazy(() => RefreshTokensWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokensWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokensWhereInputSchema), z.lazy(() => RefreshTokensWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  revoked: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}));

export const RefreshTokensOrderByWithAggregationInputSchema: z.ZodType<Prisma.RefreshTokensOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revoked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RefreshTokensCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RefreshTokensMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RefreshTokensMinOrderByAggregateInputSchema).optional(),
});

export const RefreshTokensScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RefreshTokensScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RefreshTokensScalarWhereWithAggregatesInputSchema), z.lazy(() => RefreshTokensScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokensScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokensScalarWhereWithAggregatesInputSchema), z.lazy(() => RefreshTokensScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  revoked: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SellerProfileCreateInputSchema: z.ZodType<Prisma.SellerProfileCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSellerProfileInputSchema),
});

export const SellerProfileUncheckedCreateInputSchema: z.ZodType<Prisma.SellerProfileUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const SellerProfileUpdateInputSchema: z.ZodType<Prisma.SellerProfileUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSellerProfileNestedInputSchema).optional(),
});

export const SellerProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.SellerProfileUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SellerProfileCreateManyInputSchema: z.ZodType<Prisma.SellerProfileCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const SellerProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.SellerProfileUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SellerProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SellerProfileUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsCreateInputSchema: z.ZodType<Prisma.DocumentsCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutDocumentsInputSchema),
});

export const DocumentsUncheckedCreateInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
});

export const DocumentsUpdateInputSchema: z.ZodType<Prisma.DocumentsUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutDocumentsNestedInputSchema).optional(),
});

export const DocumentsUncheckedUpdateInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsCreateManyInputSchema: z.ZodType<Prisma.DocumentsCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
});

export const DocumentsUpdateManyMutationInputSchema: z.ZodType<Prisma.DocumentsUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsCreateInputSchema: z.ZodType<Prisma.AuditLogsCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  performedby: z.lazy(() => UserCreateNestedOneWithoutAuditLogsInputSchema),
});

export const AuditLogsUncheckedCreateInputSchema: z.ZodType<Prisma.AuditLogsUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  performedBy: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
});

export const AuditLogsUpdateInputSchema: z.ZodType<Prisma.AuditLogsUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  performedby: z.lazy(() => UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema).optional(),
});

export const AuditLogsUncheckedUpdateInputSchema: z.ZodType<Prisma.AuditLogsUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsCreateManyInputSchema: z.ZodType<Prisma.AuditLogsCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  performedBy: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
});

export const AuditLogsUpdateManyMutationInputSchema: z.ZodType<Prisma.AuditLogsUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AuditLogsUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  performedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensCreateInputSchema: z.ZodType<Prisma.RefreshTokensCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutRefreshTokensInputSchema).optional(),
});

export const RefreshTokensUncheckedCreateInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string().optional().nullable(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export const RefreshTokensUpdateInputSchema: z.ZodType<Prisma.RefreshTokensUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutRefreshTokensNestedInputSchema).optional(),
});

export const RefreshTokensUncheckedUpdateInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensCreateManyInputSchema: z.ZodType<Prisma.RefreshTokensCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string().optional().nullable(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export const RefreshTokensUpdateManyMutationInputSchema: z.ZodType<Prisma.RefreshTokensUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
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
});

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const EnumVerificationStatusFilterSchema: z.ZodType<Prisma.EnumVerificationStatusFilter> = z.strictObject({
  equals: z.lazy(() => VerificationStatusSchema).optional(),
  in: z.lazy(() => VerificationStatusSchema).array().optional(),
  notIn: z.lazy(() => VerificationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => NestedEnumVerificationStatusFilterSchema) ]).optional(),
});

export const SellerProfileNullableScalarRelationFilterSchema: z.ZodType<Prisma.SellerProfileNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => SellerProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => SellerProfileWhereInputSchema).optional().nullable(),
});

export const DocumentsListRelationFilterSchema: z.ZodType<Prisma.DocumentsListRelationFilter> = z.strictObject({
  every: z.lazy(() => DocumentsWhereInputSchema).optional(),
  some: z.lazy(() => DocumentsWhereInputSchema).optional(),
  none: z.lazy(() => DocumentsWhereInputSchema).optional(),
});

export const RefreshTokensListRelationFilterSchema: z.ZodType<Prisma.RefreshTokensListRelationFilter> = z.strictObject({
  every: z.lazy(() => RefreshTokensWhereInputSchema).optional(),
  some: z.lazy(() => RefreshTokensWhereInputSchema).optional(),
  none: z.lazy(() => RefreshTokensWhereInputSchema).optional(),
});

export const AuditLogsListRelationFilterSchema: z.ZodType<Prisma.AuditLogsListRelationFilter> = z.strictObject({
  every: z.lazy(() => AuditLogsWhereInputSchema).optional(),
  some: z.lazy(() => AuditLogsWhereInputSchema).optional(),
  none: z.lazy(() => AuditLogsWhereInputSchema).optional(),
});

export const DocumentsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DocumentsOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const RefreshTokensOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RefreshTokensOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const AuditLogsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AuditLogsOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  verificationStatus: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  verificationStatus: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  isActive: z.lazy(() => SortOrderSchema).optional(),
  verificationStatus: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const EnumVerificationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumVerificationStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => VerificationStatusSchema).optional(),
  in: z.lazy(() => VerificationStatusSchema).array().optional(),
  notIn: z.lazy(() => VerificationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => NestedEnumVerificationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVerificationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVerificationStatusFilterSchema).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
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
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const SellerProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.SellerProfileCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  buisnessName: z.lazy(() => SortOrderSchema).optional(),
  gstNumber: z.lazy(() => SortOrderSchema).optional(),
  panNumber: z.lazy(() => SortOrderSchema).optional(),
  bankAccountNo: z.lazy(() => SortOrderSchema).optional(),
  categoryofBuisness: z.lazy(() => SortOrderSchema).optional(),
  rejectionReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SellerProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SellerProfileMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  buisnessName: z.lazy(() => SortOrderSchema).optional(),
  gstNumber: z.lazy(() => SortOrderSchema).optional(),
  panNumber: z.lazy(() => SortOrderSchema).optional(),
  bankAccountNo: z.lazy(() => SortOrderSchema).optional(),
  categoryofBuisness: z.lazy(() => SortOrderSchema).optional(),
  rejectionReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SellerProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.SellerProfileMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  buisnessName: z.lazy(() => SortOrderSchema).optional(),
  gstNumber: z.lazy(() => SortOrderSchema).optional(),
  panNumber: z.lazy(() => SortOrderSchema).optional(),
  bankAccountNo: z.lazy(() => SortOrderSchema).optional(),
  categoryofBuisness: z.lazy(() => SortOrderSchema).optional(),
  rejectionReason: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const EnumDocument_TypeFilterSchema: z.ZodType<Prisma.EnumDocument_TypeFilter> = z.strictObject({
  equals: z.lazy(() => Document_TypeSchema).optional(),
  in: z.lazy(() => Document_TypeSchema).array().optional(),
  notIn: z.lazy(() => Document_TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => NestedEnumDocument_TypeFilterSchema) ]).optional(),
});

export const DocumentsCountOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  fileURL: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  fileURL: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const DocumentsMinOrderByAggregateInputSchema: z.ZodType<Prisma.DocumentsMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  fileURL: z.lazy(() => SortOrderSchema).optional(),
  verified: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const EnumDocument_TypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumDocument_TypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => Document_TypeSchema).optional(),
  in: z.lazy(() => Document_TypeSchema).array().optional(),
  notIn: z.lazy(() => Document_TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => NestedEnumDocument_TypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocument_TypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocument_TypeFilterSchema).optional(),
});

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.strictObject({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
});

export const AuditLogsCountOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogsCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedBy: z.lazy(() => SortOrderSchema).optional(),
  targetUserId: z.lazy(() => SortOrderSchema).optional(),
  metaData: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const AuditLogsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogsMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedBy: z.lazy(() => SortOrderSchema).optional(),
  targetUserId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const AuditLogsMinOrderByAggregateInputSchema: z.ZodType<Prisma.AuditLogsMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  performedBy: z.lazy(() => SortOrderSchema).optional(),
  targetUserId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.strictObject({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
});

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable(),
});

export const RefreshTokensCountOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokensCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revoked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const RefreshTokensMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokensMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revoked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const RefreshTokensMinOrderByAggregateInputSchema: z.ZodType<Prisma.RefreshTokensMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  revoked: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
});

export const SellerProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SellerProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SellerProfileWhereUniqueInputSchema).optional(),
});

export const DocumentsCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DocumentsCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsCreateWithoutUserInputSchema).array(), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema), z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
});

export const RefreshTokensCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateWithoutUserInputSchema).array(), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokensCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
});

export const AuditLogsCreateNestedManyWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsCreateNestedManyWithoutPerformedbyInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema).array(), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogsCreateManyPerformedbyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
});

export const SellerProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUncheckedCreateNestedOneWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SellerProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => SellerProfileWhereUniqueInputSchema).optional(),
});

export const DocumentsUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsCreateWithoutUserInputSchema).array(), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema), z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
});

export const RefreshTokensUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateWithoutUserInputSchema).array(), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokensCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
});

export const AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema).array(), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogsCreateManyPerformedbyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => RoleSchema).optional(),
});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.strictObject({
  set: z.boolean().optional(),
});

export const EnumVerificationStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumVerificationStatusFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => VerificationStatusSchema).optional(),
});

export const SellerProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SellerProfileUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SellerProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SellerProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SellerProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SellerProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SellerProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SellerProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => SellerProfileUpdateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const DocumentsUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DocumentsUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsCreateWithoutUserInputSchema).array(), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema), z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentsUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => DocumentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema), z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
});

export const RefreshTokensUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokensUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateWithoutUserInputSchema).array(), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokensUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => RefreshTokensUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokensCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokensUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => RefreshTokensUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokensUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => RefreshTokensUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokensScalarWhereInputSchema), z.lazy(() => RefreshTokensScalarWhereInputSchema).array() ]).optional(),
});

export const AuditLogsUpdateManyWithoutPerformedbyNestedInputSchema: z.ZodType<Prisma.AuditLogsUpdateManyWithoutPerformedbyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema).array(), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogsCreateManyPerformedbyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogsUpdateManyWithWhereWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpdateManyWithWhereWithoutPerformedbyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogsScalarWhereInputSchema), z.lazy(() => AuditLogsScalarWhereInputSchema).array() ]).optional(),
});

export const SellerProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.SellerProfileUncheckedUpdateOneWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SellerProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => SellerProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => SellerProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => SellerProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => SellerProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SellerProfileUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => SellerProfileUpdateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
});

export const DocumentsUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsCreateWithoutUserInputSchema).array(), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema), z.lazy(() => DocumentsCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DocumentsUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DocumentsCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DocumentsWhereUniqueInputSchema), z.lazy(() => DocumentsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => DocumentsUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DocumentsUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => DocumentsUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema), z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
});

export const RefreshTokensUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateWithoutUserInputSchema).array(), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema), z.lazy(() => RefreshTokensCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RefreshTokensUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => RefreshTokensUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RefreshTokensCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RefreshTokensWhereUniqueInputSchema), z.lazy(() => RefreshTokensWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RefreshTokensUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => RefreshTokensUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RefreshTokensUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => RefreshTokensUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RefreshTokensScalarWhereInputSchema), z.lazy(() => RefreshTokensScalarWhereInputSchema).array() ]).optional(),
});

export const AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInputSchema: z.ZodType<Prisma.AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema).array(), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsCreateOrConnectWithoutPerformedbyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AuditLogsCreateManyPerformedbyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AuditLogsWhereUniqueInputSchema), z.lazy(() => AuditLogsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AuditLogsUpdateManyWithWhereWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUpdateManyWithWhereWithoutPerformedbyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AuditLogsScalarWhereInputSchema), z.lazy(() => AuditLogsScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSellerProfileInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutSellerProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSellerProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const UserUpdateOneRequiredWithoutSellerProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSellerProfileNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutSellerProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSellerProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSellerProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSellerProfileInputSchema), z.lazy(() => UserUpdateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSellerProfileInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDocumentsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const EnumDocument_TypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumDocument_TypeFieldUpdateOperationsInput> = z.strictObject({
  set: z.lazy(() => Document_TypeSchema).optional(),
});

export const UserUpdateOneRequiredWithoutDocumentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDocumentsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDocumentsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDocumentsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDocumentsInputSchema), z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuditLogsInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutAuditLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuditLogsNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuditLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuditLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuditLogsInputSchema), z.lazy(() => UserUpdateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]).optional(),
});

export const UserCreateNestedOneWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutRefreshTokensInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneWithoutRefreshTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutRefreshTokensNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutRefreshTokensInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutRefreshTokensInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema), z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
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
});

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
});

export const NestedEnumVerificationStatusFilterSchema: z.ZodType<Prisma.NestedEnumVerificationStatusFilter> = z.strictObject({
  equals: z.lazy(() => VerificationStatusSchema).optional(),
  in: z.lazy(() => VerificationStatusSchema).array().optional(),
  notIn: z.lazy(() => VerificationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => NestedEnumVerificationStatusFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});

export const NestedEnumVerificationStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumVerificationStatusWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => VerificationStatusSchema).optional(),
  in: z.lazy(() => VerificationStatusSchema).array().optional(),
  notIn: z.lazy(() => VerificationStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => NestedEnumVerificationStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumVerificationStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumVerificationStatusFilterSchema).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
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
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
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
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedEnumDocument_TypeFilterSchema: z.ZodType<Prisma.NestedEnumDocument_TypeFilter> = z.strictObject({
  equals: z.lazy(() => Document_TypeSchema).optional(),
  in: z.lazy(() => Document_TypeSchema).array().optional(),
  notIn: z.lazy(() => Document_TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => NestedEnumDocument_TypeFilterSchema) ]).optional(),
});

export const NestedEnumDocument_TypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumDocument_TypeWithAggregatesFilter> = z.strictObject({
  equals: z.lazy(() => Document_TypeSchema).optional(),
  in: z.lazy(() => Document_TypeSchema).array().optional(),
  notIn: z.lazy(() => Document_TypeSchema).array().optional(),
  not: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => NestedEnumDocument_TypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumDocument_TypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumDocument_TypeFilterSchema).optional(),
});

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.strictObject({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
});

export const SellerProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const SellerProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  buisnessName: z.string(),
  gstNumber: z.string(),
  panNumber: z.string(),
  bankAccountNo: z.string(),
  categoryofBuisness: z.string(),
  rejectionReason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
});

export const SellerProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SellerProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]),
});

export const DocumentsCreateWithoutUserInputSchema: z.ZodType<Prisma.DocumentsCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
});

export const DocumentsUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
});

export const DocumentsCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.DocumentsCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema) ]),
});

export const DocumentsCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.DocumentsCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => DocumentsCreateManyUserInputSchema), z.lazy(() => DocumentsCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const RefreshTokensCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export const RefreshTokensUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export const RefreshTokensCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => RefreshTokensWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema) ]),
});

export const RefreshTokensCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RefreshTokensCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => RefreshTokensCreateManyUserInputSchema), z.lazy(() => RefreshTokensCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const AuditLogsCreateWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsCreateWithoutPerformedbyInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
});

export const AuditLogsUncheckedCreateWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUncheckedCreateWithoutPerformedbyInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
});

export const AuditLogsCreateOrConnectWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsCreateOrConnectWithoutPerformedbyInput> = z.strictObject({
  where: z.lazy(() => AuditLogsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema) ]),
});

export const AuditLogsCreateManyPerformedbyInputEnvelopeSchema: z.ZodType<Prisma.AuditLogsCreateManyPerformedbyInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => AuditLogsCreateManyPerformedbyInputSchema), z.lazy(() => AuditLogsCreateManyPerformedbyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const SellerProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUpsertWithoutUserInput> = z.strictObject({
  update: z.union([ z.lazy(() => SellerProfileUpdateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SellerProfileCreateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => SellerProfileWhereInputSchema).optional(),
});

export const SellerProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUpdateToOneWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => SellerProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SellerProfileUpdateWithoutUserInputSchema), z.lazy(() => SellerProfileUncheckedUpdateWithoutUserInputSchema) ]),
});

export const SellerProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const SellerProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SellerProfileUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  buisnessName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  gstNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  panNumber: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  bankAccountNo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryofBuisness: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  rejectionReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DocumentsUpdateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => DocumentsCreateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedCreateWithoutUserInputSchema) ]),
});

export const DocumentsUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DocumentsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DocumentsUpdateWithoutUserInputSchema), z.lazy(() => DocumentsUncheckedUpdateWithoutUserInputSchema) ]),
});

export const DocumentsUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => DocumentsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DocumentsUpdateManyMutationInputSchema), z.lazy(() => DocumentsUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const DocumentsScalarWhereInputSchema: z.ZodType<Prisma.DocumentsScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema), z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DocumentsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DocumentsScalarWhereInputSchema), z.lazy(() => DocumentsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumDocument_TypeFilterSchema), z.lazy(() => Document_TypeSchema) ]).optional(),
  fileURL: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  verified: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const RefreshTokensUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => RefreshTokensWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RefreshTokensUpdateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RefreshTokensCreateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedCreateWithoutUserInputSchema) ]),
});

export const RefreshTokensUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => RefreshTokensWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RefreshTokensUpdateWithoutUserInputSchema), z.lazy(() => RefreshTokensUncheckedUpdateWithoutUserInputSchema) ]),
});

export const RefreshTokensUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => RefreshTokensScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RefreshTokensUpdateManyMutationInputSchema), z.lazy(() => RefreshTokensUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const RefreshTokensScalarWhereInputSchema: z.ZodType<Prisma.RefreshTokensScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => RefreshTokensScalarWhereInputSchema), z.lazy(() => RefreshTokensScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RefreshTokensScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RefreshTokensScalarWhereInputSchema), z.lazy(() => RefreshTokensScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  token: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  revoked: z.union([ z.lazy(() => BoolFilterSchema), z.boolean() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUpsertWithWhereUniqueWithoutPerformedbyInput> = z.strictObject({
  where: z.lazy(() => AuditLogsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AuditLogsUpdateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedUpdateWithoutPerformedbyInputSchema) ]),
  create: z.union([ z.lazy(() => AuditLogsCreateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedCreateWithoutPerformedbyInputSchema) ]),
});

export const AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUpdateWithWhereUniqueWithoutPerformedbyInput> = z.strictObject({
  where: z.lazy(() => AuditLogsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AuditLogsUpdateWithoutPerformedbyInputSchema), z.lazy(() => AuditLogsUncheckedUpdateWithoutPerformedbyInputSchema) ]),
});

export const AuditLogsUpdateManyWithWhereWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUpdateManyWithWhereWithoutPerformedbyInput> = z.strictObject({
  where: z.lazy(() => AuditLogsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AuditLogsUpdateManyMutationInputSchema), z.lazy(() => AuditLogsUncheckedUpdateManyWithoutPerformedbyInputSchema) ]),
});

export const AuditLogsScalarWhereInputSchema: z.ZodType<Prisma.AuditLogsScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => AuditLogsScalarWhereInputSchema), z.lazy(() => AuditLogsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AuditLogsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AuditLogsScalarWhereInputSchema), z.lazy(() => AuditLogsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  performedBy: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  targetUserId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  metaData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
});

export const UserCreateWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutSellerProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserUncheckedCreateWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSellerProfileInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserCreateOrConnectWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSellerProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutSellerProfileInputSchema) ]),
});

export const UserUpsertWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutSellerProfileInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSellerProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedCreateWithoutSellerProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSellerProfileInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSellerProfileInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSellerProfileInputSchema) ]),
});

export const UserUpdateWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutSellerProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutSellerProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSellerProfileInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateWithoutDocumentsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserUncheckedCreateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDocumentsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserCreateOrConnectWithoutDocumentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
});

export const UserUpsertWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDocumentsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutDocumentsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDocumentsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDocumentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutDocumentsInputSchema) ]),
});

export const UserUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDocumentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutDocumentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDocumentsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateWithoutAuditLogsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuditLogsInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserCreateOrConnectWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuditLogsInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
});

export const UserUpsertWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuditLogsInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAuditLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuditLogsInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuditLogsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAuditLogsInputSchema) ]),
});

export const UserUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuditLogsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutAuditLogsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuditLogsInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokensUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserUncheckedCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> = z.strictObject({
  id: z.uuid().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  role: z.lazy(() => RoleSchema).optional(),
  isActive: z.boolean().optional(),
  verificationStatus: z.lazy(() => VerificationStatusSchema).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedCreateNestedManyWithoutPerformedbyInputSchema).optional(),
});

export const UserCreateOrConnectWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutRefreshTokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
});

export const UserUpsertWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutRefreshTokensInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutRefreshTokensInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutRefreshTokensInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutRefreshTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutRefreshTokensInputSchema) ]),
});

export const UserUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const UserUncheckedUpdateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutRefreshTokensInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  isActive: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationStatus: z.union([ z.lazy(() => VerificationStatusSchema), z.lazy(() => EnumVerificationStatusFieldUpdateOperationsInputSchema) ]).optional(),
  sellerProfile: z.lazy(() => SellerProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
  documents: z.lazy(() => DocumentsUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  auditLogs: z.lazy(() => AuditLogsUncheckedUpdateManyWithoutPerformedbyNestedInputSchema).optional(),
});

export const DocumentsCreateManyUserInputSchema: z.ZodType<Prisma.DocumentsCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  type: z.lazy(() => Document_TypeSchema),
  fileURL: z.string(),
  verified: z.boolean(),
  uploadedAt: z.coerce.date().optional(),
});

export const RefreshTokensCreateManyUserInputSchema: z.ZodType<Prisma.RefreshTokensCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  token: z.string(),
  expiresAt: z.coerce.date(),
  revoked: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
});

export const AuditLogsCreateManyPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsCreateManyPerformedbyInput> = z.strictObject({
  id: z.uuid().optional(),
  action: z.string(),
  targetUserId: z.string(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
});

export const DocumentsUpdateWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const DocumentsUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.DocumentsUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => Document_TypeSchema), z.lazy(() => EnumDocument_TypeFieldUpdateOperationsInputSchema) ]).optional(),
  fileURL: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  verified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  uploadedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const RefreshTokensUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.RefreshTokensUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  revoked: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsUpdateWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUpdateWithoutPerformedbyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsUncheckedUpdateWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUncheckedUpdateWithoutPerformedbyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const AuditLogsUncheckedUpdateManyWithoutPerformedbyInputSchema: z.ZodType<Prisma.AuditLogsUncheckedUpdateManyWithoutPerformedbyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  action: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  targetUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  metaData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema), InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const SellerProfileFindFirstArgsSchema: z.ZodType<Prisma.SellerProfileFindFirstArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereInputSchema.optional(), 
  orderBy: z.union([ SellerProfileOrderByWithRelationInputSchema.array(), SellerProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: SellerProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SellerProfileScalarFieldEnumSchema, SellerProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SellerProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SellerProfileFindFirstOrThrowArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereInputSchema.optional(), 
  orderBy: z.union([ SellerProfileOrderByWithRelationInputSchema.array(), SellerProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: SellerProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SellerProfileScalarFieldEnumSchema, SellerProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SellerProfileFindManyArgsSchema: z.ZodType<Prisma.SellerProfileFindManyArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereInputSchema.optional(), 
  orderBy: z.union([ SellerProfileOrderByWithRelationInputSchema.array(), SellerProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: SellerProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SellerProfileScalarFieldEnumSchema, SellerProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const SellerProfileAggregateArgsSchema: z.ZodType<Prisma.SellerProfileAggregateArgs> = z.object({
  where: SellerProfileWhereInputSchema.optional(), 
  orderBy: z.union([ SellerProfileOrderByWithRelationInputSchema.array(), SellerProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: SellerProfileWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SellerProfileGroupByArgsSchema: z.ZodType<Prisma.SellerProfileGroupByArgs> = z.object({
  where: SellerProfileWhereInputSchema.optional(), 
  orderBy: z.union([ SellerProfileOrderByWithAggregationInputSchema.array(), SellerProfileOrderByWithAggregationInputSchema ]).optional(),
  by: SellerProfileScalarFieldEnumSchema.array(), 
  having: SellerProfileScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const SellerProfileFindUniqueArgsSchema: z.ZodType<Prisma.SellerProfileFindUniqueArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereUniqueInputSchema, 
}).strict();

export const SellerProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SellerProfileFindUniqueOrThrowArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereUniqueInputSchema, 
}).strict();

export const DocumentsFindFirstArgsSchema: z.ZodType<Prisma.DocumentsFindFirstArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(), DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema, DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DocumentsFindFirstOrThrowArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(), DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema, DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentsFindManyArgsSchema: z.ZodType<Prisma.DocumentsFindManyArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(), DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentsScalarFieldEnumSchema, DocumentsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const DocumentsAggregateArgsSchema: z.ZodType<Prisma.DocumentsAggregateArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentsOrderByWithRelationInputSchema.array(), DocumentsOrderByWithRelationInputSchema ]).optional(),
  cursor: DocumentsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DocumentsGroupByArgsSchema: z.ZodType<Prisma.DocumentsGroupByArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(), 
  orderBy: z.union([ DocumentsOrderByWithAggregationInputSchema.array(), DocumentsOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentsScalarFieldEnumSchema.array(), 
  having: DocumentsScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const DocumentsFindUniqueArgsSchema: z.ZodType<Prisma.DocumentsFindUniqueArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema, 
}).strict();

export const DocumentsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DocumentsFindUniqueOrThrowArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema, 
}).strict();

export const AuditLogsFindFirstArgsSchema: z.ZodType<Prisma.AuditLogsFindFirstArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereInputSchema.optional(), 
  orderBy: z.union([ AuditLogsOrderByWithRelationInputSchema.array(), AuditLogsOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogsScalarFieldEnumSchema, AuditLogsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuditLogsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AuditLogsFindFirstOrThrowArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereInputSchema.optional(), 
  orderBy: z.union([ AuditLogsOrderByWithRelationInputSchema.array(), AuditLogsOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogsScalarFieldEnumSchema, AuditLogsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuditLogsFindManyArgsSchema: z.ZodType<Prisma.AuditLogsFindManyArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereInputSchema.optional(), 
  orderBy: z.union([ AuditLogsOrderByWithRelationInputSchema.array(), AuditLogsOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AuditLogsScalarFieldEnumSchema, AuditLogsScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const AuditLogsAggregateArgsSchema: z.ZodType<Prisma.AuditLogsAggregateArgs> = z.object({
  where: AuditLogsWhereInputSchema.optional(), 
  orderBy: z.union([ AuditLogsOrderByWithRelationInputSchema.array(), AuditLogsOrderByWithRelationInputSchema ]).optional(),
  cursor: AuditLogsWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuditLogsGroupByArgsSchema: z.ZodType<Prisma.AuditLogsGroupByArgs> = z.object({
  where: AuditLogsWhereInputSchema.optional(), 
  orderBy: z.union([ AuditLogsOrderByWithAggregationInputSchema.array(), AuditLogsOrderByWithAggregationInputSchema ]).optional(),
  by: AuditLogsScalarFieldEnumSchema.array(), 
  having: AuditLogsScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const AuditLogsFindUniqueArgsSchema: z.ZodType<Prisma.AuditLogsFindUniqueArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereUniqueInputSchema, 
}).strict();

export const AuditLogsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AuditLogsFindUniqueOrThrowArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereUniqueInputSchema, 
}).strict();

export const RefreshTokensFindFirstArgsSchema: z.ZodType<Prisma.RefreshTokensFindFirstArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereInputSchema.optional(), 
  orderBy: z.union([ RefreshTokensOrderByWithRelationInputSchema.array(), RefreshTokensOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokensWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokensScalarFieldEnumSchema, RefreshTokensScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RefreshTokensFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokensFindFirstOrThrowArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereInputSchema.optional(), 
  orderBy: z.union([ RefreshTokensOrderByWithRelationInputSchema.array(), RefreshTokensOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokensWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokensScalarFieldEnumSchema, RefreshTokensScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RefreshTokensFindManyArgsSchema: z.ZodType<Prisma.RefreshTokensFindManyArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereInputSchema.optional(), 
  orderBy: z.union([ RefreshTokensOrderByWithRelationInputSchema.array(), RefreshTokensOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokensWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RefreshTokensScalarFieldEnumSchema, RefreshTokensScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const RefreshTokensAggregateArgsSchema: z.ZodType<Prisma.RefreshTokensAggregateArgs> = z.object({
  where: RefreshTokensWhereInputSchema.optional(), 
  orderBy: z.union([ RefreshTokensOrderByWithRelationInputSchema.array(), RefreshTokensOrderByWithRelationInputSchema ]).optional(),
  cursor: RefreshTokensWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const RefreshTokensGroupByArgsSchema: z.ZodType<Prisma.RefreshTokensGroupByArgs> = z.object({
  where: RefreshTokensWhereInputSchema.optional(), 
  orderBy: z.union([ RefreshTokensOrderByWithAggregationInputSchema.array(), RefreshTokensOrderByWithAggregationInputSchema ]).optional(),
  by: RefreshTokensScalarFieldEnumSchema.array(), 
  having: RefreshTokensScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const RefreshTokensFindUniqueArgsSchema: z.ZodType<Prisma.RefreshTokensFindUniqueArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereUniqueInputSchema, 
}).strict();

export const RefreshTokensFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RefreshTokensFindUniqueOrThrowArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SellerProfileCreateArgsSchema: z.ZodType<Prisma.SellerProfileCreateArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  data: z.union([ SellerProfileCreateInputSchema, SellerProfileUncheckedCreateInputSchema ]),
}).strict();

export const SellerProfileUpsertArgsSchema: z.ZodType<Prisma.SellerProfileUpsertArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereUniqueInputSchema, 
  create: z.union([ SellerProfileCreateInputSchema, SellerProfileUncheckedCreateInputSchema ]),
  update: z.union([ SellerProfileUpdateInputSchema, SellerProfileUncheckedUpdateInputSchema ]),
}).strict();

export const SellerProfileCreateManyArgsSchema: z.ZodType<Prisma.SellerProfileCreateManyArgs> = z.object({
  data: z.union([ SellerProfileCreateManyInputSchema, SellerProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SellerProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SellerProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ SellerProfileCreateManyInputSchema, SellerProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const SellerProfileDeleteArgsSchema: z.ZodType<Prisma.SellerProfileDeleteArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  where: SellerProfileWhereUniqueInputSchema, 
}).strict();

export const SellerProfileUpdateArgsSchema: z.ZodType<Prisma.SellerProfileUpdateArgs> = z.object({
  select: SellerProfileSelectSchema.optional(),
  include: SellerProfileIncludeSchema.optional(),
  data: z.union([ SellerProfileUpdateInputSchema, SellerProfileUncheckedUpdateInputSchema ]),
  where: SellerProfileWhereUniqueInputSchema, 
}).strict();

export const SellerProfileUpdateManyArgsSchema: z.ZodType<Prisma.SellerProfileUpdateManyArgs> = z.object({
  data: z.union([ SellerProfileUpdateManyMutationInputSchema, SellerProfileUncheckedUpdateManyInputSchema ]),
  where: SellerProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SellerProfileUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SellerProfileUpdateManyAndReturnArgs> = z.object({
  data: z.union([ SellerProfileUpdateManyMutationInputSchema, SellerProfileUncheckedUpdateManyInputSchema ]),
  where: SellerProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const SellerProfileDeleteManyArgsSchema: z.ZodType<Prisma.SellerProfileDeleteManyArgs> = z.object({
  where: SellerProfileWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DocumentsCreateArgsSchema: z.ZodType<Prisma.DocumentsCreateArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  data: z.union([ DocumentsCreateInputSchema, DocumentsUncheckedCreateInputSchema ]),
}).strict();

export const DocumentsUpsertArgsSchema: z.ZodType<Prisma.DocumentsUpsertArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema, 
  create: z.union([ DocumentsCreateInputSchema, DocumentsUncheckedCreateInputSchema ]),
  update: z.union([ DocumentsUpdateInputSchema, DocumentsUncheckedUpdateInputSchema ]),
}).strict();

export const DocumentsCreateManyArgsSchema: z.ZodType<Prisma.DocumentsCreateManyArgs> = z.object({
  data: z.union([ DocumentsCreateManyInputSchema, DocumentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DocumentsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.DocumentsCreateManyAndReturnArgs> = z.object({
  data: z.union([ DocumentsCreateManyInputSchema, DocumentsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const DocumentsDeleteArgsSchema: z.ZodType<Prisma.DocumentsDeleteArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  where: DocumentsWhereUniqueInputSchema, 
}).strict();

export const DocumentsUpdateArgsSchema: z.ZodType<Prisma.DocumentsUpdateArgs> = z.object({
  select: DocumentsSelectSchema.optional(),
  include: DocumentsIncludeSchema.optional(),
  data: z.union([ DocumentsUpdateInputSchema, DocumentsUncheckedUpdateInputSchema ]),
  where: DocumentsWhereUniqueInputSchema, 
}).strict();

export const DocumentsUpdateManyArgsSchema: z.ZodType<Prisma.DocumentsUpdateManyArgs> = z.object({
  data: z.union([ DocumentsUpdateManyMutationInputSchema, DocumentsUncheckedUpdateManyInputSchema ]),
  where: DocumentsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DocumentsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.DocumentsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ DocumentsUpdateManyMutationInputSchema, DocumentsUncheckedUpdateManyInputSchema ]),
  where: DocumentsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const DocumentsDeleteManyArgsSchema: z.ZodType<Prisma.DocumentsDeleteManyArgs> = z.object({
  where: DocumentsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuditLogsCreateArgsSchema: z.ZodType<Prisma.AuditLogsCreateArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  data: z.union([ AuditLogsCreateInputSchema, AuditLogsUncheckedCreateInputSchema ]),
}).strict();

export const AuditLogsUpsertArgsSchema: z.ZodType<Prisma.AuditLogsUpsertArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereUniqueInputSchema, 
  create: z.union([ AuditLogsCreateInputSchema, AuditLogsUncheckedCreateInputSchema ]),
  update: z.union([ AuditLogsUpdateInputSchema, AuditLogsUncheckedUpdateInputSchema ]),
}).strict();

export const AuditLogsCreateManyArgsSchema: z.ZodType<Prisma.AuditLogsCreateManyArgs> = z.object({
  data: z.union([ AuditLogsCreateManyInputSchema, AuditLogsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuditLogsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AuditLogsCreateManyAndReturnArgs> = z.object({
  data: z.union([ AuditLogsCreateManyInputSchema, AuditLogsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const AuditLogsDeleteArgsSchema: z.ZodType<Prisma.AuditLogsDeleteArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  where: AuditLogsWhereUniqueInputSchema, 
}).strict();

export const AuditLogsUpdateArgsSchema: z.ZodType<Prisma.AuditLogsUpdateArgs> = z.object({
  select: AuditLogsSelectSchema.optional(),
  include: AuditLogsIncludeSchema.optional(),
  data: z.union([ AuditLogsUpdateInputSchema, AuditLogsUncheckedUpdateInputSchema ]),
  where: AuditLogsWhereUniqueInputSchema, 
}).strict();

export const AuditLogsUpdateManyArgsSchema: z.ZodType<Prisma.AuditLogsUpdateManyArgs> = z.object({
  data: z.union([ AuditLogsUpdateManyMutationInputSchema, AuditLogsUncheckedUpdateManyInputSchema ]),
  where: AuditLogsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuditLogsUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AuditLogsUpdateManyAndReturnArgs> = z.object({
  data: z.union([ AuditLogsUpdateManyMutationInputSchema, AuditLogsUncheckedUpdateManyInputSchema ]),
  where: AuditLogsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const AuditLogsDeleteManyArgsSchema: z.ZodType<Prisma.AuditLogsDeleteManyArgs> = z.object({
  where: AuditLogsWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RefreshTokensCreateArgsSchema: z.ZodType<Prisma.RefreshTokensCreateArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  data: z.union([ RefreshTokensCreateInputSchema, RefreshTokensUncheckedCreateInputSchema ]),
}).strict();

export const RefreshTokensUpsertArgsSchema: z.ZodType<Prisma.RefreshTokensUpsertArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereUniqueInputSchema, 
  create: z.union([ RefreshTokensCreateInputSchema, RefreshTokensUncheckedCreateInputSchema ]),
  update: z.union([ RefreshTokensUpdateInputSchema, RefreshTokensUncheckedUpdateInputSchema ]),
}).strict();

export const RefreshTokensCreateManyArgsSchema: z.ZodType<Prisma.RefreshTokensCreateManyArgs> = z.object({
  data: z.union([ RefreshTokensCreateManyInputSchema, RefreshTokensCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const RefreshTokensCreateManyAndReturnArgsSchema: z.ZodType<Prisma.RefreshTokensCreateManyAndReturnArgs> = z.object({
  data: z.union([ RefreshTokensCreateManyInputSchema, RefreshTokensCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const RefreshTokensDeleteArgsSchema: z.ZodType<Prisma.RefreshTokensDeleteArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  where: RefreshTokensWhereUniqueInputSchema, 
}).strict();

export const RefreshTokensUpdateArgsSchema: z.ZodType<Prisma.RefreshTokensUpdateArgs> = z.object({
  select: RefreshTokensSelectSchema.optional(),
  include: RefreshTokensIncludeSchema.optional(),
  data: z.union([ RefreshTokensUpdateInputSchema, RefreshTokensUncheckedUpdateInputSchema ]),
  where: RefreshTokensWhereUniqueInputSchema, 
}).strict();

export const RefreshTokensUpdateManyArgsSchema: z.ZodType<Prisma.RefreshTokensUpdateManyArgs> = z.object({
  data: z.union([ RefreshTokensUpdateManyMutationInputSchema, RefreshTokensUncheckedUpdateManyInputSchema ]),
  where: RefreshTokensWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RefreshTokensUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.RefreshTokensUpdateManyAndReturnArgs> = z.object({
  data: z.union([ RefreshTokensUpdateManyMutationInputSchema, RefreshTokensUncheckedUpdateManyInputSchema ]),
  where: RefreshTokensWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const RefreshTokensDeleteManyArgsSchema: z.ZodType<Prisma.RefreshTokensDeleteManyArgs> = z.object({
  where: RefreshTokensWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();