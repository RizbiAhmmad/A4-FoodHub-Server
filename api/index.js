var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nmodel User {\n  id              String           @id\n  name            String\n  email           String\n  emailVerified   Boolean          @default(false)\n  image           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  role            String?          @default("CUSTOMER")\n  phone           String?\n  status          String?          @default("ACTIVE")\n  sessions        Session[]\n  accounts        Account[]\n  providerProfile ProviderProfile?\n\n  orders  Order[]  @relation("CustomerOrders")\n  reviews Review[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  description    String?\n  address        String\n  phone          String?\n  logo           String?\n  isApproved     Boolean  @default(true)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  user   User    @relation(fields: [userId], references: [id])\n  meals  Meal[]  @relation("ProviderMeals")\n  orders Order[]\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  image     String?\n  createdAt DateTime @default(now())\n  meals     Meal[]\n}\n\nmodel Meal {\n  id          String   @id @default(uuid())\n  providerId  String\n  categoryId  String?\n  name        String\n  description String?\n  price       Float\n  image       String?\n  isFeatured  Boolean  @default(false)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  provider ProviderProfile @relation(fields: [providerId], references: [id], name: "ProviderMeals")\n  category Category?       @relation(fields: [categoryId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n}\n\nmodel Order {\n  id          String      @id @default(uuid())\n  customerId  String\n  providerId  String\n  totalAmount Float\n  status      OrderStatus @default(PLACED)\n  address     String\n  phone       String\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n\n  customer User            @relation("CustomerOrders", fields: [customerId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n  items    OrderItem[]\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  price    Float\n\n  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  meal  Meal  @relation(fields: [mealId], references: [id])\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  mealId     String\n  customerId String\n  rating     Int\n  comment    String?\n  createdAt  DateTime @default(now())\n\n  meal     Meal @relation(fields: [mealId], references: [id])\n  customer User @relation(fields: [customerId], references: [id])\n\n  @@unique([mealId, customerId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"CustomerOrders"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"logo","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"ProviderMeals"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"ProviderMeals"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"CustomerOrders"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  ProviderProfile: "ProviderProfile",
  Category: "Category",
  Meal: "Meal",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  restaurantName: "restaurantName",
  description: "description",
  address: "address",
  phone: "phone",
  logo: "logo",
  isApproved: "isApproved",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  image: "image",
  createdAt: "createdAt"
};
var MealScalarFieldEnum = {
  id: "id",
  providerId: "providerId",
  categoryId: "categoryId",
  name: "name",
  description: "description",
  price: "price",
  image: "image",
  isFeatured: "isFeatured",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  providerId: "providerId",
  totalAmount: "totalAmount",
  status: "status",
  address: "address",
  phone: "phone",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  quantity: "quantity",
  price: "price"
};
var ReviewScalarFieldEnum = {
  id: "id",
  mealId: "mealId",
  customerId: "customerId",
  rating: "rating",
  comment: "comment",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var OrderStatus = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
      // 5 minutes
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: false,
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true,
    // Allow requests without Origin header (Postman, mobile apps, etc.)
    disableOriginCheck: true
    // Disable origin check for all requests (use with caution in production)
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Prisma Blog" <maddison53@ethereal.email>',
          to: user.email,
          subject: "Verify Your Email Address",
          text: `Verify your email by visiting this link: ${verificationUrl}`,
          // fallback
          html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0;">Prisma Blog</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:#333;">Verify your email address</h2>
                <p style="color:#555; line-height:1.6;">Hello ${user.name} Thanks for signing up for <strong>Prisma Blog</strong>.
                  Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a href="${verificationUrl}"
                     style="
                       background:#2563eb;
                       color:#ffffff;
                       text-decoration:none;
                       padding:14px 28px;
                       border-radius:6px;
                       display:inline-block;
                       font-weight:bold;
                     ">
                    Verify Email
                  </a>
                </div>

                <p style="color:#555; font-size:14px;">
                  If the button doesn\u2019t work, copy and paste this link into your browser:
                </p>
                <p style="word-break:break-all; font-size:13px; color:#2563eb;">
                  ${verificationUrl}
                </p>

                <p style="color:#999; font-size:13px; margin-top:30px;">
                  If you didn\u2019t create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f1f5f9; padding:15px; text-align:center; font-size:12px; color:#666;">
                \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} Prisma Blog. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/modules/provider/provider.router.ts
import { Router } from "express";

// src/modules/provider/provider.service.ts
var createProviderProfile = async (userId, data) => {
  return await prisma.providerProfile.create({
    data: {
      ...data,
      userId
    }
  });
};
var getProviderProfileByUserId = async (userId) => {
  return await prisma.providerProfile.findUnique({
    where: { userId },
    include: { meals: true }
  });
};
var updateProviderProfile = async (userId, data) => {
  return await prisma.providerProfile.update({
    where: { userId },
    data
  });
};
var providerService = {
  createProviderProfile,
  getProviderProfileByUserId,
  updateProviderProfile
};

// src/modules/provider/provider.controller.ts
var createProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");
    const result = await providerService.createProviderProfile(
      user.id,
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
var getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");
    const result = await providerService.getProviderProfileByUserId(user.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error, details: error });
  }
};
var updateProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");
    const result = await providerService.updateProviderProfile(user.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error, details: error });
  }
};
var providerController = {
  createProfile,
  getMyProfile,
  updateProfile
};

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email Verification Required"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/provider/provider.router.ts
var router = Router();
router.post("/", auth_default("PROVIDER" /* PROVIDER */), providerController.createProfile);
router.get("/me", auth_default("PROVIDER" /* PROVIDER */), providerController.getMyProfile);
router.patch("/me", auth_default("PROVIDER" /* PROVIDER */), providerController.updateProfile);
var providerRouter = router;

// src/modules/category/category.router.ts
import { Router as Router2 } from "express";

// src/builder/QueryBuilder.ts
var QueryBuilder = class {
  constructor(model, queryParams, config2 = {}) {
    this.model = model;
    this.queryParams = queryParams;
    this.config = config2;
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10
    };
    this.countQuery = {
      where: {}
    };
  }
  query;
  countQuery;
  page = 1;
  limit = 10;
  skip = 0;
  sortBy = "createdAt";
  sortOrder = "desc";
  selectFields;
  search() {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions = searchableFields.map(
        (field) => {
          if (field.includes(".")) {
            const parts = field.split(".");
            if (parts.length === 2) {
              const [relation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  [nestedField]: stringFilter2
                }
              };
            } else if (parts.length === 3) {
              const [relation, nestedRelation, nestedField] = parts;
              const stringFilter2 = {
                contains: searchTerm,
                mode: "insensitive"
              };
              return {
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter2
                    }
                  }
                }
              };
            }
          }
          const stringFilter = {
            contains: searchTerm,
            mode: "insensitive"
          };
          return {
            [field]: stringFilter
          };
        }
      );
      const whereConditions = this.query.where;
      whereConditions.OR = searchConditions;
      const countWhereConditions = this.countQuery.where;
      countWhereConditions.OR = searchConditions;
    }
    return this;
  }
  filter() {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "sort",
      "fields",
      "include"
    ];
    const filterParams = {};
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });
    const queryWhere = this.query.where;
    const countQueryWhere = this.countQuery.where;
    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];
      if (value === void 0 || value === "") {
        return;
      }
      const isAllowedField = !filterableFields || filterableFields.length === 0 || filterableFields.includes(key);
      if (key.includes(".")) {
        const parts = key.split(".");
        if (filterableFields && !filterableFields.includes(key)) {
          return;
        }
        if (parts.length === 2) {
          const [relation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {};
            countQueryWhere[relation] = {};
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          queryRelation[nestedField] = this.parseFilterValue(value);
          countRelation[nestedField] = this.parseFilterValue(value);
          return;
        } else if (parts.length === 3) {
          const [relation, nestedRelation, nestedField] = parts;
          if (!queryWhere[relation]) {
            queryWhere[relation] = {
              some: {}
            };
            countQueryWhere[relation] = {
              some: {}
            };
          }
          const queryRelation = queryWhere[relation];
          const countRelation = countQueryWhere[relation];
          if (!queryRelation.some) {
            queryRelation.some = {};
          }
          if (!countRelation.some) {
            countRelation.some = {};
          }
          const querySome = queryRelation.some;
          const countSome = countRelation.some;
          if (!querySome[nestedRelation]) {
            querySome[nestedRelation] = {};
          }
          if (!countSome[nestedRelation]) {
            countSome[nestedRelation] = {};
          }
          const queryNestedRelation = querySome[nestedRelation];
          const countNestedRelation = countSome[nestedRelation];
          queryNestedRelation[nestedField] = this.parseFilterValue(value);
          countNestedRelation[nestedField] = this.parseFilterValue(value);
          return;
        }
      }
      if (!isAllowedField) {
        return;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        queryWhere[key] = this.parseRangeFilter(
          value
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value
        );
        return;
      }
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });
    return this;
  }
  paginate() {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || 10;
    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;
    this.query.skip = this.skip;
    this.query.take = this.limit;
    return this;
  }
  sort() {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");
      if (parts.length === 2) {
        const [relation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedField]: sortOrder
          }
        };
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;
        this.query.orderBy = {
          [relation]: {
            [nestedRelation]: {
              [nestedField]: sortOrder
            }
          }
        };
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder
      };
    }
    return this;
  }
  fields() {
    const fieldsParam = this.queryParams.fields;
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};
      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });
      this.query.select = this.selectFields;
      delete this.query.include;
    }
    return this;
  }
  include(relation) {
    if (this.selectFields) {
      return this;
    }
    this.query.include = {
      ...this.query.include,
      ...relation
    };
    return this;
  }
  dynamicInclude(includeConfig, defaultInclude) {
    if (this.selectFields) {
      return this;
    }
    const result = {};
    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });
    const includeParam = this.queryParams.include;
    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam.split(",").map((relation) => relation.trim());
      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }
    this.query.include = {
      ...this.query.include,
      ...result
    };
    return this;
  }
  where(condition) {
    this.query.where = this.deepMerge(
      this.query.where,
      condition
    );
    this.countQuery.where = this.deepMerge(
      this.countQuery.where,
      condition
    );
    return this;
  }
  async execute() {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery
      ),
      this.model.findMany(
        this.query
      )
    ]);
    const totalPages = Math.ceil(total / this.limit);
    return {
      data,
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages
      }
    };
  }
  async count() {
    return await this.model.count(
      this.countQuery
    );
  }
  getQuery() {
    return this.query;
  }
  deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        if (result[key] && typeof result[key] === "object" && !Array.isArray(result[key])) {
          result[key] = this.deepMerge(
            result[key],
            source[key]
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }
  parseFilterValue(value) {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }
    return value;
  }
  parseRangeFilter(value) {
    const rangeQuery = {};
    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];
      if (operatorValue === void 0) return;
      const parsedValue = typeof operatorValue === "string" && !isNaN(Number(operatorValue)) ? Number(operatorValue) : operatorValue;
      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;
        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });
    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
};

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  return prisma.category.create({ data });
};
var getAllCategories = async (query) => {
  const categoryQuery = new QueryBuilder(prisma.category, query, {
    searchableFields: ["name"],
    filterableFields: ["name"]
  }).search().filter().sort().paginate().fields().dynamicInclude({ meals: true }, ["meals"]);
  return await categoryQuery.execute();
};
var deleteCategory = async (id) => {
  return prisma.category.delete({ where: { id } });
};
var categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
var getAllCategories2 = async (req, res) => {
  const result = await categoryService.getAllCategories(req.query);
  res.json(result);
};
var deleteCategory2 = async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);
  res.json(result);
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.router.ts
var router2 = Router2();
router2.post("/", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), categoryController.createCategory);
router2.get("/", categoryController.getAllCategories);
router2.delete("/:id", auth_default("ADMIN" /* ADMIN */, "PROVIDER" /* PROVIDER */), categoryController.deleteCategory);
var categoryRouter = router2;

// src/modules/meal/meal.router.ts
import { Router as Router3 } from "express";

// src/modules/meal/meal.service.ts
var createMeal = async (providerId, data) => {
  return prisma.meal.create({
    data: {
      ...data,
      providerId
    }
  });
};
var getAllMeals = async (query) => {
  const mealQuery = new QueryBuilder(
    prisma.meal,
    query,
    {
      searchableFields: ["name", "description", "category.name", "provider.restaurantName"],
      filterableFields: ["price", "categoryId", "providerId", "category.name"]
    }
  ).search().filter().sort().paginate().fields().dynamicInclude(
    {
      provider: true,
      category: true
    },
    ["provider", "category"]
  );
  return await mealQuery.execute();
};
var getMealsByProvider = async (providerId) => {
  return prisma.meal.findMany({
    where: { providerId },
    include: {
      category: true,
      provider: true
    }
  });
};
var getMealById = async (id) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      provider: true,
      category: true
      //   reviews: true,
    }
  });
};
var updateMeal = async (mealId, providerId, data) => {
  return prisma.meal.updateMany({
    where: { id: mealId, providerId },
    data
  });
};
var deleteMeal = async (mealId, providerId) => {
  return prisma.meal.deleteMany({
    where: { id: mealId, providerId }
  });
};
var mealService = {
  createMeal,
  getAllMeals,
  getMealsByProvider,
  getMealById,
  updateMeal,
  deleteMeal
};

// src/modules/meal/meal.controller.ts
var createMeal2 = async (req, res, next) => {
  try {
    const user = req.user;
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id }
    });
    if (!provider) throw new Error("Provider profile not found");
    const result = await mealService.createMeal(provider.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
var getAllMeals2 = async (req, res) => {
  const query = { ...req.query };
  if (query.minPrice || query.maxPrice) {
    query.price = {};
    if (query.minPrice) query.price.gte = Number(query.minPrice);
    if (query.maxPrice) query.price.lte = Number(query.maxPrice);
    delete query.minPrice;
    delete query.maxPrice;
  }
  if (query.cuisine) {
    query["category.name"] = query.cuisine;
    delete query.cuisine;
  }
  const result = await mealService.getAllMeals(query);
  res.json(result);
};
var getMyMeals = async (req, res) => {
  try {
    const user = req.user;
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: user.id }
    });
    if (!provider) throw new Error("Provider profile not found");
    const meals = await mealService.getMealsByProvider(provider.id);
    res.json(meals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
var getMealById2 = async (req, res) => {
  const result = await mealService.getMealById(req.params.id);
  res.json(result);
};
var updateMeal2 = async (req, res) => {
  const user = req.user;
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id }
  });
  const result = await mealService.updateMeal(
    req.params.id,
    provider.id,
    req.body
  );
  res.json(result);
};
var deleteMeal2 = async (req, res) => {
  const user = req.user;
  const provider = await prisma.providerProfile.findUnique({
    where: { userId: user.id }
  });
  const result = await mealService.deleteMeal(
    req.params.id,
    provider.id
  );
  res.json(result);
};
var mealController = {
  createMeal: createMeal2,
  getAllMeals: getAllMeals2,
  getMyMeals,
  getMealById: getMealById2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/modules/meal/meal.router.ts
var router3 = Router3();
router3.get("/", mealController.getAllMeals);
router3.get("/my-meals", auth_default("PROVIDER" /* PROVIDER */), mealController.getMyMeals);
router3.get("/:id", mealController.getMealById);
router3.post("/", auth_default("PROVIDER" /* PROVIDER */), mealController.createMeal);
router3.patch("/:id", auth_default("PROVIDER" /* PROVIDER */), mealController.updateMeal);
router3.delete("/:id", auth_default("PROVIDER" /* PROVIDER */), mealController.deleteMeal);
var mealRouter = router3;

// src/modules/order/order.router.ts
import { Router as Router4 } from "express";

// src/modules/order/order.service.ts
var createOrder = async (customerId, payload) => {
  const { items, address, phone } = payload;
  if (!items || items.length === 0) {
    throw new Error("No meals selected");
  }
  const mealIds = items.map((i) => i.mealId);
  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
    include: { provider: true }
  });
  if (meals.length !== items.length) {
    throw new Error("Invalid meal in order");
  }
  if (meals.length === 0) {
    throw new Error("Meals not found");
  }
  const providerId = meals[0].providerId;
  const sameProvider = meals.every((m) => m.providerId === providerId);
  if (!sameProvider) {
    throw new Error("Order must be from one provider only");
  }
  let totalAmount = 0;
  const orderItemsData = items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    const price = meal.price * item.quantity;
    totalAmount += price;
    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      totalAmount,
      address,
      phone,
      status: OrderStatus.PLACED,
      items: {
        create: orderItemsData
      }
    },
    include: {
      items: true
    }
  });
  return order;
};
var getAllOrders = async (query) => {
  const orderQuery = new QueryBuilder(prisma.order, query, {
    searchableFields: ["customer.name", "customer.email", "provider.restaurantName", "status"],
    filterableFields: ["status", "customerId", "providerId", "totalAmount"]
  }).search().filter().sort().paginate().fields().dynamicInclude({
    items: { include: { meal: true } },
    customer: { select: { name: true, email: true, phone: true } },
    provider: { select: { restaurantName: true } }
  }, ["items", "customer", "provider"]);
  return await orderQuery.execute();
};
var getMyOrders = async (customerId) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      items: { include: { meal: true } },
      provider: true
    }
  });
};
var getOrderDetails = async (orderId) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { meal: true } },
      provider: true,
      customer: true
    }
  });
};
var getProviderOrders = async (providerUserId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: providerUserId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  return prisma.order.findMany({
    where: { providerId: providerProfile.id },
    include: {
      items: { include: { meal: true } },
      customer: { select: { name: true, phone: true } }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (orderId, status) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
var orderService = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getProviderOrders,
  updateOrderStatus,
  getAllOrders
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Unauthorized");
    const result = await orderService.createOrder(user.id, req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
var getAllOrders2 = async (req, res) => {
  const result = await orderService.getAllOrders(req.query);
  res.json(result);
};
var getMyOrders2 = async (req, res) => {
  const user = req.user;
  const result = await orderService.getMyOrders(user.id);
  res.json(result);
};
var getOrderDetails2 = async (req, res) => {
  const result = await orderService.getOrderDetails(req.params.id);
  res.json(result);
};
var getProviderOrders2 = async (req, res) => {
  const user = req.user;
  const result = await orderService.getProviderOrders(user.id);
  res.json(result);
};
var updateOrderStatus2 = async (req, res) => {
  const { status } = req.body;
  const result = await orderService.updateOrderStatus(
    req.params.id,
    status
  );
  res.json(result);
};
var orderController = {
  createOrder: createOrder2,
  getMyOrders: getMyOrders2,
  getOrderDetails: getOrderDetails2,
  getProviderOrders: getProviderOrders2,
  updateOrderStatus: updateOrderStatus2,
  getAllOrders: getAllOrders2
};

// src/modules/order/order.router.ts
var router4 = Router4();
router4.get(
  "/provider",
  auth_default("PROVIDER" /* PROVIDER */),
  orderController.getProviderOrders
);
router4.get(
  "/admin",
  auth_default("ADMIN" /* ADMIN */),
  orderController.getAllOrders
);
router4.post("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
router4.get("/", auth_default("CUSTOMER" /* CUSTOMER */, "PROVIDER" /* PROVIDER */), orderController.getMyOrders);
router4.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getOrderDetails);
router4.patch(
  "/:id/status",
  auth_default("PROVIDER" /* PROVIDER */),
  orderController.updateOrderStatus
);
var orderRouter = router4;

// src/modules/review/review.router.ts
import { Router as Router5 } from "express";

// src/modules/review/review.server.ts
var createReview = async (customerId, data) => {
  const { mealId, rating, comment } = data;
  const existing = await prisma.review.findUnique({
    where: { mealId_customerId: { mealId, customerId } }
  });
  if (existing) throw new Error("You have already reviewed this meal");
  return prisma.review.create({
    data: {
      mealId,
      customerId,
      rating,
      comment: comment ?? null
    }
  });
};
var getMealReviews = async (mealId) => {
  return prisma.review.findMany({
    where: { mealId },
    include: { customer: true }
  });
};
var getCustomerReviews = async (customerId) => {
  return prisma.review.findMany({
    where: { customerId },
    include: { meal: true }
  });
};
var updateReview = async (customerId, mealId, data) => {
  return prisma.review.update({
    where: { mealId_customerId: { mealId, customerId } },
    data
  });
};
var deleteReview = async (customerId, mealId) => {
  return prisma.review.delete({
    where: { mealId_customerId: { mealId, customerId } }
  });
};
var reviewService = {
  createReview,
  getMealReviews,
  getCustomerReviews,
  updateReview,
  deleteReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const customerId = req.user.id;
    const review = await reviewService.createReview(customerId, req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
var getMealReviews2 = async (req, res, next) => {
  try {
    const mealId = req.params.mealId;
    if (!mealId) throw new Error("Meal ID is required");
    const reviews = await reviewService.getMealReviews(mealId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
var getCustomerReviews2 = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const reviews = await reviewService.getCustomerReviews(req.user.id);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
var updateReview2 = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const mealId = req.params.mealId;
    if (!mealId) throw new Error("Meal ID is required");
    const review = await reviewService.updateReview(req.user.id, mealId, req.body);
    res.json(review);
  } catch (error) {
    next(error);
  }
};
var deleteReview2 = async (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized");
    const mealId = req.params.mealId;
    if (!mealId) throw new Error("Meal ID is required");
    await reviewService.deleteReview(req.user.id, mealId);
    res.json({ message: "Review deleted" });
  } catch (error) {
    next(error);
  }
};
var reviewController = {
  createReview: createReview2,
  getMealReviews: getMealReviews2,
  getCustomerReviews: getCustomerReviews2,
  updateReview: updateReview2,
  deleteReview: deleteReview2
};

// src/modules/review/review.router.ts
var router5 = Router5();
router5.post("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.createReview);
router5.get("/meal/:mealId", reviewController.getMealReviews);
router5.get("/me", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.getCustomerReviews);
router5.put("/:mealId", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.updateReview);
router5.delete("/:mealId", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.deleteReview);
var reviewRouter = router5;

// src/modules/user/user.router.ts
import { Router as Router6 } from "express";

// src/modules/user/user.service.ts
var getAllUsers = async (query) => {
  const userQuery = new QueryBuilder(prisma.user, query, {
    searchableFields: ["name", "email", "role", "status"],
    filterableFields: ["role", "status"]
  }).search().filter().sort().paginate().fields().dynamicInclude({
    providerProfile: {
      select: {
        restaurantName: true,
        isApproved: true
      }
    }
  }, ["providerProfile"]);
  if (!userQuery.getQuery().select) {
    userQuery.getQuery().select = {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true
        }
      }
    };
    delete userQuery.getQuery().include;
  }
  return await userQuery.execute();
};
var getMe = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          isApproved: true
        }
      }
    }
  });
};
var changeUserRole = async (userId, role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role }
  });
};
var changeUserStatus = async (userId, status) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var userService = {
  getAllUsers,
  changeUserRole,
  changeUserStatus,
  getMe
};

// src/modules/user/user.controller.ts
var getMe2 = async (req, res) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await userService.getMe(req.user.id);
  res.json(user);
};
var getAllUsers2 = async (req, res) => {
  const users = await userService.getAllUsers(req.query);
  res.json(users);
};
var updateRole = async (req, res) => {
  const userId = req.params.id;
  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  const result = await userService.changeUserRole(userId, req.body.role);
  res.json(result);
};
var updateStatus = async (req, res) => {
  const userId = req.params.id;
  if (!userId || Array.isArray(userId)) {
    return res.status(400).json({ message: "Invalid user id" });
  }
  const result = await userService.changeUserStatus(userId, req.body.status);
  res.json(result);
};
var userController = {
  getAllUsers: getAllUsers2,
  updateRole,
  updateStatus,
  getMe: getMe2
};

// src/modules/user/user.router.ts
var router6 = Router6();
router6.get("/me", auth_default(), userController.getMe);
router6.get("/", auth_default("ADMIN" /* ADMIN */), userController.getAllUsers);
router6.patch("/:id/role", auth_default("ADMIN" /* ADMIN */), userController.updateRole);
router6.patch("/:id/status", auth_default("ADMIN" /* ADMIN */), userController.updateStatus);
var userRouter = router6;

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provided incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because required record was not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Unique constraint failed.";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500, errorMessage = "Error occured during execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed.Please check your credential";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode).json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/app.ts
var app = express();
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
  // Production frontend URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRouter);
app.use("/api/providers", providerRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/meals", mealRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use(globalErrorHandler_default);
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
