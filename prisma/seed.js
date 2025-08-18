"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seed.ts
var client_1 = require("@prisma/client");
var db = new client_1.PrismaClient();
var ORG_NAME = client_1.CommunityName.ORG;
/**
 * Default questions for all communities except ORG
 */
var DEFAULT_QUESTIONS = [
    {
        label: "What interests you about this community?",
        type: client_1.QuestionType.TEXT,
    },
    { label: "Do you have experience in this area?", type: client_1.QuestionType.BOOLEAN },
    { label: "What do you hope to gain by joining?", type: client_1.QuestionType.TEXT },
];
// ---- helpers
function ensureCommunities() {
    return __awaiter(this, void 0, void 0, function () {
        var names, _i, names_1, name_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    names = Object.values(client_1.CommunityName);
                    _i = 0, names_1 = names;
                    _a.label = 1;
                case 1:
                    if (!(_i < names_1.length)) return [3 /*break*/, 4];
                    name_1 = names_1[_i];
                    return [4 /*yield*/, db.community.upsert({
                            where: { name: name_1 },
                            update: {},
                            create: {
                                name: name_1,
                                description: name_1 === ORG_NAME ? "Organization scope" : null,
                            },
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function ensureSystemUser() {
    return __awaiter(this, void 0, void 0, function () {
        var email;
        var _a;
        return __generator(this, function (_b) {
            email = (_a = process.env.SEED_SYSTEM_EMAIL) !== null && _a !== void 0 ? _a : "system@local";
            return [2 /*return*/, db.user.upsert({
                    where: { email: email },
                    update: {},
                    create: { email: email, name: "System", userRole: "ADMIN" },
                })];
        });
    });
}
function ensureFormForCommunity(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var community, createdById, existing, title, description;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    community = opts.community, createdById = opts.createdById;
                    return [4 /*yield*/, db.communityForm.findFirst({
                            where: { communityTag: community.name },
                            orderBy: { createAt: "asc" },
                        })];
                case 1:
                    existing = _a.sent();
                    if (existing)
                        return [2 /*return*/, existing];
                    title = "".concat(community.name, " Community Interest Form");
                    description = "Form for students interested in the ".concat(community.name, " community.");
                    return [2 /*return*/, db.communityForm.create({
                            data: {
                                title: title,
                                description: description,
                                communityTag: community.name,
                                communityId: community.id,
                                createdById: createdById,
                                createdByName: "System",
                                isActive: true,
                            },
                        })];
            }
        });
    });
}
function ensureDefaultQuestions(formId) {
    return __awaiter(this, void 0, void 0, function () {
        var existing, have, order, _i, DEFAULT_QUESTIONS_1, q, _a, _b;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, db.communityQuestion.findMany({
                        where: { formId: formId },
                        select: { label: true },
                    })];
                case 1:
                    existing = _e.sent();
                    have = new Set(existing.map(function (e) { return e.label; }));
                    order = 0;
                    _i = 0, DEFAULT_QUESTIONS_1 = DEFAULT_QUESTIONS;
                    _e.label = 2;
                case 2:
                    if (!(_i < DEFAULT_QUESTIONS_1.length)) return [3 /*break*/, 6];
                    q = DEFAULT_QUESTIONS_1[_i];
                    if (have.has(q.label))
                        return [3 /*break*/, 5];
                    _b = (_a = db.communityQuestion).create;
                    _c = {};
                    _d = {
                        formId: formId,
                        label: q.label,
                        type: q.type,
                        order: order++
                    };
                    return [4 /*yield*/, ensureSystemUser()];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.createdById = (_e.sent()).id,
                            _d),
                            _c)])];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function seedFormsPerCommunity() {
    return __awaiter(this, void 0, void 0, function () {
        var system, communities, _i, communities_1, community, form;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ensureSystemUser()];
                case 1:
                    system = _a.sent();
                    return [4 /*yield*/, db.community.findMany({
                            where: { name: { in: Object.values(client_1.CommunityName) } },
                            select: { id: true, name: true },
                        })];
                case 2:
                    communities = _a.sent();
                    _i = 0, communities_1 = communities;
                    _a.label = 3;
                case 3:
                    if (!(_i < communities_1.length)) return [3 /*break*/, 7];
                    community = communities_1[_i];
                    return [4 /*yield*/, ensureFormForCommunity({
                            community: community,
                            createdById: system.id,
                        })];
                case 4:
                    form = _a.sent();
                    return [4 /*yield*/, ensureDefaultQuestions(form.id)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Permissions seeding if you added the tables
function seedPermissions() {
    return __awaiter(this, void 0, void 0, function () {
        var keys, org, perms, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = [
                        "lead.view",
                        "lead.update",
                        "community.manage.members",
                        "community.form.edit",
                        "post.create",
                    ];
                    return [4 /*yield*/, db.permission.createMany({
                            data: keys.map(function (key) { return ({ key: key }); }),
                            skipDuplicates: true,
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.community.findUnique({ where: { name: ORG_NAME } })];
                case 2:
                    org = _a.sent();
                    if (!org)
                        return [2 /*return*/];
                    return [4 /*yield*/, db.permission.findMany()];
                case 3:
                    perms = _a.sent();
                    id = function (k) { return perms.find(function (p) { return p.key === k; }).id; };
                    // ORG-wide grants
                    return [4 /*yield*/, db.communityPermissionGrant.createMany({
                            data: __spreadArray(__spreadArray([], perms.map(function (p) { return ({
                                communityId: org.id,
                                role: "ADMIN",
                                permissionId: p.id,
                            }); }), true), [
                                // MEMBER baseline
                                { communityId: org.id, role: "MEMBER", permissionId: id("lead.view") },
                                // OFFICER extras
                                { communityId: org.id, role: "OFFICER", permissionId: id("lead.view") },
                                { communityId: org.id, role: "OFFICER", permissionId: id("lead.update") },
                                {
                                    communityId: org.id,
                                    role: "OFFICER",
                                    permissionId: id("community.manage.members"),
                                },
                            ], false),
                            skipDuplicates: true,
                        })];
                case 4:
                    // ORG-wide grants
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("This is something");
                    return [4 /*yield*/, ensureCommunities()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, seedFormsPerCommunity()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, db.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
